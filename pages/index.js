import { Component } from 'react';
import { array, object } from 'prop-types';
import { fetchCoinNames, fetchCoinList } from '../services/cryptocompare';
import Layout from '../components/layout';
import CoinList from '../components/coinList';

class Index extends Component {
  static async getInitialProps({ req }) {
    return { coinNames: await fetchCoinNames(), ...(await fetchCoinList()) };
  }
  constructor(props) {
    super(props);
    this.state = { coinNames: props.coinNames, coinList: props.coinList };
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
    const { coinNames, coinList } = this.state;
    console.log(coinNames);
    return <Layout title="Home">{coinList && <CoinList names={coinNames} list={coinList} />}</Layout>;
  }
}

Index.propTypes = {
  coinNames: object,
  coinList: array
};

export default Index;
