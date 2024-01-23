function getDuration(commentDate) {
  const now = new Date();
  const difference = now - commentDate;

  const minutes = Math.floor(difference / (1000 * 60));
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (minutes < 1) {
    return "Just now";
  } else if (hours < 1) {
    return `${minutes} minutes ago`;
  } else if (days < 1) {
    return `${hours}h ago`;
  } else {
    return `${days} days ago`;
  }
}

module.exports = getDuration;
