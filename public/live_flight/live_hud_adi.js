let diameterADI = 0;
let diameterCompass = 0;


const onTickData = {};

// Attitude Angles In Degrees
onTickData['rollDegrees'] = 0;
onTickData['pitchDegrees'] = 0;
onTickData['headingDegrees'] = 0;

    // Airspeeds in different units
onTickData['airspeed'] = {};
onTickData['airspeed']['mps'] = 0;
onTickData['airspeed']['knots'] = 0;
onTickData['airspeed']['mph'] = 0;
onTickData['airspeed']['kph'] = 0;

onTickData['groundspeed'] = {};
onTickData['groundspeed']['mps'] = 0;
onTickData['groundspeed']['knots'] = 0;
onTickData['groundspeed']['mph'] = 0;
onTickData['groundspeed']['kph'] = 0;

// Windspeeds in different units
const windspeed = {};
windspeed['mps'] = 0;
windspeed['knots'] = 0;
windspeed['mph'] = 0;
windspeed['kph'] = 0;

const wind_direction = {};
wind_direction['degrees'] = 0;
wind_direction['radians'] = 0;

const track_angle = {};
track_angle['degrees'] = 0;
track_angle['radians'] = 0;

const altitude = {};
altitude['meters'] = 0;
altitude['feet'] = 0;
altitude['yards'] = 0;

const vel_d = {};
vel_d['mps'] = 0;
vel_d['fps'] = 0;

const alpha = {};
alpha['degrees'] = 0;
alpha['radians'] = 0;

const beta = {};
beta['degrees'] = 0;
beta['radians'] = 0;

const vel_xyz = {};
vel_xyz['0'] = 0;
vel_xyz['x'] = 0;
vel_xyz['y'] = 0;
vel_xyz['z'] = 0;


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

function getTicks(axisMin, axisMax, minorMarker, majorMarker, minorMarkers, majorMarkers) {
    var minorTickIndex = Math.ceil(axisMin/minorMarker);
    while ((minorTickIndex)*(minorMarker) <= (axisMax)) {
        minorMarkers.push((minorTickIndex)*(minorMarker));
        minorTickIndex++;
    }

    var majorTickIndex = Math.ceil(axisMin/majorMarker);
    while ((majorTickIndex)*(majorMarker) <= (axisMax)) {
        majorMarkers.push((majorTickIndex)*(majorMarker));
        majorTickIndex++;
    }
}

function showGS(width, height) {
    if (configDict['hud_adi']['GS']['display']) {
        const unitChosen = configDict['hud_adi']['GS']['unitChosen'];
        strokeWeight(configDict['hud_adi']['GS']['stroke']['weight']);
        const c = color(
            configDict['hud_adi']['GS']['stroke']['color']['R'],
            configDict['hud_adi']['GS']['stroke']['color']['G'],
            configDict['hud_adi']['GS']['stroke']['color']['B']
        );
        stroke(c);
        fill(c);
        const xpos = -(width/2) + configDict['hud_adi']['GS']['xOffset'] + configDict['hud_adi']['ASI']['mainMarkerLength'];
        const ypos = configDict['hud_adi']['GS']['yOffset'];

        textSize(width*configDict['hud_adi']['GS']['mainTextSizeRatio']);
        textAlign(LEFT, CENTER);
        if (isNaN(onTickData['groundspeed'][unitChosen])) {
            console.log(`${onTickData['groundspeed'][unitChosen]} is NaN`);
        } else {
            textMessage = onTickData['groundspeed'][unitChosen].toFixed(1);
            text(textMessage, xpos, ypos);
        }
    }
}

