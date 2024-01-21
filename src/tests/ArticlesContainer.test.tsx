// Import necessary dependencies and mock services or hooks as needed

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import articlesJSON from "./articles.json";
import { fetchPaginatedArticles } from "../services";
import ArticlesContainer from "../components/Article/ArticlesContainer";

// Mock the fetchPaginatedArticles function
jest.mock("../services", () => ({
  fetchPaginatedArticles: jest.fn(),
}));

// Mock useScreenSize hook
jest.mock("../hooks/useScreenSize", () => ({
  __esModule: true,
  default: () => ({ width: 1024 }), // Adjust the width as needed for testing responsiveness
}));

describe("ArticlesContainer", () => {
  it("renders without errors", async () => {
    render(<ArticlesContainer />);
    expect(screen.getByText("More Articles")).toBeInTheDocument();
  });

  it("fetches articles on mount", async () => {
    render(<ArticlesContainer />);
    await waitFor(() => {
      expect(fetchPaginatedArticles).toHaveBeenCalledWith(6, 1); // Assuming the default articleLimit is 6
    });
  });

  it("loads more articles on button click", async () => {
    // Mock successful response for the first page
    // @ts-ignore
    fetchPaginatedArticles.mockResolvedValueOnce(articlesJSON.slice(0, 3));

    render(<ArticlesContainer />);
    fireEvent.click(screen.getByText("More Articles"));

    await waitFor(() => {
      expect(fetchPaginatedArticles).toHaveBeenCalledWith(6, 2);
    });
  });

  it.todo("filters articles by tag on tag click", async () => {
    render(<ArticlesContainer />);
    fireEvent.click(screen.getByTestId("tag-filter"));

    // await waitFor(() => {});
  });
});
