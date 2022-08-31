let diameterADI = 0;
let diameterCompass = 0;
var rollDegrees = 0;
var pitchDegrees = 0;
var headingDegrees = 0;

let headingDict = {
    0: 'N',
    5: '-',
    10: '-',
    15: '|',
    20: '-',
    25: '-',
    30: '|',
    35: '-',
    40: '-',
    45: "NW",
    50: '-',
    55: '-',
    60: '|',
    65: '-',
    70: '-',
    75: '|',
    80: '-',
    85: '-',
    90: 'W',
    95: '-',
    100: '-',
    105: '|',
    110: '-',
    115: '-',
    120: '|',
    125: '-',
    130: '-',
    135: "SW",
    140: '-',
    145: '-',
    150: '|',
    155: '-',
    160: '-',
    165: '|',
    170: '-',
    175: '-',
    180: 'S',
    185: '-',
    190: '-',
    195: '|',
    200: '-',
    205: '-',
    210: '|',
    215: '-',
    220: '-',
    225: "SE",
    230: '-',
    235: '-',
    240: '|',
    245: '-',
    250: '-',
    255: '|',
    260: '-',
    265: '-',
    270: 'E',
    275: '-',
    280: '-',
    285: '|',
    290: '-',
    295: '-',
    300: '|',
    305: '-',
    310: '-',
    315: "NE",
    320: '-',
    325: '-',
    330: '|',
    335: '-',
    340: '-',
    345: '|',
    350: '-',
    355: '-',
    360: 'N'
}

function drawADI(diameterADI) {
    noFill();
    let c = color(
        configDict['hud_adi']['ADI']['stroke']['color']['R'],
        configDict['hud_adi']['ADI']['stroke']['color']['G'],
        configDict['hud_adi']['ADI']['stroke']['color']['B']);
    strokeWeight(configDict['hud_adi']['ADI']['stroke']['weight']);
    stroke(c);
    circle(
        configDict['hud_adi']['ADI']['circle']['x'],
        configDict['hud_adi']['ADI']['circle']['y'],
        configDict['hud_adi']['ADI']['circle']['diameterRatio'] * diameterADI);
    let r = diameterADI/2;
    let rollThetasDeg = configDict['hud_adi']['ADI']['radials']['rollThetasDeg'];
    for (let thetaIndex = 0; thetaIndex < rollThetasDeg.length; thetaIndex ++) {
        let rollThetaRad = radians(-90 + rollThetasDeg[thetaIndex]);
        let x1 = configDict['hud_adi']['ADI']['radials']['minimum'] * r * cos(rollThetaRad);
        let y1 = configDict['hud_adi']['ADI']['radials']['minimum'] * r * sin(rollThetaRad);
        let x2 = configDict['hud_adi']['ADI']['radials']['maximum'] * r * cos(rollThetaRad);
        let y2 = configDict['hud_adi']['ADI']['radials']['maximum'] * r * sin(rollThetaRad);
        line(x1, y1, x2, y2);
    }
}

