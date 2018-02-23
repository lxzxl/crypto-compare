import { array, object } from 'prop-types';

const List = ({ names, list }) => {
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
          <tr key={USD.FROMSYMBOL}>
            <th>{names[__key].Name}</th>
            <th>{USD.FROMSYMBOL}</th>
            <th>{USD.PRICE}</th>
            <th>{USD.MKTCAP}</th>
            <th>{USD.CHANGE24HOUR}</th>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

List.propTypes = {
  names: object,
  list: array
};

export default List;
