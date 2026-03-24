export type Page = "home" | "open-source" | "onchain" | "benchmarks" | "about";

export interface AIModel {
  id: string;
  name: string;
  company: string;
  desc: string;
  url: string;
  color: string;
  initials: string;
  logo: string;
}

export type OSCategory = "text" | "image" | "video" | "voice" | "small";

export interface OSModel {
  id: string;
  name: string;
  developer: string;
  desc: string;
  specs: string;
  hfUrl: string;
  githubUrl?: string;
  color: string;
  initials: string;
}

export type FetchSource =
  | "lmarena"
  | "artificialanalysis"
  | "openllm"
  | "cached";
