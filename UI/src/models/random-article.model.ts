export interface RandomArticleModel{
  concept_name: string[];
  concept_id: number[];
  title: string;
  abstract: string;
  url: string;
  domain: string;
  doi?: any;
  send_article_id?: any;
}