function drawADIPlane(diameterADI) {
    // nose circle
    let c = color(
        configDict['hud_adi']['ADIPlane']['noseCircle']['stroke']['color']['R'],
        configDict['hud_adi']['ADIPlane']['noseCircle']['stroke']['color']['G'],
        configDict['hud_adi']['ADIPlane']['noseCircle']['stroke']['color']['B']);

    fill(c);
    strokeWeight(configDict['hud_adi']['ADIPlane']['noseCircle']['stroke']['weight']);
    stroke(c);
    circle(
        configDict['hud_adi']['ADIPlane']['noseCircle']['x'],
        configDict['hud_adi']['ADIPlane']['noseCircle']['y'],
        configDict['hud_adi']['ADIPlane']['noseCircle']['diameterRatio'] * diameterADI);

    strokeWeight(configDict['hud_adi']['ADIPlane']['wings']['stroke']['weight']);
    c = color(
        configDict['hud_adi']['ADIPlane']['wings']['stroke']['color']['R'],
        configDict['hud_adi']['ADIPlane']['wings']['stroke']['color']['G'],
        configDict['hud_adi']['ADIPlane']['wings']['stroke']['color']['B']);
    stroke(c);
    let r = diameterADI/2;

    // wing span
    line(
        - configDict['hud_adi']['ADIPlane']['wings']['spanToDiameterRatio'] * r,
        0,
        configDict['hud_adi']['ADIPlane']['wings']['spanToDiameterRatio'] * r,
        0);

    // left wing tip
    line(
        - configDict['hud_adi']['ADIPlane']['wings']['spanToDiameterRatio'] * r,
        0,
        - configDict['hud_adi']['ADIPlane']['wings']['spanToDiameterRatio'] * r - 2 * configDict['hud_adi']['ADIPlane']['wings']['tipHeightToRadiusRatio'] * r,
        - configDict['hud_adi']['ADIPlane']['wings']['tipHeightToRadiusRatio'] * r);

    // right wing tip
    line(
        configDict['hud_adi']['ADIPlane']['wings']['spanToDiameterRatio'] * r,
        0,
        configDict['hud_adi']['ADIPlane']['wings']['spanToDiameterRatio'] * r + 2 * configDict['hud_adi']['ADIPlane']['wings']['tipHeightToRadiusRatio'] * r,
        - configDict['hud_adi']['ADIPlane']['wings']['tipHeightToRadiusRatio'] * r);

    // Center Spur
    line(
        0,
        - configDict['hud_adi']['ADIPlane']['wings']['tipHeightToRadiusRatio'] * r,
        0,
        configDict['hud_adi']['ADIPlane']['wings']['tipHeightToRadiusRatio'] * r);
}

