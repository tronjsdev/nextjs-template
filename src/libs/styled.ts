import styledEmotion, { CreateStyled } from '@emotion/styled'

export interface Theme {
  colors: {
    text: string;
    background: string;
    primary: string;
    secondary: string;
    muted: string;
    highlight: string;
    transparent: string;
    black: string;
    white: string;
    gray: object;
    red: object;
    orange: object;
    yellow: object;
    green: object;
    teal: object;
    blue: object;
    indigo: object;
    purple: object;
    pink: object;
  };
  fonts: {
    body: string;
    heading: string;
    monospace: string;
  };
  shadows: {
    card: string;
  };
}


export const styled = styledEmotion as CreateStyled<Theme>;

