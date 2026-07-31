class RmAdsJob {
  constructor(adSelectors) {
    this.adSelectors = adSelectors;
    this.observer = null;
    this.removed = new Set();
  }

  _rmAds() {
    this.adSelectors.forEach(selector => {
      const elem = document.querySelector(selector);
      if (elem) {
        elem.remove();
        this.removed.add(selector);
      }
    });
  }

  _allClear() {
    return this.adSelectors.every(selector => this.removed.has(selector));
  }

  exec() {
    this._rmAds();
    if (this._allClear()) {
      return;
    }

    this.observer = new MutationObserver(() => {
      this._rmAds();
      if (this._allClear()) {
        this.observer.disconnect();
        this.observer = null;
      }
    });
    this.observer.observe(document.body, { childList: true, subtree: true });
  }
}

export default RmAdsJob;
