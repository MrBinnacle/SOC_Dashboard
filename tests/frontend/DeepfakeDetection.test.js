import { render, screen } from '@testing-library/react';
import DeepfakeDetection from '../../frontend/src/components/DeepfakeDetection';

test('renders Deepfake Detection module heading', () => {
  render(<DeepfakeDetection />);
  const headingElement = screen.getByText(/Deepfake Detection Module/i);
  expect(headingElement).toBeInTheDocument();
});