function drawTopCompass(compassWidth, compassDepth, headingDeg) {
    let spanRatio = configDict['hud_adi']['topCompass']['horizontalSpanRatio'];
    // console.log(`Came Here`);

    let horizontalHalfSpanAngle = configDict['hud_adi']['topCompass']['horizontalSpanAngle']/2;
    noFill();
    strokeWeight(configDict['hud_adi']['topCompass']['stroke']['weight']);
    let c = color(
        configDict['hud_adi']['topCompass']['stroke']['color']['R'],
        configDict['hud_adi']['topCompass']['stroke']['color']['G'],
        configDict['hud_adi']['topCompass']['stroke']['color']['B']
    );
    stroke(c);

    line(-(compassWidth) * spanRatio,
        compassDepth,
        (compassWidth) * spanRatio,
        compassDepth
    );
    
    line(0,
        compassDepth - compassWidth * configDict['hud_adi']['terrainCompass']['scaleMarkers']['-']['radiusRatioMax'],
        0,
        compassDepth
    );

    for (let key in headingDict) {
        if (headingDeg<horizontalHalfSpanAngle) {
            if (((key-360) < headingDeg + (horizontalHalfSpanAngle * spanRatio))&&((key-360) > headingDeg - (horizontalHalfSpanAngle * spanRatio))) {
                let x_pos = (headingDeg - (key-360)) * compassWidth / horizontalHalfSpanAngle;
                // print(x_pos);
                switch (headingDict[key]) {
                    case '-':
                        line(
                            x_pos,
                            compassDepth + compassWidth * configDict['hud_adi']['terrainCompass']['scaleMarkers']['-']['radiusRatioMin'],
                            x_pos,
                            compassDepth + compassWidth * configDict['hud_adi']['terrainCompass']['scaleMarkers']['-']['radiusRatioMax']);
                        break;
                    case '|':
                        line(
                            x_pos,
                            compassDepth + compassWidth * configDict['hud_adi']['terrainCompass']['scaleMarkers']['|']['radiusRatioMin'],
                            x_pos,
                            compassDepth + compassWidth * configDict['hud_adi']['terrainCompass']['scaleMarkers']['|']['radiusRatioMax']);
                        break;
                    default:
                        textSize(compassWidth * configDict['hud_adi']['terrainCompass']['scaleMarkers']['text']['textSizeToRadiusRatio']);
                        fill(c);
                        text(headingDict[key],
                            x_pos + (compassWidth * configDict['hud_adi']['terrainCompass']['scaleMarkers']['text']['textSizeToRadiusRatio']) / 2,
                            compassDepth + compassWidth * configDict['hud_adi']['terrainCompass']['scaleMarkers']['text']['verticalDepthToRadiusRatio']);
                }
            }
        }
        if (headingDeg>(360-horizontalHalfSpanAngle)) {
            if (((parseInt(key)+360) < headingDeg + (horizontalHalfSpanAngle * spanRatio))&&((parseInt(key)+360) > headingDeg - (horizontalHalfSpanAngle * spanRatio))) {
                let x_pos = (headingDeg - (parseInt(key)+360)) * compassWidth / horizontalHalfSpanAngle;
                // print(x_pos);
                switch (headingDict[key]) {
                    case '-':
                        line(
                            x_pos,
                            compassDepth + compassWidth * configDict['hud_adi']['terrainCompass']['scaleMarkers']['-']['radiusRatioMin'],
                            x_pos,
                            compassDepth + compassWidth * configDict['hud_adi']['terrainCompass']['scaleMarkers']['-']['radiusRatioMax']);
                        break;
                    case '|':
                        line(
                            x_pos,
                            compassDepth + compassWidth * configDict['hud_adi']['terrainCompass']['scaleMarkers']['|']['radiusRatioMin'],
                            x_pos,
                            compassDepth + compassWidth * configDict['hud_adi']['terrainCompass']['scaleMarkers']['|']['radiusRatioMax']);
                        break;
                    default:
                        textSize(compassWidth * configDict['hud_adi']['terrainCompass']['scaleMarkers']['text']['textSizeToRadiusRatio']);
                        fill(c);
                        text(headingDict[key],
                            x_pos + (compassWidth * configDict['hud_adi']['terrainCompass']['scaleMarkers']['text']['textSizeToRadiusRatio']) / 2,
                            compassDepth + compassWidth * configDict['hud_adi']['terrainCompass']['scaleMarkers']['text']['verticalDepthToRadiusRatio']);
                }
            }
        }
        if ((key < headingDeg + (horizontalHalfSpanAngle * spanRatio))&&(key > headingDeg - (horizontalHalfSpanAngle * spanRatio))) {
            // console.log(key);
            // console.log(headingDeg);
            let x_pos = (headingDeg - (key)) * compassWidth / horizontalHalfSpanAngle;
            switch (headingDict[key]) {
                case '-':
                    line(
                        x_pos,
                        compassDepth + compassWidth * configDict['hud_adi']['terrainCompass']['scaleMarkers']['-']['radiusRatioMin'],
                        x_pos,
                        compassDepth + compassWidth * configDict['hud_adi']['terrainCompass']['scaleMarkers']['-']['radiusRatioMax']);
                    break;
                case '|':
                    line(
                        x_pos,
                        compassDepth + compassWidth * configDict['hud_adi']['terrainCompass']['scaleMarkers']['|']['radiusRatioMin'],
                        x_pos,
                        compassDepth + compassWidth * configDict['hud_adi']['terrainCompass']['scaleMarkers']['|']['radiusRatioMax']);
                    break;
                default:
                    textSize(compassWidth * configDict['hud_adi']['terrainCompass']['scaleMarkers']['text']['textSizeToRadiusRatio']);
                    fill(c);
                    text(headingDict[key],
                        x_pos + (compassWidth*configDict['hud_adi']['terrainCompass']['scaleMarkers']['text']['textSizeToRadiusRatio'])/2,
                        compassDepth + compassWidth * configDict['hud_adi']['terrainCompass']['scaleMarkers']['text']['verticalDepthToRadiusRatio']);
            }
        }
    }
}

