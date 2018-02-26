import { array } from 'prop-types';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import { Line } from 'react-chartjs-2';

class History extends React.PureComponent {
  render() {
    const { data } = this.props;
    const options = {
      legend: { display: false }
    };
    const chartData = {
      labels: data.map(item => format(parse(item.time * 1000), 'MMM D H:m A')),
      datasets: [
        {
          fill: false,
          lineTension: 0.3,
          backgroundColor: '#209cee',
          borderColor: '#209cee',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: '#209cee',
          pointBackgroundColor: '#209cee',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: '#209cee',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: data.map(item => item.close)
        }
      ]
    };

    return <Line data={chartData} options={options} />;
  }
}

History.propTypes = {
  data: array.isRequired
};

export default History;
