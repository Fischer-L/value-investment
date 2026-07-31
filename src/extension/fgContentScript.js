import localVarsOf from './utils/localVarsOf';
import runJobs from './utils/runJobs';
import RmAdsJob from './utils/rmAdsJob';

const rmPopupJob = {
  id: 'rmPopupJob',

  isTargetPage() {
    return true;
  },

  init() {
    this._localVars = localVarsOf(this.id, {
      job: null,
    });
    if (this._localVars.init) {
      return;
    }
    if (this.isTargetPage()) {
      this._localVars.init = true;
      this._localVars.job = new RmAdsJob([ '#ats-interstitial-root' ]);
      this._localVars.job.exec();
    }
  },
};

runJobs(rmPopupJob);
