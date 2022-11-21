export enum ThemeName {
  SAM_WATCH = "samwatch",
  SAM_THEME = "samtheme",
  SAM_STUDIO = "samstudio",
  SAM_ABOUT = "samabout",
}

export type Pagination = {
  column: string;
  limit: number;
  offset: number;
  order: string;
  page: number;
  query: string;
  sort: string;
  total: number;
  total_page: number;
};
