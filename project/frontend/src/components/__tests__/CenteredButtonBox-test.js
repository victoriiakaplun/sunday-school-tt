import { render } from 'test-utils';

import CenteredButtonBox from '../button/CenteredButtonBox';

describe('CenteredButtonBox', () => {
  it('renders correctly', () => {
    const { container } = render(<CenteredButtonBox>Button</CenteredButtonBox>);
    expect(container.firstChild).toMatchSnapshot();
  });
});
