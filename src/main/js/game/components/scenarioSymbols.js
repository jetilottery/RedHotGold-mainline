define(require => {
    const msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
    const displayList = require('skbJet/componentManchester/standardIW/displayList');
    const ScenarioSymbol = require('game/components/ScenarioSymbol');
    const scenarioData = require('skbJet/componentManchester/standardIW/scenarioData');
    const grid = require('game/components/grid');
    const gameConfig = require('skbJet/componentManchester/standardIW/gameConfig');
    const resLib = require('skbJet/component/resourceLoader/resourceLib');
    const PIXI = require('com/pixijs/pixi');
    require('com/gsap/TweenMax');
    const Tween = window.TweenMax;
    const audio = require('skbJet/componentManchester/standardIW/audio');
    const app = require('skbJet/componentManchester/standardIW/app');

    let symbols;
    let symbolCols = [];
    let symbolDiag = [];
    let shapes;
    let symbolOrder;
    var isGameStart = true;

    let activeSymbols = [];
    let anticipationRows = [];

    let winningLines = [];

    let canAnticipate = true;

    let textureMap = {};

    function init() {
        symbols = [
            ScenarioSymbol.fromContainer(displayList.scenarioSymbol1, 1),
            ScenarioSymbol.fromContainer(displayList.scenarioSymbol2, 2),
            ScenarioSymbol.fromContainer(displayList.scenarioSymbol3, 3),
            ScenarioSymbol.fromContainer(displayList.scenarioSymbol4, 4),
            ScenarioSymbol.fromContainer(displayList.scenarioSymbol5, 5),
            ScenarioSymbol.fromContainer(displayList.scenarioSymbol6, 6),
            ScenarioSymbol.fromContainer(displayList.scenarioSymbol7, 7),
            ScenarioSymbol.fromContainer(displayList.scenarioSymbol8, 8),
            ScenarioSymbol.fromContainer(displayList.scenarioSymbol9, 9),
            ScenarioSymbol.fromContainer(displayList.scenarioSymbol10, 10),
            ScenarioSymbol.fromContainer(displayList.scenarioSymbol11, 11),
            ScenarioSymbol.fromContainer(displayList.scenarioSymbol12, 12),
            ScenarioSymbol.fromContainer(displayList.scenarioSymbol13, 13),
            ScenarioSymbol.fromContainer(displayList.scenarioSymbol14, 14),
            ScenarioSymbol.fromContainer(displayList.scenarioSymbol15, 15),
            ScenarioSymbol.fromContainer(displayList.scenarioSymbol16, 16),
            ScenarioSymbol.fromContainer(displayList.scenarioSymbol17, 17),
            ScenarioSymbol.fromContainer(displayList.scenarioSymbol18, 18),
            ScenarioSymbol.fromContainer(displayList.scenarioSymbol19, 19),
            ScenarioSymbol.fromContainer(displayList.scenarioSymbol20, 20),
            ScenarioSymbol.fromContainer(displayList.scenarioSymbol21, 21),
            ScenarioSymbol.fromContainer(displayList.scenarioSymbol22, 22),
            ScenarioSymbol.fromContainer(displayList.scenarioSymbol23, 23),
            ScenarioSymbol.fromContainer(displayList.scenarioSymbol24, 24),
            ScenarioSymbol.fromContainer(displayList.scenarioSymbol25, 25),
            ScenarioSymbol.fromContainer(displayList.scenarioSymbol26, 26),
            ScenarioSymbol.fromContainer(displayList.scenarioSymbol27, 27),
            ScenarioSymbol.fromContainer(displayList.scenarioSymbol28, 28),
            ScenarioSymbol.fromContainer(displayList.scenarioSymbol29, 29),
            ScenarioSymbol.fromContainer(displayList.scenarioSymbol30, 30),
            ScenarioSymbol.fromContainer(displayList.scenarioSymbol31, 31),
            ScenarioSymbol.fromContainer(displayList.scenarioSymbol32, 32),
            ScenarioSymbol.fromContainer(displayList.scenarioSymbol33, 33),
            ScenarioSymbol.fromContainer(displayList.scenarioSymbol34, 34),
            ScenarioSymbol.fromContainer(displayList.scenarioSymbol35, 35),
            ScenarioSymbol.fromContainer(displayList.scenarioSymbol36, 36),
            ScenarioSymbol.fromContainer(displayList.scenarioSymbol37, 37),
            ScenarioSymbol.fromContainer(displayList.scenarioSymbol38, 38),
            ScenarioSymbol.fromContainer(displayList.scenarioSymbol39, 39),
            ScenarioSymbol.fromContainer(displayList.scenarioSymbol40, 40),
            ScenarioSymbol.fromContainer(displayList.scenarioSymbol41, 41),
            ScenarioSymbol.fromContainer(displayList.scenarioSymbol42, 42),
            ScenarioSymbol.fromContainer(displayList.scenarioSymbol43, 43),
            ScenarioSymbol.fromContainer(displayList.scenarioSymbol44, 44),
            ScenarioSymbol.fromContainer(displayList.scenarioSymbol45, 45),
            ScenarioSymbol.fromContainer(displayList.scenarioSymbol46, 46),
            ScenarioSymbol.fromContainer(displayList.scenarioSymbol47, 47),
            ScenarioSymbol.fromContainer(displayList.scenarioSymbol48, 48),
            ScenarioSymbol.fromContainer(displayList.scenarioSymbol49, 49)
        ];

        symbols.forEach((e, i) => {
            if ([0, 7, 14, 21, 28, 35, 42].indexOf(i) === -1) {
                e.previousSquare = symbols[i - 1];
            }
            if ([6, 13, 20, 27, 34, 41, 48].indexOf(i) === -1) {
                e.nextSquare = symbols[i + 1];
            }
        });

        displayList.startTubes.children.forEach(e => {
            let spine = new PIXI.spine.Spine(resLib.spine['goldFlow'].spineData);
            e.spine = spine;
            e.addChild(e.spine);
            e.renderable = false;
        });

        // To get the effect of the intro cascade animation going down in columns as opposed to rows
        // We need to create a reordered array of the symbols
        // We will call this symbolCols as this is ordered into columns
        // We shouldn't need to refer to this array anywhere other than when the animation starts
        const numberOfRows = 7;
        const numberOfCols = 7;
        for (let i = 0; i < numberOfCols; i++) {
            for (let j = 0; j < numberOfRows; j++) {
                const row = i % numberOfCols;
                const col = j % numberOfCols;
                symbolCols.push(symbols[row + (col * numberOfRows)]);
            }
        }

        // TODO: Generate this array with code
        symbolDiag = [
            [symbols[0]],
            [symbols[1], symbols[7]],
            [symbols[2], symbols[8], symbols[14]],
            [symbols[3], symbols[9], symbols[15], symbols[21]],
            [symbols[4], symbols[10], symbols[16], symbols[22], symbols[28]],
            [symbols[5], symbols[11], symbols[17], symbols[23], symbols[29], symbols[35]],
            [symbols[6], symbols[12], symbols[18], symbols[24], symbols[30], symbols[36], symbols[42]],
            [symbols[13], symbols[19], symbols[25], symbols[31], symbols[37], symbols[43]],
            [symbols[20], symbols[26], symbols[32], symbols[38], symbols[44]],
            [symbols[27], symbols[33], symbols[39], symbols[45]],
            [symbols[34], symbols[40], symbols[46]],
            [symbols[41], symbols[47]],
            [symbols[48]]
        ];

        for (let x = 0; x<3 ; x++) {

            let prefix = ['square','tiles_2x_top/2x1','tiles_2x_bottom/2x1'];

            for (let y = 0; y < 9; y++) {
                let meshSprite = new PIXI.Sprite(PIXI.Texture.fromFrame(prefix[x] + 'Symbol0' + (y + 1)));
                let meshSpriteMatch = new PIXI.Sprite(PIXI.Texture.fromFrame(prefix[x] + 'Symbol0' + (y + 1) + 'Match'));
                let meshSpriteWin = new PIXI.Sprite(PIXI.Texture.fromFrame(prefix[x] + 'Symbol0' + (y + 1) + 'Win'));

                generateTexture(meshSprite);
                generateTexture(meshSpriteMatch);
                generateTexture(meshSpriteWin);
            }
        }

    }

    function populate(data, order) {
        shapes = data.slice();
        symbolOrder = order.slice();
    }

    function enable() {
        parseGridData();
        msgBus.publish('Game.addRevealAllWait');
        displayList.startTubes.children.forEach(e => {
            e.renderable = true;
            e.spine.state.setAnimation(0, "goldFlowAnim_ends", false);
            e.spine.state.addAnimation(0, "goldFlowStatic_ends", false);
        });
        return symbols.map(async (symbol, index) => {
            // Start idle animations
            msgBus.publish('Game.IdleAll');
            //Enable the card and wait for it to be revealed (manually or automatically)
            symbol.enable();

            msgBus.publish('Game.HideRevealAllIfAllRevealed');

            const nextData = shapes.shift();
            // Populate the card with the next Player Number, ready to be uncovered
            symbol.populate(nextData,textureMap, index);           
            
            audio.play('tileReveal');
            
            await symbol.uncover();
        });
    }

    function checkLineMatch() {
        Object.keys(grid['gridMatches_' + scenarioData.scenario.gridLayoutRef]).forEach(e => {
            if (grid['gridMatches_' + scenarioData.scenario.gridLayoutRef][e].arrayMap.every(elem => activeSymbols.includes(elem))) {
                msgBus.publish('game.baseGame.winningResult', grid['gridMatches_' + scenarioData.scenario.gridLayoutRef][e].resultIndex);
                grid['gridMatches_' + scenarioData.scenario.gridLayoutRef][e].arrayMap.forEach(e => {
                    symbols.forEach(el => {
                        let winningLineSet = false;
                        if (el.index === e) {
                            if (!winningLineSet) {
                                winningLines.push(e);
                            }
                            el.presentWin();
                        }
                    });
                });
            }
        });
    }

    function parseGridData() {
        symbols.forEach((e) => {
            e.double = grid['gridSetup_' + scenarioData.scenario.gridLayoutRef][Number(e.index)].double;
        });
    }

    function revealAll() {
        console.log('playerSymbols: revealAll');
    }

    function reset() {
        symbols.forEach(number => number.reset());
        activeSymbols = [];
        shapes = [];
        symbolOrder = [];
        anticipationRows = [];
        isGameStart = true;
        canAnticipate = true;
        displayList.startTubes.children.forEach(e => {
            e.renderable = false;
        });
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
        for (let i = 0; i < symbolDiag.length; i++) {
            Tween.delayedCall(i * 0.05, promptArray, [symbolDiag[i]]);
        }
    }

    function promptArray(inArr) {
        for (let i = 0; i < inArr.length; i++) {
            doPrompt(inArr[i]);
        }
    }

    function doPrompt(symbolToBeUnrevealed) {
        symbolToBeUnrevealed.prompt();
    }

    function stopIdle() {
        Tween.killTweensOf(promptIdle);
        // Check if there are any remaining unrevealed cards
        const unrevealed = symbols.filter(shape => !shape.revealed);
        if (unrevealed.length === 3) {
            return;
        }
        for (var i = 0; i < unrevealed.length; i++) {
            unrevealed[i].stopIdle();
        }
    }

    function checkLavaFlow() {
        symbols.forEach(e => {
            if (e.previousSquare === undefined && e.matched) {
                e.advanceGoldLava();
            }

            if (e.previousSquare !== undefined) {
                if (e.previousSquare.matched && e.matched) {
                    if (e.previousSquare.flow) {
                        e.advanceGoldLava();
                    }
                }
            }

            if (e.flow && e.double !== null) {
                symbols[e.double - 1].flow = true;
            }
        });
    }

    function toNumber(val) {
        return (symbolOrder.indexOf(val) + 1).toString();
    }

    async function checkMatch(obj) {
        const matchedSymbols = symbols.filter(symbol => !symbol.matched && symbol.value === toNumber(obj.playerSymbol));

        let speed = 0.25;

        [1, 8, 15, 22, 29, 36, 43].forEach((e) => {
            checkMatchedSymbols(e, speed * 0.25);
        });
        [2, 9, 16, 23, 30, 37, 44].forEach((e) => {
            checkMatchedSymbols(e, speed * 0.50);
        });
        [3, 10, 17, 24, 31, 38, 45].forEach((e) => {
            checkMatchedSymbols(e, speed * 0.75);
        });
        [4, 11, 18, 25, 32, 39, 46].forEach((e) => {
            checkMatchedSymbols(e, speed);
        });
        [5, 12, 19, 26, 33, 40, 47].forEach((e) => {
            checkMatchedSymbols(e, speed * 1.25);
        });
        [6, 13, 20, 27, 34, 41, 48].forEach((e) => {
            checkMatchedSymbols(e, speed * 1.50);
        });
        [7, 14, 21, 28, 35, 42, 49].forEach((e) => {
            checkMatchedSymbols(e, speed * 1.75);
        });

        function checkMatchedSymbols(e, delay) {
            Tween.delayedCall(delay, () => {
                matchedSymbols.forEach((sym) => {
                    if (sym.index === e) {
                        sym.match();
                        activeSymbols.push(sym.index);
                        checkLineMatch();
                    }

                });
                msgBus.publish('Game.BaseGame.checkIfMatchedComplete');
            });
        }

        Tween.delayedCall(0.5, async () => {
            if (canAnticipate) {
                await checkRemainingLinesForNearWin();
                anticipationRows.forEach((el) => {
                    el.forEach(e => {
                        e.anticipation();
                        if (e.double !== null) {
                            symbols[e.double - 1].anticipation();
                        }
                    });
                });
            }

        });

    }

    function checkRemainingLinesForNearWin() {
        return new Promise(resolve => {
            Object.keys(grid['gridMatches_' + scenarioData.scenario.gridLayoutRef]).forEach((e, i, a) => {
                winningLines.forEach(el => {
                    if (el !== e) {
                        resolve();
                    }
                });
                anticipationCheck(grid['gridMatches_' + scenarioData.scenario.gridLayoutRef][e].arrayMap);
                if (i === a.length - 1) {
                    resolve();
                }
            });
        });


        function anticipationCheck(row) {
            let unmatchedValues = [];
            let unmatchedSymbols = [];

            function filterUnique(value, index, self) {
                return self.indexOf(value) === index;
            }

            symbols.forEach(e => {
                row.forEach(el => {
                    if (e.index === el) {
                        if (!e.matched) {
                            unmatchedValues.push(e.value);
                            unmatchedSymbols.push(e);
                        }
                    }
                });
            });

            let unique = unmatchedValues.filter(filterUnique);

            if (unique.length === 1) {
                anticipationRows.push(unmatchedSymbols);
            }
        }
    }

    function generateTexture(source) {
        let renderTexture = PIXI.RenderTexture.create(source.width, source.height);
        app.renderer.render(source, renderTexture);

        textureMap[source.texture.textureCacheIds[0]] = renderTexture;
    }

    msgBus.subscribe('UI.showError', () => {
        symbols.forEach(e => {
            e.reset();
        });
    });

    msgBus.subscribe('Game.stopAnticipation', () => {
        canAnticipate = false;

        Tween.delayedCall(0.5, () => {
            symbols.forEach(e => {
                e.stopAnticipation();
            });
        });
    });
    msgBus.subscribe('Game.PlayerSymbol', sym => checkMatch({
        playerSymbol: sym
    }));
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
    msgBus.subscribe('Game.CheckLavaFlow', checkLavaFlow);
    return {
        init,
        populate,
        enable,
        revealAll,
        reset,
    };
});