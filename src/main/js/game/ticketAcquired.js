define((require) => {
  const scenarioData = require('skbJet/componentManchester/standardIW/scenarioData');
  const gameFlow = require('skbJet/componentManchester/standardIW/gameFlow');
  const audio = require('skbJet/componentManchester/standardIW/audio');
  const gameConfig = require('skbJet/componentManchester/standardIW/gameConfig');
  const playerSymbols = require('game/components/playerSymbols');
  const scenarioSymbols = require('game/components/scenarioSymbols');
  const lightIndicators = require('game/components/lightIndicators');
  const bonusGame = require('game/components/bonus/bonusGame');

  function ticketAcquired() {
    playerSymbols.populate(scenarioData.scenario.playSymbolOrder, scenarioData.scenario.bonusRevealData);
    lightIndicators.populate(scenarioData.scenario.bonusRevealData);
    scenarioSymbols.populate(scenarioData.scenario.symbolPositions, scenarioData.scenario.playSymbolOrder);
    bonusGame.populate(scenarioData.scenario.bonusTurns);

    if (!audio.isPlaying('music') && gameConfig.backgroundMusicEnabled) {
      audio.fadeIn('music', 0.5, true, 0.35);
    }

    gameFlow.next('START_REVEAL');
  }

  gameFlow.handle(ticketAcquired, 'TICKET_ACQUIRED');
});