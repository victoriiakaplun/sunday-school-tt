import { render } from 'test-utils';
import Field from '../form/Field';

describe('Field', () => {
  it('renders correctly', () => {
    const { container } = render(<Field>entry</Field>);
    expect(container.firstChild).toMatchSnapshot(`
      <div 
      class="field">
      entry
      </div>
    `);
  });
});