function drawTerrainCompass(radius, horizonDipDepth, headingDeg) {
    let spanRatio = configDict['hud_adi']['terrainCompass']['horizontalSpanRatio'];
    let horizontalHalfSpanAngle = configDict['hud_adi']['terrainCompass']['horizontalSpanAngle']/2;
    noFill();
    strokeWeight(configDict['hud_adi']['terrainCompass']['stroke']['weight']);
    let c = color(
        configDict['hud_adi']['terrainCompass']['stroke']['color']['R'],
        configDict['hud_adi']['terrainCompass']['stroke']['color']['G'],
        configDict['hud_adi']['terrainCompass']['stroke']['color']['B']
    );
    stroke(c);
    line(-radius * spanRatio,
        horizonDipDepth + radius * configDict['hud_adi']['terrainCompass']['offsetDepthToRadiusRatio'],
        radius * spanRatio,
        horizonDipDepth + radius * configDict['hud_adi']['terrainCompass']['offsetDepthToRadiusRatio']);

    for (let key in headingDict) {
        if (headingDeg<horizontalHalfSpanAngle) {
            if (((key-360) < headingDeg + (horizontalHalfSpanAngle * spanRatio))&&((key-360) > headingDeg - (horizontalHalfSpanAngle * spanRatio))) {
                let x_pos = (headingDeg - (key-360)) * radius / horizontalHalfSpanAngle;
                // print(x_pos);
                switch (headingDict[key]) {
                    case '-':
                        line(
                            x_pos,
                            horizonDipDepth + radius * configDict['hud_adi']['terrainCompass']['scaleMarkers']['-']['radiusRatioMin'],
                            x_pos,
                            horizonDipDepth + radius * configDict['hud_adi']['terrainCompass']['scaleMarkers']['-']['radiusRatioMax']);
                        break;
                    case '|':
                        line(
                            x_pos,
                            horizonDipDepth + radius * configDict['hud_adi']['terrainCompass']['scaleMarkers']['|']['radiusRatioMin'],
                            x_pos,
                            horizonDipDepth + radius * configDict['hud_adi']['terrainCompass']['scaleMarkers']['|']['radiusRatioMax']);
                        break;
                    default:
                        textSize(radius * configDict['hud_adi']['terrainCompass']['scaleMarkers']['text']['textSizeToRadiusRatio']);
                        fill(c);
                        text(headingDict[key],
                            x_pos + (radius * configDict['hud_adi']['terrainCompass']['scaleMarkers']['text']['textSizeToRadiusRatio']) / 2,
                            horizonDipDepth + radius * configDict['hud_adi']['terrainCompass']['scaleMarkers']['text']['verticalDepthToRadiusRatio']);
                }
            }
        }
        if (headingDeg>(360-horizontalHalfSpanAngle)) {
            if (((parseInt(key)+360) < headingDeg + (horizontalHalfSpanAngle * spanRatio))&&((parseInt(key)+360) > headingDeg - (horizontalHalfSpanAngle * spanRatio))) {
                let x_pos = (headingDeg - (parseInt(key)+360)) * radius / horizontalHalfSpanAngle;
                // print(x_pos);
                switch (headingDict[key]) {
                    case '-':
                        line(
                            x_pos,
                            horizonDipDepth + radius * configDict['hud_adi']['terrainCompass']['scaleMarkers']['-']['radiusRatioMin'],
                            x_pos,
                            horizonDipDepth + radius * configDict['hud_adi']['terrainCompass']['scaleMarkers']['-']['radiusRatioMax']);
                        break;
                    case '|':
                        line(
                            x_pos,
                            horizonDipDepth + radius * configDict['hud_adi']['terrainCompass']['scaleMarkers']['|']['radiusRatioMin'],
                            x_pos,
                            horizonDipDepth + radius * configDict['hud_adi']['terrainCompass']['scaleMarkers']['|']['radiusRatioMax']);
                        break;
                    default:
                        textSize(radius * configDict['hud_adi']['terrainCompass']['scaleMarkers']['text']['textSizeToRadiusRatio']);
                        fill(c);
                        text(headingDict[key],
                            x_pos + (radius * configDict['hud_adi']['terrainCompass']['scaleMarkers']['text']['textSizeToRadiusRatio']) / 2,
                            horizonDipDepth + radius * configDict['hud_adi']['terrainCompass']['scaleMarkers']['text']['verticalDepthToRadiusRatio']);
                }
            }
        }
        if ((key < headingDeg + (horizontalHalfSpanAngle * spanRatio))&&(key > headingDeg - (horizontalHalfSpanAngle * spanRatio))) {
            let x_pos = (headingDeg - key) * radius / horizontalHalfSpanAngle;
            switch (headingDict[key]) {
                case '-':
                    line(
                        x_pos,
                        horizonDipDepth + radius * configDict['hud_adi']['terrainCompass']['scaleMarkers']['-']['radiusRatioMin'],
                        x_pos,
                        horizonDipDepth + radius * configDict['hud_adi']['terrainCompass']['scaleMarkers']['-']['radiusRatioMax']);
                    break;
                case '|':
                    line(
                        x_pos,
                        horizonDipDepth + radius * configDict['hud_adi']['terrainCompass']['scaleMarkers']['|']['radiusRatioMin'],
                        x_pos,
                        horizonDipDepth + radius * configDict['hud_adi']['terrainCompass']['scaleMarkers']['|']['radiusRatioMax']);
                    break;
                default:
                    textSize(radius * configDict['hud_adi']['terrainCompass']['scaleMarkers']['text']['textSizeToRadiusRatio']);
                    fill(c);
                    text(headingDict[key],
                        x_pos + (radius*configDict['hud_adi']['terrainCompass']['scaleMarkers']['text']['textSizeToRadiusRatio'])/2,
                        horizonDipDepth + radius * configDict['hud_adi']['terrainCompass']['scaleMarkers']['text']['verticalDepthToRadiusRatio']);
            }
        }
    }
}

