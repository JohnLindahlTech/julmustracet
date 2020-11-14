export default function calculateDiffs(current, comming) {
  const inserts = [];
  comming.forEach((next) => {
    if (!current.find((now) => now._id === next._id)) {
      inserts.push(next);
    }
  });
  current.forEach((now) => {
    if (!comming.find((next) => now._id === next._id)) {
      inserts.push({ ...now, _deleted: true });
    }
  });
  return inserts;
}
