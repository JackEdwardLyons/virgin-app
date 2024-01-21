export interface IArticle {
  articleTitle: string;
  articleDescription: string;
  articleImage: string;
  articleLink: IArticleLink;
  articleTag: IArticleTag;
}

export interface IScreenSize {
  width: number;
  height: number;
}

interface IArticleTag {
  label: string;
  tag: string;
}

interface IArticleLink {
  url: string;
  openInNewTab: boolean;
}
