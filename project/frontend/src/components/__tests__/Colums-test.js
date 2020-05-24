import { render } from 'test-utils';
import Columns from '../columns/Columns';

describe('Columns', () => {
  it('renders correctly', () => {
    const { container } = render(<Columns>Columns entry</Columns>);
    expect(container.firstChild).toMatchSnapshot();
  });
});
