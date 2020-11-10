import fakeDOMParser from './utils/fakeDOMParser';
import dividendPolicyPage from './data/gooDividendPolicyPage';
import GooClient from '../GooClient';

const EXPECTED_DATA = {
  name: '台積電',
  price: 451,
  dividendPolicy: {
    in5yrs: {
      avg: 0.5518,
      smoothAvg: 0.505,
    },
  },
};

const gooClient = new GooClient({ domParser: fakeDOMParser() });

describe('GooClient', () => {
  it('should parse name and price', async () => {
    const data = gooClient.parseData({ dividendPolicyPage });
    expect(data.name).toBe(EXPECTED_DATA.name);
    expect(data.price).toBe(EXPECTED_DATA.price);
  });

  it('should parse dividend policy data', async () => {
    const data = gooClient.parseData({ dividendPolicyPage });
    expect(data.dividendPolicy).toMatchObject(EXPECTED_DATA.dividendPolicy);
  });
});
