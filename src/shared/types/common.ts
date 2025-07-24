// Common type definitions used across the application

export interface ImageData {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  blurDataURL?: string;
}

export interface BaseEntity {
  id: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type Result<T, E = Error> =
  | { success: true; data: T }
  | { success: false; error: E };
