const createTestCollection = require('./utils/createTestCollection');
const StockNotesCollection = require('../db/StockNotesCollection');

function verifyData(mongoData, actual) {
  expect(mongoData.length).toBe(actual.length);
  actual.sort((a, b) => a.id.localeCompare(b.id));
  mongoData.sort((a, b) => a.id.localeCompare(b.id));
  mongoData.forEach((v, i) => {
    expect(v.id).toBe(actual[i].id);
    expect(v.name).toBe(actual[i].name);
    expect(v.lastUpdateTime).toBe(v.notes[0].createTime);

    const expectedNotes = v.notes;
    const actualNotes = actual[i].notes;
    expectedNotes.forEach((n, j) => expect(n).toEqual(actualNotes[j]));
  });
}

function genNote(createTime) {
  return {
    trade: {
      comment: `trade${createTime}`,
    },
    value: {
      comment: `value${createTime}`,
    },
    story: {
      comment: `story${createTime}`,
    },
    fundamentals: {
      comment: `fundamentals${createTime}`,
    },
    technicals: {
      comment: `technicals${createTime}`,
    },
    chips: {
      comment: `chips${createTime}`,
    },
    createTime,
  };
}

const fakeData = [
  {
    id: '2317',
    name: '鴻海',
    notes: [ genNote(Date.now()), genNote(Date.now() - 1), genNote(Date.now() - 2) ],
  }, {
    id: '2330',
    name: '台積電',
    notes: [ genNote(Date.now()), genNote(Date.now() - 1), genNote(Date.now() - 2) ],
  }, {
    id: '3008',
    name: '大立光',
    notes: [ genNote(Date.now()), genNote(Date.now() - 1), genNote(Date.now() - 2) ],
  },
];

let stockNotes = null;
let testTarget = null;

beforeAll(async function () {
  testTarget = await createTestCollection(StockNotesCollection);
  stockNotes = testTarget.collection;
});

afterAll(function () {
  return testTarget.destroy();
});

describe('StockNotesCollection', () => {
  it('should save stock notes', async () => {
    await stockNotes.save(fakeData);
    const data = await stockNotes.getAll();
    verifyData(data, fakeData);
  });

  // NOTICE: Bad smell, the below tests rely on the saved data from the above test.
  // This is faster but should refactor once tests get complicated.
  describe('', () => {
    it('should get stock notes', async () => {
      let data = await stockNotes.get([ fakeData[1].id ]);
      verifyData(data, fakeData.slice(1, 2));
      data = await stockNotes.get([fakeData[1].id, fakeData[2].id]);
      verifyData(data, fakeData.slice(1, 3));
    });

    it('should remove stock notes', async () => {
      await stockNotes.remove([ fakeData[1].id ]);
      const data = await stockNotes.getAll();
      verifyData(data, [ fakeData[0], fakeData[2] ]);
    });
  });
});