function drawBankScales(diameterADI) {
    let radius = diameterADI/2;

    //Draw Bank Scale
    rotate(radians(-90));

    //draw arc
    noFill();
    strokeWeight(configDict['hud_adi']['bankScales']['arc']['stroke']['weight']);
    let c = color(
        configDict['hud_adi']['bankScales']['arc']['stroke']['color']['R'],
        configDict['hud_adi']['bankScales']['arc']['stroke']['color']['G'],
        configDict['hud_adi']['bankScales']['arc']['stroke']['color']['B']
    );
    stroke(c);
    arc(
        0,
        0,
        0.95 * diameterADI,
        0.95 * diameterADI,
        radians(-30),
        radians(30));

    //draw triangles
    rotate(radians(90));
    strokeWeight(configDict['hud_adi']['bankScales']['triangle']['stroke']['weight']);
    c = color(
        configDict['hud_adi']['bankScales']['triangle']['stroke']['color']['R'],
        configDict['hud_adi']['bankScales']['triangle']['stroke']['color']['G'],
        configDict['hud_adi']['bankScales']['triangle']['stroke']['color']['B']
    );
    stroke(c);
    fill(c);

    for (
        let triangleSizeIndex =0;
        triangleSizeIndex < configDict['hud_adi']['bankScales']['triangle']['size'].length;
        triangleSizeIndex++) {

        for (let angleIndex = 0;
             angleIndex < configDict['hud_adi']['bankScales']['triangle']['size'][triangleSizeIndex]['angles'].length;
             angleIndex++) {

            rotate(radians(configDict['hud_adi']['bankScales']['triangle']['size'][triangleSizeIndex]['angles'][angleIndex]));

            triangle(
                0,
                -configDict['hud_adi']['bankScales']['triangle']['size'][triangleSizeIndex]['heightRatio'] * radius,
                -configDict['hud_adi']['bankScales']['triangle']['size'][triangleSizeIndex]['baseRatio'] * radius,
                -configDict['hud_adi']['bankScales']['triangle']['size'][triangleSizeIndex]['baseLocation'] * radius,
                configDict['hud_adi']['bankScales']['triangle']['size'][triangleSizeIndex]['baseRatio'] * radius,
                -configDict['hud_adi']['bankScales']['triangle']['size'][triangleSizeIndex]['baseLocation'] * radius);

            rotate(-radians(configDict['hud_adi']['bankScales']['triangle']['size'][triangleSizeIndex]['angles'][angleIndex]));
        }
    }


    //draw bank scale lines
    strokeWeight(configDict['hud_adi']['bankScales']['lines']['stroke']['weight']);
    c = color(
        configDict['hud_adi']['bankScales']['lines']['stroke']['color']['R'],
        configDict['hud_adi']['bankScales']['lines']['stroke']['color']['G'],
        configDict['hud_adi']['bankScales']['lines']['stroke']['color']['B']
    );
    stroke(c);
    fill(c);

    for (
        let lineAngleIndex =0;
        lineAngleIndex < configDict['hud_adi']['bankScales']['lines']['angles'].length;
        lineAngleIndex++) {
        rotate(-radians(configDict['hud_adi']['bankScales']['lines']['angles'][lineAngleIndex]));
        line(
            0,
            -configDict['hud_adi']['bankScales']['lines']['radiusRatioMin'] * radius,
            0,
            -configDict['hud_adi']['bankScales']['lines']['radiusRatioMax'] * radius
        );
        rotate(radians(configDict['hud_adi']['bankScales']['lines']['angles'][lineAngleIndex]));
    }
}

