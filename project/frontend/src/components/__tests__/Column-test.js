import { render } from 'test-utils';

import Column from '../Column';

describe('Column', () => {
  it('renders correctly', () => {
    const { container } = render(<Column>Column entry</Column>);
    expect(container.firstChild).toMatchSnapshot(`
      <div
       class="column is-half is-center">
      Column entry
      </div>
    `);
  });
});
