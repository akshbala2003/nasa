import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";


const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false, 
      },
    },
  });

test("renders navigation links", () => {
  const queryClient = createTestQueryClient();

  render(
    <QueryClientProvider client={queryClient}>
     
        <App />
    
    </QueryClientProvider>
  );

  
  expect(screen.getByText(/Home/i)).toBeInTheDocument();
  expect(screen.getByText(/NASA Image Search/i)).toBeInTheDocument();
  expect(screen.getByText(/Astronomy Picture of the Day/i)).toBeInTheDocument();
  expect(screen.getByText(/Neo Feed/i)).toBeInTheDocument();
  expect(screen.getByText(/EPIC/i)).toBeInTheDocument();
});

test("renders footer information", () => {
  const queryClient = createTestQueryClient();

  render(
    <QueryClientProvider client={queryClient}>
     
        <App />
     
    </QueryClientProvider>
  );

 
  expect(screen.getByText(/© 2024 Space Explorer/i)).toBeInTheDocument();
  expect(screen.getByText(/Contact us at/i)).toBeInTheDocument();
});
