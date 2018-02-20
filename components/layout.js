import '../styles.scss';
import Head from './head';
import Nav from './nav';
const Fragment = React.Fragment;

const Layout = props => (
  <Fragment>
    <Head {...props} />
    <Nav />
    <section className="section">
      <div className="container">{props.children}</div>
    </section>
  </Fragment>
);

export default Layout;
