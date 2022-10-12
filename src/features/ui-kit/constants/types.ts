import { color, gap } from '.';

type ColorKeys = keyof typeof color;
export type ConstColor = typeof color[ColorKeys];

type GapKeys = keyof typeof gap;
export type ConstGap = typeof gap[GapKeys];
