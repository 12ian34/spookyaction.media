document.getElementById('sounds').addEventListener('click', synthTone)

async function synthTone() {

    console.log('test')
    await Tone.start()
    console.log('audio is ready')

    // create two monophonic synths
    const synthA = new Tone.FMSynth().toDestination();
    const synthB = new Tone.AMSynth().toDestination();

    //create a distortion effect
    const dist = new Tone.Distortion(0.4).toDestination();

    //create a reverb effect
    const reverb = new Tone.Reverb(10).toDestination();

    const pingPong = new Tone.PingPongDelay("4n", 0.2).toDestination();

    //play a note every quarter-note
    const loopA = new Tone.Loop(time => {
        synthA.triggerAttackRelease("C2", "16n", time).connect(dist).connect(reverb);
    }, "4n").start(0);

    //play another note every off quarter-note, by starting it "8n"
    const loopB = new Tone.Loop(time => {
        synthB.triggerAttackRelease("C3", "16n", time).connect(dist).connect(reverb);
    }, "4n").start("8n");

    // the loops start when the Transport is started
    Tone.Transport.start()

    const synth = new Tone.PolySynth().toDestination().connect(pingPong).connect(reverb);
    // set the attributes across all the voices using 'set'
    // synth.set({ detune: -1200 });
    synth.triggerAttackRelease(["C4", "E4", "A4"], .5);

    // ramp up to 800 bpm over 10 seconds
    // Tone.Transport.bpm.rampTo(120, 10);

}

document.getElementById('stop').addEventListener('click', synthSoundsStop)

async function synthSoundsStop() {

    Tone.Transport.start()
    Tone.Transport.cancel()

}