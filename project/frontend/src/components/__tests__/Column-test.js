import { render } from 'test-utils';

import Column from '../columns/Column';

describe('Column', () => {
  it('renders correctly', () => {
    const { container } = render(<Column>Column entry</Column>);
    expect(container.firstChild).toMatchSnapshot();
  });
});