function drawASI(width, height) {
    if (configDict['hud_adi']['ASI']['display']) {
        const spanRatio = configDict['hud_adi']['ASI']['verticalSpanRatio'];
        const unitChosen = configDict['hud_adi']['ASI']['unitChosen'];
        const airSpeedSpan = configDict['hud_adi']['ASI']['units'][unitChosen]['airSpeedSpan'];
        const lowAirspeed = onTickData['airspeed'][unitChosen] - airSpeedSpan/2;
        const highAirspeed = onTickData['airspeed'][unitChosen] + airSpeedSpan/2;
        const airSpeedMinorTicks = [];
        const airSpeedMajorTicks = [];
        getTicks(
            lowAirspeed,
            highAirspeed,
            configDict['hud_adi']['ASI']['units'][unitChosen]['minorMarker'],
            configDict['hud_adi']['ASI']['units'][unitChosen]['majorMarker'],
            airSpeedMinorTicks,
            airSpeedMajorTicks
        );
    
        noFill();
        strokeWeight(configDict['hud_adi']['ASI']['stroke']['weight']);
        const c = color(
            configDict['hud_adi']['ASI']['stroke']['color']['R'],
            configDict['hud_adi']['ASI']['stroke']['color']['G'],
            configDict['hud_adi']['ASI']['stroke']['color']['B']
        );
        stroke(c);
        const xpos = -(width/2) + configDict['hud_adi']['ASI']['xOffset'];

        line(xpos, -(height/2)*spanRatio, xpos, (height/2)*spanRatio);
        line(xpos, 0, xpos + configDict['hud_adi']['ASI']['mainMarkerLength'], 0);
        fill(c);
        textSize(width*configDict['hud_adi']['ASI']['mainTextSizeRatio']);
        textAlign(LEFT, CENTER);
        if (isNaN(onTickData['airspeed'][unitChosen])) {
            console.log(`${onTickData['airspeed'][unitChosen]} is NaN`);
        } else {
            textMessage = onTickData['airspeed'][unitChosen].toFixed(1);
            text(textMessage, xpos + configDict['hud_adi']['ASI']['mainMarkerLength'], 0);
        }

        textSize(width*configDict['hud_adi']['ASI']['majorTickTextSizeRatio']);
        noFill();


        airSpeedMinorTicks.forEach(airSpeedMinorTick => {
            line(
                xpos - configDict['hud_adi']['ASI']['minorTickXOffset'], 
                (height/2)*spanRatio - (height)*(spanRatio)*((airSpeedMinorTick)-(lowAirspeed))/airSpeedSpan,
                xpos, 
                (height/2)*spanRatio - (height)*(spanRatio)*((airSpeedMinorTick)-(lowAirspeed))/airSpeedSpan
            );            
        });

        airSpeedMajorTicks.forEach(airSpeedMajorTick => {
            line(
                xpos - configDict['hud_adi']['ASI']['majorTickXOffset'], 
                (height/2)*spanRatio - (height)*(spanRatio)*((airSpeedMajorTick)-(lowAirspeed))/airSpeedSpan,
                xpos, 
                (height/2)*spanRatio - (height)*(spanRatio)*((airSpeedMajorTick)-(lowAirspeed))/airSpeedSpan
            );
            text(
                airSpeedMajorTick,
                xpos + configDict['hud_adi']['ASI']['majorTickTextXOffset'],
                (height/2)*spanRatio - (height)*(spanRatio)*((airSpeedMajorTick)-(lowAirspeed))/airSpeedSpan
            );
        });
    }
}

function drawSlip(width, height) {
    if (configDict['hud_adi']['slip']['display']) {
        const spanRatio = configDict['hud_adi']['slip']['horizontalSpanRatio'];
        const unitChosen = configDict['hud_adi']['slip']['unitChosen'];
        const slipSpan = configDict['hud_adi']['slip']['units'][unitChosen]['slipSpan'];
        const lowSlip = - slipSpan/2;
        const highSlip = + slipSpan/2;
        const slipAngle = +(beta[unitChosen]);
        const slipMinorTicks = [];
        const slipMajorTicks = [];
        getTicks(
            lowSlip,
            highSlip,
            configDict['hud_adi']['slip']['units'][unitChosen]['minorMarker'],
            configDict['hud_adi']['slip']['units'][unitChosen]['majorMarker'],
            slipMinorTicks,
            slipMajorTicks
        );

        noFill();
        strokeWeight(configDict['hud_adi']['slip']['stroke']['weight']);
        const c = color(
            configDict['hud_adi']['slip']['stroke']['color']['R'],
            configDict['hud_adi']['slip']['stroke']['color']['G'],
            configDict['hud_adi']['slip']['stroke']['color']['B']
        );
        stroke(c);
        const xpos = configDict['hud_adi']['slip']['xOffset'];
        const ypos = (height/2) - configDict['hud_adi']['slip']['yOffset'];

        line(xpos-(width/2)*spanRatio, ypos, xpos + (width/2)*spanRatio, ypos);
        // line(xpos, ypos, xpos, ypos - configDict['hud_adi']['slip']['mainMarkerLength']);
        fill(c);

        rect(xpos, ypos, xpos - (width/2)*spanRatio + (width)*(spanRatio)*((slipAngle)-(lowSlip))/slipSpan, ypos+configDict['hud_adi']['slip']['majorTickXOffset']);
        textSize(width*configDict['hud_adi']['slip']['mainTextSizeRatio']);
        textAlign(CENTER, BASELINE);
        textMessage = slipAngle.toFixed(1) + 'º';
        text(textMessage, xpos, ypos - configDict['hud_adi']['slip']['mainMarkerLength']);

        // textSize(width*configDict['hud_adi']['altimeter']['majorTickTextSizeRatio']);
        // noFill();


        slipMinorTicks.forEach(vSpeedMinorTick => {
            line(
                xpos - (height/2)*spanRatio + (height)*(spanRatio)*((vSpeedMinorTick)-(lowSlip))/slipSpan, 
                ypos + configDict['hud_adi']['slip']['minorTickXOffset'],
                xpos - (height/2)*spanRatio + (height)*(spanRatio)*((vSpeedMinorTick)-(lowSlip))/slipSpan, 
                ypos
            );            
        });

        slipMajorTicks.forEach(vSpeedMajorTick => {
            line(
                xpos - (height/2)*spanRatio + (height)*(spanRatio)*((vSpeedMajorTick)-(lowSlip))/slipSpan, 
                ypos + configDict['hud_adi']['slip']['majorTickXOffset'],
                xpos - (height/2)*spanRatio + (height)*(spanRatio)*((vSpeedMajorTick)-(lowSlip))/slipSpan, 
                ypos
            );
            // text(
            //     vSpeedMajorTick,
            //     xpos - configDict['hud_adi']['slip']['majorTickTextXOffset'],
            //     (height/2)*spanRatio - (height)*(spanRatio)*((vSpeedMajorTick)-(lowSlip))/slipSpan
            // );
        });
    }
}

