import '../static/styles.scss';
import Head from './head';
const Fragment = React.Fragment;

const Layout = props => (
  <Fragment>
    <Head {...props} />
    <section className="hero is-primary is-small">
      <div className="hero-body">
        <div className="container">
          <h1 className="title">Crypto Compare</h1>
        </div>
      </div>
    </section>
    <section className="section content">
      <div className="container">{props.children}</div>
      <style jsx>{`
        .content {
          padding: 3rem 5%;
        }
      `}</style>
    </section>
  </Fragment>
);

export default Layout;
