import axios from 'axios';
import { Component } from 'react';
import { array } from 'prop-types';
import Layout from '../components/layout';
import CoinList from '../components/coinList';

class Index extends Component {
  static async fetchData() {
    const { data } = await axios.get('https://min-api.cryptocompare.com/data/pricemultifull', {
      params: {
        fsyms: 'BTC,ETH,XRP,BCH,LTC,ADA,NEO,XLM,EOS,DASH,IOT,XMR,XEM,ETC,TRX,VEN,LSK,QTUM,BTG,USDT',
        tsyms: 'USD'
      }
    });
    const displayData = data.DISPLAY;
    return {
      coinList: Object.keys(displayData).map(k => displayData[k])
    };
  }

  static async getInitialProps({ req }) {
    return this.fetchData();
  }
  constructor(props) {
    super(props);
    this.state = { coinList: props.coinList };
  }
  componentDidMount() {
    this.timerID = setInterval(async () => {
      const newData = await this.constructor.fetchData();
      this.setState(newData);
    }, 10000);
  }
  componentWillUnmount() {
    clearInterval(this.timerID);
  }
  render() {
    const { coinList } = this.state;
    return <Layout title="Home">{coinList && <CoinList list={coinList} />}</Layout>;
  }
}

Index.propTypes = {
  coinList: array
};

export default Index;