function drawPitchLines(radius, diameterADI) {
    // draw pitch lines
    strokeWeight(configDict['hud_adi']['pitchLines']['stroke']['weight']);
    let c = color(
        configDict['hud_adi']['pitchLines']['stroke']['color']['R'],
        configDict['hud_adi']['pitchLines']['stroke']['color']['G'],
        configDict['hud_adi']['pitchLines']['stroke']['color']['B']
    );
    stroke(c);

    for (let lineTypeIndex =0;
        lineTypeIndex< configDict['hud_adi']['pitchLines']['lineType'].length;
        lineTypeIndex++) {
        for (let angleIndex = 0;
            angleIndex<configDict['hud_adi']['pitchLines']['lineType'][lineTypeIndex]['angles'].length;
            angleIndex++) {
            line(
                -radius * configDict['hud_adi']['pitchLines']['lineType'][lineTypeIndex]['radiusRatio'],
                configDict['hud_adi']['pitchLines']['lineType'][lineTypeIndex]['angles'][angleIndex] * diameterADI / configDict['hud_adi']['pitchLines']['pitchAngleSpan'],
                radius * configDict['hud_adi']['pitchLines']['lineType'][lineTypeIndex]['radiusRatio'],
                configDict['hud_adi']['pitchLines']['lineType'][lineTypeIndex]['angles'][angleIndex] * diameterADI / configDict['hud_adi']['pitchLines']['pitchAngleSpan']
            );

            if (lineTypeIndex===0) {
                textSize(radius * configDict['hud_adi']['pitchLines']['lineType'][lineTypeIndex]['textSizeRatio']);
                stroke(c);
                fill(c);
                text(configDict['hud_adi']['pitchLines']['lineType'][lineTypeIndex]['angles'][angleIndex],
                    radius * configDict['hud_adi']['pitchLines']['lineType'][lineTypeIndex]['radiusRatio'] + 5,
                    configDict['hud_adi']['pitchLines']['lineType'][lineTypeIndex]['angles'][angleIndex] * diameterADI / configDict['hud_adi']['pitchLines']['pitchAngleSpan']
                );
                text(configDict['hud_adi']['pitchLines']['lineType'][lineTypeIndex]['angles'][angleIndex],
                    -radius * configDict['hud_adi']['pitchLines']['lineType'][lineTypeIndex]['radiusRatio'] - 5,
                    configDict['hud_adi']['pitchLines']['lineType'][lineTypeIndex]['angles'][angleIndex] * diameterADI / configDict['hud_adi']['pitchLines']['pitchAngleSpan']
                );
            }
        }
    }
}

