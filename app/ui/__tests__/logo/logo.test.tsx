import { render, screen } from '@testing-library/react';
import AcmeLogo from '../../acme-logo';

describe('<AcmeLogo/>', () => {
  beforeEach(() => {
    render(<AcmeLogo />);
  });

  it('should have Acme as title', async () => {
    const title = screen.getByText(/acme/i);
    expect(title.innerHTML).toBe('Acme');
  });
});
