const StockProviderServerBase = require('./StockProviderServerBase');

const letters = [ 'w', 'a', 'a', 'b', 'n', 'c', 't', 'd', 'g', 'e', 'o', 'f', 'o' ];
const h = letters.filter((l, i) => i % 2 === 0).join('');

class GwServer extends StockProviderServerBase {
  constructor(params) {
    super({
      ...params,
      baseURL: new URL(`https://www.${h}.com/`),
    });
  }

  async get(id) {
    try {
      const [ pePage, pbPage, epsPage, dividendPage ] = await Promise.all([
        this._getPage('pe', id),
        this._getPage('pb', id),
        this._getPage('eps', id),
        this._getPage('dividend', id),
      ]);
      return { pePage, pbPage, epsPage, dividendPage };
    } catch (e) {
      return this._handleError(e);
    }
  }

  async _getPage(pageType, id) {
    let path = '';
    switch (pageType) {
      case 'pe':
        path = `/stock/report/value?types=1&stockno=${id}`;
        break;

      case 'pb':
        path = `/stock/report/value?types=2&stockno=${id}`;
        break;

      case 'eps':
        path = `/stock/report/basic_eps?stockno=${id}`;
        break;

      case 'dividend':
        path = `/stock/report/basic_dp?stockno=${id}`;
        break;
    }
    const html = await this.crawler.get(path);
    return html;
  }
}

module.exports = GwServer;