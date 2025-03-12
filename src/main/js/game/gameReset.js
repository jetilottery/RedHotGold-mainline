define(function (require) {
    const gameFlow = require('skbJet/componentManchester/standardIW/gameFlow');
    const numberState = require('game/state/numbers');
    const idleState = require('game/state/idle');
    const animState = require('game/state/anim');
    const symbolState = require('game/state/symbols');
    const playerSymbols = require('game/components/playerSymbols');
    const playerSymbolIndicators = require('game/components/playerSymbolIndicators');
    const prizeTable = require('game/components/prizeTable');
    const scenarioSymbols = require('game/components/scenarioSymbols');
    const lightIndicators = require('game/components/lightIndicators');
    //const bonusCard = require('game/components/bonusCard');
    const bonusGame = require('game/components/bonus/bonusGame');
    const multiplier = require('game/components/multiplier/multiplierGame');
    const winUpTo = require('game/components/winUpTo');
    const audio = require('skbJet/componentManchester/standardIW/audio');
    const msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
    const transition = require('game/components/transition/transition');
    const bonusLightParticles = require('game/components/effects/bonusLightParticles');


    function prepareOrReset() {
        resetAll();
        gameFlow.next();
    }

    function resetAll() {
        numberState.reset();
        idleState.reset();
        animState.reset();
        symbolState.reset();
        prizeTable.reset();
        playerSymbols.reset();
        playerSymbolIndicators.reset();
        scenarioSymbols.reset();
        lightIndicators.reset();
        bonusGame.reset();
        multiplier.reset();
        winUpTo.reset();
        transition.reset();
        bonusLightParticles.reset();

        // Make sure we hide the result
        msgBus.publish('UI.hideResult');

        // Fade out the win/lose terminator in case it is still playing
        if (audio.isPlaying('winTerminator')) {
            audio.fadeOut('winTerminator', 1);
        }
        if (audio.isPlaying('loseTerminator')) {
            audio.fadeOut('loseTerminator', 1);
        }
        msgBus.publish('Game.AutoPlayReset');
    }

    // Subscribe to Ticket Cost +/- as we will not be in GAME_RESET when these are called
    msgBus.subscribe('TicketSelect.CostUp', resetAll);
    msgBus.subscribe('TicketSelect.CostMax', resetAll);
    msgBus.subscribe('TicketSelect.CostDown', resetAll);

    gameFlow.handle(prepareOrReset, 'GAME_RESET');
    gameFlow.handle(prepareOrReset, 'GAME_PREPARE');
});
