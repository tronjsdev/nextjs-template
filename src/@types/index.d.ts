import { NextPage } from 'next';

declare module 'next' {
  import { ReactNode } from 'react';

  type AppPage<P = {}, IP = P> = NextPage<P, IP> & {
    Layout?: ReactNode;
  };
}

declare module 'react' {
  /*interface FunctionComponent {
    title?: string;
  }*/
}
/*declare module 'express' {
  interface Request {
    body?: any;
    session?: any;
    user?: any;
  }
}*/

declare global {}
