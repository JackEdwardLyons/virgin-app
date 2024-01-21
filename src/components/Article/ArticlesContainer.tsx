import React, { useEffect, useState } from "react";
import Article from "./Article";
import ArticleTagFilters from "../TagFilterBar/TagFilterBar";
import LoadingSpinner from "../Loading/LoadingSpinner";
import { IArticle } from "../../interfaces";
import { fetchPaginatedArticles } from "../../services";
import useScreenSize from "../../hooks/useScreenSize";
import styles from "./articles-container.module.css";
import { LOAD_MORE_ARTICLE_LIMIT } from "../../constants";

const ArticlesContainer: React.FC = () => {
  const [articles, setArticles] = useState<IArticle[]>([]);
  const [page, setPage] = useState(1);
  const [selectedTag, setSelectedTag] = useState<string>("");
  const [hasMoreArticles, setHasMoreArticles] = useState(true);
  const { width } = useScreenSize();
  const [articleLimit] = useState(width < 768 ? 3 : 6);
  const [apiStatus, setApiStatus] = useState<"IDLE" | "FETCHING" | "ERROR">(
    "FETCHING"
  );

  // Computed array of "filtered" articles.
  // When a user clicks a filter tag, this function returns
  // the articles which match the selected filter tag
  const filteredArticles = articles.filter(
    (article) => !selectedTag || article.articleTag.tag === selectedTag
  );

  function handleTagClick(tag: string) {
    setSelectedTag(tag);
  }

  async function handleLoadMore() {
    try {
      setApiStatus("FETCHING");
      const nextPage = page + 1;

      const newData = await fetchPaginatedArticles(
        LOAD_MORE_ARTICLE_LIMIT,
        nextPage
      );

      // If we have articles loaded then we append the new articles
      // to the existing array of articles
      if (newData.length) {
        setArticles([...articles, ...newData]);
        setPage(nextPage);
      }

      // Hide the "show more" button once we have reached the
      // end of the paginated articles results.
      if (newData.length < LOAD_MORE_ARTICLE_LIMIT) {
        setHasMoreArticles(false);
      }

      setApiStatus("IDLE");
    } catch (error) {
      console.error("Error fetching more articles:", error);
      setApiStatus("ERROR");
    }
  }

  useEffect(() => {
    async function fetchArticles() {
      try {
        setApiStatus("FETCHING");
        const data = await fetchPaginatedArticles(articleLimit, page);

        // Set articles on initial page load.
        if (page <= 1 && data) {
          setArticles(data);
        }

        setApiStatus("IDLE");
      } catch (error) {
        console.error("Error fetching articles:", error);
        setApiStatus("ERROR");
      }
    }

    fetchArticles();
  }, [page, articleLimit]);

  return (
    <main className="container py-10">
      <div className="pb-4 text-primary">
        <h3>The latest</h3>
        <ArticleTagFilters
          selectedTag={selectedTag}
          handleTagClick={handleTagClick}
          articles={articles}
        />
      </div>

      {filteredArticles.length > 0 && (
        <div className="d-grid grid-cols-3-rows-2 w-100">
          {filteredArticles.map((article) => (
            <Article key={article.articleTitle} article={article} />
          ))}
        </div>
      )}

      {apiStatus === "IDLE" && !filteredArticles.length && (
        <div>
          <h4>There are no articles to display</h4>
        </div>
      )}

      {apiStatus === "ERROR" && (
        <div>
          <h4>There was an error fetching articles. Please try again later.</h4>
        </div>
      )}

      <div className={styles["more-articles-container"]}>
        {apiStatus === "FETCHING" && <LoadingSpinner />}

        {apiStatus === "IDLE" && hasMoreArticles && (
          <button
            type="button"
            onClick={handleLoadMore}
            className={styles["more-articles-btn"]}
          >
            More Articles
          </button>
        )}
      </div>
    </main>
  );
};

export default ArticlesContainer;
