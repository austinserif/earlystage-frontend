import { render, screen } from '@testing-library/react';
import App from '../pages/index';

describe('App', () => {
  it('renders without crashing', () => {
    render(<App />);
    const input = screen.getByLabelText('Due Dilligence');
    expect(input).toBeInTheDocument();
  });
});
