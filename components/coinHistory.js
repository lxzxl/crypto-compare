import { array } from 'prop-types';
const History = ({ data }) => {
  return (
    <ul>
      {data.map(row => {
        return (
          <li key={row.time}>
            {row.close} - {row.time}
          </li>
        );
      })}
    </ul>
  );
};

History.propTypes = {
  data: array.isRequired
};

export default History;