function drawVSI(width, height) {
    if (configDict['hud_adi']['VSI']['display']) {
        const spanRatio = configDict['hud_adi']['VSI']['verticalSpanRatio'];
        const unitChosen = configDict['hud_adi']['VSI']['unitChosen'];
        const vSpeedSpan = configDict['hud_adi']['VSI']['units'][unitChosen]['vSpeedSpan'];
        const lowVSpeed = - vSpeedSpan/2;
        const highVSpeed = + vSpeedSpan/2;
        const vs = -(vel_d[unitChosen]);
        const vSpeedMinorTicks = [];
        const vSpeedMajorTicks = [];
        getTicks(
            lowVSpeed,
            highVSpeed,
            configDict['hud_adi']['VSI']['units'][unitChosen]['minorMarker'],
            configDict['hud_adi']['VSI']['units'][unitChosen]['majorMarker'],
            vSpeedMinorTicks,
            vSpeedMajorTicks
        );

        noFill();
        strokeWeight(configDict['hud_adi']['VSI']['stroke']['weight']);
        const c = color(
            configDict['hud_adi']['VSI']['stroke']['color']['R'],
            configDict['hud_adi']['VSI']['stroke']['color']['G'],
            configDict['hud_adi']['VSI']['stroke']['color']['B']
        );
        stroke(c);
        const xpos = (width/2) - configDict['hud_adi']['VSI']['xOffset'];

        line(xpos, -(height/2)*spanRatio, xpos, (height/2)*spanRatio);
        line(xpos, 0, xpos - configDict['hud_adi']['VSI']['mainMarkerLength'], 0);
        fill(c);

        rect(xpos, 0, configDict['hud_adi']['VSI']['majorTickXOffset'], (height/2)*spanRatio - (height)*(spanRatio)*((vs)-(lowVSpeed))/vSpeedSpan);
        textSize(width*configDict['hud_adi']['VSI']['mainTextSizeRatio']);
        textAlign(RIGHT, CENTER);
        textMessage = vs.toFixed(1);
        text(textMessage, xpos - configDict['hud_adi']['VSI']['mainMarkerLength'], 0);

        // textSize(width*configDict['hud_adi']['altimeter']['majorTickTextSizeRatio']);
        // noFill();


        vSpeedMinorTicks.forEach(vSpeedMinorTick => {
            line(
                xpos + configDict['hud_adi']['VSI']['minorTickXOffset'], 
                (height/2)*spanRatio - (height)*(spanRatio)*((vSpeedMinorTick)-(lowVSpeed))/vSpeedSpan,
                xpos, 
                (height/2)*spanRatio - (height)*(spanRatio)*((vSpeedMinorTick)-(lowVSpeed))/vSpeedSpan
            );            
        });

        vSpeedMajorTicks.forEach(vSpeedMajorTick => {
            line(
                xpos + configDict['hud_adi']['VSI']['majorTickXOffset'], 
                (height/2)*spanRatio - (height)*(spanRatio)*((vSpeedMajorTick)-(lowVSpeed))/vSpeedSpan,
                xpos, 
                (height/2)*spanRatio - (height)*(spanRatio)*((vSpeedMajorTick)-(lowVSpeed))/vSpeedSpan
            );
            // text(
            //     vSpeedMajorTick,
            //     xpos - configDict['hud_adi']['VSI']['majorTickTextXOffset'],
            //     (height/2)*spanRatio - (height)*(spanRatio)*((vSpeedMajorTick)-(lowVSpeed))/vSpeedSpan
            // );
        });

    }
}

