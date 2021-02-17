// var inputDistortion = document.getElementById("inputDistortion").value
// console.log(inputDistortion)
// console.log(inputDistortion.value)

// const { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } = require("constants");

// const { addListener } = require("process");

var inputDistortion = document.getElementById('inputDistortion');
var inputDistortionLabel = document.getElementById("inputDistortionLabel");
var inputPingPongDelay = document.getElementById('inputPingPongDelay');
var inputPingPongDelayLabel = document.getElementById("inputPingPongDelayLabel");
var inputPingPongFeedback = document.getElementById('inputPingPongFeedback');
var inputPingPongFeedbackLabel = document.getElementById('inputPingPongFeedbackLabel');
var inputReverb = document.getElementById("inputReverb");
var inputReverbLabel = document.getElementById("inputReverbLabel");
var inputPitchShift = document.getElementById("inputPitchShift");
var inputPitchShiftLabel = document.getElementById("inputPitchShiftLabel");

var buttonSoundStart = document.getElementById('buttonSoundStart');
var buttonSoundStop = document.getElementById('buttonSoundStop');
var buttonDistortion = document.getElementById('buttonDistortion');
var buttonPingPong = document.getElementById('buttonPingPong');
var buttonReverb = document.getElementById('buttonReverb');
var buttonPitchShift = document.getElementById('buttonPitchShift');

var inputDistortionValue = document.getElementById("inputDistortionValue");
var inputPingPongDelayValue = document.getElementById("inputPingPongDelayValue");
var inputPingPongFeedbackValue = document.getElementById("inputPingPongFeedbackValue");
var inputReverbValue = document.getElementById("inputReverbValue");
var inputPitchShiftValue = document.getElementById("inputPitchShiftValue");

inputDistortionValue.innerHTML = inputDistortion.value;
inputPingPongDelayValue.innerHTML = inputPingPongDelay.value;
inputPingPongFeedbackValue.innerHTML = inputPingPongFeedback.value;
inputReverbValue.innerHTML = inputReverb.value;
inputPitchShiftValue.innerHTML = inputPitchShift.value;

var elementsDistortion = [
    inputDistortion,
    inputDistortionLabel,
    inputDistortionValue,
];

var elementsPingPong = [
    inputPingPongDelay,
    inputPingPongDelayLabel,
    inputPingPongDelayValue,
    inputPingPongFeedback,
    inputPingPongFeedbackLabel,
    inputPingPongFeedbackValue,
];

var elementsReverb = [
    inputReverb,
    inputReverbLabel,
];

var elementsPitchShift = [
    inputPitchShift,
    inputPitchShiftLabel,
];

var storableParameters = [
    inputDistortion,
    inputReverb,
    inputPingPongDelay,
    inputPingPongFeedback,
    inputReverb,
];

buttonSoundStart.addEventListener('click', synthTone);
buttonSoundStop.addEventListener('click', synthSoundsStop);

buttonDistortion.addEventListener('click', toggleDistortion);
buttonPingPong.addEventListener('click', togglePingPong);
buttonReverb.addEventListener('click', toggleReverb);
buttonPitchShift.addEventListener('click', togglePitchShift);

inputDistortion.oninput = function() {
    inputDistortionValue.innerHTML = this.value;
}

inputPingPongDelay.oninput = function() {
    inputPingPongDelayValue.innerHTML = this.value;
}

inputPingPongFeedback.oninput = function() {
    inputPingPongFeedbackValue.innerHTML = this.value;
}

inputReverb.oninput = function() {
    inputReverbValue.innerHTML = this.value;
}

inputPitchShift.oninput = function() {
    inputPitchShiftValue.innerHTML = this.value;
}


function getFromLocalStorage(parameter) {
    if (localStorage.getItem(String(parameter.id))) {
        parameter.value = localStorage.getItem(String(parameter.id));
    };
};

function checkAndStoreParameterChanges(parameter) {
    parameter.addEventListener("change", function() {
        localStorage.setItem(String(parameter.id), parameter.value);
        console.log("fuck2")

    });
};

function hideElements(parameter) {
    if (parameter.style.display === "none") {
        parameter.style.display = "block";
    } else {
        parameter.style.display = "none"
    };
};

