// Sort friends with the most recent activity are pushed to the top.
export function sortFriends(friends) {
  const sortedFriends = friends;
  sortedFriends.sort((a, b) => {
    // Fist check to see if users have any messages - if not, then they are sorted to the bottom.
    if (a.messages.length === 0 && b.messages.length === 0) {
      return 0;
    } else if (a.messages.length === 0) {
      return 1;
    } else if (b.messages.length === 0) {
      return -1;
    }
    // Creates dates from message time stamp.
    const dateOne = new Date(a.messages[a.messages.length - 1].timestamp);
    const dateTwo = new Date(b.messages[b.messages.length - 1].timestamp);

    // If first date is more recent, sort it up top;
    return dateOne.getTime() > dateTwo.getTime() ? -1 : 1;
  });
  return sortedFriends;
}

// Will sort the messages by the message date, and grab the last message sent between the two users to populate in the preview
// If no message history, we default to a preset value.
export function getLastMessage(messages) {
  return messages.length > 0
    ? messages.sort((a, b) => b.timestamp - a.timestamp)[messages.length - 1]
        .message
    : "start conversation";
}
