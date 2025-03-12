define(require => {

    const msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
    const displayList = require('skbJet/componentManchester/standardIW/displayList');
    const resLib = require('skbJet/component/resourceLoader/resourceLib');
    const PIXI = require('com/pixijs/pixi');
    const orientation = require('skbJet/componentManchester/standardIW/orientation');
    const autoPlay = require('skbJet/componentManchester/standardIW/autoPlay');
    const audio = require('skbJet/componentManchester/standardIW/audio');

    require('com/gsap/TweenMax');
    const Tween = window.TweenMax;

    let totalLightsWon = 0;
    let totalLightsFound = 0;

    let bonusLightMetereSpine;
    let multiplierLightMeterSpine;

    let transition = false;

    let ori;

    function init() {
        bonusLightMetereSpine = new PIXI.spine.Spine(resLib.spine['bonusMeterAnims'].spineData);
        multiplierLightMeterSpine = new PIXI.spine.Spine(resLib.spine['bonusMeterAnims'].spineData);

        displayList.bonusLightMeterSpineContainer.addChild(bonusLightMetereSpine);
        displayList.multiplierLightMeterSpineContainer.addChild(multiplierLightMeterSpine);

        onOrientationChange();

        bonusLightMetereSpine.state.setAnimation(0, ori + "/bonusIdle", true);
        multiplierLightMeterSpine.state.setAnimation(0, ori + "/multiplierIdle", true);

        bonusLightMetereSpine.state.addListener({
            complete: (entry) => {
                if (entry.animation.name === ori + "/bonusTrigger") {
                    if (!transition)
                        bonusLightMetereSpine.state.setAnimation(0, ori + "/bonusTriggerLoop", true);
                }
            }
        });
        multiplierLightMeterSpine.state.addListener({
            complete: (entry) => {
                if (entry.animation.name === ori + "/multiplierTrigger_" + (totalLightsFound + 1)) {
                    if (!transition)
                        multiplierLightMeterSpine.state.setAnimation(0, ori + "/multiplierTrigger_" + (totalLightsFound + 1) + "_loop", true);
                }
            }
        });
    }

    function populate(bonusRevealData) {
        console.log(bonusRevealData);

        bonusRevealData.forEach(function(data){
            if (data === "2") {
                totalLightsWon++;    
            }  
        });

    }

    function enable() {
        displayList.bonusLightMeterSpineContainer.renderable = false;
        displayList.multiplierLightMeterSpineContainer.renderable = false;
    }

    function reset() {
        totalLightsWon = 0;
        totalLightsFound = 0;
        transition = false;

        displayList.bonusLightMeterSpineContainer.renderable = true;

        if (bonusLightMetereSpine.state.tracks[0].animation.name !== ori + "/bonusIdle") {
            bonusLightMetereSpine.state.setAnimation(0, ori + "/bonusIdle", true);
        }
        
        if (bonusLightMetereSpine.state.tracks[0].animation.name !== ori + "/multiplierIdle") {
            multiplierLightMeterSpine.state.setAnimation(0, ori + "/multiplierIdle", true);
        }

        displayList.multiplierLightMeterSpineContainer.renderable = true;
    }

    msgBus.subscribe('Game.playerSymbolsManageLights', turnOnTheLight);

    function turnOnTheLight(type) {

        let delay = 0;

        if (autoPlay.enabled) {
            delay = 1;
        }

        if (type === "BONUS") {
            Tween.delayedCall(delay, () => {
                audio.play('bonusCollect');
                displayList.bonusLightMeterSpineContainer.renderable = true;
                bonusLightMetereSpine.state.setAnimation(0, ori + "/bonusTrigger", false);
            });
        } else if (type === "MULTIPLIER") {
            Tween.delayedCall(delay, function () {
                if (totalLightsFound <= 2) {
                    totalLightsFound++;
                }

                if (totalLightsFound > totalLightsWon) {
                    return;
                }

                audio.play('multiplierLight_' + (totalLightsFound));
                displayList.multiplierLightMeterSpineContainer.renderable = true;
                multiplierLightMeterSpine.state.setAnimation(0, ori + "/multiplierTrigger_" + (totalLightsFound), false);
            });
        }
    }

    function onOrientationChange() {
        let prevOri = ori;

        if (orientation.get() === orientation.LANDSCAPE) {
            ori = 'land';
        } else {
            ori = 'port';
        }

        if (bonusLightMetereSpine !== undefined) {
            if (bonusLightMetereSpine.state.tracks.length > 0) {
                if (bonusLightMetereSpine.state.tracks[0].animation.name === prevOri + '/bonusTriggerLoop') {
                    bonusLightMetereSpine.state.setAnimation(0, ori + "/bonusTriggerLoop", true);
                }

                if (bonusLightMetereSpine.state.tracks[0].animation.name === prevOri + '/bonusIdle') {
                    bonusLightMetereSpine.state.setAnimation(0, ori + "/bonusIdle", true);
                }
            }
        }
        if (multiplierLightMeterSpine !== undefined) {
            if (multiplierLightMeterSpine.state.tracks.length > 0) {
                if ((multiplierLightMeterSpine.state.tracks[0].animation.name === prevOri + "/multiplierTrigger_" + (totalLightsFound) + "_loop") ||
                    (multiplierLightMeterSpine.state.tracks[0].animation.name === prevOri + "/multiplierTrigger_" + (totalLightsFound)) ) {
                    multiplierLightMeterSpine.state.setAnimation(0, ori + "/multiplierTrigger_" + (totalLightsFound) + "_loop", true);
                } 
                else if (multiplierLightMeterSpine.state.tracks[0].animation.name === prevOri + "/multiplierIdle") {
                    multiplierLightMeterSpine.state.setAnimation(0, ori + "/multiplierIdle", true);
                }
            }
        }
    }

    msgBus.subscribe('GameSize.OrientationChange', onOrientationChange);

    msgBus.subscribe('Game.Light.BonusGame', () => {
        transition = true;
        if (multiplierLightMeterSpine.state.tracks[0].animation.name === ori + "/multiplierTrigger_3_loop")
            multiplierLightMeterSpine.state.setAnimation(0, ori + "/multiplierTrigger_3_loop", false);
        if (bonusLightMetereSpine.state.tracks[0].animation.name !== ori + "/bonusTriggerLoop") {
            bonusLightMetereSpine.state.setAnimation(0, ori + "/bonusTriggerLoop", true);
        }
    });

    msgBus.subscribe('Game.Light.MultiplierGame', () => {
        transition = true;
        if (multiplierLightMeterSpine.state.tracks[0].loop === false)
            multiplierLightMeterSpine.state.setAnimation(0, ori + "/multiplierTrigger_3_loop", true);
        if (bonusLightMetereSpine.state.tracks[0].animation.name === ori + "/bonusTriggerLoop") {
            bonusLightMetereSpine.state.setAnimation(0, ori + "/bonusTriggerLoop", false);
        }
    });

    msgBus.subscribe('Game.TransitionToBaseGame',()=>{
        displayList.multiplierLightMeterSpineContainer.renderable = false;
    });

    return {
        init,
        populate,
        enable,
        reset,
    };
});