define(require => {
    const displayList = require('skbJet/componentManchester/standardIW/displayList');
    const msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');

    function fix() {
        displayList.moveToMoneyButton.label.maxWidth = 220;

        displayList.buyButton.label.maxWidth = 220;
        displayList.playAgainButton.label.maxWidth = 220;
        displayList.tryAgainButton.label.maxWidth = 220;
        displayList.retryButton.label.maxWidth = 220;

        displayList.howToPlayClose.label.maxWidth = 190;

        displayList.autoPlayStartButton.label.maxWidth = 220;
        displayList.autoPlayStopButton.label.maxWidth = 220;

        displayList.bonusAutoPlayButton.label.maxWidth = 220;
        displayList.multiplierStartButton.label.maxWidth = 220;

        displayList.howToPlayClose.label.maxWidth = 220;

        displayList.ticketSelectCostValue.maxWidth = 180;

        if(displayList.winPlaqueMessage.height > 75) {
            displayList.winPlaqueMessage.scale.set(0.6);
        }
        if(displayList.losePlaqueMessage.height > 283) {
            displayList.losePlaqueMessage.scale.set(0.6);
        }

    }

    msgBus.subscribe('jLotteryGame.playerWantsToMoveToMoneyGame',fix); 

    return {
        fix
    };   
});