function terrain(diameterADI, rollDeg, pitchDeg, headingDeg) {
    rotate(radians(rollDeg));
    let radius = diameterADI/2;

    // Draw Ground and Sky Segments
    let horizonDipDepth = pitchDeg * diameterADI / configDict['hud_adi']['terrain']["verticalAngleSpan"];
    let dipAngle = degrees(asin(horizonDipDepth/radius));
    let segmentAngles = [0+dipAngle, 180-dipAngle];
    let sky = color(
        configDict['hud_adi']['terrain']['segments']['sky']['color']['R'],
        configDict['hud_adi']['terrain']['segments']['sky']['color']['G'],
        configDict['hud_adi']['terrain']['segments']['sky']['color']['B']);
    let ground = color(
        configDict['hud_adi']['terrain']['segments']['ground']['color']['R'],
        configDict['hud_adi']['terrain']['segments']['ground']['color']['G'],
        configDict['hud_adi']['terrain']['segments']['ground']['color']['B']);

    let colors = [ground, sky];
    if (pitchDeg>configDict['hud_adi']['pitchLines']['pitchAngleSpan']/2) {
        fill(sky);
        circle(0,0, diameterADI);
    } else {
        if (pitchDeg<-configDict['hud_adi']['pitchLines']['pitchAngleSpan']/2) {
            fill(ground);
            circle(0,0,diameterADI);
        }
        else {
            for (let i = 0; i < segmentAngles.length; i++) {
                fill(colors[i]);
                arc(
                    0,
                    0,
                    diameterADI,
                    diameterADI,
                    radians(segmentAngles[i]),
                    radians(segmentAngles[(i+1)%(segmentAngles.length)]),
                    OPEN
                );
            }        
        }
    }

    if (configDict['hud_adi']['terrainCompass']['display']) {
        
        drawTerrainCompass(
            radius,
            horizonDipDepth,
            headingDeg
        );
    }

    drawBankScales(diameterADI);

    drawPitchLines(radius, diameterADI);

    rotate(-radians(rollDeg));
}


function postEulerAngles(diameterCompass, rollDegrees, pitchDegrees, headingDegrees) {
    strokeWeight(1);
    stroke('white');
    fill('white');
    textSize(diameterCompass*0.04);
    textAlign(RIGHT);
    let textMessage = "Bank Angle : " + rollDegrees.toFixed(3);
    text(textMessage, diameterCompass/2, diameterCompass/2 - (3*diameterCompass*0.04));
    textMessage = "Pitch Angle : " + pitchDegrees.toFixed(3);
    text(textMessage, diameterCompass/2, diameterCompass/2 - (2*diameterCompass*0.04));
    textMessage = "Heading Angle : " + headingDegrees.toFixed(3);
    text(textMessage, diameterCompass/2, diameterCompass/2 - (1*diameterCompass*0.04));
}


