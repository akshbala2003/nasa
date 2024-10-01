import { render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import Details from "../Details"; 
import { useQuery } from "@tanstack/react-query"; 


jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: jest.fn(),
}));


jest.mock("@tanstack/react-query", () => ({
  ...jest.requireActual("@tanstack/react-query"),
  useQuery: jest.fn(), 
}));

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false, 
      },
    },
  });

const renderDetails = () =>
  render(
    <QueryClientProvider client={createTestQueryClient()}>
      <Details />
    </QueryClientProvider>
  );

describe("Details Component", () => {
  const mockLocation = {
    state: {
      item: {
        href: "mock-image-href",
        data: [
          {
            title: "Mock Image Title",
            description: "Mock Image Description",
            date_created: "2023-09-30",
          },
        ],
      },
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    useLocation.mockReturnValue(mockLocation);
  });

  test("displays loading message while fetching image", () => {
    
    useQuery.mockReturnValue({
      data: null,
      error: null,
      isLoading: true,
    });

    renderDetails();

    expect(screen.getByText(/Loading image.../i)).toBeInTheDocument();
  });

  test("displays fetched image and details", async () => {
    
    useQuery.mockReturnValue({
      data: "mock-image-url/orig.jpg",
      error: null,
      isLoading: false,
    });

    renderDetails();

   
    await waitFor(() => {
      expect(screen.getByText(/Mock Image Title/i)).toBeInTheDocument();
      expect(screen.getByText(/Mock Image Description/i)).toBeInTheDocument();
      expect(screen.getByText(/Date Created: 2023-09-30/i)).toBeInTheDocument();
      expect(screen.getByAltText(/Mock Image Title/i)).toHaveAttribute("src", "mock-image-url/orig.jpg");
    });
  });

  test("displays error message when fetch fails", async () => {
    
    useQuery.mockReturnValue({
      data: null,
      error: new Error("Failed to fetch image details"),
      isLoading: false,
    });

    renderDetails();

   
    await waitFor(() => {
      expect(screen.getByText(/Failed to fetch image details/i)).toBeInTheDocument();
    });
  });
});
