define((require) => {
    const PIXI = require('com/pixijs/pixi');
    const prizeData = require('skbJet/componentManchester/standardIW/prizeData');
    const SKBeInstant = require('skbJet/component/SKBeInstant/SKBeInstant');
    const textStyles = require('skbJet/componentManchester/standardIW/textStyles');
    const msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
    const resLib = require('skbJet/component/resourceLoader/resourceLib');
    const orientation = require('skbJet/componentManchester/standardIW/orientation');
    const scenarioData = require('skbJet/componentManchester/standardIW/scenarioData');
    const meterData = require('skbJet/componentManchester/standardIW/meterData');
    const Text = require('skbJet/componentManchester/standardIW/components/fittedText');

    //let prizeTableValuesWin;

    class PrizeTableRow extends PIXI.Container {
        constructor(container, highlight, index) {
            super();
            this.container = container;
            this.index = index;
            this.prizeDescription = 0;
            this.prizeText = new Text();
            this.prizeText.anchor.set(0.5);
            this.prizeText.maxWidth = 130;

            this.spine = new PIXI.spine.Spine(resLib.spine['coverAnims'].spineData);
            this.tubeLeft = new PIXI.spine.Spine(resLib.spine['goldFlow'].spineData);
            this.tubeRight = new PIXI.spine.Spine(resLib.spine['goldFlow'].spineData);

            this.endTube = new PIXI.spine.Spine(resLib.spine['goldFlow'].spineData);

            this.tubeLeft.renderable = false;
            this.tubeRight.renderable = false;
            this.endTube.renderable = false;

            this.tubeLeft.name = "tubeLeft";
            this.tubeRight.name = "tubeRight";

            this.tubeLeft.x = -112;
            this.tubeRight.x = 100;
            this.endTube.x = 160;

            this.state = 'static';
            this.orientaiton = "payout_tile_land";

            this.awardedPrize = false;

            this.container.addChild(this.endTube, this.tubeLeft, this.tubeRight, this.spine, this.prizeText);

            this.tubeLeft.state.addListener({
                complete:(e)=>{
                    if(e.animation.name === "goldFlowAnim_mid") {
                        this.tubeLeft.state.setAnimation(0,"goldFlowStatic_mid",true);

                        this.state = "win";
                        this.spine.state.setAnimation(0, this.orientaiton + '/payoutTileWin', false);
                        this.prizeText.style = textStyles.prizeTableValuesWin;

                        this.tubeRight.renderable = true;
                        this.tubeRight.state.addAnimation(0,"goldFlowAnim_mid",false);
                    }
                }
            });

            this.tubeRight.state.addListener({
                complete:(e)=>{
                    if(e.animation.name === "goldFlowAnim_mid") {
                        this.tubeRight.state.setAnimation(0,"goldFlowStatic_mid",true);

                        this.endTube.renderable = true;
                        this.endTube.state.setAnimation(0,"goldFlowAnim_ends",false);
                        this.endTube.state.addAnimation(0,"goldFlowStatic_ends",true);
                    }
                }
            });

            let orientationChange = this.onOrientationChange.bind(this);
            orientationChange();

            msgBus.subscribe('GameSize.OrientationChange', orientationChange);
        }

        init() {
            this.prizeText.text = "";
        }

        updatePrizeValue() {
            this.prizeDescription = scenarioData.scenario.linePrizes[this.index-1];

            this.prizeText.text = SKBeInstant.formatCurrency(prizeData.prizeTable[this.prizeDescription]).formattedAmount;
            this.prizeText.style = textStyles.prizeTableValues;
        }

        highlight() {
            this.tubeLeft.renderable = true;
            this.tubeLeft.state.addAnimation(0,"goldFlowAnim_mid",true);
        }

        updateWinMeter() {
            meterData.win += prizeData.prizeTable[this.prizeDescription];
        }

        reset() {
            this.state = "static";
            this.prizeText.style = textStyles.prizeTableValues;
            this.prizeText.text = "";
            this.spine.state.setAnimation(0, this.orientaiton + '/payoutTileStatic', true);
            this.awardedPrize = false;

            this.tubeLeft.renderable = false;
            this.tubeRight.renderable = false;
            this.endTube.renderable = false;

            this.tubeLeft.state.clearTracks();
            this.tubeRight.state.clearTracks();
            this.endTube.state.clearTracks();

            this.tubeLeft.skeleton.setToSetupPose();
            this.tubeRight.skeleton.setToSetupPose();
            this.endTube.skeleton.setToSetupPose();
        }

        winAnimation() {
            this.endTube.state.setAnimation(0,"goldFlowAnim_ends",false);
        }

        onOrientationChange() {
            let anim = 'Static';
            let loop = true;

            if (this.state !== 'static') {
                anim = 'Win';
                loop = false;
            }

            if (orientation.get() === orientation.LANDSCAPE) {
                this.orientaiton = 'payout_tile_land';
            } else {
                this.orientaiton = 'payout_tile_port';
            }

            this.spine.state.setAnimation(0, this.orientaiton + '/payoutTile' + anim, loop);

            this.tubeLeft.x = orientation.get() === orientation.LANDSCAPE ? -112 : -92;
            this.tubeRight.x = orientation.get() === orientation.LANDSCAPE ? 100 : 72;
        }
    }

    return PrizeTableRow;
});
