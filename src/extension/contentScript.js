import runJobs from './utils/runJobs';
import rmGoogleAdsJob from './utils/rmGoogleAdsJob';
import hotKeysJob from './utils/hotKeysJob';

runJobs(rmGoogleAdsJob, hotKeysJob);
