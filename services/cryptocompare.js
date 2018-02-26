import axios from 'axios';

const FromSymbols = [
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
const ToSymbolStr = 'USD';
const FromSymbolsStr = FromSymbols.join(',');

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
        .filter(coin => FromSymbols.includes(coin))
        .reduce((prev, coin) => ((prev[coin] = Data[coin]), prev), {});
    }
    return cacheResult;
  };
})();

export async function fetchCoinList() {
  const { data } = await axios.get('https://min-api.cryptocompare.com/data/pricemultifull', {
    params: {
      fsyms: FromSymbolsStr,
      tsyms: ToSymbolStr
    }
  });
  const displayData = data.DISPLAY;
  return {
    coinList: Object.keys(displayData).map(k => ({ __key: k, ...displayData[k] }))
  };
}

export async function fetchCoinPrice(symbol){
  const { data } = await axios.get('https://min-api.cryptocompare.com/data/price', {
    params: {
      fsym: symbol,
      tsyms: ToSymbolStr
    }
  });
  return data[ToSymbolStr];
}

export async function fetchCoinHistory(symbol, type = 'histominute') {
  const params = {
    histominute: {
      aggregate: 15
    }
  }[type];
  const { data } = await axios.get(`https://min-api.cryptocompare.com/data/${type}`, {
    params: {
      fsym: symbol,
      tsym: ToSymbolStr,
      ...params
    }
  });
  return data.Data;
}
