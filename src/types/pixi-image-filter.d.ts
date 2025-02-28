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

  export class PixiFilter {
    constructor(options?: FilterOptions);
    loadImage(imageSource: string): Promise<void>;
    applyFilter(filterType: FilterType): string;
    applyFilters(filterTypes: FilterType[]): Array<{ type: FilterType; result: string }>;
    destroy(): void;
  }
}