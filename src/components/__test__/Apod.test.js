import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Apod from '../Apod'; 
import { act } from 'react'; 

const renderWithClient = (ui) => {
  const queryClient = new QueryClient();
  return render(
    <QueryClientProvider client={queryClient}>
      {ui}
    </QueryClientProvider>
  );
};

describe('Apod component', () => {
  beforeEach(() => {
    fetch.resetMocks(); 
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers(); 
  });

  test('displays loading state', () => {
    fetch.mockResponseOnce(JSON.stringify({})); 

    renderWithClient(<Apod />);

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  test('displays fetched data', async () => {
    const mockApodData = {
      title: 'Astronomy Picture of the Day',
      url: 'https://example.com/image.jpg',
      explanation: 'This is an example explanation of APOD.',
      date: '2024-09-30',
    };

    fetch.mockResponseOnce(JSON.stringify(mockApodData)); // Mock successful response

    renderWithClient(<Apod />);

    await waitFor(() => {
      expect(screen.getByRole('heading', { level: 2, name: mockApodData.title })).toBeInTheDocument();
      expect(screen.getByAltText(mockApodData.title)).toBeInTheDocument();
      expect(screen.getByText(mockApodData.explanation)).toBeInTheDocument();
    });
  });

  /* test('displays error message', async () => {
    fetch.mockReject(new Error('Failed to fetch')); // Mock a rejected fetch request

    renderWithClient(<Apod />);

    await waitFor(() => {
      // Check for error message with a more flexible matcher
      expect(screen.getByText(/Error:/i)).toBeInTheDocument();
    });
  }); */

 

   
  });
   


