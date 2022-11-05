import React from 'react';
import './App.css';
import MicRecorder from 'mic-recorder-to-mp3';
import './css/Recorder.css'


const Recorder = () => {
  // New instance
  const recorder = new MicRecorder({
    bitRate: 128
  });

  // Start recording. Browser will request permission to use your microphone.
  const startRecord = () => {
    recorder.start().then(() => {
      // something else
    }).catch((e) => {
      console.error(e);
    });
  }

  // Once you are done singing your best song, stop and get the mp3.
  const stopRecord = () => {
    recorder
      .stop()
    .getMp3().then(([buffer, blob]) => {
      // do what ever you want with buffer and blob
      // Example: Create a mp3 file and play
      const file = new File(buffer, 'me-at-thevoice.mp3', {
        type: blob.type,
        lastModified: Date.now()
      });

      const player = new Audio(URL.createObjectURL(file));
      player.play();

    }).catch((e) => {
      alert('We could not retrieve your message');
      console.log(e);
    });
  }

  return (
    // <div className="container">
    //   <header className='buttons'>
    //     <button className='startbtn' onClick={() => startRecord()} disabled={this.state.isRecording}>Record</button>
    //     <button className='stopbtn' onClick={() => stopRecord()} disabled={!this.state.isRecording}>Stop</button>
    //     {/* <audio src={this.state.blobURL} controls="controls" /> */}
    //   </header>
    // </div>
    <div>
      <button className='startbtn' onClick={() => startRecord()}>Record</button>
      <button className='stopbtn' onClick={() => stopRecord()}>Stop</button>
    </div>

  );
}

export default Recorder;
