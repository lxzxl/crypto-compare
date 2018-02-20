import { array } from 'prop-types';

const List = ({ list }) => {
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
        {list.map(({USD}) => (
          <tr key={USD.FROMSYMBOL}>
            <th>{USD.FROMSYMBOL}</th>
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
  list: array
};

export default List;
