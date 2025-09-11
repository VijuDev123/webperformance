import React from 'react';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import Footer from './Footer';
import { render } from '../utils/test/testUtils';

describe('Footer Component', () => {
  it('should render the footer with all links and logo', () => {
    render(<Footer />);

    expect(screen.getByTestId('footer-link-youtube')).toHaveAttribute('href', 'https://www.youtube.com');
    expect(screen.getByTestId('footer-link-linkedin')).toHaveAttribute('href', 'https://www.linkedin.com');
    expect(screen.getByTestId('footer-link-website')).toHaveAttribute('href', 'https://www.theseniordev.com');
    expect(screen.getByTestId('footer-link-devto')).toHaveAttribute('href', 'https://dev.to');
    expect(screen.getByTestId('footer-link-medium')).toHaveAttribute('href', 'https://www.medium.com');
    expect(screen.getByTestId('footer-logo')).toHaveAttribute('alt', 'theSeniorDev Logo');
  });

  it('should display the current year in the copyright', () => {
    render(<Footer />);
    const currentYear = new Date().getFullYear().toString();

    expect(screen.getByTestId('footer-copyright')).toHaveTextContent(`© ${currentYear} by theSeniorDev.com`);
  });
});
