let configDict = {
    'hud_adi': {
        'canvas': {
            'heightToWidthRatio': 1.0   // Square Canvas
        },
        'ADI': {
            'diameterRatio':0.5,
            'stroke': {
                'weight': 4,
                'color': {  // magenta
                    'R': 254,
                    'G': 78,
                    'B': 218
                }
            },
            'circle': {
                'x': 0,
                'y': 0,
                'diameterRatio': 1.0
            },
            'radials': {  // roll spurs on top
                'minimum': 1.0,
                'maximum': 1.05,
                'rollThetasDeg': [-30, 0, 30],
            }
        },
        'ADIPlane': {
            'diameterRatio':0.8,
            'noseCircle': {
                'x': 0,
                'y': 0,
                'diameterRatio': 0.01,
                'stroke': {
                    'weight': 4,
                    'color': {  // magenta
                        'R': 254,
                        'G': 78,
                        'B': 218
                    }
                }
            },
            'wings': {
                'spanToDiameterRatio': 0.5,
                'tipHeightToRadiusRatio': 0.05,
                'stroke': {
                    'weight': 2,
                    'color': {  // magenta
                        'R': 254,
                        'G': 78,
                        'B': 218
                    }
                }
            }
        },
        'GS': {
            'display': true,
            'stroke': {
                'weight': 1,
                'color': {  // green
                    'R': 0,
                    'G': 150,
                    'B': 0
                }
            },
            'unitChosen': 'mps',
            'mainTextSizeRatio': 0.03,
            'xOffset': 30,
            'yOffset': 30,
        },
        'ASI': {
            'display': true,
            'stroke': {
                'weight': 1,
                // 'color': {  // white
                //     'R': 255,
                //     'G': 255,
                //     'B': 255
                // }
                'color': { // sky
                    'R': 135,
                    'G': 206,
                    'B': 235
                }
            },
            'unitChosen': 'mps',
            'verticalSpanRatio': 0.6,
            'mainTextSizeRatio': 0.03,
            'xOffset': 30,
            'mainMarkerLength': 30,
            'minorTickXOffset': 5,
            'majorTickXOffset': 10,
            'majorTickTextXOffset': 10,
            'majorTickTextSizeRatio': 0.02,
            'units': {
                'mps': {
                    'airSpeedSpan': 10,
                    'majorMarker': 1,
                    'minorMarker': 0.1
                },
                'knots': {
                    'airSpeedSpan': 20,
                    'majorMarker': 1,
                    'minorMarker': 0.1
                },
                'mph': {
                    'airSpeedSpan': 20,
                    'majorMarker': 1,
                    'minorMarker': 0.1
                },
                'kph': {
                    'airSpeedSpan': 36,
                    'majorMarker': 5,
                    'minorMarker': 1
                },
            }
        },
        'VSI': {
            'display': true,
            'stroke': {
                'weight': 1,
                'color': {  // white
                    'R': 255,
                    'G': 255,
                    'B': 255
                }
            },
            'unitChosen': 'mps',
            'verticalSpanRatio': 0.12,
            'mainTextSizeRatio': 0.015,
            'xOffset': 10,
            'mainMarkerLength': 5,
            'minorTickXOffset': 5,
            'majorTickXOffset': 10,
            'majorTickTextXOffset': 10,
            'majorTickTextSizeRatio': 0.02,
            'units': {
                'mps': {
                    'vSpeedSpan': 6,
                    'majorMarker': 1,
                    'minorMarker': 0.25
                },
                'fps': {
                    'vSpeedSpan': 18,
                    'majorMarker': 3,
                    'minorMarker': 0.5
                },
            }
        },
        'altimeter': {
            'display': true,
            'stroke': {
                'weight': 1,
                'color': {  // white
                    'R': 255,
                    'G': 255,
                    'B': 255
                }
            },
            'unitChosen': 'meters',
            'verticalSpanRatio': 0.6,
            'mainTextSizeRatio': 0.03,
            'xOffset': 60,
            'mainMarkerLength': 30,
            'minorTickXOffset': 5,
            'majorTickXOffset': 10,
            'majorTickTextXOffset': 10,
            'majorTickTextSizeRatio': 0.02,
            'units': {
                'meters': {
                    'altitudeSpan': 10,
                    'majorMarker': 1,
                    'minorMarker': 0.1
                },
                'yard': {
                    'altitudeSpan': 10,
                    'majorMarker': 1,
                    'minorMarker': 0.1
                },
                'feet': {
                    'altitudeSpan': 30,
                    'majorMarker': 3,
                    'minorMarker': 0.3
                }
            }
        },
        'terrain': {
            'verticalAngleSpan': 60,
            'segments': {
                'ground': {
                    'color': {
                        'R': 0,
                        'G': 150,
                        'B': 0
                    }
                },
                'sky': {
                    'color': {
                        'R': 135,
                        'G': 206,
                        'B': 235
                    }
                }
            }
        },
        'terrainCompass': {
            'display': true,
            'stroke': {
                'weight': 1,
                'color': {  // black
                    'R': 0,
                    'G': 0,
                    'B': 0
                }
            },
            'horizontalSpanRatio': 0.8,
            'horizontalSpanAngle': 60,
            'offsetDepthToRadiusRatio': 0.05,
            'scaleMarkers': {
                '-': {
                    'radiusRatioMin': 0.03,
                    'radiusRatioMax': 0.07
                },
                '|': {
                    'radiusRatioMin': 0.02,
                    'radiusRatioMax': 0.08
                },
                'text': {
                    'textSizeToRadiusRatio': 0.05,
                    'verticalDepthToRadiusRatio': 0.1
                }
            }
        },
        'topCompass': {
            'display': true,
            'stroke': {
                'weight': 1,
                'color': {  // white
                    'R': 255,
                    'G': 255,
                    'B': 255
                }
            },
            'horizontalSpanRatio': 0.8,
            'horizontalSpanAngle': 60,
            'scaleMarkers': {
                '-': {
                    'radiusRatioMin': 0.03,
                    'radiusRatioMax': 0.07
                },
                '|': {
                    'radiusRatioMin': 0.02,
                    'radiusRatioMax': 0.08
                },
                'text': {
                    'textSizeToRadiusRatio': 0.05,
                    'verticalDepthToRadiusRatio': 0.1
                }
            }
        },
        'bankScales': {
            'arc': {
                'stroke': {
                    'weight': 1,
                    'color': {  // black
                        'R': 0,
                        'G': 0,
                        'B': 0
                    }
                },
            },
            'triangle': {
                'stroke': {
                    'weight': 1,
                    'color': {  // black
                        'R': 0,
                        'G': 0,
                        'B': 0
                    }
                },
                'size': [
                    {
                        'angles': [0],
                        'heightRatio': 0.99,
                        'baseRatio': 0.01,
                        'baseLocation': 0.95
                    },
                    {
                        'angles': [-30, 30],
                        'heightRatio': 0.97,
                        'baseRatio': 0.005,
                        'baseLocation': 0.95
                    },
                    {
                        'angles': [-20, -10, 10, 20],
                        'heightRatio': 0.96,
                        'baseRatio': 0.005,
                        'baseLocation': 0.95
                    }
                ]
            },
            'lines': {
                'stroke': {
                    'weight': 1,
                    'color': {  // black
                        'R': 0,
                        'G': 0,
                        'B': 0
                    }
                },
                'radiusRatioMin': 0.94,
                'radiusRatioMax': 0.96,
                'angles': [-25, -15, -5, 5, 15, 25]
            }
        },
        'pitchLines': {
            'stroke': {
                'weight': 1,
                'color': {  // black
                    'R': 0,
                    'G': 0,
                    'B': 0
                }
            },
            'pitchAngleSpan': 60,
            'lineType': [
                {
                    // large
                    'textSizeRatio': 0.05,
                    'radiusRatio': 0.2,
                    'angles': [-20, -10, 10, 20]
                },
                {
                    // small
                    'radiusRatio': 0.1,
                    'angles': [-15, -5, 5, 15]
                }
            ],
        },
        'compass': {
            'diameterRatio': 0.60,
            'circle': {
                'stroke': {
                    'weight': 1,
                    'color': {  // white
                        'R': 255,
                        'G': 255,
                        'B': 255
                    }
                },
            },
            'scaleLines': [
                {
                    'stroke': {
                        'weight': 1,
                        'color': {  // white
                            'R': 255,
                            'G': 255,
                            'B': 255
                        }
                    }
                },
                {
                    'stroke': {
                        'weight': 2,
                        'color': {  // white
                            'R': 255,
                            'G': 255,
                            'B': 255
                        }
                    }
                },
                {
                    'stroke': {
                        'weight': 4,
                        'color': {  // white
                            'R': 255,
                            'G': 255,
                            'B': 255
                        }
                    }
                },
                {
                    'stroke': {
                        'weight': 8,
                        'color': {  // red
                            'R': 255,
                            'G': 0,
                            'B': 0
                        }
                    }
                }
            ]
        }
    }
};