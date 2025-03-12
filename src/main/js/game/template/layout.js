define({
    _BASE_APP: {
        children: ['background', 'prizeTable', 'baseGameContainer', 'bonusGameContainer', 'multiplierGameContainer', 'bonusMetersSpineContainer', 'multiplierCardContainer', 'transitionContainer', 'bonusLightParticleContainer']
    },
    baseGameContainer: {
        children: ['logo', 'winUpTo', 'numberContainer', 'bonusSymbolFly']
    },

    /*
     * BACKGROUND
     */
    background: {
        type: 'sprite',
        children: ['animatedBackground', 'startTubes', 'selectionBackgrounds']
    },
    animatedBackground: {
        type: 'sprite'
    },
    selectionBackgrounds: {
        type: 'sprite',
        landscape: {
            texture: 'selectionBackgrounds'
        },
        portrait: {
            texture: 'selectionBackgroundsPortrait'
        }
    },

    transitionContainer: {
        type: 'container',
        children: [
            'transitionLandscape',
            'transitionPortrait',
        ]
    },

    transitionLandscape: {
        type: 'container'
    },

    transitionPortrait: {
        type: 'container'
    },

    bonusMetersSpineContainer: {
        type: 'container',
        children: [
            'bonusLightMeterSpineContainer',
            'multiplierLightMeterSpineContainer'
        ],
        landscape: {
            x: 725,
            y: 405
        },
        portrait: {
            x: 405,
            y: 720
        }
    },

    bonusLightMeterSpineContainer: {
        type: 'container'
    },
    multiplierLightMeterSpineContainer: {
        type: 'container'
    },

    bonusLightParticleContainer: {
        type: 'container',
    },
    startTubes: {
        type: 'container',
        children: [
            'startTube_1',
            'startTube_2',
            'startTube_3',
            'startTube_4',
            'startTube_5',
            'startTube_6',
            'startTube_7',
        ],
        landscape: {
            visible: true,
        },
        portrait: {
            visible: false
        }
    },

    startTube_1: {
        type: 'container',
        x: 470,
        y: 185
    },
    startTube_2: {
        type: 'container',
        x: 470,
        y: 257
    },
    startTube_3: {
        type: 'container',
        x: 470,
        y: 328
    },
    startTube_4: {
        type: 'container',
        x: 470,
        y: 401
    },
    startTube_5: {
        type: 'container',
        x: 470,
        y: 473
    },
    startTube_6: {
        type: 'container',
        x: 470,
        y: 545
    },
    startTube_7: {
        type: 'container',
        x: 470,
        y: 617
    },

    /*
     * LOGO
     */
    logo: {
        type: 'sprite',
        anchor: 0.5,
        landscape: {
            x: 227,
            y: 80,
            scale: 0.8,
            texture: 'landscape_gameLogo'
        },
        portrait: {
            x: 215,
            y: 128,
            scale: 1,
            texture: 'portrait_gameLogo'
        }
    },

    /*
     * WIN UP TO
     */
    winUpTo: {
        type: 'container',
        children: ['winUpToContainer'],
        landscape: {
            x: 378,
            y: 222,
            scale: 1
        },
        portrait: {
            x: 605,
            y: 150,
            scale: 1.4
        }
    },
    winUpToContainer: {
        type: 'container',
        children: ['winUpToIn', 'winUpToOut']
    },
    winUpToIn: {
        type: 'sprite',
        anchor: 0.5,
        children: ['winUpToInText', 'winUpToInValue']
    },
    winUpToInText: {
        type: 'text',
        style: 'winUpToText',
        string: 'winUpToText',
        landscape: {
            anchor: {
                x:1,
                y:0.5
            },
            x: -44,
            y: 5,
            maxWidth: 130
        },
        portrait: {
            anchor: 0.5,
            x: 0,
            y: -40,
            maxWidth: 230
        }
    },
    winUpToInValue: {
        type: 'text',
        style: 'winUpToValue',
        landscape: { x: -25, anchor: { x:0, y:0.5} },
        portrait: { x: 0, y: 20, anchor: 0.5},
        maxWidth: 200
    },
    winUpToOut: {
        type: 'sprite',
        anchor: 0.5,
        children: ['winUpToOutText', 'winUpToOutValue']
    },
    winUpToOutText: {
        type: 'text',
        style: 'winUpToText',
        string: 'winUpToText',
        landscape: {
            anchor: {
                x:1,
                y:0.5
            },
            x: -44,
            y: 5,
            maxWidth: 130
        },
        portrait: {
            anchor: 0.5,
            x: 0,
            y: -40,
            maxWidth: 230
        }
    },
    winUpToOutValue: {
        type: 'text',
        style: 'winUpToValue',
        landscape: { x: -25, anchor: { x:0, y:0.5} },
        portrait: { x: 0, y: 20, anchor: 0.5},
        maxWidth: 200
    },

    /*
     * WINNING NUMBERS
     */
    playerSymbols: {
        type: 'container',
        children: [ //'winningNumbersTitle',
            'playerSymbol1', 'playerSymbol2', 'playerSymbol3', 'playerSymbol4', 'playerSymbol5', 'playerSymbol6', 'playerSymbol7', 'playerSymbol8', 'playerSymbol9'
        ],
        landscape: {
            x: 16,
            y: 292
        },
        portrait: {
            x: 0,
            y: 0
        }
    },
    playerSymbolIndicators: {
        type: 'container',
        children: [ //'winningNumbersTitle',
            'playerSymbolIndicator1', 'playerSymbolIndicator2', 'playerSymbolIndicator3', 'playerSymbolIndicator4', 'playerSymbolIndicator5', 'playerSymbolIndicator6'
        ],
        landscape: {
            x: 16,
            y: 292
        },
        portrait: {
            x: 0,
            y: 0
        }
    },
    playerSymbolIndicator1: {
        type: 'container',
        landscape: {
            x: 68,
            y: 13,
            scale: 0.914
        },
        portrait: {
            x: 662,
            y: 1055,
            scale: 0.914
        }
    },
    playerSymbolIndicator2: {
        type: 'container',
        landscape: {
            x: 128,
            y: 13,
            scale: 0.914
        },
        portrait: {
            x: 699,
            y: 1055,
            scale: 0.914
        }
    },
    playerSymbolIndicator3: {
        type: 'container',
        landscape: {
            x: 188,
            y: 13,
            scale: 0.914
        },
        portrait: {
            x: 736,
            y: 1055,
            scale: 0.914
        }
    },
    playerSymbolIndicator4: {
        type: 'container',
        landscape: {
            x: 248,
            y: 13,
            scale: 0.914
        },
        portrait: {
            x: 662,
            y: 1092,
            scale: 0.914
        }
    },
    playerSymbolIndicator5: {
        type: 'container',
        landscape: {
            x: 308,
            y: 13,
            scale: 0.914
        },
        portrait: {
            x: 699,
            y: 1092,
            scale: 0.914
        }
    },
    playerSymbolIndicator6: {
        type: 'container',
        landscape: {
            x: 368,
            y: 13,
            scale: 0.914
        },
        portrait: {
            x: 736,
            y: 1092,
            scale: 0.914
        }
    },

    /*
    winningNumbersTitle: {
      type: 'text',
      string: 'luckyNumbers',
      style: 'winningNumbersTitle',
      anchor: 0.5,
      maxWidth: 350,
      landscape: { x: 311, y: 34 },
      portrait: { x: 299, y: 27 },
    },
    */
    playerSymbol1: {
        type: 'container',
        landscape: {
            x: 68,
            y: 85,
            scale: 0.914
        },
        portrait: {
            x: 95,
            y: 960,
            scale: 0.914
        }
    },
    playerSymbol2: {
        type: 'container',
        landscape: {
            x: 202,
            y: 85,
            scale: 0.914
        },
        portrait: {
            x: 245,
            y: 960,
            scale: 0.914
        }
    },
    playerSymbol3: {
        type: 'container',
        landscape: {
            x: 340,
            y: 85,
            scale: 0.914
        },
        portrait: {
            x: 392,
            y: 960,
            scale: 0.914
        }
    },
    playerSymbol4: {
        type: 'container',
        landscape: {
            x: 68,
            y: 194,
            scale: 0.914
        },
        portrait: {
            x: 540,
            y: 960,
            scale: 0.914
        }
    },
    playerSymbol5: {
        type: 'container',
        landscape: {
            x: 202,
            y: 194,
            scale: 0.914
        },
        portrait: {
            x: 688,
            y: 960,
            scale: 0.914
        }
    },
    playerSymbol6: {
        type: 'container',
        landscape: {
            x: 340,
            y: 194,
            scale: 0.914
        },
        portrait: {
            x: 95,
            y: 1075,
            scale: 0.914
        }
    },
    playerSymbol7: {
        type: 'container',
        landscape: {
            x: 68,
            y: 303,
            scale: 0.914
        },
        portrait: {
            x: 245,
            y: 1075,
            scale: 0.914
        }
    },
    playerSymbol8: {
        type: 'container',
        landscape: {
            x: 202,
            y: 303,
            scale: 0.914
        },
        portrait: {
            x: 392,
            y: 1075,
            scale: 0.914
        }
    },
    playerSymbol9: {
        type: 'container',
        landscape: {
            x: 340,
            y: 303,
            scale: 0.914
        },
        portrait: {
            x: 540,
            y: 1075,
            scale: 0.914
        }
    },

    /*
    /* MULTIPLIER AREA
    */
    multiplierCardContainer: {
        type: 'container',
        children: [
            'multiplierLabel',
            'bonusLabel'
        ],
        landscape: {
            x: 328,
            y: 594
        },
        portrait: {
            x: 405,
            y: 613
        }
    },
    multiplierLabel: {
        type: 'text',
        style: 'multiplierLabel',
        string: 'Multiplier',
        anchor: 0.5,
        maxWidth: 180,
        landscape: {
            x: 773,
            y: -521,
            scale: 1
        },
        portrait: {
            x: 192,
            y: -352,
            scale: 1.3
        }
    },
    bonusLabel: {
        type: 'text',
        style: 'bonusLabel',
        string: 'Bonus',
        anchor: 0.5,
        maxWidth: 190,
        landscape: {
            x: 451,
            y: -507,
            scale: 1
        },
        portrait: {
            x: -187,
            y: -332,
            scale: 1.3
        }
    },
    bonusGameContainer: {
        type: 'container',
        children: [
            'bonusValveBackground',
            'bonusValveContainer',
            'bonusInfoContainer',
            'bonusValueContainer',
            'bonusAutoPlayButton'
        ]
    },
    bonusInfoContainer: {
        type: 'container',
        children: [
            'bonusInfoBackground',
            'bonusInfoSprite1',
            'bonusInfoSprite2',
            'bonusInfoText1',
            'bonusInfoText2'
        ],
        landscape: {
            y:0
        },
        portrait: {
            y:35,
        }
    },
    bonusInfoBackground: {
        type: 'sprite',
        landscape: {
            x: 16,
            y: 155,
            texture: 'bonusGameTutorialBG',
        },
        portrait: {
            x: 15,
            y: 845,
            texture: "bonusGameTutorialBGPort"
        }
    },
    bonusInfoSprite1: {
        texture: 'bonusGreenDialInfo',
        type: 'sprite',
        landscape: {
            x: 190,
            y: 430,
        },
        portrait: {
            x: 650,
            y: 935
        }
    },
    bonusInfoSprite2: {
        texture: 'bonusYellowDialInfo',
        type: 'sprite',
        landscape: {
            x: 190,
            y: 230,
        },
        portrait: {
            x: 75,
            y: 935
        }
    },
    bonusInfoText1: {
        type: 'text',
        string: 'bonusInfo1',
        anchor: 0.5,
        landscape: {
            x: 230,
            y: 365,
            maxWidth: 260,
            style: 'bonusInfoText2',
        },
        portrait: {
            x: 405,
            y: 925,
            maxWidth: 402,
            style: 'bonusInfoText2Port',
        }
    },
    bonusInfoText2: {
        type: 'text',
        string: 'bonusInfo2',
        anchor: 0.5,
        landscape: {
            x: 230,
            y: 550,
            maxWidth: 260,
            style: 'bonusInfoText1',
        },
        portrait: {
            x: 405,
            y: 1015,
            maxWidth: 402,
            style: 'bonusInfoText1Port',
        }
    },
    bonusValueContainer: {
        type: 'container',
        children: [
            'bonusValue'
        ],
        landscape: {
            x: 958,
            y: 404
        },
        portrait: {
            x: 403,
            y: 605
        }
    },
    bonusValue: {
        type: 'text',
        style: 'bonusValveValue',
        anchor: 0.5,
        maxWidth: 693
    },
    bonusValveBackground: {
        type: 'sprite',
        landscape: {
            x: 499,
            y: 133,
            texture: 'bonusMainAreaBG',
        },
        portrait: {
            x: 2.5,
            y: 330,
            texture: 'bonusMainAreaBGPort',
        }
    },
    bonusValveContainer: {
        type: 'container',
        children: [
            'bonusValve1',
            'bonusValve2',
            'bonusValve3',
            'bonusValve4',
            'bonusValve5',
            'bonusValve6',
            'bonusValve7',
            'bonusValve8',
        ],
        landscape: {
            x: 0,
            y: 0,
        },
        portrait: {
            x: -2,
            y: 8
        }
    },
    bonusValve1: {
        type: 'container',
        landscape: {
            x: 620,
            y: 242
        },
        portrait: {
            x: 121,
            y: 430,
        }
    },
    bonusValve2: {
        type: 'container',
        landscape: {
            x: 840,
            y: 242
        },
        portrait: {
            x: 311,
            y: 430,
        }
    },
    bonusValve3: {
        type: 'container',
        landscape: {
            x: 1061,
            y: 242
        },
        portrait: {
            x: 501,
            y: 430,
        }
    },
    bonusValve4: {
        type: 'container',
        landscape: {
            x: 1281,
            y: 242
        },
        portrait: {
            x: 691,
            y: 430,
        }
    },
    bonusValve5: {
        type: 'container',
        landscape: {
            x: 620,
            y: 573
        },
        portrait: {
            x: 121,
            y: 770,
        }
    },
    bonusValve6: {
        type: 'container',
        landscape: {
            x: 840,
            y: 573
        },
        portrait: {
            x: 311,
            y: 770,
        }
    },
    bonusValve7: {
        type: 'container',
        landscape: {
            x: 1061,
            y: 573
        },
        portrait: {
            x: 501,
            y: 770,
        }
    },
    bonusValve8: {
        type: 'container',
        landscape: {
            x: 1281,
            y: 573
        },
        portrait: {
            x: 691,
            y: 770,
        }
    },
    bonusAutoPlayButton: {
        type: 'button',
        string: 'button_autoPlayBonus',
        landscape: {
            x: 920,
            y: 712
        },
        portrait: {
            x: 405,
            y: 1300
        },
        textures: {
            enabled: 'mainButtonEnabled',
            over: 'mainButtonOver',
            pressed: 'mainButtonPressed',
            disabled: 'mainButtonDisabled'
        },
        style: {
            enabled: 'mainButtonEnabled',
            over: 'mainButtonOver',
            pressed: 'mainButtonPressed',
            disabled: 'mainButtonDisabled'
        }
    },

    multiplierGameContainer: {
        type: 'container',
        children: [
            'multiplierGameBackground',
            'multiplierInfoContainer',
            'multiplierMeters',
            'multiplierStartButton'
        ]
    },

    multiplierGameBackground: {
        type: 'container',
        landscape: {
            x: 488,
            y: 130
        },
        portrait: {
            x: 405,
            y: 720
        }
    },
    multiplierMeters: {
        type: 'container',
        children: [
            'multiplierPrizeLabel',
            'multiplierPrizeValue',
            'multiplierPrizeMultiplierLabel',
            'multiplierPrizeMultiplierValue',
            'multiplierTotalWinLabel',
            'multiplierTotalWinValue'
        ]
    },
    multiplierPrizeLabel: {
        type: 'text',
        style: 'multiplierMeterLabel1',
        string: 'multiplierPrizeLabel',
        maxWidth: "215",
        landscape: {
            x: 1118,
            y: 200
        },
        portrait: {
            x: 575,
            y: 415
        }
    },
    multiplierPrizeValue: {
        type: 'text',
        style: 'multiplierPrizeWinValue',
        anchor: 0.5,
        maxWidth: 220,
        landscape: {
            x: 1225,
            y: 263
        },
        portrait: {
            x: 685,
            y: 478
        }
    },
    multiplierPrizeMultiplierLabel: {
        type: 'text',
        style: 'multiplierMeterLabel1',
        string: 'multiplierMultiplierLabel',
        maxWidth: "215",
        landscape: {
            x: 1118,
            y: 315
        },
        portrait: {
            x: 575,
            y: 530
        }
    },
    multiplierPrizeMultiplierValue: {
        type: 'text',
        style: 'multiplierMulitplierWinValue',
        anchor: 0.5,
        maxWidth: 220,
        landscape: {
            x: 1225,
            y: 378
        },
        portrait: {
            x: 685,
            y: 592
        }
    },
    multiplierTotalWinLabel: {
        type: 'text',
        style: 'multiplierMeterLabel2',
        string: 'multiplierTotalWinLabel',
        maxWidth: "215",
        landscape: {
            x: 1118,
            y: 440
        },
        portrait: {
            x: 575,
            y: 650
        }
    },
    multiplierTotalWinValue: {
        type: 'text',
        style: 'multiplierTotalWinValue',
        anchor: 0.5,
        maxWidth: 220,
        landscape: {
            x: 1225,
            y: 521
        },
        portrait: {
            x: 685,
            y: 737
        }
    },
    multiplierInfoContainer: {
        type: 'container',
        children: [
            'multiplierInfoBackground',
            'multiplierInfoText1',
            'multiplierInfoText2',
        ]
    },
    multiplierInfoText1: {
        type: 'text',        
        anchor: 0.5,
        landscape: {
            string: 'multiplierInfo1',
            x: 232,
            y: 300,
            style: 'multiplierInfoText1',
            maxWidth: 320,
        },
        portrait: {
            string: 'multiplierInfo1Port',
            x: 405,
            y: 970,
            style: 'multiplierInfoText1Port',
            maxWidth: 670,
        }
    },
    multiplierInfoText2: {
        type: 'text',
        style: 'multiplierInfoText2',
        string: 'multiplierInfo2',
        anchor: 0.5,
        landscape: {
            x: 232,
            y: 480,
            maxWidth: 320
        },
        portrait: {
            x: 405,
            y: 1050,
            maxWidth: 670
        }
    },
    multiplierInfoBackground: {
        type: 'sprite',
        landscape: {
            x: 16,
            y: 155,
            texture: 'bonusGameTutorialBG',
        },
        portrait: {
            x: 15,
            y: 880,
            texture: "bonusGameTutorialBGPort"
        }
    },
    multiplierStartButton: {
        type: 'button',
        string: 'button_start',
        landscape: {
            x: 920,
            y: 712
        },
        portrait: {
            x: 405,
            y: 1300
        },
        textures: {
            enabled: 'mainButtonEnabled',
            over: 'mainButtonOver',
            pressed: 'mainButtonPressed',
            disabled: 'mainButtonDisabled'
        },
        style: {
            enabled: 'mainButtonEnabled',
            over: 'mainButtonOver',
            pressed: 'mainButtonPressed',
            disabled: 'mainButtonDisabled'
        }
    },

    /*
     * NUMBER CONTAINER
     */
    numberContainer: {
        type: 'container',
        children: ['scenarioSymbols', 'playerSymbols', 'playerSymbolIndicators', 'lightIndicators']
    },

    /*
     * SCENARIO SYMBOLS
     */
    scenarioSymbols: {
        type: 'container',
        children: [ //'playerNumbersTitle',
            'scenarioSymbol49',
            'scenarioSymbol48',
            'scenarioSymbol47',
            'scenarioSymbol46',
            'scenarioSymbol45',
            'scenarioSymbol44',
            'scenarioSymbol43',
            'scenarioSymbol42',
            'scenarioSymbol41',
            'scenarioSymbol40',
            'scenarioSymbol39',
            'scenarioSymbol38',
            'scenarioSymbol37',
            'scenarioSymbol36',
            'scenarioSymbol35',
            'scenarioSymbol34',
            'scenarioSymbol33',
            'scenarioSymbol32',
            'scenarioSymbol31',
            'scenarioSymbol30',
            'scenarioSymbol29',
            'scenarioSymbol28',
            'scenarioSymbol27',
            'scenarioSymbol26',
            'scenarioSymbol25',
            'scenarioSymbol24',
            'scenarioSymbol23',
            'scenarioSymbol22',
            'scenarioSymbol21',
            'scenarioSymbol20',
            'scenarioSymbol19',
            'scenarioSymbol18',
            'scenarioSymbol17',
            'scenarioSymbol16',
            'scenarioSymbol15',
            'scenarioSymbol14',
            'scenarioSymbol13',
            'scenarioSymbol12',
            'scenarioSymbol11',
            'scenarioSymbol10',
            'scenarioSymbol9',
            'scenarioSymbol8',
            'scenarioSymbol7',
            'scenarioSymbol6',
            'scenarioSymbol5',
            'scenarioSymbol4',
            'scenarioSymbol3',
            'scenarioSymbol2',
            'scenarioSymbol1'
        ],
        landscape: {
            x: 480,
            y: 50
        },
        portrait: {
            x: 0,
            y: 259
        }
    },

    lightIndicators: {
        type: 'container',
        children: ['lightIndicator1', 'lightIndicator2', 'lightIndicator3', 'lightIndicator4'],
        landscape: {
            x: 966,
            y: 108
        },
        portrait: {
            x: 366,
            y: 188
        }
    },
    lightIndicator1: {
        type: 'container',
        landscape: {
            x: -390,
            y: -20,
            scale: 1
        },
        portrait: {
            x: 60,
            y: 122,
            scale: 1.2
        }
    },
    lightIndicator2: {
        type: 'container',
        landscape: {
            x: 0,
            y: 0,
            scale: 1
        },
        portrait: {
            x: 145,
            y: 122,
            scale: 1.2
        }
    },
    lightIndicator3: {
        type: 'container',
        landscape: {
            x: 69,
            y: 0,
            scale: 1
        },
        portrait: {
            x: 232,
            y: 122,
            scale: 1.2
        }
    },
    lightIndicator4: {
        type: 'container',
        landscape: {
            x: 138,
            y: 0,
            scale: 1
        },
        portrait: {
            x: 60,
            y: 122,
            scale: 1.2
        }
    },

    /*
    playerNumbersTitle: {
      type: 'text',
      string: 'yourNumbers',
      style: 'playerNumbersTitle',
      anchor: 0.5,
      maxWidth: 750,
      landscape: { x: 384, y: 38 },
      portrait: { x: 369, y: 32 },
    },
    */
    scenarioSymbol1: {
        type: 'container',
        landscape: {
            x: 92,
            y: 133,
        },
        portrait: {
            x: 78,
            y: 133,
        }
    },
    scenarioSymbol2: {
        type: 'container',
        landscape: {
            x: 182,
            y: 133,
        },
        portrait: {
            x: 158,
            y: 133,
        }
    },
    scenarioSymbol3: {
        type: 'container',
        landscape: {
            x: 272,
            y: 133,
        },
        portrait: {
            x: 238,
            y: 133,
        }
    },
    scenarioSymbol4: {
        type: 'container',
        landscape: {
            x: 362,
            y: 133,
        },
        portrait: {
            x: 318,
            y: 133,
        }
    },
    scenarioSymbol5: {
        type: 'container',
        landscape: {
            x: 452,
            y: 133,
        },
        portrait: {
            x: 398,
            y: 133,
        }
    },
    scenarioSymbol6: {
        type: 'container',
        landscape: {
            x: 542,
            y: 133,
        },
        portrait: {
            x: 478,
            y: 133,
        }
    },
    scenarioSymbol7: {
        type: 'container',
        landscape: {
            x: 632,
            y: 133,
        },
        portrait: {
            x: 558,
            y: 133,
        }
    },
    scenarioSymbol8: {
        type: 'container',
        landscape: {
            x: 92,
            y: 205,
        },
        portrait: {
            x: 78,
            y: 205,
        }
    },
    scenarioSymbol9: {
        type: 'container',
        landscape: {
            x: 182,
            y: 205,
        },
        portrait: {
            x: 158,
            y: 205,
        }
    },
    scenarioSymbol10: {
        type: 'container',
        landscape: {
            x: 272,
            y: 205,
        },
        portrait: {
            x: 238,
            y: 205,
        }
    },
    scenarioSymbol11: {
        type: 'container',
        landscape: {
            x: 362,
            y: 205,
        },
        portrait: {
            x: 318,
            y: 205,
        }
    },
    scenarioSymbol12: {
        type: 'container',
        landscape: {
            x: 452,
            y: 205,
        },
        portrait: {
            x: 398,
            y: 205,
        }
    },
    scenarioSymbol13: {
        type: 'container',
        landscape: {
            x: 542,
            y: 205,
        },
        portrait: {
            x: 478,
            y: 205,
        }
    },
    scenarioSymbol14: {
        type: 'container',
        landscape: {
            x: 632,
            y: 205,
        },
        portrait: {
            x: 558,
            y: 205,
        }
    },
    scenarioSymbol15: {
        type: 'container',
        landscape: {
            x: 92,
            y: 277,
        },
        portrait: {
            x: 78,
            y: 277,
        }
    },
    scenarioSymbol16: {
        type: 'container',
        landscape: {
            x: 182,
            y: 277,
        },
        portrait: {
            x: 158,
            y: 277,
        }
    },
    scenarioSymbol17: {
        type: 'container',
        landscape: {
            x: 272,
            y: 277,
        },
        portrait: {
            x: 238,
            y: 277,
        }
    },
    scenarioSymbol18: {
        type: 'container',
        landscape: {
            x: 362,
            y: 277,
        },
        portrait: {
            x: 318,
            y: 277,
        }
    },
    scenarioSymbol19: {
        type: 'container',
        landscape: {
            x: 452,
            y: 277,
        },
        portrait: {
            x: 398,
            y: 277,
        }
    },
    scenarioSymbol20: {
        type: 'container',
        landscape: {
            x: 542,
            y: 277,
        },
        portrait: {
            x: 478,
            y: 277,
        }
    },
    scenarioSymbol21: {
        type: 'container',
        landscape: {
            x: 632,
            y: 277,
        },
        portrait: {
            x: 558,
            y: 277,
        }
    },
    scenarioSymbol22: {
        type: 'container',
        landscape: {
            x: 92,
            y: 349,
        },
        portrait: {
            x: 78,
            y: 349,
        }
    },
    scenarioSymbol23: {
        type: 'container',
        landscape: {
            x: 182,
            y: 349,
        },
        portrait: {
            x: 158,
            y: 349,
        }
    },
    scenarioSymbol24: {
        type: 'container',
        landscape: {
            x: 272,
            y: 349,
        },
        portrait: {
            x: 238,
            y: 349,
        }
    },
    scenarioSymbol25: {
        type: 'container',
        landscape: {
            x: 362,
            y: 349,
        },
        portrait: {
            x: 318,
            y: 349,
        }
    },
    scenarioSymbol26: {
        type: 'container',
        landscape: {
            x: 452,
            y: 349,
        },
        portrait: {
            x: 398,
            y: 349,
        }
    },
    scenarioSymbol27: {
        type: 'container',
        landscape: {
            x: 542,
            y: 349,
        },
        portrait: {
            x: 478,
            y: 349,
        }
    },
    scenarioSymbol28: {
        type: 'container',
        landscape: {
            x: 632,
            y: 349,
        },
        portrait: {
            x: 558,
            y: 349,
        }
    },
    scenarioSymbol29: {
        type: 'container',
        landscape: {
            x: 92,
            y: 421,
        },
        portrait: {
            x: 78,
            y: 421,
        }
    },
    scenarioSymbol30: {
        type: 'container',
        landscape: {
            x: 182,
            y: 421,
        },
        portrait: {
            x: 158,
            y: 421,
        }
    },
    scenarioSymbol31: {
        type: 'container',
        landscape: {
            x: 272,
            y: 421,
        },
        portrait: {
            x: 238,
            y: 421,
        }
    },
    scenarioSymbol32: {
        type: 'container',
        landscape: {
            x: 362,
            y: 421,
        },
        portrait: {
            x: 318,
            y: 421,
        }
    },
    scenarioSymbol33: {
        type: 'container',
        landscape: {
            x: 452,
            y: 421,
        },
        portrait: {
            x: 398,
            y: 421,
        }
    },
    scenarioSymbol34: {
        type: 'container',
        landscape: {
            x: 542,
            y: 421,
        },
        portrait: {
            x: 478,
            y: 421,
        }
    },
    scenarioSymbol35: {
        type: 'container',
        landscape: {
            x: 632,
            y: 421,
        },
        portrait: {
            x: 558,
            y: 421,
        }
    },
    scenarioSymbol36: {
        type: 'container',
        landscape: {
            x: 92,
            y: 493,
        },
        portrait: {
            x: 78,
            y: 493,
        }
    },
    scenarioSymbol37: {
        type: 'container',
        landscape: {
            x: 182,
            y: 493,
        },
        portrait: {
            x: 158,
            y: 493,
        }
    },
    scenarioSymbol38: {
        type: 'container',
        landscape: {
            x: 272,
            y: 493,
        },
        portrait: {
            x: 238,
            y: 493,
        }
    },
    scenarioSymbol39: {
        type: 'container',
        landscape: {
            x: 362,
            y: 493,
        },
        portrait: {
            x: 318,
            y: 493,
        }
    },
    scenarioSymbol40: {
        type: 'container',
        landscape: {
            x: 452,
            y: 493,
        },
        portrait: {
            x: 398,
            y: 493,
        }
    },
    scenarioSymbol41: {
        type: 'container',
        landscape: {
            x: 542,
            y: 493,
        },
        portrait: {
            x: 478,
            y: 493,
        }
    },
    scenarioSymbol42: {
        type: 'container',
        landscape: {
            x: 632,
            y: 493,
        },
        portrait: {
            x: 558,
            y: 493,
        }
    },
    scenarioSymbol43: {
        type: 'container',
        landscape: {
            x: 92,
            y: 565,
        },
        portrait: {
            x: 78,
            y: 565,
        }
    },
    scenarioSymbol44: {
        type: 'container',
        landscape: {
            x: 182,
            y: 565,
        },
        portrait: {
            x: 158,
            y: 565,
        }
    },
    scenarioSymbol45: {
        type: 'container',
        landscape: {
            x: 272,
            y: 565,
        },
        portrait: {
            x: 238,
            y: 565,
        }
    },
    scenarioSymbol46: {
        type: 'container',
        landscape: {
            x: 362,
            y: 565,
        },
        portrait: {
            x: 318,
            y: 565,
        }
    },
    scenarioSymbol47: {
        type: 'container',
        landscape: {
            x: 452,
            y: 565,
        },
        portrait: {
            x: 398,
            y: 565,
        }
    },
    scenarioSymbol48: {
        type: 'container',
        landscape: {
            x: 542,
            y: 565,
        },
        portrait: {
            x: 478,
            y: 565,
        }
    },
    scenarioSymbol49: {
        type: 'container',
        landscape: {
            x: 632,
            y: 565,
        },
        portrait: {
            x: 558,
            y: 565,
        }
    },

    /*
     * PRIZE TABLE
     */
    prizeTable: {
        type: 'container',
        children: [
            /*'prizeTableBackground',*/
            'row01Highlight', 'row01Column02', 'row02Highlight', 'row02Column02', 'row03Highlight', 'row03Column02', 'row04Highlight', 'row04Column02', 'row05Highlight', 'row05Column02', 'row06Highlight', 'row06Column02', 'row07Highlight', 'row07Column02'
        ],
        landscape: {
            x: 940,
            y: 125
        },
        portrait: {
            x: 410,
            y: 335
        }
    },

    /*
    prizeTableBackground: {
      type: 'sprite',
      landscape: {
        texture: 'landscape_tableBackground',
      },
      portrait: {
        texture: 'portrait_tableBackground',
      },
    },
    */
    row01Column02: {
        type: 'text',
        style: 'prizeTableValues',
        anchor: 0.5,
        maxWidth: 400,
        landscape: {
            x: 333,
            y: 58
        },
        portrait: {
            x: 275,
            y: 56
        }
    },
    row01Highlight: {
        type: 'sprite',
        landscape: {
            texture: 'landscape_tableHighlight',
            x: 0,
            y: 38
        },
        portrait: {
            texture: 'portrait_tableHighlight',
            x: 0,
            y: 38
        }
    },
    row02Column02: {
        type: 'text',
        style: 'prizeTableValues',
        anchor: 0.5,
        maxWidth: 400,
        landscape: {
            x: 333,
            y: 130
        },
        portrait: {
            x: 275,
            y: 129
        }
    },
    row02Highlight: {
        type: 'sprite',
        landscape: {
            texture: 'landscape_tableHighlight',
            x: 0,
            y: 74
        },
        portrait: {
            texture: 'portrait_tableHighlight',
            x: 0,
            y: 74
        }
    },
    row03Column02: {
        type: 'text',
        style: 'prizeTableValues',
        anchor: 0.5,
        maxWidth: 400,
        landscape: {
            x: 333,
            y: 201
        },
        portrait: {
            x: 275,
            y: 199
        }
    },
    row03Highlight: {
        type: 'sprite',
        landscape: {
            texture: 'landscape_tableHighlight',
            x: 0,
            y: 110
        },
        portrait: {
            texture: 'portrait_tableHighlight',
            x: 0,
            y: 110
        }
    },
    row04Column02: {
        type: 'text',
        style: 'prizeTableValues',
        anchor: 0.5,
        maxWidth: 400,
        landscape: {
            x: 333,
            y: 275
        },
        portrait: {
            x: 275,
            y: 272
        }
    },
    row04Highlight: {
        type: 'sprite',
        landscape: {
            texture: 'landscape_tableHighlight',
            x: 0,
            y: 146
        },
        portrait: {
            texture: 'portrait_tableHighlight',
            x: 0,
            y: 146
        }
    },
    row05Column02: {
        type: 'text',
        style: 'prizeTableValues',
        anchor: 0.5,
        maxWidth: 400,
        landscape: {
            x: 333,
            y: 347
        },
        portrait: {
            x: 275,
            y: 344
        }
    },
    row05Highlight: {
        type: 'sprite',
        landscape: {
            texture: 'landscape_tableHighlight',
            x: 0,
            y: 182
        },
        portrait: {
            texture: 'portrait_tableHighlightRounded',
            x: 0,
            y: 420
        }
    },
    row06Column02: {
        type: 'text',
        style: 'prizeTableValues',
        anchor: 0.5,
        maxWidth: 400,
        landscape: {
            x: 333,
            y: 419
        },
        portrait: {
            x: 275,
            y: 414
        }
    },
    row06Highlight: {
        type: 'sprite',
        landscape: {
            texture: 'landscape_tableHighlight',
            x: 0,
            y: 218
        },
        portrait: {
            texture: 'portrait_tableHighlight',
            x: 374,
            y: 38
        }
    },
    row07Column02: {
        type: 'text',
        style: 'prizeTableValues',
        anchor: 0.5,
        maxWidth: 400,
        landscape: {
            x: 333,
            y: 491
        },
        portrait: {
            x: 275,
            y: 486
        }
    },
    row07Highlight: {
        type: 'sprite',
        landscape: {
            texture: 'landscape_tableHighlight',
            x: 0,
            y: 254
        },
        portrait: {
            texture: 'portrait_tableHighlight',
            x: 374,
            y: 74
        }
    },

    /*
     * Container for bonus symbols to fly around
     */
    bonusSymbolFly: {
        type: 'container'
    },


    /*
     * BONUS LOGO
     */
    bonusLogo: {
        type: 'sprite',
        anchor: 0.5,
        landscape: {
            x: 327,
            y: 111,
            texture: 'landscape_bonus_gameLogo'
        },
        portrait: {
            x: 585,
            y: 259,
            scale: 0.585,
            texture: 'portrait_bonus_gameLogo'
        }
    },

    /*
     * Bonus Prize Table
     */
    bonusPrizeTable: {
        type: 'container',
        children: ['prizeTableAnim', 'prizeLevel1', 'prizeLevel2', 'prizeLevel3', 'prizeLevel4', 'prizeLevel5', 'prizeLevel6'],
        landscape: {
            scale: 0.75,
            x: 75,
            y: 150
        },
        portrait: {
            scale: 1,
            x: 0,
            y: 0
        }
    },
    prizeTableAnim: {
        type: 'sprite'
    },
    prizeLevel6: {
        type: 'container',
        children: ['bonusPrize6Win', 'bonusPrize6NoWin'],
        landscape: {
            x: 300,
            y: 127
        },
        portrait: {
            x: 245,
            y: 138
        }
    },
    prizeLevel5: {
        type: 'container',
        children: ['bonusPrize5Win', 'bonusPrize5NoWin'],
        landscape: {
            x: 300,
            y: 219
        },
        portrait: {
            x: 245,
            y: 230
        }
    },
    prizeLevel4: {
        type: 'container',
        children: ['bonusPrize4Win', 'bonusPrize4NoWin'],
        landscape: {
            x: 300,
            y: 303
        },
        portrait: {
            x: 245,
            y: 314
        }
    },
    prizeLevel3: {
        type: 'container',
        children: ['bonusPrize3Win', 'bonusPrize3NoWin'],
        landscape: {
            x: 300,
            y: 379
        },
        portrait: {
            x: 245,
            y: 390
        }
    },
    prizeLevel2: {
        type: 'container',
        children: ['bonusPrize2Win', 'bonusPrize2NoWin'],
        landscape: {
            x: 300,
            y: 433
        },
        portrait: {
            x: 245,
            y: 444
        }
    },
    prizeLevel1: {
        type: 'container',
        children: ['bonusPrize1Win', 'bonusPrize1NoWin'],
        landscape: {
            x: 300,
            y: 468
        },
        portrait: {
            x: 245,
            y: 479
        }
    },
    bonusPrize1Win: {
        type: 'container',
        children: ['bonusPrize1WinIn', 'bonusPrize1WinOut']
    },
    bonusPrize1NoWin: {
        type: 'container',
        children: ['bonusPrize1NoWinIn', 'bonusPrize1NoWinOut']
    },
    bonusPrize2Win: {
        type: 'container',
        children: ['bonusPrize2WinIn', 'bonusPrize2WinOut']
    },
    bonusPrize2NoWin: {
        type: 'container',
        children: ['bonusPrize2NoWinIn', 'bonusPrize2NoWinOut']
    },
    bonusPrize3Win: {
        type: 'container',
        children: ['bonusPrize3WinIn', 'bonusPrize3WinOut']
    },
    bonusPrize3NoWin: {
        type: 'container',
        children: ['bonusPrize3NoWinIn', 'bonusPrize3NoWinOut']
    },
    bonusPrize4Win: {
        type: 'container',
        children: ['bonusPrize4WinIn', 'bonusPrize4WinOut']
    },
    bonusPrize4NoWin: {
        type: 'container',
        children: ['bonusPrize4NoWinIn', 'bonusPrize4NoWinOut']
    },
    bonusPrize5Win: {
        type: 'container',
        children: ['bonusPrize5WinIn', 'bonusPrize5WinOut']
    },
    bonusPrize5NoWin: {
        type: 'container',
        children: ['bonusPrize5NoWinIn', 'bonusPrize5NoWinOut']
    },
    bonusPrize6Win: {
        type: 'container',
        children: ['bonusPrize6WinIn', 'bonusPrize6WinOut']
    },
    bonusPrize6NoWin: {
        type: 'container',
        children: ['bonusPrize6NoWinIn', 'bonusPrize6NoWinOut']
    },
    bonusPrize1WinIn: {
        type: 'text',
        style: 'bonusWin',
        anchor: 0.5,
        maxWidth: 550
    },
    bonusPrize1NoWinIn: {
        type: 'text',
        style: 'bonusNoWin',
        anchor: 0.5,
        maxWidth: 550
    },
    bonusPrize1WinOut: {
        type: 'text',
        style: 'bonusWin',
        anchor: 0.5,
        maxWidth: 550
    },
    bonusPrize1NoWinOut: {
        type: 'text',
        style: 'bonusNoWin',
        anchor: 0.5,
        maxWidth: 550
    },
    bonusPrize2WinIn: {
        type: 'text',
        style: 'bonusWin',
        anchor: 0.5,
        maxWidth: 550
    },
    bonusPrize2NoWinIn: {
        type: 'text',
        style: 'bonusNoWin',
        anchor: 0.5,
        maxWidth: 550
    },
    bonusPrize2WinOut: {
        type: 'text',
        style: 'bonusWin',
        anchor: 0.5,
        maxWidth: 550
    },
    bonusPrize2NoWinOut: {
        type: 'text',
        style: 'bonusNoWin',
        anchor: 0.5,
        maxWidth: 550
    },
    bonusPrize3WinIn: {
        type: 'text',
        style: 'bonusWin3',
        anchor: 0.5,
        maxWidth: 550
    },
    bonusPrize3NoWinIn: {
        type: 'text',
        style: 'bonusNoWin3',
        anchor: 0.5,
        maxWidth: 550
    },
    bonusPrize3WinOut: {
        type: 'text',
        style: 'bonusWin3',
        anchor: 0.5,
        maxWidth: 550
    },
    bonusPrize3NoWinOut: {
        type: 'text',
        style: 'bonusNoWin3',
        anchor: 0.5,
        maxWidth: 550
    },
    bonusPrize4WinIn: {
        type: 'text',
        style: 'bonusWin4',
        anchor: 0.5,
        maxWidth: 550
    },
    bonusPrize4NoWinIn: {
        type: 'text',
        style: 'bonusNoWin4',
        anchor: 0.5,
        maxWidth: 550
    },
    bonusPrize4WinOut: {
        type: 'text',
        style: 'bonusWin4',
        anchor: 0.5,
        maxWidth: 550
    },
    bonusPrize4NoWinOut: {
        type: 'text',
        style: 'bonusNoWin4',
        anchor: 0.5,
        maxWidth: 550
    },
    bonusPrize5WinIn: {
        type: 'text',
        style: 'bonusWin5',
        anchor: 0.5,
        maxWidth: 550
    },
    bonusPrize5NoWinIn: {
        type: 'text',
        style: 'bonusNoWin5',
        anchor: 0.5,
        maxWidth: 550
    },
    bonusPrize5WinOut: {
        type: 'text',
        style: 'bonusWin5',
        anchor: 0.5,
        maxWidth: 550
    },
    bonusPrize5NoWinOut: {
        type: 'text',
        style: 'bonusNoWin5',
        anchor: 0.5,
        maxWidth: 550
    },
    bonusPrize6WinIn: {
        type: 'text',
        style: 'bonusWin6',
        anchor: 0.5,
        maxWidth: 550
    },
    bonusPrize6NoWinIn: {
        type: 'text',
        style: 'bonusNoWin6',
        anchor: 0.5,
        maxWidth: 550
    },
    bonusPrize6WinOut: {
        type: 'text',
        style: 'bonusWin6',
        anchor: 0.5,
        maxWidth: 550
    },
    bonusPrize6NoWinOut: {
        type: 'text',
        style: 'bonusNoWin6',
        anchor: 0.5,
        maxWidth: 550
    },
    bonusLives: {
        type: 'container',
        children: ['bonusLivesLabel', 'bonusLife1', 'bonusLife2', 'bonusLife3'],
        landscape: {
            x: 163,
            y: 526
        },
        portrait: {
            x: 469,
            y: 361
        }
    },
    bonusLivesLabel: {
        type: 'text',
        style: 'bonusFind3ToEnd',
        string: 'bonusLives',
        anchor: 0.5,
        maxWidth: 320,
        landscape: {
            x: 138,
            y: 14
        },
        portrait: {
            x: 112,
            y: 0
        }
    },
    bonusLife1: {
        type: 'container',
        landscape: {
            x: 25,
            y: 55,
            scale: 0.813
        },
        portrait: {
            x: 0,
            y: 42,
            scale: 0.813
        }
    },
    bonusLife2: {
        type: 'container',
        landscape: {
            x: 113,
            y: 55,
            scale: 0.813
        },
        portrait: {
            x: 88,
            y: 42,
            scale: 0.813
        }
    },
    bonusLife3: {
        type: 'container',
        landscape: {
            x: 201,
            y: 55,
            scale: 0.813
        },
        portrait: {
            x: 176,
            y: 42,
            scale: 0.813
        }
    },
    bonusPickPoints: {
        type: 'container',
        children: ['bonusInfoString', 'bonusPickPoint1', 'bonusPickPoint2', 'bonusPickPoint3', 'bonusPickPoint4', 'bonusPickPoint5', 'bonusPickPoint6', 'bonusPickPoint7', 'bonusPickPoint8', 'bonusPickPoint9', 'bonusPickPoint10', 'bonusPickPoint11', 'bonusPickPoint12'],
        landscape: {
            x: 596,
            y: 95
        },
        portrait: {
            x: 54,
            y: 551
        }
    },
    bonusInfoString: {
        type: 'text',
        style: 'bonusFind3ToWin',
        string: 'bonusInfo',
        anchor: 0.5,
        maxWidth: 702,
        y: 0,
        x: 351
    },
    bonusPickPoint1: {
        type: 'container',
        landscape: {
            x: 0,
            y: 25
        },
        portrait: {
            x: 0,
            y: 25
        }
    },
    bonusPickPoint2: {
        type: 'container',
        landscape: {
            x: 178,
            y: 25
        },
        portrait: {
            x: 178,
            y: 25
        }
    },
    bonusPickPoint3: {
        type: 'container',
        landscape: {
            x: 356,
            y: 25
        },
        portrait: {
            x: 356,
            y: 25
        }
    },
    bonusPickPoint4: {
        type: 'container',
        landscape: {
            x: 534,
            y: 25
        },
        portrait: {
            x: 534,
            y: 25
        }
    },
    bonusPickPoint5: {
        type: 'container',
        landscape: {
            x: 0,
            y: 204
        },
        portrait: {
            x: 0,
            y: 204
        }
    },
    bonusPickPoint6: {
        type: 'container',
        landscape: {
            x: 178,
            y: 204
        },
        portrait: {
            x: 178,
            y: 204
        }
    },
    bonusPickPoint7: {
        type: 'container',
        landscape: {
            x: 356,
            y: 204
        },
        portrait: {
            x: 356,
            y: 204
        }
    },
    bonusPickPoint8: {
        type: 'container',
        landscape: {
            x: 534,
            y: 204
        },
        portrait: {
            x: 534,
            y: 204
        }
    },
    bonusPickPoint9: {
        type: 'container',
        landscape: {
            x: 0,
            y: 381
        },
        portrait: {
            x: 0,
            y: 381
        }
    },
    bonusPickPoint10: {
        type: 'container',
        landscape: {
            x: 178,
            y: 381
        },
        portrait: {
            x: 178,
            y: 381
        }
    },
    bonusPickPoint11: {
        type: 'container',
        landscape: {
            x: 356,
            y: 381
        },
        portrait: {
            x: 356,
            y: 381
        }
    },
    bonusPickPoint12: {
        type: 'container',
        landscape: {
            x: 534,
            y: 381
        },
        portrait: {
            x: 534,
            y: 381
        }
    },

    /*
     * Container for bonus particles to fly to the prize table
     */
    bonusParticles: {
        type: 'container'
    },

    /*
     * How To Play
     */
    howToPlayPages: {
        type: 'container',
        children: ['howToPlayPage1Container', 'howToPlayPage2Container', 'howToPlayPage3Container']
    },
    howToPlayPage1Container: {
        type: 'container',
        children: [
            'howToPlayPage1',
            'howToPlayPage1Title',
            'howToPlayPage1Image',
        ]
    },
    howToPlayPage1: {
        type: 'text',
        style: 'howToPlayInfoText',
        fontSize: 30,
        anchor: 0.5,
        align: 'center',
        landscape: {
            string: 'page1',
            x: 720,
            y: 460,
            maxWidth: 1100
        },
        portrait: {
            string: 'page1Port',
            x: 405,
            y: 694,
            maxWidth: 560
        }
    },
    howToPlayPage1Title: {
        type: 'text',
        style: 'howToPlayTitle',
        string: 'howToPlayTitle',
        anchor: 0.5,
        landscape: {x: 720, y: 190},
        portrait: {x: 405, y: 300},
    },
    howToPlayPage1Image: {
        type: 'sprite',
        anchor: 0.5,
        landscape: {
            x: 720,
            y: 280
        },
        portrait: {
            x: 405,
            y: 400
        },
    },
    howToPlayPage2: {
        type: 'text',
        style: 'howToPlayInfoText',
        anchor: 0.5,
        align: 'center',
        landscape: {
            string: 'page2',
            x: 720,
            y: 460,
            maxWidth: 1100
        },
        portrait: {
            string: 'page2Port',
            x: 405,
            y: 694,
            maxWidth: 560
        }
    },
    howToPlayPage2Image: {
        type: 'sprite',
        texture: 'tutorialBonus',
        anchor: 0.5,
        landscape: {
            x: 720,
            y: 285
        },
        portrait: {
            x: 405,
            y: 400
        },
    },
    howToPlayPage2Title: {
        type: 'text',
        string: 'page2Title',
        style: 'howToPlayTitle',
        anchor: 0.5,
        landscape: {x: 720, y: 190},
        portrait: {x: 405, y: 300},
    },
    howToPlayPage2Container: {
        type: 'container',
        children: [
            'howToPlayPage2',
            'howToPlayPage2Title',
            'howToPlayPage2Image',
            'howToPlayPage2ImageText',
        ]
    },
    howToPlayPage2ImageText: {
        type: 'text',
        style: 'bonusLabel',
        string: 'Bonus',
        anchor: 0.5,
        maxWidth: 190,
        landscape: {
            x: 750,
            y: 286
        },
        portrait: {
            x: 420,
            y: 400
        }
    },
    howToPlayPage3: {
        type: 'text',
        style: 'howToPlayInfoText',
        anchor: 0.5,
        align: 'center',
        landscape: {
            string: 'page3',
            x: 720,
            y: 460,
            maxWidth: 1100
        },
        portrait: {
            string: 'page3Port',
            x: 405,
            y: 694,
            maxWidth: 560
        }
    },
    howToPlayPage3Title: {
        type: 'text',
        string: 'page3Title',
        style: 'howToPlayTitle',
        anchor: 0.5,
        landscape: {x: 720, y: 190},
        portrait: {x: 405, y: 300},
    },
    howToPlayPage3Container: {
        type: 'container',
        children: [
            'howToPlayPage3',
            'howToPlayPage3Title',
            'howToPlayPage3Image',
            'howToPlayPage3ImageText',
        ]
    },
    howToPlayPage3Image: {
        type: 'sprite',
        texture: 'tutorialMultiplyer',
        anchor: 0.5,
        landscape: {
            x: 720,
            y: 280
        },
        portrait: {
            x: 405,
            y: 400
        },
    },
    howToPlayPage3ImageText: {
        type: 'text',
        style: 'multiplierLabel',
        string: 'Multiplier',
        anchor: 0.5,
        maxWidth: 280,
        landscape: {
            x: 720,
            y: 268
        },
        portrait: {
            x: 405,
            y: 390
        }
    },
    howToPlayTitle: {
        type: 'text',
        string: 'howToPlay',
        style: 'howToPlayTitle',
        anchor: 0.5,
        landscape: {
            x: 720,
            y: 178
        },
        portrait: {
            x: 405,
            y: 292
        },
        visible: false
    },

    /*
     * UI Panel
     */
    buttonBar: {
        type: 'container',
        landscape: {
            x: 0,
            y: 662
        },
        portrait: {
            x: 0,
            y: 1248
        },
        children: ['helpButtonStatic', 'helpButton', 'homeButtonStatic', 'homeButton', 'exitButton', 'playAgainButton', 'tryAgainButton', 'buyButton', 'buyButtonAnim', 'tryButton', 'tryButtonAnim', 'moveToMoneyButton', 'retryButton']
    },
    buyButtonAnim: {
        type: 'sprite',
        anchor: 0.5
    },
    tryButtonAnim: {
        type: 'sprite',
        anchor: 0.5
    },
    footerContainer: {
        type: 'container',
        children: ['footerBG', 'balanceMeter', 'ticketCostMeter', 'winMeter', 'divider_1_3', 'divider_2_3', 'divider_1_2'],
        landscape: {
            y: 761
        },
        portrait: {
            y: 1349
        }
    },
    footerBG: {
        type: 'sprite',
        landscape: {
            texture: 'landscape_footerBar',
            y: 5
        },
        portrait: {
            texture: 'portrait_footerBar',
            y: 5
        }
    },
    autoPlayButton_default: {
        type: 'point',
        landscape: {
            x: 720,
            y: 712
        },
        portrait: {
            x: 405,
            y: 1297
        }
    },
    autoPlayButton_multi: {
        type: 'point',
        landscape: {
            x: 918,
            y: 712
        },
        portrait: {
            x: 405,
            y: 1297
        }
    },
    howToPlayBackground: {
        type: 'sprite',
        anchor: {
            x: 0.5
        },
        landscape: {
            x: 720,
            y: 98,
            texture: 'landscape_tutorialBackground'
        },
        portrait: {
            x: 405,
            y: 212,
            texture: 'portrait_tutorialBackground'
        }
    },
    versionText: {
        type: 'text',
        style: 'versionText',
        x: 35,
        landscape: {
            y: 120
        },
        portrait: {
            y: 234
        },
        alpha: 0.5
    },
    howToPlayClose: {
        type: 'button',
        string: 'button_ok',
        landscape: {
            x: 720,
            y: 678
        },
        portrait: {
            x: 405,
            y: 1071
        },
        textures: {
            enabled: 'tutorialOKButtonEnabled',
            over: 'tutorialOKButtonOver',
            pressed: 'tutorialOKButtonPressed'
        },
        style: {
            enabled: 'tutorialOKButtonEnabled',
            over: 'tutorialOKButtonOver',
            pressed: 'tutorialOKButtonPressed'
        }
    },
    howToPlayPrevious: {
        type: 'button',
        landscape: {
            x: 72,
            y: 418
        },
        portrait: {
            x: 64,
            y: 682
        },
        textures: {
            enabled: 'tutorialLeftButtonEnabled',
            disabled: 'tutorialLeftButtonDisabled',
            over: 'tutorialLeftButtonOver',
            pressed: 'tutorialLeftButtonPressed'
        }
    },
    howToPlayNext: {
        type: 'button',
        landscape: {
            x: 1368,
            y: 418
        },
        portrait: {
            x: 746,
            y: 682
        },
        textures: {
            enabled: 'tutorialRightButtonEnabled',
            disabled: 'tutorialRightButtonDisabled',
            over: 'tutorialRightButtonOver',
            pressed: 'tutorialRightButtonPressed'
        }
    },
    howToPlayIndicators: {
        type: 'container',
        children: ['howToPlayIndicatorActive', 'howToPlayIndicatorInactive'],
        landscape: {
            x: 720,
            y: 610
        },
        portrait: {
            x: 405,
            y: 999
        }
    },
    howToPlayIndicatorActive: {
        type: 'sprite',
        texture: 'tutorialPageIndicatorActive'
    },
    howToPlayIndicatorInactive: {
        type: 'sprite',
        texture: 'tutorialPageIndicatorInactive'
    },
    audioButtonContainer: {
        type: 'container',
        landscape: {
            x: 79,
            y: 675
        },
        portrait: {
            x: 71,
            y: 1071
        }
    },
    resultPlaquesContainer: {
        type: 'container',
        children: ['resultPlaqueOverlay', 'winPlaqueBG', 'winPlaqueMessage', 'winPlaqueValue', 'winPlaqueCloseButton', 'losePlaqueBG', 'losePlaqueMessage', 'losePlaqueCloseButton'],
        landscape: {
            x: 720,
            y: 377
        },
        portrait: {
            x: 405,
            y: 678
        }
    },
    resultPlaqueOverlay: {
        type: 'sprite',
        anchor: 0.5,
        y: -114
    },
    winPlaqueMessage: {
        type: 'text',
        string: 'message_win',
        style: 'winPlaqueBody',
        y: -68,
        anchor: 0.5,
        maxWidth: 746
    },
    winPlaqueValue: {
        type: 'text',
        style: 'winPlaqueValue',
        y: 40,
        anchor: 0.5,
        maxWidth: 746
    },
    winPlaqueCloseButton: {
        type: 'button',
        alpha: 0,
        landscape: {
            textures: {
                enabled: 'landscape_endOfGameMessageWinBackground',
                over: 'landscape_endOfGameMessageWinBackground',
                pressed: 'landscape_endOfGameMessageWinBackground'
            }
        },
        portrait: {
            textures: {
                enabled: 'portrait_endOfGameMessageWinBackground',
                over: 'portrait_endOfGameMessageWinBackground',
                pressed: 'portrait_endOfGameMessageWinBackground'
            }
        }
    },
    losePlaqueMessage: {
        type: 'text',
        string: 'message_nonWin',
        style: 'losePlaqueBody',
        anchor: 0.5,
        portrait: {
            maxWidth: 746
        },
        landscape: {
            maxWidth: 746
        }
    },
    losePlaqueCloseButton: {
        type: 'button',
        alpha: 0,
        landscape: {
            textures: {
                enabled: 'landscape_endOfGameMessageNoWinBackground',
                over: 'landscape_endOfGameMessageNoWinBackground',
                pressed: 'landscape_endOfGameMessageNoWinBackground'
            }
        },
        portrait: {
            textures: {
                enabled: 'portrait_endOfGameMessageNoWinBackground',
                over: 'portrait_endOfGameMessageNoWinBackground',
                pressed: 'portrait_endOfGameMessageNoWinBackground'
            }
        }
    },
    buyButton: {
        type: 'button',
        string: 'button_buy',
        textures: {
            enabled: 'buyButtonEnabled',
            over: 'buyButtonOver',
            pressed: 'buyButtonPressed',
            disabled: 'buyButtonDisabled'
        },
        style: {
            enabled: 'buyButtonEnabled',
            over: 'buyButtonOver',
            pressed: 'buyButtonPressed',
            disabled: 'buyButtonDisabled'
        }
    },
    tryButton: {
        type: 'button',
        string: 'button_try',
        textures: {
            enabled: 'buyButtonEnabled',
            over: 'buyButtonOver',
            pressed: 'buyButtonPressed',
            disabled: 'buyButtonDisabled'
        },
        style: {
            enabled: 'buyButtonEnabled',
            over: 'buyButtonOver',
            pressed: 'buyButtonPressed',
            disabled: 'buyButtonDisabled'
        }
    },
    retryButton : {
        type: 'button',
        string: 'button_retry',
        textures: {
            enabled: 'buyButtonEnabled',
            over: 'buyButtonOver',
            pressed: 'buyButtonPressed',
            disabled: 'buyButtonDisabled'
        },
        style: {
            enabled: 'buyButtonEnabled',
            over: 'buyButtonOver',
            pressed: 'buyButtonPressed',
            disabled: 'buyButtonDisabled'
        }
    },
    ticketSelectBarSmall: {
        type: 'container',
        landscape: {
            x: 578,
            y: 712
        },
        portrait: {
            x: 405,
            y: 1205
        },
        children: ['ticketSelectBarBG', 'ticketSelectCostValue', 'ticketCostDownButtonStatic', 'ticketCostUpButtonStatic', 'ticketCostDownButton', 'ticketCostUpButton', 'ticketCostIndicators']
    },
    ticketSelectCostValue: {
        type: 'text',
        portrait: {
            y: -7
        },
        landscape: {
            y: -7
        },
        anchor: 0.5,
        maxWidth: 185,
        style: 'ticketSelectCostValue'
    },
    ticketCostDownButton: {
        type: 'button',
        portrait: {
            x: -208
        },
        landscape: {
            x: -143
        },
        textures: {
            enabled: 'minusButtonEnabled',
            disabled: 'minusButtonDisabled',
            over: 'minusButtonOver',
            pressed: 'minusButtonPressed'
        }
    },
    ticketCostUpButton: {
        type: 'button',
        portrait: {
            x: 208
        },
        landscape: {
            x: 143
        },
        textures: {
            enabled: 'plusButtonEnabled',
            disabled: 'plusButtonDisabled',
            over: 'plusButtonOver',
            pressed: 'plusButtonPressed'
        }
    },
    ticketCostDownButtonStatic: {
        type: 'sprite',
        anchor: 0.5,
        portrait: {
            x: -208
        },
        landscape: {
            x: -143
        },
        texture: 'minusButtonDisabled'
    },
    ticketCostUpButtonStatic: {
        type: 'sprite',
        anchor: 0.5,
        portrait: {
            x: 208
        },
        landscape: {
            x: 143
        },
        texture: 'plusButtonDisabled'
    }
});