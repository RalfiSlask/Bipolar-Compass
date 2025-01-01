export interface IMovieOrSeriesResponse {
  page: number;
  next?: string;
  entries: number;
  results: IMovieOrSeriesResponseData[];
}

export interface IMovieOrSeriesResponseData {
  _id: string;
  id: string;
  ratingsSummary?: IRatingsSummary | null;
  episodes?: null;
  primaryImage?: IImage | null;
  titleType: ITitleType;
  genres?: IGenreList | null;
  titleText?: ITitleText | null;
  originalTitleText?: ITitleText | null;
  releaseYear?: IReleaseYear | null;
  releaseDate?: IReleaseDate | null;
  runtime?: IRuntime | null;
  series?: null;
  meterRanking?: IMeterRanking | null;
  plot?: IPlot | null;
}

export interface IMeterRanking {
  currentRank: number;
  rankChange: {
    changeDirection: string;
    difference: number;
    __typename: string;
  };
  __typename: string;
}

export interface IRatingsSummary {
  aggregateRating?: number | null;
  voteCount: number;
  __typename: string;
}

export interface IImage {
  id: string;
  width: number;
  height: number;
  url: string;
  caption?: IPlotText | null;
  __typename: string;
}

export interface IGenreList {
  genres: IGenre[] | null;
  __typename: string;
  id?: string;
  meterRanking?: null;
}

export interface IGenre {
  text: string;
  id: string;
  __typename: string;
}

export interface ITitleType {
  text: string;
  id: string;
  isSeries: boolean;
  isEpisode: boolean;
  __typename: string;
}

export interface ITitleText {
  text: string;
  __typename: string;
}

export interface IReleaseYear {
  year: number;
  endYear?: number | null;
  __typename: string;
}

export interface IReleaseDate {
  day: number | null;
  month: number | null;
  year: number | null;
  __typename: string;
}

export interface IRuntime {
  seconds: number | null;
  __typename: string;
}

export interface IPlot {
  plotText?: IPlotText | null;
  language?: ILanguage | null;
  __typename: string;
}

export interface IPlotText {
  plainText: string;
  __typename: string;
}

export interface ILanguage {
  id: string;
  __typename: string;
}
