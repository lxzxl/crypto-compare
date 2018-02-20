import '../styles.scss';
import Head from './head';
const Fragment = React.Fragment;

const Layout = props => (
  <Fragment>
    <Head {...props} />
    <section className="section">
      <div className="container">{props.children}</div>
    </section>
  </Fragment>
);

export default Layout;