function drawAOA(width, height) {
    if (configDict['hud_adi']['AOA']['display']) {
        const spanRatio = configDict['hud_adi']['AOA']['verticalSpanRatio'];
        const unitChosen = configDict['hud_adi']['AOA']['unitChosen'];
        const alphaSpan = configDict['hud_adi']['AOA']['units'][unitChosen]['alphaSpan'];
        const lowAlpha = alpha[unitChosen] - alphaSpan/2;
        const highAlpha = alpha[unitChosen] + alphaSpan/2;
        const alphaMinorTicks = [];
        const alphaMajorTicks = [];
        getTicks(
            lowAlpha,
            highAlpha,
            configDict['hud_adi']['AOA']['units'][unitChosen]['minorMarker'],
            configDict['hud_adi']['AOA']['units'][unitChosen]['majorMarker'],
            alphaMinorTicks,
            alphaMajorTicks
        );
    
        noFill();
        strokeWeight(configDict['hud_adi']['AOA']['stroke']['weight']);
        const c = color(
            configDict['hud_adi']['AOA']['stroke']['color']['R'],
            configDict['hud_adi']['AOA']['stroke']['color']['G'],
            configDict['hud_adi']['AOA']['stroke']['color']['B']
        );
        stroke(c);
        const xpos = -((width)/2) + configDict['hud_adi']['AOA']['xOffset'];
        const ypos = -((height)/2) + configDict['hud_adi']['AOA']['yOffset'];

        line(xpos, ypos-(height/2)*spanRatio, xpos, ypos+(height/2)*spanRatio);
        line(xpos, ypos, xpos + configDict['hud_adi']['AOA']['mainMarkerLength'], ypos);
        fill(c);
        textSize(width*configDict['hud_adi']['AOA']['mainTextSizeRatio']);
        textAlign(LEFT, CENTER);
        textMessage = alpha[unitChosen].toFixed(1) + 'º';
        text(textMessage, xpos + configDict['hud_adi']['AOA']['mainMarkerLength'], ypos);

        textSize(width*configDict['hud_adi']['AOA']['majorTickTextSizeRatio']);
        noFill();


        alphaMinorTicks.forEach(alphaMinorTick => {
            line(
                xpos - configDict['hud_adi']['AOA']['minorTickXOffset'], 
                ypos + (height/2)*spanRatio - (height)*(spanRatio)*((alphaMinorTick)-(lowAlpha))/alphaSpan,
                xpos, 
                ypos + (height/2)*spanRatio - (height)*(spanRatio)*((alphaMinorTick)-(lowAlpha))/alphaSpan
            );            
        });

        alphaMajorTicks.forEach(alphaMajorTick => {
            line(
                xpos - configDict['hud_adi']['AOA']['majorTickXOffset'], 
                ypos + (height/2)*spanRatio - (height)*(spanRatio)*((alphaMajorTick)-(lowAlpha))/alphaSpan,
                xpos, 
                ypos + (height/2)*spanRatio - (height)*(spanRatio)*((alphaMajorTick)-(lowAlpha))/alphaSpan
            );
            text(
                alphaMajorTick + 'º',
                xpos + configDict['hud_adi']['AOA']['majorTickTextXOffset'],
                ypos + (height/2)*spanRatio - (height)*(spanRatio)*((alphaMajorTick)-(lowAlpha))/alphaSpan
            );
        });
    }
}

