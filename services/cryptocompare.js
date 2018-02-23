import axios from 'axios';

const Names = [
  'BTC',
  'ETH',
  'XRP',
  'BCH',
  'LTC',
  'ADA',
  'NEO',
  'XLM',
  'EOS',
  'DASH',
  'IOT',
  'XMR',
  'XEM',
  'ETC',
  'TRX',
  'VEN',
  'LSK',
  'QTUM',
  'BTG',
  'USDT'
];
const NamesStr = Names.join(',');

export const fetchCoinNames = (function() {
  let cacheResult = {
    baseImageUrl: null,
    data: null
  };
  return async names => {
    if (!cacheResult.data) {
      const result = await axios.get('https://min-api.cryptocompare.com/data/all/coinlist');
      const { BaseImageUrl, Data } = result.data;
      cacheResult.baseImageUrl = BaseImageUrl;
      cacheResult.data = Object.keys(Data)
        .filter(coin => Names.includes(coin))
        .reduce((prev, coin) => ((prev[coin] = Data[coin]), prev), {});
    }
    return cacheResult;
  };
})();

export async function fetchCoinList() {
  const { data } = await axios.get('https://min-api.cryptocompare.com/data/pricemultifull', {
    params: {
      fsyms: NamesStr,
      tsyms: 'USD'
    }
  });
  const displayData = data.DISPLAY;
  return {
    coinList: Object.keys(displayData).map(k => ({ __key: k, ...displayData[k] }))
  };
}
