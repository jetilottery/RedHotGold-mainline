define(function (require) {
    const msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
    const gameFlow = require('skbJet/componentManchester/standardIW/gameFlow');
    const scenarioData = require('skbJet/componentManchester/standardIW/scenarioData');

    const scenarioSymbols = require('game/components/scenarioSymbols');
    const displayList = require('skbJet/componentManchester/standardIW/displayList');

    const playerSymbols = require('game/components/playerSymbols');
    const bonusGame = require('game/components/bonus/bonusGame');
    const multipliyer = require('game/components/multiplier/multiplierGame');
    const lightIndicators = require('game/components/lightIndicators');
    const playerSymbolIndicators = require('game/components/playerSymbolIndicators');

    require('com/gsap/TweenMax');
    const Tween = window.TweenMax;
    const revealAll = require('game/revealAll');

    async function startReveal() {

        msgBus.subscribe('UI.showError', () => {
            Tween.delayedCall(0.2,()=>{
                Tween.killAll();
            });
        });

        // Listen for autoplay activation which triggers the remaining cards to reveal automatically
        msgBus.subscribe('Game.AutoPlayStart', revealAll.start);

        // Listen for autoplay deactivation which cancels the revealAll timeline
        msgBus.subscribe('Game.AutoPlayStop', revealAll.stop);

        displayList.autoPlayStartButton.enabled = false;

        // Enable all of the winning numbers and player numbers, wait until they are all revealed
        scenarioSymbols.enable();
        lightIndicators.enable();

        await playerSymbolIndicators.enable();

        displayList.autoPlayStartButton.enabled = true;

        msgBus.publish('Game.populatePrizeTable');

        await playerSymbols.complete();

        if(scenarioData.scenario.bonusTurns.length > 1 && scenarioData.scenario.bonusTurns[0] !== "") {
            await bonusGame.complete();
        }
        if(scenarioData.scenario.multiplierValue !== undefined) {
            await multipliyer.complete();
        }

        gameFlow.next('REVEAL_COMPLETE');
    }

    gameFlow.handle(startReveal, 'START_REVEAL');
});