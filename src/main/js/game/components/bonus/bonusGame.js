define(require => {
    const msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
    const displayList = require('skbJet/componentManchester/standardIW/displayList');
    const autoPlay = require('skbJet/componentManchester/standardIW/autoPlay');
    const BonusValve = require('game/components/bonus/BonusValve');
    const SKBeInstant = require('skbJet/component/SKBeInstant/SKBeInstant');
    const textStyles = require('skbJet/componentManchester/standardIW/textStyles');
    const resources = require('skbJet/component/pixiResourceLoader/pixiResourceLoader');
    const meterData = require('skbJet/componentManchester/standardIW/meterData');
    const audio = require('skbJet/componentManchester/standardIW/audio');
    const resLib = require('skbJet/component/resourceLoader/resourceLib');
    const PIXI = require('com/pixijs/pixi');
    const orientation = require('skbJet/componentManchester/standardIW/orientation');
    const gameConfig = require('skbJet/componentManchester/standardIW/gameConfig');

    require('com/gsap/TweenLite');
    require('com/gsap/TimelineMax');
    require('com/gsap/easing/EasePack');
    const Timeline = window.TimelineMax;
    const Tween = window.TweenMax;

    let valves = [];
    let bonusData;
    let bonusGamePromise;

    let bonusSpine;

    let currentBonusValue = 0;
    let introComplete;

    let introTimeline;

    function init() {
        valves = [
            BonusValve.fromContainer(displayList.bonusValve1, 1, 1),
            BonusValve.fromContainer(displayList.bonusValve2, 2, 1),
            BonusValve.fromContainer(displayList.bonusValve3, 3, 1),
            BonusValve.fromContainer(displayList.bonusValve4, 4, 1),
            BonusValve.fromContainer(displayList.bonusValve5, 5, 2),
            BonusValve.fromContainer(displayList.bonusValve6, 6, 2),
            BonusValve.fromContainer(displayList.bonusValve7, 7, 2),
            BonusValve.fromContainer(displayList.bonusValve8, 8, 2),
        ];

        displayList.bonusValue.text = resources.i18n.Game.bonusValueDisplayDefault;
        displayList.bonusValue.style = textStyles.bonusValveValueDefault;
        displayList.bonusValue.alpha = 0;

        introTimeline = new Timeline({
            paused: true, onComplete: () => {
                introComplete();
            }
        });

        valves.map((e, i) => {
            introTimeline.add(() => {
                e.intro(i);
            }, (0.025 * i));
        });

        introTimeline.to(displayList.bonusValue, 0.25, {
            alpha: 1
        }, 0.5);
        introTimeline.to(displayList.bonusInfoSprite2, 0.25, {
            alpha: 1
        }, 0.05);
        introTimeline.to(displayList.bonusInfoText1, 0.25, {
            alpha: 1
        }, 0.05);
        introTimeline.to(displayList.bonusInfoSprite1, 0.25, {
            alpha: 1
        }, 0.05);
        introTimeline.to(displayList.bonusInfoText2, 0.25, {
            alpha: 1,
        }, 0.05);
        introTimeline.to(displayList.bonusAutoPlayButton, 0.25, {
            alpha: 1,
            onComplete: () => {
                displayList.bonusAutoPlayButton.enabled = true;
                displayList.multiplierStartButton.spineAnim.renderable = false;

                msgBus.publish('UI.updateButtons', {
                    help: {enabled: true},
                });

                if (gameConfig.consoleEnabledDuringPlay) {
                    enableConsole();
                }
            }
        }, 1);

        displayList.bonusInfoSprite1.alpha = 0;
        displayList.bonusInfoSprite2.alpha = 0;
        displayList.bonusInfoText1.alpha = 0;
        displayList.bonusInfoText2.alpha = 0;

        displayList.bonusAutoPlayButton.on("press", () => {
            autoPlay._enabled = true;
            displayList.bonusAutoPlayButton.enabled = false;
            displayList.bonusAutoPlayButton.spineAnim.renderable = false;

            msgBus.publish('UI.updateButtons', {
                help: {enabled: false},
            });

        });

        displayList.bonusAutoPlayButton.enabled = false;
        displayList.bonusAutoPlayButton.alpha = 0;

        displayList.bonusAutoPlayButton.spineAnim = new PIXI.spine.Spine(resLib.spine['buyButtonHighlight'].spineData);
        displayList.bonusAutoPlayButton.spineAnim.state.setAnimation(0, "buyButtonHighlight", true);
        displayList.bonusAutoPlayButton.spineAnim.renderable = false;

        displayList.bonusAutoPlayButton.hitArea = new PIXI.Rectangle(-131, -42, 262, 82);

        displayList.bonusAutoPlayButton.addChild(displayList.bonusAutoPlayButton.spineAnim);

        if (!SKBeInstant.config.autoRevealEnabled) {
            displayList.bonusAutoPlayButton.visible = false;
        }

        bonusSpine = new PIXI.spine.Spine(resLib.spine['meterHighlight'].spineData);
        displayList.bonusGameContainer.addChild(bonusSpine);

        bonusSpine.x = orientation.get() === orientation.LANDSCAPE ? 720 : 405;
        bonusSpine.y = orientation.get() === orientation.LANDSCAPE ? 405 : 750;

        bonusSpine.renderable = false;
    }

    function populate(data) {
        bonusData = data.slice();
    }

    async function enable() {
        autoPlay._enabled = false;

        await intro();
        return valves.map(async (e) => {
            e.idle(valves);
            await e.enable();
            disableConsole();
            const nextData = bonusData.shift();
            if (nextData !== undefined) {
                e.populate(nextData);
                if (e.data !== 'X') {
                    audio.play('bonusSelect');
                } else {
                    audio.play('bonusCollect');
                    displayList.bonusAutoPlayButton.enabled = false;
                }
                await e.updateNeedle();
                if (e.data === 'X') {
                    e.complete(bonusGamePromise);
                    disableRemaining();
                    switchToCompletedState();
                }
            }
        });
    }

    function reset() {
        valves.forEach(e => {
            e.reset();
        });

        currentBonusValue = 0;
        displayList.bonusValue.text = resources.i18n.Game.bonusValueDisplayDefault;
        displayList.bonusValue.style = textStyles.bonusValveValueDefault;
        displayList.bonusValue.alpha = 0;

        displayList.bonusInfoSprite1.alpha = 0;
        displayList.bonusInfoSprite2.alpha = 0;
        displayList.bonusInfoText1.alpha = 0;
        displayList.bonusInfoText2.alpha = 0;

        displayList.bonusAutoPlayButton.enabled = false;
        displayList.bonusAutoPlayButton.alpha = 0;

        bonusSpine.renderable = true;
    }

    function update(val) {
        currentBonusValue += val;
        displayList.bonusValue.text = SKBeInstant.formatCurrency(currentBonusValue).formattedAmount;
        displayList.bonusValue.style = textStyles.bonusValveValueSelect;
        displayList.bonusValue.scale.set(1.5);

        let anim = orientation.get() === orientation.LANDSCAPE ? 'pickerMeterHighlight_land' : 'pickerMeterHighlight_port';
        bonusSpine.renderable = true;
        bonusSpine.state.setAnimation(0, anim, false);

        Tween.to(displayList.bonusValue.scale, 0.3, {
            x: 1,
            y: 1
        });
    }

    function switchToCompletedState() {
        displayList.bonusValue.text = resources.i18n.Game.bonusValueCollected + " " + SKBeInstant.formatCurrency(currentBonusValue).formattedAmount;
        displayList.bonusValue.style = textStyles.bonusValveValue;

        Tween.delayedCall(1, () => {
            Tween.to(displayList.bonusValue.scale, 0.3, {
                x: 1.5,
                y: 1.5,
                yoyo: true,
                repeat: 1
            });
        });


        valves.forEach(e => {
            e.updateToCompletedState();
        });

        updateWinMeter();
    }

    function updateWinMeter() {
        meterData.win += currentBonusValue;
    }

    function intro() {

        return new Promise(resolve => {
            introTimeline.restart();
            introComplete = resolve;
        });
    }

    function complete() {
        return new Promise(resolve => {
            let delay = 1;

            if (autoPlay.enabled === true) {
                delay = 2;
            }

            Tween.delayedCall(delay, () => {
                msgBus.publish('Game.TransitionToBonus');
            });

            bonusGamePromise = () => {
                Tween.delayedCall(1, () => {
                    resolve();
                });
            };
        });
    }

    function revealAll() {
        let unpressed = valves.map(e => {
            if (e.data === undefined) {
                return e;
            }
        }).filter(function (e) {
            return e !== undefined;
        });

        let points = [];

        while (points.length < unpressed.length) {
            let rand = Math.floor((Math.random() * unpressed.length));
            let x = unpressed[rand];
            if (points.filter(e => e.index === unpressed[rand].index).length === 0) {
                points.push(x);
            }
        }

        valves.forEach(e => {
            e.idleSpine.renderable = false;
            e.interactive = false;
        });

        disableConsole();
        return points.map(e => Tween.delayedCall(0, e.reveal, null, e));
    }

    function disableRemaining() {
        valves.forEach(e => {
            e.enabled = false;
        });
    }

    function onOrientationChange () {
        if (!bonusSpine)
            return;

        bonusSpine.x = orientation.get() === orientation.LANDSCAPE ? 720 : 405;
        bonusSpine.y = orientation.get() === orientation.LANDSCAPE ? 405 : 750;

        if(bonusSpine.state.tracks.length > 0) {
            let currentAnim = bonusSpine.state.tracks[0].animation.name;
            let trackTime = bonusSpine.state.tracks[0].trackTime;
            let loop = bonusSpine.state.tracks[0].loop;

            bonusSpine.state.setAnimation(0, currentAnim, loop);
            bonusSpine.state.tracks[0].trackTime = trackTime;
        }
    }

    function disableConsole() {
        msgBus.publish('toPlatform', {
            channel: 'Game',
            topic: 'Game.Control',
            data: {name: 'howToPlay', event: 'enable', params: [0]},
        });
        msgBus.publish('toPlatform', {
            channel: 'Game',
            topic: 'Game.Control',
            data: {name: 'paytable', event: 'enable', params: [0]},
        });
    }
    function enableConsole() {
        msgBus.publish('toPlatform', {
            channel: 'Game',
            topic: 'Game.Control',
            data: {name: 'howToPlay', event: 'enable', params: [1]},
        });
        msgBus.publish('toPlatform', {
            channel: 'Game',
            topic: 'Game.Control',
            data: {name: 'paytable', event: 'enable', params: [1]},
        });
    }

    msgBus.subscribe('GameSize.OrientationChange', onOrientationChange);

    msgBus.subscribe('Game.Bonus.Update', update);

    return {
        init,
        reset,
        revealAll,
        complete,
        populate,
        enable
    };

});