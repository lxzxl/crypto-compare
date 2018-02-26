import { string, object } from 'prop-types';
import Link from 'next/link';

const Row = ({ symbol, info, price, baseImageUrl }) => {
  return (
    <tr>
      <th>
        <p className="is-flex">
          <img className="icon" src={`${baseImageUrl}/${info.ImageUrl}`} />
          <span>{info.CoinName}</span>
        </p>
      </th>
      <th>{info.Name}</th>
      <th>
        <Link href={{ pathname: '/history', query: { symbol } }}>
          <a>{price.PRICE}</a>
        </Link>
      </th>
      <th>{price.MKTCAP}</th>
      <th>{price.CHANGE24HOUR}</th>
    </tr>
  );
};

Row.propTypes = {
  symbol: string,
  info: object,
  price: object,
  baseImageUrl: string
};

export default Row;
