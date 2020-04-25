import { render } from 'test-utils';
import Columns from '../Columns';

describe('Columns', () => {
  it('renders correctly', () => {
    const { container } = render(<Columns>Columns entry</Columns>);
    expect(container.firstChild).toMatchSnapshot(`
      <div 
      class="columns is-centered">
      Column entry
      </div>
    `);
  });
});
