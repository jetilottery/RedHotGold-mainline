define(require => {
    const Timeline = require('com/gsap/TimelineLite');
    const gameConfig = require('skbJet/componentManchester/standardIW/gameConfig');
    const displayList = require('skbJet/componentManchester/standardIW/displayList');
    const bonusGame = require('game/components/bonus/bonusGame');
    const playerSymbols = require('game/components/playerSymbols');
    //const playerNumbers = require('game/components/playerNumbers');
    //const playerSymbols = require('game/components/playerSymbols');

    const msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
    const autoPlay = require('skbJet/componentManchester/standardIW/autoPlay');
    const animState = require('game/state/anim');

    let revealAllTimeline;
    let revealAllTimelineBonus;
    let currentGameState = 'BASE_GAME';

    async function start() {
        if (currentGameState !== 'BASE_GAME') {

            const revealBonus = bonusGame.revealAll();
            revealAllTimelineBonus = new Timeline();

            revealAllTimelineBonus.add(
                new Timeline({ tweens: revealBonus, stagger: gameConfig.autoPlayBonusItemInterval })
            );
            return revealAllTimelineBonus;
        }

        if (!gameConfig.toggleAutoPlay) {
            msgBus.publish('UI.updateButtons', { autoPlay: false });
        }

        const playerSymbolsWinning = playerSymbols.revealAll();


        revealAllTimeline = new Timeline();

        // disable all interaction at the parent container level
        //displayList.playerNumbers.interactiveChildren = false;
        //displayList.winningNumbers.interactiveChildren = false;

        // Start with the winning numbers
        revealAllTimeline.add(
            new Timeline({ tweens: playerSymbolsWinning, stagger: gameConfig.autoPlayWinningNumberInterval })
        );

        // Then the player numbers, with a delay between the winning and player numbers
        /*
        revealAllTimeline.add(
          new Timeline({ tweens: revealPlayer, stagger: gameConfig.autoPlayPlayerNumberInterval }),
          revealWinning.length > 0 && revealPlayer.length > 0
            ? `+=${gameConfig.autoPlayPlayerNumberDelay}`
            : '+=0'
        );
    */
        return revealAllTimeline;
    }

    function stop() {
        // re-enable all interaction at the parent container level
        //displayList.playerNumbers.interactiveChildren = true;
        //displayList.winningNumbers.interactiveChildren = true;
        displayList.bonusGameContainer.interactiveChildren = true;
        // kill the revealAll timeline if active
        if (revealAllTimeline) {
            revealAllTimeline.kill();
            revealAllTimeline = undefined;
        }

        // kill the revealAll timeline if active
        if (revealAllTimelineBonus) {
            revealAllTimelineBonus.kill();
            revealAllTimelineBonus = undefined;
        }
    }

    msgBus.subscribe('Game.WinAllActivated', function(data) {
        if (data && !autoPlay._enabled) {
            displayList.autoPlayStartButton.enabled = false;
            displayList.helpButton.enabled = false;
            autoPlay._enabled = true;
            start();
        }
    });

    function hideRevealAllOnAllRevealed() {
        // Check to see if we have revealed all winning and all player numbers
        if (animState.winning.length === 4 && animState.player.length === 15) {
            // Hide the Reveal All button
            msgBus.publish('UI.updateButtons', {
                autoPlay: false,
                help: { enabled: false },
            });
        }
    }

    msgBus.subscribe('Game.StateChanged', data => currentGameState = data);
    msgBus.subscribe('Game.HideRevealAllIfAllRevealed', hideRevealAllOnAllRevealed);

    return {
        start,
        stop,
    };
});