/*
declare namespace NodeJS {
  interface Process {
    readonly browser: boolean
  }
  
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production' | 'test'
  }
} */

declare namespace JSX {
  interface IntrinsicAttributes {
    css?: InterpolationWithTheme<any>; // <- here
    borderRadius?: number | string;
  }
}

declare namespace Express {
  interface Request {
    body?: any;
    session?: any;
    user?: any;
  }
}
