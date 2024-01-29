function extractProjectIds(mergeRequestString) {
  // Regular expression to extract project IDs
  const regex = /\((\d+)\).*\((\d+)\)/;
  const match = mergeRequestString.match(regex);

  if (match) {
    return match;
  } else {
    return null;
  }
}

module.exports = extractProjectIds;
