'use server';
import { signIn } from '@/auth';
import { sql } from '@vercel/postgres';
import { AuthError } from 'next-auth';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

export type InvoiceState = {
  errors?: {
    customerId: string[];
    amount?: string[] | null;
    status?: string[] | null;
  };
  message?: string | null;
};

// Schema to validate formData values
const FormSchema = z.object({
  id: z.string(),
  customerId: z.string({
    invalid_type_error: 'Please select a customer',
  }),
  amount: z.coerce
    .number()
    .gt(0, { message: 'Please enter an amount greater than $0.' }),
  status: z.enum(['pending', 'paid'], {
    invalid_type_error: 'Please select an invoice status',
  }),
  date: z.string(),
});

export async function createInvoice(
  prevState: InvoiceState,
  formData: FormData,
) {
  // omit some fields
  const CreateInvoice = FormSchema.omit({ id: true, date: true });

  // Validate form fields using Zod
  const validatedFields = CreateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice',
    };
  }

  const { amount, customerId, status } = validatedFields.data;
  // set `amount` to cent
  const amountInCent = amount * 100;
  // set `Date` of creation in "YYYY-MM-DD" format
  const date = new Date().toISOString().split('T')[0];

  try {
    // save to db
    await sql`
    INSERT INTO invoices (customer_id, amount, status , date)
    VALUES (${customerId}, ${amountInCent}, ${status}, ${date})`;
  } catch (err) {
    console.error(err);
    // If a database error occurs, return a more specific error.
    return { message: 'Database Error: Failed to Create Invoice.' };
  }

  // Clear route cache and trigger a new request to the server
  revalidatePath('/dashboard/invoices');
  //redirect the user.
  redirect('/dashboard/invoices');
}

export async function updateInvoice(
  id: string,
  prevState: InvoiceState,
  formData: FormData,
) {
  // Use Zod to update the expected types
  const UpdateInvoice = FormSchema.omit({ id: true, date: true });

  // Validate form fields using Zod
  const validatedFields = UpdateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  if (!validatedFields.success) {
    return {
      message: 'Mission Field. Failed to Update Invoice.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { customerId, amount, status } = validatedFields.data;
  // parse amount to cent
  const amountInCents = amount * 100;

  try {
    await sql`
          UPDATE invoices
          SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
          WHERE id = ${id}
          `;
  } catch (err: any) {
    console.error(err);
    return { message: 'Database Error: Failed to Update Invoice.' };
  }

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function deleteInvoice(id: string) {
  try {
    await sql`DELETE FROM invoices WHERE id = ${id}`;

    revalidatePath('/dashboard/invoices');
    return { message: 'Deleted Invoice' };
  } catch (err) {
    console.error(err);
    return { message: 'Database Error: Failed to Delete Invoice.' };
  }
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (err) {
    if (err instanceof AuthError) {
      switch (err.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }

    throw err;
  }
}
