import React from 'react';

export interface FlexCarouselItem {
  src: string;
  alt?: string;
  title?: string;
  subtitle?: string;
  [key: string]: unknown;
}

export interface FlexCarouselEngine {
  wake: () => void;
  setItems: (items: FlexCarouselItem[]) => void;
  goTo: (index: number) => void;
  next: () => void;
  prev: () => void;
}

export interface FlexCarouselProps {
  items?: FlexCarouselItem[];
  preset?: 'liquid' | 'ribbon' | 'vortex' | 'arch';
  intro?: 'rise' | 'bloom' | 'spin' | 'deal' | 'fade';
  cardHeight?: number;
  gap?: number;
  squeeze?: number;
  focusOnClick?: boolean;
  captions?: boolean;
  fit?: 'natural' | 'contain' | 'cover';
  radius?: number;
  lensWidth?: number;
  lensHeight?: number;
  tilt?: number;
  roundness?: number;
  bend?: number;
  reach?: number;
  curl?: 'twist' | 'rise' | 'none';
  dispersion?: number;
  liquid?: number;
  followCursor?: boolean;
  autoplay?: boolean;
  interval?: number;
  captureWheel?: boolean;
  onChange?: (index: number, item?: FlexCarouselItem) => void;
  onSelect?: (index: number, item?: FlexCarouselItem) => void;
  className?: string;
  style?: React.CSSProperties;
}

declare const FlexCarousel: React.ForwardRefExoticComponent<
  FlexCarouselProps & React.RefAttributes<FlexCarouselEngine>
>;
export default FlexCarousel;
