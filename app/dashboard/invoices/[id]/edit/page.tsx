import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import * as data from '@/app/lib/data';
import Form from '@/app/ui/invoices/edit-form';
import { useParams } from 'next/navigation';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Invoices - Edit',
};

interface EditPageProps {
  params: Record<string, any>;
  searchParams: Record<string, any>;
}
export default async function EditPage(props: EditPageProps) {
  const id = props.params.id;

  const [invoice, customers] = await Promise.all([
    data.fetchInvoiceById(id),
    data.fetchCustomers(),
  ]);

  if (!invoice) {
    // enable `404 Not Found`
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoice', href: `/dashboard/invoices` },
          {
            label: 'Edit Invoice',
            href: `/dashboard/invoices/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form invoice={invoice} customers={customers} />
    </main>
  );
}
