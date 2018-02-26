import { number, string, array, object } from 'prop-types';
import Link from 'next/link';
import { fetchCoinNames, fetchCoinPrice, fetchCoinHistory } from '../services/cryptocompare';
import Layout from '../components/layout';
import CoinHistory from '../components/coinHistory';

const History = ({ baseImageUrl, symbol, info, price, history }) => {
  return (
    <Layout title="History">
      <div className="tile is-parent">
        <div className="tile is-child">
          <p className="title is-flex">
            <img className="icon is-medium" src={`${baseImageUrl}/${info.ImageUrl}`} />
            <span>{info.CoinName}</span>
          </p>
          <p className="subtitle price">$ {price}</p>
          <CoinHistory data={history} />
        </div>
      </div>
      <style jsx>{`
        .title.is-flex {
          align-items: center;
        }
      `}</style>
    </Layout>
  );
};

History.getInitialProps = async function(ctx) {
  const { symbol } = ctx.query;
  const [{ baseImageUrl, data: coinNames }, price, historyList] = await Promise.all([
    fetchCoinNames(),
    fetchCoinPrice(symbol),
    fetchCoinHistory(symbol)
  ]);
  const info = coinNames[symbol];
  return { baseImageUrl, symbol, info, price, history: historyList };
};

History.propTypes = {
  baseImageUrl: string,
  symbol: string,
  info: object,
  price: number,
  history: array.isRequired
};

export default History;
