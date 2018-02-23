import { Component } from 'react';
import { string, array, object } from 'prop-types';
import { fetchCoinNames, fetchCoinList } from '../services/cryptocompare';
import Layout from '../components/layout';
import CoinList from '../components/coinList';

class Index extends Component {
  static async getInitialProps({ req }) {
    const [{ baseImageUrl, data: coinNames }, coinList] = await Promise.all([fetchCoinNames(), fetchCoinList()]);
    return { baseImageUrl, coinNames, ...coinList };
  }
  constructor(props) {
    super(props);
    this.state = { baseImageUrl: props.baseImageUrl, coinNames: props.coinNames, coinList: props.coinList };
  }
  componentDidMount() {
    this.timerID = setInterval(async () => {
      const newData = await fetchCoinList();
      this.setState(newData);
    }, 10000);
  }
  componentWillUnmount() {
    clearInterval(this.timerID);
  }
  render() {
    const { baseImageUrl, coinNames, coinList } = this.state;
    return (
      <Layout title="Home">
        {coinList && <CoinList baseImageUrl={baseImageUrl} names={coinNames} list={coinList} />}
      </Layout>
    );
  }
}

Index.propTypes = {
  baseImageUrl: string,
  coinNames: object,
  coinList: array
};

export default Index;
