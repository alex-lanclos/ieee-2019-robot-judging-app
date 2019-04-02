const calculateTotalScore = (
  blocksPickedUp,
  blocksPlacedInMotherShip,
  blocksInCorrectSlot,
  perfectRun,
  obstaclesHit
) => {
  let totalScore =
    blocksPickedUp * 5 +
    blocksPlacedInMotherShip * 15 +
    blocksInCorrectSlot * 30 -
    obstaclesHit * 5;

  totalScore += perfectRun ? 75 : 0;

  totalScore = totalScore < 0 ? 0 : totalScore;

  return totalScore;
};

export { calculateTotalScore };
