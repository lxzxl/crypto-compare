import Document, { Head, Main, NextScript } from 'next/document';
import GithubCorner from 'react-github-corner';

export default class MyDocument extends Document {
  render() {
    return (
      <html>
        <Head>
          <link rel="stylesheet" href="/_next/static/style.css" />
        </Head>
        <body>
          <Main />
          <GithubCorner size={84} href="https://github.com/lxzxl/crypto-compare" />
          <NextScript />
        </body>
      </html>
    );
  }
}
