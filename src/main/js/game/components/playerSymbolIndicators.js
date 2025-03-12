define(require => {
    const msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
    const displayList = require('skbJet/componentManchester/standardIW/displayList');
    const PlayerSymbolIndicator = require('game/components/PlayerSymbolIndicator');

    const Timeline = window.TimelineMax;
    require('com/gsap/TimelineMax');

    let symbols = [];

    let pickingSymbolCounter = 1;

    function init() {
        symbols = [
            PlayerSymbolIndicator.fromContainer(displayList.playerSymbolIndicator1),
            PlayerSymbolIndicator.fromContainer(displayList.playerSymbolIndicator2),
            PlayerSymbolIndicator.fromContainer(displayList.playerSymbolIndicator3),
            PlayerSymbolIndicator.fromContainer(displayList.playerSymbolIndicator4),
            PlayerSymbolIndicator.fromContainer(displayList.playerSymbolIndicator5),
            PlayerSymbolIndicator.fromContainer(displayList.playerSymbolIndicator6)
        ];
    }

    function enable() {
        return new Promise(resolve => {
            let timeLine = new Timeline({
                onComplete: () => {
                    resolve();
                },
            });

            symbols.forEach((e, i) => {
                timeLine.add(() => {
                    e.enable();
                    e.on();
                }, i * 0.1);
            });
        });
    }

    function deleteLastIndicatorSymbol() {
        const pickingSymbol = symbols[symbols.length - pickingSymbolCounter];
        pickingSymbol.disable();
        pickingSymbolCounter = pickingSymbolCounter + 1;

        if(pickingSymbolCounter === 6) {
            symbols[0].pulse();
        }

        if (pickingSymbolCounter === 7) {
            msgBus.publish('Game.DisablePoints');
        }
    }

    function reset() {
        pickingSymbolCounter = 1;
    }

    msgBus.subscribe('Game.PlayerPickPoint', deleteLastIndicatorSymbol);
    return {
        init,
        enable,
        reset,
    };
});