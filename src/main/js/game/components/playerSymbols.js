define(require => {
    const msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
    const displayList = require('skbJet/componentManchester/standardIW/displayList');
    const audio = require('skbJet/componentManchester/standardIW/audio');
    const autoPlay = require('skbJet/componentManchester/standardIW/autoPlay');
    const PlayerSymbol = require('game/components/PlayerSymbol');
    const gameConfig = require('skbJet/componentManchester/standardIW/gameConfig');

    require('com/gsap/TweenMax');
    const Tween = window.TweenMax;

    let symbols;
    let lights;
    let shapes;
    let itemsSelectedCounter = 0;
    let checkCompleteIsDone = false;
    let gameComplete;
    let isGameStart = true;

    function init() {
        symbols = [
            PlayerSymbol.fromContainer(displayList.playerSymbol1, 1),
            PlayerSymbol.fromContainer(displayList.playerSymbol2, 2),
            PlayerSymbol.fromContainer(displayList.playerSymbol3, 3),
            PlayerSymbol.fromContainer(displayList.playerSymbol4, 4),
            PlayerSymbol.fromContainer(displayList.playerSymbol5, 5),
            PlayerSymbol.fromContainer(displayList.playerSymbol6, 6),
            PlayerSymbol.fromContainer(displayList.playerSymbol7, 7),
            PlayerSymbol.fromContainer(displayList.playerSymbol8, 8),
            PlayerSymbol.fromContainer(displayList.playerSymbol9, 9)
        ];

        symbols.forEach(e=>{
            e.array = symbols;
        });
    }

    function populate(data, bonusData) {
        shapes = data.slice();
        lights = bonusData.slice();

        symbols.forEach((sym) => {
            sym.storeOrder(shapes);
        });
    }

    function enable() {
        Tween.delayedCall(3,()=>{
            msgBus.publish('Game.removeRevealAllWait');
        });
        return symbols.map(async (symbol,i,a) => {
            msgBus.publish('Game.IdleAll');
            await symbol.enable();

            if(i === a.length - 1){
                msgBus.publish('UI.updateButtons', {
                    help: {enabled: false},
                });

                msgBus.publish('UI.hideHelp');
            }

            changePickedSymbols();
            audio.playSequential('playerNumber');
            const nextData = shapes.shift();
            symbol.populate(nextData);
            msgBus.publish('Game.PlayerPickPoint', symbol);
            await symbol.uncover();

            msgBus.publish('Game.HideRevealAllIfAllRevealed');
            await symbol.assignTypeOfLight(lights.shift());

            msgBus.publish('Game.PlayerSymbol', nextData[0]);
            msgBus.publish('Game.PlayerAnimating', symbol);
            msgBus.publish('Game.PlayerAnimated', symbol);
            checkComplete();
            if (!symbol.matched) {
                console.log('Symbol not matched');
            }

        });
    }

    function disableAllSymbols(soft) {
        displayList.autoPlayStartButton.enabled = false;
        const unrevealed = symbols.filter(shape => !shape.revealed);
        for (var i = 0; i < unrevealed.length; i++) {
            if(soft) {
                unrevealed[i].softDisable();
            } else {
                unrevealed[i].disable();
            }

        }
    }

    function changePickedSymbols() {
        itemsSelectedCounter++;
    }

    function revealAll() {
        let unrevealedPointsHolder = symbols.filter(shape => shape.enabled);
        let unrevealed = [];

        symbols.forEach(e=>{
            e.interactive = false;
        });

        msgBus.publish('game.base.killSheen',unrevealedPointsHolder);

        while ((unrevealed.length + itemsSelectedCounter) < 6) {
            let rand = Math.floor((Math.random() * unrevealedPointsHolder.length));
            let x = unrevealedPointsHolder[rand];
            if (unrevealed.filter(e => e.index === unrevealedPointsHolder[rand].index).length === 0) {
                unrevealed.push(x);
            }
        }
        return unrevealed.map((e) => Tween.delayedCall(0, e.reveal, null, e));
    }

    function reset() {
        symbols.forEach(number => number.reset());
        itemsSelectedCounter = 0;
        lights = [];
        isGameStart = true;
        checkCompleteIsDone = false;
    }

    function assignLightsToBonus() {

        let lights = symbols.filter(e=>{
           return e.typeOfLight !== undefined && e.typeOfLight !== '.';
        });

        if(lights.length !== 0 && autoPlay.enabled) {
            let l = [];

            lights.forEach(e=>{
                if(e.typeOfLight === "BONUS") {
                    l.unshift(e);
                } else {
                    l.push(e);
                }
            });

            l.forEach((e,i,a)=>{
                Tween.delayedCall((0.5*i),()=>{
                    msgBus.publish('Game.playerSymbolsManageLights', e.typeOfLight);

                    if(i === a.length-1) {
                        gameComplete();
                    }

                });
            });
        } else {
            gameComplete();
        }
    }

    function idleManager(data) {
        switch (data.state) {
            case 'IdleAll':
                if (isGameStart) {
                    isGameStart = false;
                    Tween.killTweensOf(promptIdle);
                    Tween.delayedCall(gameConfig.delayBeforeStartIdleInSeconds, promptIdle);
                }
                break;
            case 'ResetIdle':
                if (isGameStart) {
                    isGameStart = false;
                    Tween.killTweensOf(promptIdle);
                    Tween.delayedCall(gameConfig.delayBeforeResumeIdleInSeconds, promptIdle);
                }
                break;
            case 'StopIdle':
                stopIdle();
                break;
        }
    }

    function promptIdle() {
        Tween.killTweensOf(promptIdle);
        const unrevealed = symbols.filter(shape => !shape.revealed);

        if (unrevealed.length === 3) {
            return;
        }

        for (var i = 0; i < unrevealed.length; i++) {
            Tween.delayedCall(i * 0.05, doPrompt, [unrevealed[i]]);
            Tween.delayedCall(1, doGlow, [unrevealed[i]]);
        }
    }

    function doPrompt(symbolToBeUnrevealed) {
        symbolToBeUnrevealed.prompt();
    }

    function doGlow(symbolToBeUnrevealed) {
        symbolToBeUnrevealed.makeGlow();
    }

    function stopIdle() {
        Tween.killTweensOf(promptIdle);

        const unrevealed = symbols.filter(shape => !shape.revealed);

        for (var i = 0; i < unrevealed.length; i++) {
            unrevealed[i].stopIdle();
        }
    }

    async function complete() {
        enable();
        await new Promise(c => {
            gameComplete = ()=>{
                Tween.delayedCall(1,()=>{
                    c();
                });
            };
        });
    }

    function checkComplete() {
        if (itemsSelectedCounter === 6 && !checkCompleteIsDone) {
            msgBus.publish('UI.updateButtons', {
                help: {enabled: false},
            });
            disableAllSymbols(true);
            Tween.delayedCall(0.5,()=>{
                disableAllSymbols(false);
            });
            checkCompleteIsDone = true;
            msgBus.publish('Game.stopAnticipation');

            Tween.delayedCall(1,()=>{
                assignLightsToBonus();
            });
        }
    }

    msgBus.subscribe('Game.IdleAll', () => idleManager({
        state: 'IdleAll'
    }));
    msgBus.subscribe('Game.StopIdle', () => idleManager({
        state: 'StopIdle'
    }));
    msgBus.subscribe('Game.ResetIdle', () => idleManager({
        state: 'ResetIdle'
    }));
    msgBus.subscribe('Game.AutoPlayStop', () => idleManager({
        state: 'ResetIdle'
    }));
    msgBus.subscribe('Game.DisablePoints', disableAllSymbols);

    msgBus.subscribe('game.base.killSheen',(unRevealed)=>{
       unRevealed.forEach(e=>{
           e.setAnimToStatic();
       });
    });

    return {
        init,
        populate,
        complete,
        enable,
        revealAll,
        reset,
    };
});