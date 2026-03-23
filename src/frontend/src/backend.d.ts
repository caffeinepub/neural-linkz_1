import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface ModelInput {
    id: string;
    url: string;
    name: string;
    description: string;
    logoUrl: string;
    category: Category;
}
export interface Model {
    id: string;
    url: string;
    name: string;
    description: string;
    logoUrl: string;
    category: Category;
}
export enum Category {
    featured = "featured",
    mainstream = "mainstream",
    onchain = "onchain",
    open_source = "open_source"
}
export interface backendInterface {
    addModel(model: ModelInput): Promise<void>;
    getAllModels(): Promise<Array<Model>>;
    getModelsByCategory(category: Category): Promise<Array<Model>>;
}
