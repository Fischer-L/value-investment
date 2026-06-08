import giURL, { PATH_TYPE } from './utils/giURL';
import localVarsOf from './utils/localVarsOf';
import runJobs from './utils/runJobs';

const autoEnlargeJob = {
  id: 'gi-autoEnlargeJob',

  _localVars: null,

  _rootElemId: [ 'tx', 'tStoc', 'kList', 'Data' ].join(''),

  _autoEnlarge() {
    const localVars = this._localVars;
    if (localVars.observer) {
      return;
    }

    const root = document.querySelector(`#${this._rootElemId}`);
    if (!root && localVars.trialCounts < 10) {
      setTimeout(() => this._autoEnlarge(), 330);
      localVars.trialCounts++;
      return;
    }
    localVars.trialCounts = 0;

    if (root) {
      document.body.style.maxWidth = 'none';
      root.querySelector('.box_style').style.width = 'auto';
      localVars.observer = new MutationObserver(() => {
        document.body.style.maxWidth = 'none';
        root.querySelector('.box_style').style.width = 'auto';
      });
      localVars.observer.observe(root, { childList: true, subtree: true });
    }
  },

  isTargetPage() {
    return window.location.href.startsWith(giURL(PATH_TYPE.LIST));
  },

  init() {
    this._localVars = localVarsOf(this.id, {
      observer: null,
      trialCounts: 0,
    });
    if (this._localVars.init) {
      return;
    }
    if (this.isTargetPage()) {
      this._localVars.init = true;
      this._autoEnlarge();
    }
  },
};

runJobs(autoEnlargeJob);
