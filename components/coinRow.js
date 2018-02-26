import { string, object } from 'prop-types';
import Link from 'next/link';

const Row = ({symbol, info, price, baseImageUrl}) => {
  return (
    <Link key={symbol} href={{ pathname: '/history', query: { symbol } }}>
      <tr>
        <th>
          <p className="is-flex">
            <img className="icon" src={`${baseImageUrl}/${info.ImageUrl}`} />
            <span>{info.CoinName}</span>
          </p>
        </th>
        <th>{info.Name}</th>
        <th>{price.PRICE}</th>
        <th>{price.MKTCAP}</th>
        <th>{price.CHANGE24HOUR}</th>
      </tr>
    </Link>
  );
};

Row.propTypes = {
  symbol: string,
  info: object,
  price: object,
  baseImageUrl: string
};

export default Row;
