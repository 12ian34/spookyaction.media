// var inputDistortion = document.getElementById("inputDistortion").value
// console.log(inputDistortion)
// console.log(inputDistortion.value)

// const { addListener } = require("process");

var inputDistortion = document.getElementById('inputDistortion');
var inputDistortionLabel = document.getElementById("inputDistortionLabel");
var inputPingPongDelay = document.getElementById('inputPingPongDelay');
var inputPingPongDelayLabel = document.getElementById("inputPingPongDelayLabel");
var inputPingPongFeedback = document.getElementById('inputPingPongFeedback');
var inputPingPongFeedbackLabel = document.getElementById('inputPingPongFeedbackLabel');
var inputReverb = document.getElementById("inputReverb");
var inputReverbLabel = document.getElementById("inputReverbLabel");

var distortionElements = [
    inputDistortion,
    inputDistortionLabel,
]

var pingPongElements = [
    inputPingPongDelay,
    inputPingPongDelayLabel,
    inputPingPongFeedback,
    inputPingPongFeedbackLabel,
]

var reverbElements = [
    inputReverb,
    inputReverbLabel,
]

var storedParameters = [
    inputDistortion,
    inputReverb,
    inputPingPongDelay,
    inputPingPongFeedback,
    inputReverb,
]

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


function getFromLocalStorage(parameter) {
    if (localStorage.getItem(String(parameter.id))) {
        parameter.value = localStorage.getItem(String(parameter.id));
    }
}

for (let i = 0; i < storedParameters.length; i++) {
    getFromLocalStorage(storedParameters[i]);
}


function createEventListener(parameter) {
    parameter.addEventListener("change", function() {
        localStorage.setItem(String(parameter.id), parameter.value);
    });
}

for (let i = 0; i < storedParameters.length; i++) {
    createEventListener(storedParameters[i]);
}

// inputDistortion.addEventListener("change", function() {
//     localStorage.setItem("inputDistortion", inputDistortion.value);
// });
// inputPingPongDelay.addEventListener("change", function() {
//     localStorage.setItem("inputPingPongDelay", inputPingPongDelay.value);
// });
// inputPingPongFeedback.addEventListener("change", function() {
//     localStorage.setItem("inputPingPongFeedback", inputPingPongFeedback.value);
// });
// inputReverb.addEventListener("change", function() {
//     localStorage.setItem("inputReverb", inputReverb.value);
// });


function hideElements(parameter) {
    if (parameter.style.display === "none") {
        parameter.style.display = "block";
    } else {
        parameter.style.display = "none"
    }
}

function changeDistortion() {
    for (let i = 0; i < distortionElements.length; i++) {
        hideElements(distortionElements[i]);
    }
}

function changePingPong() {
    for (let i = 0; i < pingPongElements.length; i++) {
        hideElements(pingPongElements[i]);
    }
}

function changeReverb() {
    for (let i = 0; i < reverbElements.length; i++) {
        hideElements(reverbElements[i]);
    }
}

// function getParameters() {
//     distortion_value = document.getElementById("distortionValue").value
//     return distortion_value
// }

function synthSoundsStop() {

    Tone.Transport.stop()
    Tone.Transport.cancel()
        // Tone.PolySynth.disconnect()

}

// window.onload = function() {
//     if (sessionStorage.getItem("autosave")) {
//         distortion_value.value = sessionStorage.getItem("autosave");
//         // updatePricingFunction();
//     }
// }

// distortion_value.addEventListener("keyup", getParameters() {
//     sessionStorage.setItem("autosave", myInput.value);
// });

async function synthTone() {

    await Tone.start()

    // create two monophonic synths
    const synthA = new Tone.FMSynth().toDestination();
    const synthB = new Tone.AMSynth().toDestination();

    const distortion = new Tone.Distortion(inputDistortion.value).toDestination();
    const pingPong = new Tone.PingPongDelay(inputPingPongDelay.value + "n", inputPingPongFeedback.value).toDestination();
    const reverb = new Tone.Reverb(inputReverb.value).toDestination();

    // //play a note every quarter-note
    // const loopA = new Tone.Loop(time => {
    //     synthA.triggerAttackRelease("C2", "16n", time).connect(dist).connect(reverb);
    // }, "4n").start(0);

    // //play another note every off quarter-note, by starting it "8n"
    // const loopB = new Tone.Loop(time => {
    //     synthB.triggerAttackRelease("C3", "16n", time).connect(dist).connect(reverb);
    // }, "4n").start("8n");

    // // the loops start when the Transport is started
    // Tone.Transport.start()

    const synth = new Tone.PolySynth().toDestination();
    // set the attributes across all the voices using 'set'
    // synth.set({ detune: -1200 });
    synth.triggerAttackRelease(["C4", "E4", "A4"], "2n").connect(pingPong).connect(reverb).connect(distortion);

    synth.triggerAttackRelease(["C4", "E4", "A4"], "2n", now + 0.5).connect(pingPong).connect(reverb).connect(distortion);




    // ramp up to 800 bpm over 10 seconds
    // Tone.Transport.bpm.rampTo(120, 10);

}

document.getElementById('sounds').addEventListener('click', synthTone)
document.getElementById('stop').addEventListener('click', synthSoundsStop)