import { IArticle } from "../interfaces";

// Note: I am using https://mockapi.io/ to mock API requests

/**
 * Fetches a paginated list of articles from the specified API endpoint.
 *
 * @param {number} limit          The number of articles to fetch per page.
 * @param {number} page           The page number to retrieve.
 * @returns {Promise<IArticle[]>} A Promise that resolves to an array of articles if successful,
 *                                or throws an error if the request fails.
 *
 * The function performs a GET request to the specified API endpoint using the Fetch API.
 *
 * If the request is successful (status 200), it parses the JSON response and returns
 * the array of articles.
 *
 * If there's an error (status is not 200), an empty array will be returned and an
 * error will be logged to the console. Given more time, I would introduce an error
 * component to be rendered.
 */
export function fetchPaginatedArticles(
  limit: number,
  page: number
): Promise<IArticle[]> {
  const url = new URL(process.env.REACT_APP_ARTICLES_URL as string);

  url.searchParams.append("page", String(page));
  url.searchParams.append("limit", String(limit));

  return fetch(url, {
    method: "GET",
    headers: { "content-type": "application/json" },
  })
    .then((res) => {
      if (res.ok) return res.json();
    })
    .catch((error) => {
      throw new Error("Error fetching articles", error);
    });
}
