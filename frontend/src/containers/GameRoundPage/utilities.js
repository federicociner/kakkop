export const getRoundDetails = (rounds, id) => {
  return rounds.find(round => round.id === id);
};