function toggleDistortion() {
    for (let i = 0; i < elementsDistortion.length; i++) {
        hideElements(elementsDistortion[i]);
    };
};

function togglePingPong() {
    for (let i = 0; i < elementsPingPong.length; i++) {
        hideElements(elementsPingPong[i]);
    };
};

function toggleReverb() {
    for (let i = 0; i < elementsReverb.length; i++) {
        hideElements(elementsReverb[i]);
    };
};

function togglePitchShift() {
    for (let i = 0; i < elementsPitchShift.length; i++) {
        hideElements(elementsPitchShift[i]);
    };
};

function synthSoundsStop() {
    Tone.Transport.stop()
    Tone.Transport.cancel()
        // Tone.PolySynth.disconnect()
};

async function synthTone() {

    await Tone.start();
    const now = Tone.now()

    // create two monophonic synths
    // const synthA = new Tone.FMSynth().toDestination();
    // const synthB = new Tone.AMSynth().toDestination();

    const synth = new Tone.PolySynth().toDestination();

    if (inputPingPongDelay.value != 0 || inputPingPongFeedback.value != 0) {
        var pingPong = new Tone.PingPongDelay(inputPingPongDelay.value + "n", inputPingPongFeedback.value).toDestination();
        synth.connect(pingPong)
    };

    if (inputDistortion.value != 0) {
        var distortion = new Tone.Distortion(inputDistortion.value).toDestination();
        synth.connect(distortion)
    };

    if (inputReverb.value != 0) {
        var reverb = new Tone.Reverb(inputReverb.value).toDestination();
        synth.connect(reverb)
    };

    if (inputPitchShift.value != 0) {
        var pitchShift = new Tone.PitchShift({
            pitch: inputPitchShift.value,
            delayTime: 2
        }).toDestination();
        synth.connect(pitchShift)
    };

    inputDistortion.addEventListener("change", function() {
        distortion.distortion = inputDistortion.value;
        // distortion.set('distortion', inputDistortion.value);
    });

    synth.triggerAttackRelease(["C4", "E4", "A4"], "2")

    // connect(pingPong).connect(reverb).connect(distortion).connect(pitchShift);
    // synth.triggerAttackRelease(["C4", "E4", "A4"], "2n", now + 0.5).connect(pingPong).connect(reverb).connect(distortion).connect(pitchShift);
}

for (let i = 0; i < storableParameters.length; i++) {
    getFromLocalStorage(storableParameters[i]);
};



for (let i = 0; i < storableParameters.length; i++) {
    checkAndStoreParameterChanges(storableParameters[i]);
};



// // old snippets

// var inputDataSynth = {
//     'inputDistortion': 0,
//     'inputPingPong': 0,
//     'inputReverb': 0,
// }
// localStorage.setItem('dataKey', JSON.stringify(inputDataSynth));

// var val = localStorage.getItem('dataKey');

// if (localStorage.getItem(inputDataSynth)) {
//     inputDistortion.value = JSON.parse(localStorage.getItem("inputDistortion"));
//     inputPingPong.value = JSON.parse(localStorage.getItem("inputPingPong"));
//     inputReverb.value = JSON.parse(localStorage.getItem("inputReverb"));
// } else {
//     inputDistortion.value = JSON.parse(inputDataSynth("inputDistortion");
//     inputPingPong.value = JSON.parse(inputDataSynth("inputPingPong");
//     inputReverb.value = JSON.parse(inputDataSynth("inputReverb");
// }


// window.onload = function() {
//     if (sessionStorage.getItem("autosave")) {
//         distortion_value.value = sessionStorage.getItem("autosave");
//         // updatePricingFunction();
//     }
// }

// //play a note every quarter-note
// const loopA = new Tone.Loop(time => {
//     synthA.triggerAttackRelease("C2", "16n", time);
// }, "4n").start(0);

// //play another note every off quarter-note, by starting it "8n"
// const loopB = new Tone.Loop(time => {
//     synthB.triggerAttackRelease("C3", "16n", time);
// }, "4n").start("4n");

// // the loops start when the Transport is started
// Tone.Transport.start()

// set the attributes across all the voices using 'set'
// synth.set({ detune: -1200 });

// ramp up to 800 bpm over 10 seconds
// Tone.Transport.bpm.rampTo(120, 10);