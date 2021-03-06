const { verifyNoteData } = require('./utils/index');
const createTestCollection = require('./utils/createTestCollection');
const NotesCollectionBase = require('../db/NotesCollection/NotesCollectionBase');

class TestNotesCollection extends NotesCollectionBase {
  _noteHasContent() {
    return true;
  }

  _sanitizeDocs(items) {
    return items.map(item => ({
      id: String(item.id),
      notes: [ item.note ],
      noteMeta: item.noteMeta,
      lastUpdateTime: Date.now(),
    }));
  }
}

let testCollection = null;
let testTarget = null;

beforeAll(async function () {
  testTarget = await createTestCollection(TestNotesCollection);
  testCollection = testTarget.collection;
});

afterAll(function () {
  return testTarget.destroy();
});

describe('NotesCollectionBase', () => {

  function genNote(comment) {
    return { comment, createTime: Date.now() };
  }
  const fakeData = [
    {
      id: '1', notes: [ genNote('fakeData1') ], noteMeta: { for: 'foo' },
    }, {
      id: '2', notes: [ genNote('fakeData2') ], noteMeta: { for: 'foo' },
    }, {
      id: '3', notes: [ genNote('fakeData3') ], noteMeta: { for: 'foo' },
    },
  ];

  // The below order matters
  it('should save notes', async () => {
    const payloads = fakeData.map(({ notes, ...rest }) => ({ ...rest, note: notes[0] }));
    await testCollection.save(payloads);
    const data = await testCollection.getAll();
    verifyNoteData(data, fakeData);
  });

  it('should get one stock note', async () => {
    const data = await testCollection.get([ fakeData[1].id ]);
    verifyNoteData(data, [ fakeData[1] ]);
  });

  it('should get 2 stock notes', async () => {
    const data = await testCollection.get([ fakeData[0].id, fakeData[2].id ]);
    verifyNoteData(data, [ fakeData[0], fakeData[2] ]);
  });

  it('should limit the notes size', async () => {
    const spyLimit = jest.spyOn(NotesCollectionBase, 'NOTES_SIZE_LIMIT', 'get').mockReturnValue(1);

    const note = genNote('fakeData0-2');
    fakeData[0].notes.push(note);
    await testCollection.update(fakeData[0].id, { action: 'add', note });
    const data = await testCollection.get([ fakeData[0].id ]);
    fakeData[0].notes = fakeData[0].notes.slice(1, 2);
    verifyNoteData(data, [ fakeData[0] ]);

    spyLimit.mockRestore();
  });
});
