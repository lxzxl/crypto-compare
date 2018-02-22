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
  let cacheResult;
  return async names => {
    if (!cacheResult) {
      const { data: { BaseImageUrl, Data } } = await axios.get('https://min-api.cryptocompare.com/data/all/coinlist');
      cacheResult = Object.keys(Data)
        .filter(coin => Names.includes(coin))
        .map(coin => Data[coin]);
    }
    return {
      BaseImageUrl,
      Data
    };
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
    coinList: Object.keys(displayData).map(k => displayData[k])
  };
}
