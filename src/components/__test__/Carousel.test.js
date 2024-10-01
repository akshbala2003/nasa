import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Carousel from '../Carousel'; 


beforeEach(() => {
  jest.spyOn(global, 'fetch').mockResolvedValue({
    json: jest.fn().mockResolvedValue([
      { src: 'image1.jpg', alt: 'Image' },
      { src: 'image2.jpg', alt: 'Image' },
    ]),
  });
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe('Carousel Component', () => {
  test('fetches and displays images in the carousel', async () => {
    render(<Carousel />);

 
    expect(fetch).toHaveBeenCalledWith('/earth.json');

   
    await waitFor(() => {
        const images = screen.getAllByAltText('Image');
        expect(images.length).toBeGreaterThan(0); 
      });
  });

  test('displays the correct text in the data section', async () => {
    render(<Carousel />);

   
    await waitFor(() => {
      expect(screen.getByText('Earth to Sun')).toBeInTheDocument();
      expect(screen.getByText('Earth to Moon')).toBeInTheDocument();
      expect(screen.getByText('EPIC to Sun')).toBeInTheDocument();
    });
  });

  test('displays notable events list', async () => {
    render(<Carousel />);

    
    await waitFor(() => {
      expect(screen.getByText('Saharan Dust Storm 2020')).toBeInTheDocument();
      expect(screen.getByText('Total Solar Eclipse 2017')).toBeInTheDocument();
    });
  });
});
