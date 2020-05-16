import { render } from 'test-utils';

import Notification from '../../App/notification/Notification';

describe('Notification', () => {
  it('renders correctly', () => {
    const { container } = render(<Notification>Notification</Notification>);
    expect(container.firstChild).toMatchSnapshot(`
      <div
       class="notification is-warning">
      Notification
      </div>
    `);
  });
});
