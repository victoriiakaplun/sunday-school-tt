import { render, fireEvent, screen } from 'test-utils';
import Field from '../form/Field';

describe('Field', () => {
  it('renders correctly', () => {
    const { container } = render(<Field>entry</Field>);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('handles onChange event', async () => {
    const onChangeMock = jest.fn();
    const testChange = 'test';
    render(<Field onChange={onChangeMock} />);
    const input = await screen.getByTestId('field_input');
    fireEvent.change(input, { target: { value: testChange } });

    expect(onChangeMock).toBeCalledTimes(1);
  });
});
