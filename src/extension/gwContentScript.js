import runJobs from './utils/runJobs';
import localVarsOf from './utils/localVarsOf';
import RmAdsJob from './utils/rmAdsJob';

const rmBottomBannerJob = {
  id: 'gw-rmBottomBannerJob',

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
      this._localVars.job = new RmAdsJob([ 'ins[data-google-query-id]' ]);
      this._localVars.job.exec();
    }
  },
};

runJobs(rmBottomBannerJob);
