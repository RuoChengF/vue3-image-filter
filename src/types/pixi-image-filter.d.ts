declare module 'pixi-image-filter' {
  export type FilterType = 
    | 'natural'
    | 'defogging'
    | 'sharpen'
    | 'grayscale'
    | 'invert'
    | 'vintage'
    | 'mosaic'
    | 'gaussian'
    | 'colorSplit';

  export interface FilterOptions {
    width?: number;
    height?: number;
  }

  export interface BatchFilterData {
    filterType: FilterType;
    label?: string;
    result: string;
  }

  export class PixiFilter {
    constructor(options?: FilterOptions);
    loadImage(imageSource: string): Promise<void>;
    applyFilter(filterData: FilterType | BatchFilterData): BatchFilterData;
    applyFilters(filterDataArray: BatchFilterData[]): BatchFilterData[];
    destroy(): void;
  }
}