function drawAltimeter(width, height) {
    if (configDict['hud_adi']['altimeter']['display']) {
        const spanRatio = configDict['hud_adi']['altimeter']['verticalSpanRatio'];
        const unitChosen = configDict['hud_adi']['altimeter']['unitChosen'];
        const altitudeSpan = configDict['hud_adi']['altimeter']['units'][unitChosen]['altitudeSpan'];
        const lowAltitude = altitude[unitChosen] - altitudeSpan/2;
        const highAltitude = altitude[unitChosen] + altitudeSpan/2;
        const altitudeMinorTicks = [];
        const altitudeMajorTicks = [];
        getTicks(
            lowAltitude,
            highAltitude,
            configDict['hud_adi']['altimeter']['units'][unitChosen]['minorMarker'],
            configDict['hud_adi']['altimeter']['units'][unitChosen]['majorMarker'],
            altitudeMinorTicks,
            altitudeMajorTicks
        );
    
        noFill();
        strokeWeight(configDict['hud_adi']['altimeter']['stroke']['weight']);
        const c = color(
            configDict['hud_adi']['altimeter']['stroke']['color']['R'],
            configDict['hud_adi']['altimeter']['stroke']['color']['G'],
            configDict['hud_adi']['altimeter']['stroke']['color']['B']
        );
        stroke(c);
        const xpos = (width/2) - configDict['hud_adi']['altimeter']['xOffset'];

        line(xpos, -(height/2)*spanRatio, xpos, (height/2)*spanRatio);
        line(xpos, 0, xpos - configDict['hud_adi']['altimeter']['mainMarkerLength'], 0);
        fill(c);
        textSize(width*configDict['hud_adi']['altimeter']['mainTextSizeRatio']);
        textAlign(RIGHT, CENTER);
        textMessage = altitude[unitChosen].toFixed(1);
        text(textMessage, xpos - configDict['hud_adi']['altimeter']['mainMarkerLength'], 0);

        textSize(width*configDict['hud_adi']['altimeter']['majorTickTextSizeRatio']);
        noFill();


        altitudeMinorTicks.forEach(altitudeMinorTick => {
            line(
                xpos + configDict['hud_adi']['altimeter']['minorTickXOffset'], 
                (height/2)*spanRatio - (height)*(spanRatio)*((altitudeMinorTick)-(lowAltitude))/altitudeSpan,
                xpos, 
                (height/2)*spanRatio - (height)*(spanRatio)*((altitudeMinorTick)-(lowAltitude))/altitudeSpan
            );            
        });

        altitudeMajorTicks.forEach(altitudeMajorTick => {
            line(
                xpos + configDict['hud_adi']['altimeter']['majorTickXOffset'], 
                (height/2)*spanRatio - (height)*(spanRatio)*((altitudeMajorTick)-(lowAltitude))/altitudeSpan,
                xpos, 
                (height/2)*spanRatio - (height)*(spanRatio)*((altitudeMajorTick)-(lowAltitude))/altitudeSpan
            );
            text(
                altitudeMajorTick,
                xpos - configDict['hud_adi']['altimeter']['majorTickTextXOffset'],
                (height/2)*spanRatio - (height)*(spanRatio)*((altitudeMajorTick)-(lowAltitude))/altitudeSpan
            );
        });
    }
}

