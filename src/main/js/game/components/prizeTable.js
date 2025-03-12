define(require => {
    const msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
    const displayList = require('skbJet/componentManchester/standardIW/displayList');
    const PrizeTableRow = require('game/components/PrizeTableRow');
    const meterData = require('skbJet/componentManchester/standardIW/meterData');
    const prizeData = require('skbJet/componentManchester/standardIW/prizeData');
    const audio = require('skbJet/componentManchester/standardIW/audio');

    let prizeTableRows;
    let winSymbolCount = 0;
    let instantWinTriggered = false;

    require('com/gsap/TweenMax');
    const Tween = window.TweenMax;

    function init() {
        prizeTableRows = [
            new PrizeTableRow(displayList.row01Column02, displayList.row01Highlight, 1),
            new PrizeTableRow(displayList.row02Column02, displayList.row02Highlight, 2),
            new PrizeTableRow(displayList.row03Column02, displayList.row03Highlight, 3),
            new PrizeTableRow(displayList.row04Column02, displayList.row04Highlight, 4),
            new PrizeTableRow(displayList.row05Column02, displayList.row05Highlight, 5),
            new PrizeTableRow(displayList.row06Column02, displayList.row06Highlight, 6),
            new PrizeTableRow(displayList.row07Column02, displayList.row07Highlight, 7),
        ];

        prizeTableRows.forEach(e => {
            e.init();
        });
    }

    function reset() {
        winSymbolCount = 0;
        instantWinTriggered = false;
        prizeTableRows.forEach(e => {
            e.reset();
        });
    }

    function updatePrizeValues() {
        if (prizeTableRows) {
            prizeTableRows.forEach(e => {
                e.updatePrizeValue();
            });
        }
    }

    function updateWinSymbolCount() {
        winSymbolCount = winSymbolCount + 1;
        updateWinMeter();

        if (winSymbolCount > 2) {
            highlightRow(winSymbolCount);
        }
    }

    function highlightRow(index) {
        if (prizeTableRows[index - 1].awardedPrize === false) {
            prizeTableRows[index - 1].awardedPrize = true;
            prizeTableRows[index - 1].updateWinMeter();

            Tween.delayedCall(1,()=>{
                audio.play('winlineWin_1');
            });
        }
        if (prizeTableRows[index - 1].highlight.state !== 'win') {
            prizeTableRows[index - 1].highlight();
        }
    }

    function instantWin() {
        instantWinTriggered = true;
        updateWinMeter();
    }

    function updateWinMeter() {
        var winValue = 0;

        if (instantWinTriggered) {
            winValue = prizeData.prizeTable['IW'];
        }

        if (winSymbolCount > 2) {
            winValue += prizeData.prizeTable['M' + winSymbolCount];
        }

        if (winValue) {
            meterData.win = winValue;
        }
    }
    msgBus.subscribe('UI.showError', () => {
        prizeTableRows.forEach(e=>{
            e.reset();
        });
    });
    msgBus.subscribe('Game.populatePrizeTable', updatePrizeValues);
    msgBus.subscribe('Game.WinSymbol', updateWinSymbolCount);
    msgBus.subscribe('Game.InstantWin', instantWin);
    msgBus.subscribe('game.baseGame.winningResult', highlightRow);

    return {
        init,
        reset
    };
});
