const HTTP = require('../httpStatusCodes');
const { getCollection } = require('../db/mongo');
const CacheProvider = require('../cacheProvider');
const { collectIDs, collectPayloads } = require('../middlewares');

const mongoCache = new CacheProvider({ maxAge: -1 });

const BOOKMARK_TYPE = {
  STOCK: 'stocks',
  STORY: 'stories',
  PTT_USER: 'pttUsers',
};

const COLLECTION_NAME = {
  [ BOOKMARK_TYPE.STOCK ]: 'bookmarks',
  [ BOOKMARK_TYPE.STORY ]: 'stories',
  [ BOOKMARK_TYPE.PTT_USER ]: 'pttUsers',
};

async function getBookmarks(type) {
  let data = mongoCache.get(type);
  if (!data) {
    data = await getCollection(COLLECTION_NAME[ type ]).then(collection => collection.getAll());
  }
  mongoCache.set(type, data);
  return data;
}

function initBookmarksRoute(app) {
  app.get('/bookmarks', async (req, res) => {
    const data = {};
    try {
      await Promise.all(Object.values(BOOKMARK_TYPE).map(type => getBookmarks(type).then(results => {
        data[type] = results;
      })));
    } catch (e) {
      console.error(e);
      res.status(HTTP.INTERNAL_SERVER_ERROR).send(e.toString());
      return;
    }
    res.json(data);
  });

  app.post('/bookmarks/:type', collectPayloads, async (req, res) => {
    try {
      const { payloads } = res.locals;
      const name = COLLECTION_NAME[ req.params.type ];
      await getCollection(name).then(collection => collection.save(payloads));
      res.sendStatus(HTTP.OK);
    } catch (e) {
      console.error(e);
      res.status(HTTP.INTERNAL_SERVER_ERROR).send(e.toString());
    } finally {
      mongoCache.remove(req.params.type);
    }
  });

  app.delete('/bookmarks/:type', collectIDs, async (req, res) => {
    try {
      const { ids } = res.locals;
      const name = COLLECTION_NAME[ req.params.type ];
      await getCollection(name).then(collection => collection.remove(ids));
      res.sendStatus(HTTP.OK);
    } catch (e) {
      console.error(e);
      res.status(HTTP.INTERNAL_SERVER_ERROR).send(e.toString());
    } finally {
      mongoCache.remove(req.params.type);
    }
  });
}

module.exports = initBookmarksRoute;
