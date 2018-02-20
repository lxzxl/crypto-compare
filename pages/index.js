import axios from 'axios';
import { array } from 'prop-types';
import Layout from '../components/layout';
import CoinList from '../components/coinList';

const Index = ({ coinList }) => (
  <Layout title="Home">
    <CoinList list={coinList} />
  </Layout>
);

Index.propTypes = {
  coinList: array
};

Index.getInitialProps = async ({ req }) => {
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
};

export default Index;
