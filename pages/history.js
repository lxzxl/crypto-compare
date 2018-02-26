import { number, string, array, object } from 'prop-types';
import Link from 'next/link';
import { fetchCoinNames, fetchCoinPrice, fetchCoinHistory } from '../services/cryptocompare';
import Layout from '../components/layout';
import Tab from '../components//tab';
import CoinHistory from '../components/coinHistory';

class History extends React.PureComponent {
  static async getInitialProps(ctx) {
    const { symbol } = ctx.query;
    const [{ baseImageUrl, data: coinNames }, price, historyList] = await Promise.all([
      fetchCoinNames(),
      fetchCoinPrice(symbol),
      fetchCoinHistory(symbol)
    ]);
    const info = coinNames[symbol];
    return { baseImageUrl, symbol, info, price, history: historyList };
  }
  constructor(props) {
    super(props);
    this.state = {
      price: props.price,
      history: props.history
    };
  }

  componentDidMount() {
    const { symbol } = this.props;
    this.timerID = setInterval(async () => {
      const price = await fetchCoinPrice(symbol);
      this.setState({price});
    }, 10000);
  }
  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  render() {
    const { baseImageUrl, symbol, info } = this.props;
    const { price, history } = this.state;
    const tabs = ['24 Hours', '1 Week', '1 Month', '1 Year'];
    return (
      <Layout title={`History of ${symbol}`}>
        <div className="tile is-parent">
          <div className="tile is-child">
            <p className="title is-flex">
              <img className="icon is-medium" src={`${baseImageUrl}/${info.ImageUrl}`} />
              <span>{info.CoinName}</span>
              <span className="tag is-success">$ {price}</span>
            </p>
            <Tab tabs={tabs} onChange={tab => this.onTabChange(tab)} />
            <CoinHistory data={history} />
          </div>
        </div>
        <style jsx>{`
          .title.is-flex {
            align-items: center;
          }
          .title.is-flex span {
            margin-left: 1rem;
          }
        `}</style>
      </Layout>
    );

    componentDidMount;
  }

  onTabChange = async tab => {
    const { symbol } = this.props;
    const history = await fetchCoinHistory(symbol, tab);
    this.setState({ history });
  };
}

History.propTypes = {
  baseImageUrl: string,
  symbol: string,
  info: object,
  price: number,
  history: array.isRequired
};

export default History;
