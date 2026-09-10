const assert = require('node:assert/strict');
const test = require('node:test');
const { getProgress, progressId, setProgress } = require('../progress-store');

function fakeDb(rows) {
  const calls = [];
  const records = rows.slice();
  return {
    calls,
    from() {
      return {
        select() {
          return {
            eq(column, value) {
              calls.push({ action: 'select', column, value });
              return Promise.resolve({ data: records.filter((row) => row[column] === value) });
            },
          };
        },
        upsert(value) {
          calls.push({ action: 'upsert', value });
          const index = records.findIndex((row) => row._id === value._id);
          if (index === -1) records.push(value);
          else records[index] = value;
          return Promise.resolve({ status: 200, data: [value] });
        },
      };
    },
  };
}

test('uses one stable record per account and dataset', async () => {
  const uid = 'a-test-account';
  assert.notEqual(progressId(uid, 'words'), progressId(uid, 'sentences'));

  const db = fakeDb([]);
  await setProgress(db, uid, 'words', ['passport']);
  await setProgress(db, uid, 'words', ['passport', 'hotel']);
  assert.equal(db.calls[0].value._id, progressId(uid, 'words'));
  assert.equal(db.calls[1].value._id, progressId(uid, 'words'));
  assert.deepEqual(db.calls.map((call) => call.value.mastered), [['passport'], ['passport', 'hotel']]);
});

test('reads the stable record and keeps legacy words data readable', async () => {
  const uid = 'a-test-account';
  const db = fakeDb([
    { _id: progressId(uid, 'sentences'), uid, mastered: ['Could I have the bill?'] },
    { uid, mastered: ['passport'] },
  ]);

  assert.deepEqual(await getProgress(db, uid, 'sentences'), ['Could I have the bill?']);
  assert.deepEqual(await getProgress(db, uid, 'words'), ['passport']);
});