function drawTopCompass(compassWidth, compassDepth, headingDeg) {
    if (configDict['hud_adi']['topCompass']['display']) {
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
                            textAlign(CENTER, BASELINE);
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
                            textAlign(CENTER, BASELINE);
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
                        textAlign(CENTER, BASELINE);
                        text(headingDict[key],
                            x_pos + (compassWidth*configDict['hud_adi']['terrainCompass']['scaleMarkers']['text']['textSizeToRadiusRatio'])/2,
                            compassDepth + compassWidth * configDict['hud_adi']['terrainCompass']['scaleMarkers']['text']['verticalDepthToRadiusRatio']);
                }
            }
        }
        strokeWeight(1);
        stroke('white');
        fill('white');
        textSize(compassWidth*0.08);
        textAlign(CENTER);
        textMessage = headingDeg.toFixed(0) + 'º';
        text(textMessage, 0, compassDepth + 40);  // TODO needs to be in config
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
                        textAlign(CENTER, BASELINE);
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
                        textAlign(CENTER, BASELINE);
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
                    textAlign(CENTER, BASELINE);
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
                textAlign(LEFT, CENTER);
                text(configDict['hud_adi']['pitchLines']['lineType'][lineTypeIndex]['angles'][angleIndex],
                    radius * configDict['hud_adi']['pitchLines']['lineType'][lineTypeIndex]['radiusRatio'] + 5,
                    configDict['hud_adi']['pitchLines']['lineType'][lineTypeIndex]['angles'][angleIndex] * diameterADI / configDict['hud_adi']['pitchLines']['pitchAngleSpan']
                );
                textAlign(RIGHT, CENTER);
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

    rotate(+(wind_direction['radians']));
    c = color(
        configDict['hud_adi']['compass']['wind']['color']['R'],
        configDict['hud_adi']['compass']['wind']['color']['G'],
        configDict['hud_adi']['compass']['wind']['color']['B']
    );

    stroke(c);
    fill(c);
    textSize(diameterCompass*configDict['hud_adi']['compass']['wind']['textSizeRatio']);
    strokeWeight(configDict['hud_adi']['compass']['wind']['weight']);
    line(0, -radiusCompass, 0, -radiusCompass-(configDict['hud_adi']['compass']['wind']['lineDistance']));
    textAlign(CENTER, BOTTOM);
    let textMessage = windspeed['mps'].toFixed(1);
    text(textMessage, 0, -radiusCompass-(configDict['hud_adi']['compass']['wind']['speedDistance']));
    textMessage = wind_direction['degrees'].toFixed(1);
    text(textMessage, 0, -radiusCompass-(configDict['hud_adi']['compass']['wind']['angleDistance']));
    
    rotate(-(wind_direction['radians']));

    rotate(+(track_angle['radians']));
    c = color(
        configDict['hud_adi']['compass']['track']['color']['R'],
        configDict['hud_adi']['compass']['track']['color']['G'],
        configDict['hud_adi']['compass']['track']['color']['B']
    );

    stroke(c);
    fill(c);
    textSize(diameterCompass*configDict['hud_adi']['compass']['track']['textSizeRatio']);
    strokeWeight(configDict['hud_adi']['compass']['track']['weight']);
    line(0, -radiusCompass, 0, -radiusCompass-(configDict['hud_adi']['compass']['track']['lineDistance']));
    textAlign(CENTER, BOTTOM);
    if (isNaN(onTickData['groundspeed']['mps'])) {
        console.log(`${onTickData['groundspeed']['mps']} is NaN`);
    } else {
        textMessage = onTickData['groundspeed']['mps'].toFixed(1);
        text(textMessage, 0, -radiusCompass-(configDict['hud_adi']['compass']['track']['speedDistance']));
    }
    textMessage = track_angle['degrees'].toFixed(1);
    text(textMessage, 0, -radiusCompass-(configDict['hud_adi']['compass']['track']['angleDistance']));
    
    rotate(-(track_angle['radians']));

    rotate(radians(-headingDeg));

}

function dataCheck() {
    if (onTickData['rollDegrees']>180) {
        onTickData['rollDegrees']-=360;
    }
    if (onTickData['rollDegrees']<-180) {
        onTickData['rollDegrees']+=360;
    }
    onTickData['headingDegrees']=onTickData['headingDegrees']%360;
    if (onTickData['headingDegrees']<0) {
        onTickData['headingDegrees']+=360;
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

function postVelocityBody(width, height) {
    strokeWeight(1);
    stroke('white');
    fill('white');
    textSize(width*0.03);
    textAlign(RIGHT);
    let textMessage = "V0 : " + vel_xyz['0'].toFixed(1);
    text(textMessage, width/2, height/2 - (4*height*0.03));
    textMessage = "Vx : " + vel_xyz['x'].toFixed(1);
    text(textMessage, width/2, height/2 - (3*height*0.03));
    textMessage = "Vy : " + vel_xyz['y'].toFixed(1);
    text(textMessage, width/2, height/2 - (2*height*0.03));
    textMessage = "Vz : " + vel_xyz['z'].toFixed(1);
    text(textMessage, width/2, height/2 - (1*height*0.03));
}


function draw() {
    background(50);
    translate(width/2, height/2);

    dataCheck();

    drawADI(diameterADI);
    terrain(diameterADI, onTickData['rollDegrees'], onTickData['pitchDegrees'], onTickData['headingDegrees']);
    drawADIPlane(diameterADI);
    // postEulerAngles(diameterCompass, onTickData['rollDegrees'], onTickData['pitchDegrees'], onTickData['headingDegrees']);
    drawCompass(diameterCompass, diameterADI, onTickData['headingDegrees']);
    drawTopCompass(
        diameterCompass/2,
        20 - height/2,
        onTickData['headingDegrees']
    );
    drawASI(width, height);
    showGS(width, height);
    drawAltimeter(width, height);
    drawVSI(width, height);

    drawAOA(width, height);
    drawSlip(width, height);

    // postVelocityBody(width, height);
    // keyCheck();
}