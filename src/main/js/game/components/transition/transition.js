define(require => {
    const msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
    const displayList = require('skbJet/componentManchester/standardIW/displayList');
    const autoPlay = require('skbJet/componentManchester/standardIW/autoPlay');
    // const gameConfig = require('skbJet/componentManchester/standardIW/gameConfig');
    // const resLib = require('skbJet/component/resourceLoader/resourceLib');
    const orientation = require('skbJet/componentManchester/standardIW/orientation');
    const multiplier = require('game/components/multiplier/multiplierGame');
    const bonusGame = require('game/components/bonus/bonusGame');
    const audio = require('skbJet/componentManchester/standardIW/audio');

    require('com/gsap/TweenMax');
    require('com/gsap/easing/EasePack');
    require('com/gsap/easing/CustomEase');

    const Tween = window.TweenMax;

    window.CustomEase.create("jab", 'M0,0 C0.031,0.142 0.028,0.292 0.038,0.36 0.06,0.526 0.071,0.606 0.158,0.83 0.25,1.038 0.386,1.067 0.7,1.068 0.766,1.068 0.861,0.942 0.9,0.942 0.965,0.942 0.963,1 1,1');

    let transitionLandscape;
    let transitionPortrait;

    let transitionLandscapeinitPos;
    let transitionPortraitinitPos;

    let transitionLandscapeTargetPos = 0;
    let transitionPortraitTargetPos = 0;

    let target;

    let reverse = false;

    function init() {
        transitionLandscape = displayList.transitionLandscape;
        transitionPortrait = displayList.transitionPortrait;
        displayList.baseGameContainer.visible = true;
        displayList.bonusGameContainer.visible = false;
        displayList.multiplierGameContainer.visible = false;
    }

    function transitionToBonus() {
        target = displayList.bonusGameContainer;
        Tween.delayedCall(1, () => {
            executeTransition('left', bonusGame.enable, true);
            audio.play('bonusGameReveal');
            msgBus.publish('Game.StateChanged', 'BONUS_GAME');
            msgBus.publish('Game.Light.BonusGame');
            Tween.to(displayList.ticketSelectBarSmall, 0.3, {
                alpha: 0
            });
        });
    }

    function transitionToMultiplier() {
        if (displayList.bonusGameContainer.visible === true) {
            reverse = true;
            target = displayList.bonusGameContainer;
            executeTransition('left', undefined, false, () => {
                reverse = false;
                target = displayList.multiplierGameContainer;
                Tween.delayedCall(0.25, () => {
                    executeTransition('right', multiplier.enable, true);
                    audio.play('bonusGameReveal');
                });
            }, true);
        } else {
            reverse = false;
            target = displayList.multiplierGameContainer;
            Tween.delayedCall(1, () => {
                executeTransition('right', multiplier.enable, true);
                audio.play('bonusGameReveal');
            });
        }

        msgBus.publish('Game.Light.MultiplierGame');

        Tween.to(displayList.ticketSelectBarSmall, 0.3, {
            alpha: 0
        });
    }

    function transitionToBaseGame(complete) {
        reverse = true;
        let dir = "right";
        if (displayList.bonusGameContainer.visible === true) {
            dir = "left";
        }
        executeTransition(dir, complete, false, undefined, true);
        Tween.to(displayList.ticketSelectBarSmall, 0.3, {
            alpha: 1
        });
    }

    function attachToTranstionContainer() {
        if (target !== undefined) {
            if (orientation.get() === orientation.LANDSCAPE) {
                transitionLandscape.addChild(target);
            } else {
                transitionPortrait.addChild(target);
            }
        }
    }

    function executeTransition(direction, complete, visibleOnComplete, onComplete, transitionOut) {
        autoPlay._enabled = false;

        if (direction === 'left') {
            transitionLandscapeinitPos = -1410;
            transitionPortraitinitPos = -810;
        } else {
            transitionLandscapeinitPos = 1430;
            transitionPortraitinitPos = 810;
        }

        transitionLandscape.x = reverse ? transitionLandscapeTargetPos : transitionLandscapeinitPos;
        transitionPortrait.x = reverse ? transitionPortraitTargetPos : transitionPortraitinitPos;

        attachToTranstionContainer();

        target.visible = true;

        let landTarget = reverse ? transitionLandscapeinitPos : transitionLandscapeTargetPos;
        let portTarget = reverse ? transitionPortraitinitPos : transitionPortraitTargetPos;

        let ease = "jab";

        if (transitionOut) {
            ease = window.Power3.easeIn;
        }

        Tween.to(transitionLandscape, 0.75, {
            x: landTarget,
            ease: ease,
            onComplete: () => {
                if (complete !== undefined) {
                    complete();
                }
                attachToRoot();
                target.visible = visibleOnComplete;

                if (onComplete !== undefined) {
                    onComplete();
                }
            }
        });

        Tween.to(transitionPortrait, 0.75, {
            ease: ease,
            x: portTarget
        });

        Tween.to(displayList.autoPlayStartButton, 0.5, {
            alpha: 0,
            onComplete: () => {
                displayList.autoPlayStartButton.visible = false;
            }
        });

        msgBus.publish('UI.updateButtons', {
            help: {enabled: false},
        });
    }

    function reset() {
        reverse = false;
        msgBus.publish('Game.StateChanged', 'BASE_GAME');
    }

    function attachToRoot() {
        displayList.transitionContainer.parent.addChild(target);
        displayList.transitionContainer.parent.addChild(displayList.transitionContainer);
    }

    function onOrientationChange() {
        if (transitionLandscape !== undefined) {
            attachToTranstionContainer();
        }
    }

    msgBus.subscribe('Game.TransitionToBonus', transitionToBonus);
    msgBus.subscribe('Game.TransitionToMultiplier', transitionToMultiplier);
    msgBus.subscribe('Game.TransitionToBaseGame', transitionToBaseGame);

    msgBus.subscribe('GameSize.OrientationChange', onOrientationChange);

    return {
        init,
        reset
    };
});