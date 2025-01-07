export interface IScienceArticle {
  id: string;
  title: string;
  authors: string[];
  pubDate: string;
  abstract?: string;
  journal?: string;
  volume?: string;
  issue?: string;
  pages?: string;
  doi?: string;
  pmid?: string;
  publicationType?: string;
}

interface IAuthor {
  name: string;
  authtype: string;
  clusterid: string;
}

interface IArticleId {
  idtype: string;
  idtypen: number;
  value: string;
}

interface IHistoryEntry {
  pubstatus: string;
  date: string;
}

export interface IPubMedArticle {
  uid: string;
  pubdate: string;
  epubdate: string;
  source: string;
  authors: IAuthor[];
  lastauthor: string;
  title: string;
  sorttitle: string;
  volume: string;
  issue: string;
  pages: string;
  lang: string[];
  nlmuniqueid: string;
  issn: string;
  essn: string;
  pubtype: string[];
  recordstatus: string;
  pubstatus: string;
  articleids: IArticleId[];
  history: IHistoryEntry[];
  attributes: string[];
  pmcrefcount: number;
  fulljournalname: string;
  elocationid: string;
  doctype: string;
  booktitle: string;
  medium: string;
  edition: string;
  publisherlocation: string;
  publishername: string;
  srcdate: string;
  reportnumber: string;
  availablefromurl: string;
  locationlabel: string;
  docdate: string;
  bookname: string;
  chapter: string;
  sortpubdate: string;
  sortfirstauthor: string;
  vernaculartitle: string;
}
