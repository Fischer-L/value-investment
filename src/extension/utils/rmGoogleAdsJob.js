import DOMAINS from '~/utils/domains';
import localVarsOf from './localVarsOf';

function normalizeOrigin(origin) {
  return origin.endsWith('/') ? origin : origin + '/';
}

const rmGoogleAdsJob = {
  id: 'rmGoogleAdsJob',

  _rmAds() {
    const localVars = this._localVars;
    if (localVars.observer) {
      return;
    }

    localVars.observer = new MutationObserver(() => {
      const ads = Array.from(document.querySelectorAll('[data-google-query-id]'));
      if (!ads.length) {
        return;
      }
      ads.forEach(ad => ad.parentElement.remove());
    });
    localVars.observer.observe(document.body, { childList: true, subtree: true });
  },

  isTargetPage() {
    const origin = normalizeOrigin(window.location.origin);
    return Object.values(DOMAINS).some(domain => normalizeOrigin(domain) === origin);
  },

  init() {
    this._localVars = localVarsOf(this.id, {
      observer: null,
    });
    if (this._localVars.init) {
      return;
    }
    if (this.isTargetPage()) {
      this._localVars.init = true;
      this._rmAds();
    }
  },
};

export default rmGoogleAdsJob;
