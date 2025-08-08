import { oneDark, xonokai } from 'react-syntax-highlighter/dist/cjs/styles/prism';

export type ThemeKeys = 'oneDark' | 'xonokai';

export const themes: Record<ThemeKeys, { style: any; editorBg: string; headerBg: string; lineHeight: string }> = {
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
