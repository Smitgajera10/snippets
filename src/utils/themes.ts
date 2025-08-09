import { oneDark, xonokai } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import type { CSSProperties } from 'react';

type PrismTheme = Record<string, CSSProperties>;

export type ThemeKeys = 'oneDark' | 'xonokai';

export const themes: Record<ThemeKeys, { style: PrismTheme; editorBg: string; headerBg: string; lineHeight: string }> = {
  oneDark: {
    style: oneDark,
    editorBg: '#282c34',
    headerBg: '#21252b',
    lineHeight: '1.5em',
  },
  xonokai: {
    style: xonokai,
    editorBg: '#282c34',
    headerBg: '#040404',
    lineHeight: '1em',
  }
};
