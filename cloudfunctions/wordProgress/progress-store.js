const DEFAULT_SCOPE = 'words';

function normalizeScope(scope) {
  return scope === 'sentences' ? 'sentences' : DEFAULT_SCOPE;
}

// RDB upsert uses _id as the stable record key. Keep the dataset in the key so
// old tables do not need a new scope column.
function progressId(uid, scope) {
  return 'progress_' + normalizeScope(scope) + '_' + uid;
}

async function getProgress(db, uid, scope) {
  const normalizedScope = normalizeScope(scope);
  const table = db.from('word_progress');
  const scoped = await table.select().eq('_id', progressId(uid, normalizedScope));
  const row = scoped.data && scoped.data[0];
  if (row) return Array.isArray(row.mastered) ? row.mastered : [];

  // Migrate the old single-scope words record on the next save without
  // breaking progress already stored before stable _id was introduced.
  if (normalizedScope === DEFAULT_SCOPE) {
    const legacy = await db.from('word_progress').select().eq('uid', uid);
    const legacyRow = (legacy.data || []).find((candidate) => {
      return !String(candidate._id || '').startsWith('progress_');
    });
    if (legacyRow) return Array.isArray(legacyRow.mastered) ? legacyRow.mastered : [];
  }
  return [];
}

function setProgress(db, uid, scope, mastered) {
  return db.from('word_progress').upsert({
    _id: progressId(uid, scope),
    uid,
    mastered,
  });
}

module.exports = { normalizeScope, progressId, getProgress, setProgress };
