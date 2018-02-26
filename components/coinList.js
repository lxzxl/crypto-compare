import { string, array, object, func } from 'prop-types';
import CoinRow from './coinRow';
import Row from './coinRow';

const List = ({ baseImageUrl, names, list, onClick }) => {
  return (
    <table className="table is-hoverable is-fullwidth">
      <thead>
        <tr>
          <td>Name</td>
          <td>Symbol</td>
          <td>Price (USD)</td>
          <td>Market Cap</td>
          <td>Chg (24H)</td>
        </tr>
      </thead>
      <tbody>
        {list.map(({ __key, USD }) => (
          <Row key={__key} symbol={__key} info={names[__key]} price={USD} baseImageUrl={baseImageUrl} />
        ))}
      </tbody>
    </table>
  );
};

List.propTypes = {
  baseImageUrl: string,
  names: object,
  list: array
};

export default List;
