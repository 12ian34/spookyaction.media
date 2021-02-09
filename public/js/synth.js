console.log(document.getElementById('tone'))

document.getElementById('tone').addEventListener('click', synthTone)

async function synthTone() {
    console.log('test')
    await Tone.start()
    console.log('audio is ready')
        // create two monophonic synths
    const synthA = new Tone.FMSynth().toDestination();
    const synthB = new Tone.AMSynth().toDestination();
    //play a note every quarter-note
    const loopA = new Tone.Loop(time => {
        synthA.triggerAttackRelease("C2", "8n", time);
    }, "4n").start(0);
    //play another note every off quarter-note, by starting it "8n"
    const loopB = new Tone.Loop(time => {
        synthB.triggerAttackRelease("C4", "8n", time);
    }, "4n").start("8n");
    // the loops start when the Transport is started
    Tone.Transport.start()
        // ramp up to 800 bpm over 10 seconds
    Tone.Transport.bpm.rampTo(800, 10);
}