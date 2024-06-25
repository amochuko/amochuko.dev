import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NewMessageForm from '../../message/new-message-form';

describe('<NewMessgeForm>', () => {
  const sendHandler = jest.fn().mockName('sendHandler');
  const msg = 'New message';

  beforeEach(async () => {
    // set up
    render(<NewMessageForm onSend={sendHandler} />);

    const txtInput = screen.getByRole('textbox', { name: /message/i });
    await userEvent.type(txtInput, msg);

    await userEvent.click(screen.getByRole('button', { name: /send/i }));
  });

  describe('clicking the send button', () => {
    it('clears the text field', async () => {
      const input = screen.getByRole('textbox', {
        name: /message/i,
      }).textContent;

      expect(input).toEqual('');
    });

    it('calls the send handler', async () => {

      expect(sendHandler).toHaveBeenCalled();
      expect(sendHandler).toHaveBeenCalledWith(msg);
    });
  });
});
