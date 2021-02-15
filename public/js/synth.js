// var inputDistortion = document.getElementById("inputDistortion").value
// console.log(inputDistortion)
// console.log(inputDistortion.value)

let inputDistortion = document.getElementById('inputDistortion');
let inputPingPongDelay = document.getElementById('inputPingPongDelay');
let inputPingPongFeedback = document.getElementById('inputPingPongFeedback');
let inputReverb = document.getElementById('inputReverb');

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

if (localStorage.getItem("inputDistortion")) {
    inputDistortion.value = localStorage.getItem("inputDistortion");
}

if (localStorage.getItem("inputPingPongDelay")) {
    inputPingPongDelay.value = localStorage.getItem("inputPingPongDelay");
}

if (localStorage.getItem("inputPingPongFeedback")) {
    inputPingPongFeedback.value = localStorage.getItem("inputPingPongFeedback");
}

if (localStorage.getItem("inputReverb")) {
    inputReverb.value = localStorage.getItem("inputReverb");
}

inputDistortion.addEventListener("change", function() {
    localStorage.setItem("inputDistortion", inputDistortion.value);
});
inputPingPongDelay.addEventListener("change", function() {
    localStorage.setItem("inputPingPongDelay", inputPingPongDelay.value);
});
inputPingPongFeedback.addEventListener("change", function() {
    localStorage.setItem("inputPingPongFeedback", inputPingPongFeedback.value);
});
inputReverb.addEventListener("change", function() {
    localStorage.setItem("inputReverb", inputReverb.value);
});

function changeDistortion() {
    var parameterChangeFlexDistortion = document.getElementById("inputDistortion");
    if (parameterChangeFlexDistortion.style.display === "none") {
        parameterChangeFlexDistortion.style.display = "block";
    } else {
        parameterChangeFlexDistortion.style.display = "none";
    }
}

function changePingPong() {
    var parameterChangeFlexDelay = document.getElementById("inputPingPongDelay");
    var parameterChangeFlexDelayLabel = document.getElementById("inputPingPongDelayLabel");
    var parameterChangeFlexFeedback = document.getElementById("inputPingPongFeedback");
    var parameterChangeFlexFeedbackLabel = document.getElementById("inputPingPongFeedbackLabel");

    if (parameterChangeFlexDelay.style.display === "none") {
        parameterChangeFlexDelay.style.display = "block";
    } else {
        parameterChangeFlexDelay.style.display = "none";
    }

    if (parameterChangeFlexFeedback.style.display === "none") {
        parameterChangeFlexFeedback.style.display = "block";
    } else {
        parameterChangeFlexFeedback.style.display = "none";
    }

    if (parameterChangeFlexDelayLabel.style.display === "none") {
        parameterChangeFlexDelayLabel.style.display = "block";
    } else {
        parameterChangeFlexDelayLabel.style.display = "none";
    }

    if (parameterChangeFlexFeedbackLabel.style.display === "none") {
        parameterChangeFlexFeedbackLabel.style.display = "block";
    } else {
        parameterChangeFlexFeedbackLabel.style.display = "none";
    }
}

function changeReverb() {
    var parameterChangeFlexReverb = document.getElementById("inputReverb");
    if (parameterChangeFlexReverb.style.display === "none") {
        parameterChangeFlexReverb.style.display = "block";
    } else {
        parameterChangeFlexReverb.style.display = "none";
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

    synth.triggerAttackRelease(["C4", "E4", "A4"], "2n", now+0.5).connect(pingPong).connect(reverb).connect(distortion);




    // ramp up to 800 bpm over 10 seconds
    // Tone.Transport.bpm.rampTo(120, 10);

}

document.getElementById('sounds').addEventListener('click', synthTone)
document.getElementById('stop').addEventListener('click', synthSoundsStop)