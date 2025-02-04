import { render, screen } from '@testing-library/react';
import ThreatPrioritization from '../../frontend/src/components/ThreatPrioritization';

test('renders Threat Prioritization heatmap heading', () => {
  render(<ThreatPrioritization />);
  const headingElement = screen.getByText(/Threat Prioritization Heatmap/i);
  expect(headingElement).toBeInTheDocument();
});
