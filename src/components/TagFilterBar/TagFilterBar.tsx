import React from "react";
import styles from "./tag-filter-bar.module.css";
import { IArticle } from "../../interfaces";

interface ArticleTagFilterProps {
  articles: IArticle[];
  handleTagClick: (tagValue: string) => void;
  selectedTag: string;
}

const ArticleTagFilters: React.FC<ArticleTagFilterProps> = ({
  handleTagClick,
  articles,
  selectedTag,
}) => {
  // Filter tags by the currently present articles.
  // Of course, I could also include all article tag filters, and show a "no articles" message
  // But seeing as there was no clear requirement, I decided to do it this way.
  const tags = [...new Set(articles.map((article) => article.articleTag.tag))];

  // Because we are using a unique set for the tags, some extra work has to be done
  // to get the tag label from the articles. If I were to do this my way, I would
  // likely use lodash and their nifty uniq helper function.
  function getTagLabel(tag: string) {
    return articles.find((article) => article.articleTag.tag === tag)
      ?.articleTag?.label;
  }

  return (
    <ul className={styles["tags-list"]}>
      <li className={styles["tags-list__item"]}>
        <button
          data-testid="tag-filter"
          onClick={() => handleTagClick("")}
          type="button"
          className={`${styles["tag-btn"]} ${
            selectedTag === "" ? styles["selected"] : ""
          }`}
          aria-label="Show all articles"
        >
          All articles
        </button>
      </li>

      {tags.map((tag) => (
        <li key={tag} className={styles["tags-list__item"]}>
          <button
            data-testid="tag-filter"
            onClick={() => handleTagClick(tag)}
            type="button"
            className={`${styles["tag-btn"]} ${
              selectedTag === tag ? styles["selected"] : ""
            }`}
            aria-label={`Filter articles by tag "${getTagLabel(tag)}"`}
          >
            {getTagLabel(tag)}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ArticleTagFilters;