function drawCompass(diameterCompass, diameterADI, headingDeg) {
    radiusCompass = diameterCompass/2;
    radiusADI = diameterADI/2;

    //draw compass circle
    noFill();
    let c = color(
        configDict['hud_adi']['compass']['circle']['stroke']['color']['R'],
        configDict['hud_adi']['compass']['circle']['stroke']['color']['G'],
        configDict['hud_adi']['compass']['circle']['stroke']['color']['B']
    );
    strokeWeight(configDict['hud_adi']['compass']['circle']['stroke']['weight']);
    stroke(c);
    circle(0,0, diameterCompass);

    rotate(radians(headingDeg));
    for (let key in headingDict) {
        let theta = radians(parseInt(key) + 90);
        switch (headingDict[key]) {
            case '-':
                c = color(
                    configDict['hud_adi']['compass']['scaleLines'][0]['stroke']['color']['R'],
                    configDict['hud_adi']['compass']['scaleLines'][0]['stroke']['color']['G'],
                    configDict['hud_adi']['compass']['scaleLines'][0]['stroke']['color']['B']
                );
                strokeWeight(configDict['hud_adi']['compass']['scaleLines'][0]['stroke']['weight']);
                stroke(c);
                line(
                    ((radiusCompass+radiusADI)/2)*cos(theta),
                    -((radiusCompass+radiusADI)/2)*sin(theta),
                    radiusCompass*cos(theta),
                    -radiusCompass*sin(theta));
                break;
            case '|':
                c = color(
                    configDict['hud_adi']['compass']['scaleLines'][1]['stroke']['color']['R'],
                    configDict['hud_adi']['compass']['scaleLines'][1]['stroke']['color']['G'],
                    configDict['hud_adi']['compass']['scaleLines'][1]['stroke']['color']['B']
                );
                strokeWeight(configDict['hud_adi']['compass']['scaleLines'][1]['stroke']['weight']);
                stroke(c);
                line(
                    ((radiusCompass+radiusADI)/2)*cos(theta),
                    -((radiusCompass+radiusADI)/2)*sin(theta),
                    radiusCompass*cos(theta),
                    -radiusCompass*sin(theta));
                break;
            default:
                if ((key==='0')||(key==='360')) {
                    c = color(
                        configDict['hud_adi']['compass']['scaleLines'][3]['stroke']['color']['R'],
                        configDict['hud_adi']['compass']['scaleLines'][3]['stroke']['color']['G'],
                        configDict['hud_adi']['compass']['scaleLines'][3]['stroke']['color']['B']
                    );
                    strokeWeight(configDict['hud_adi']['compass']['scaleLines'][3]['stroke']['weight']);
                    stroke(c);
                    fill(c);
                } else {
                    c = color(
                        configDict['hud_adi']['compass']['scaleLines'][2]['stroke']['color']['R'],
                        configDict['hud_adi']['compass']['scaleLines'][2]['stroke']['color']['G'],
                        configDict['hud_adi']['compass']['scaleLines'][2]['stroke']['color']['B']
                    );
                    strokeWeight(configDict['hud_adi']['compass']['scaleLines'][2]['stroke']['weight']);
                    stroke(c);
                    fill(c);
                }
                line(
                    ((radiusCompass+radiusADI)/2)*cos(theta),
                    -((radiusCompass+radiusADI)/2)*sin(theta),
                    radiusCompass*cos(theta),
                    -radiusCompass*sin(theta));
        }
    }
    rotate(radians(-headingDeg));

    strokeWeight(1);
    stroke('white');
    fill('white');
    textSize(diameterCompass*0.04);
    textAlign(CENTER);
    textMessage = headingDegrees.toFixed(0);
    text(textMessage, 0, - diameterCompass/2 - (1*diameterCompass*0.04));
}

function dataCheck() {
    if (rollDegrees>180) {
        rollDegrees-=360;
    }
    if (rollDegrees<-180) {
        rollDegrees+=360;
    }
    headingDegrees=headingDegrees%360;
    if (headingDegrees<0) {
        headingDegrees+=360;
    }
}

function setup() {
    var elementId = 'adi';
    var canvasDiv = document.getElementById(elementId);
    var width = canvasDiv.offsetWidth;
    var height = configDict['hud_adi']['canvas']['heightToWidthRatio'] * width;
    var sketchCanvas = createCanvas(width, height);
    // console.log(sketchCanvas);
    sketchCanvas.parent(elementId);
    diameterADI = configDict['hud_adi']['ADI']['diameterRatio'] * min(width, height);
    diameterCompass = configDict['hud_adi']['compass']['diameterRatio'] * min(width, height);
}

function windowResized() {
    var elementId = 'adi';
    var canvasDiv = document.getElementById(elementId);
    var width = canvasDiv.offsetWidth;
    var height = configDict['hud_adi']['canvas']['heightToWidthRatio'] * width;
    resizeCanvas(width, height);
    diameterADI = configDict['hud_adi']['ADI']['diameterRatio'] * min(width, height);
    diameterCompass = configDict['hud_adi']['compass']['diameterRatio'] * min(width, height);
}

function draw() {
    background(50);
    translate(width/2, height/2);

    dataCheck();

    drawADI(diameterADI);
    terrain(diameterADI, rollDegrees, pitchDegrees, headingDegrees);
    drawADIPlane(diameterADI);
    // postEulerAngles(diameterCompass, rollDegrees, pitchDegrees, headingDegrees);
    drawCompass(diameterCompass, diameterADI, headingDegrees);
    if (configDict['hud_adi']['topCompass']['display']) {
        drawTopCompass(
            diameterCompass/2,
            20 - height/2,
            headingDegrees
        );
    }

    // keyCheck();
}