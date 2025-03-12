define((require) => {
  const prizeData = require('skbJet/componentManchester/standardIW/prizeData');
  console.log(prizeData);

  return function scenarioTransform(scenarioString) {

    // TODO: Remove when mechanic available
    // scenarioString = "EGBIAHC,USWVXRTZY,.2.2.2,1,8558941216833526193327648987954436674533197726218||M5";

    // Destructure scenario string
    const [mainGameData, bonusGameData, multiplierGameData] = scenarioString.split('|');

    // Find the main game data, it's all comma delimited
    const [lineString, orderString, bonusString, gridLayoutRef, positionString] = mainGameData.split(',');

    // Find the line prizes
    const linePrizes = lineString.split('');

    // Find the play symbol order
    const playSymbolOrder = orderString.split('');

    // Find bonus reveal data
    const bonusRevealData = bonusString.split('');

    // Find symbol positions
    const symbolPositions = positionString.split('');

    // Split the bonus turns
    const bonusTurns = bonusGameData.split(',');

    // Find the exact multiplier value
    const multiplierValue = multiplierGameData.split('')[1];


    console.log("MULTIPLIER VALUE: " + multiplierValue);
    console.log("BONUS REVEAL DATA: " + bonusRevealData);

    return {
      linePrizes,
      playSymbolOrder,
      bonusRevealData,
      gridLayoutRef,
      symbolPositions,
      bonusTurns,
      multiplierValue
    };
  };
});