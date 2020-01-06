import React from 'react';
import { DefaultLayout } from '@layouts';

// Called at build time and renders the page to static HTML.
export async function getStaticProps() {
  const res = await fetch('https://api.github.com/repos/zeit/next.js');
  const json = await res.json();

  return {
    props: {
      stars: json.stargazers_count,
    },
  };
}

const AutomaticStaticOptimizationPage = ({ stars }) => {
  return (
    <DefaultLayout>
      <h3 css={{ color: 'red' }}>Automatic Static Optimization</h3>
      <p>This page should be generated as html static page</p>
      <div>
        Caveats: <br />
        <ul>
          <li>This page does not have `getInitialProps`</li>
          <li>And `_app` file does not have `getInitialProps`</li>
        </ul>
      </div>
      <div>
        OK. How about if I want to fetch data but still would like to preserve the static generation
        behavior?? <br />
        Answer: use `getStaticProps` method. Learn more here:{' '}
        <a href="https://github.com/zeit/next.js/blob/canary/docs/concepts/_data-fetching.md#static-generation">
          https://github.com/zeit/next.js/blob/canary/docs/concepts/_data-fetching.md#static-generation
        </a>
      </div>
      <div>
        <h4>`getStaticProps` demo</h4>
        <code
          style={{ border: '1px solid #ccc', padding: '1rem', margin: '1rem 0', display: 'block' }}
        >
          //TODO: comeback here to check new `getStaticProps` NextJs API
          {stars}
        </code>
      </div>
      <p>
        Learn more here:{' '}
        <a href="https://nextjs.org/docs/advanced-features/automatic-static-optimization">
          https://nextjs.org/docs/advanced-features/automatic-static-optimization
        </a>
      </p>
      <p>
        Useful link:{' '}
        <a href="https://www.gitmemory.com/issue/zeit/next.js/9524/558628066">
          https://www.gitmemory.com/issue/zeit/next.js/9524/558628066
        </a>
      </p>
    </DefaultLayout>
  );
};

export default AutomaticStaticOptimizationPage;
