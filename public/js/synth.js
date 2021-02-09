// var inputDistortion = document.getElementById("inputDistortion").value
// console.log(inputDistortion)
// console.log(inputDistortion.value)

// Get the text field that we're going to track
let inputDistortion = document.getElementById("inputDistortion");
let inputPingPong = document.getElementById("inputPingPong");
let inputReverb = document.getElementById("inputReverb");

if (localStorage.getItem("inputDistortion")) {
    inputDistortion.value = localStorage.getItem("inputDistortion");
}

if (localStorage.getItem("inputPingPong")) {
    inputPingPong.value = localStorage.getItem("inputPingPong");
}

if (localStorage.getItem("inputReverb")) {
    inputReverb.value = localStorage.getItem("inputReverb");
}

inputDistortion.addEventListener("change", function() {
    localStorage.setItem("inputDistortion", inputDistortion.value);
});
inputPingPong.addEventListener("change", function() {
    localStorage.setItem("inputPingPong", inputPingPong.value);
});
inputReverb.addEventListener("change", function() {
    localStorage.setItem("inputReverb", inputReverb.value);
});

function parameterChanges() {
    var parameterChangeFlex = document.getElementById("parameterChanges");
    if (parameterChangeFlex.style.display === "none") {
        parameterChangeFlex.style.display = "block";
    } else {
        parameterChangeFlex.style.display = "none";
    }
}

// function getParameters() {
//     distortion_value = document.getElementById("distortionValue").value
//     return distortion_value
// }

function synthSoundsStop() {

    Tone.Transport.stop()
    Tone.Transport.cancel()
    Tone.PolySynth.disconnect()

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
    console.log('audio is ready')

    console.log(inputDistortion)

    // create two monophonic synths
    const synthA = new Tone.FMSynth().toDestination();
    const synthB = new Tone.AMSynth().toDestination();

    //create a distortion effect
    console.log(inputDistortion.value)

    const dist = new Tone.Distortion(inputDistortion.value).toDestination();

    console.log(dist)


    //create a reverb effect
    const reverb = new Tone.Reverb(10).toDestination();

    const pingPong = new Tone.PingPongDelay(inputPingPong.value + "n", 0.8).toDestination();

    console.log(pingPong)


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
    synth.triggerAttackRelease(["C4", "E4", "A4"], .5).connect(pingPong).connect(reverb);

    // ramp up to 800 bpm over 10 seconds
    // Tone.Transport.bpm.rampTo(120, 10);

}

document.getElementById('sounds').addEventListener('click', synthTone)
document.getElementById('stop').addEventListener('click', synthSoundsStop)