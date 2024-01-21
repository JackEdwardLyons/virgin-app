import React from "react";
import { IArticle } from "../../interfaces";
import styles from "./article.module.css";

const Article: React.FC<{ article: IArticle }> = ({ article }) => {
  return (
    <article className={styles["article"]}>
      {/* The img src from mock data was broken, so just adding a substitue img for now */}
      <img
        className={styles["article__img"]}
        src="https://i.pointhacks.com/2023/03/08121231/virgin-atlantic-skyteam-tails-1600.jpg"
        alt={article.articleTitle}
      />

      <section className={styles["article__content"]}>
        <div className="flex-grow-1">
          <p className={styles["article__tag"]}>{article.articleTag.label}</p>
          <h2 className={styles["article__title"]}>{article.articleTitle}</h2>
          <p className={styles["article__description"]}>
            {article.articleDescription}
          </p>
        </div>

        <footer className={styles["article__footer"]}>
          <a
            className={styles["article__link"]}
            href={article.articleLink.url}
            target={article.articleLink.openInNewTab ? "_blank" : "_self"}
            rel="noreferrer"
          >
            &rarr;
            <span className="sr-only">
              Link to article titled "{article.articleTitle}"
            </span>
          </a>
        </footer>
      </section>
    </article>
  );
};

export default Article;
