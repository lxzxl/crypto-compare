import '../static/styles.scss';
import Link from 'next/link';
import Head from './head';
const Fragment = React.Fragment;

const Layout = props => (
  <Fragment>
    <Head {...props} />
    <section className="hero is-primary is-small">
      <div className="hero-body">
        <div className="container">
          <h1 className="title">
            <Link href={'/'}><a>Crypto Compare</a></Link>
          </h1>
        </div>
      </div>
    </section>
    <section className="section">
      {props.children}
      <style jsx>{`
        section {
          padding: 1rem 5% 3rem;
        }
      `}</style>
    </section>
  </Fragment>
);

export default Layout;
