import React, { useEffect, useState } from "react";
import "./css/Inputui.css";
import Recorder from "./Recorder";
import UploadAudio from './UploadAudio';
import logo from "./images/logo.png";
import axios from "axios";

const Inputui = () => {
  const [audio, setAudio] = useState();
  const [auth, setAuth] = useState();
  const [buttonName, setButtonName] = useState('Play');

  const customURI = "http://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Kangaroo_MusiQue_-_The_Neverwritten_Role_Playing_Game.mp3";

  const upload = () => {
    console.log("upload button clicked");
  };

  // const [audioURL, setAudioURL] = useState("");

  useEffect(() => {
    axios
      .post("https://api.symbl.ai/oauth2/token:generate", {
        "type": "application",
        "appId": "6d4d7a64417162706b777a73485747596b733972504a7167433038364b65716b",
        "appSecret": "2d7832617268464a514c484b4268726d5635654665686b53626638354d42426443476a7173674f2d534f35734f64684b33544b45317041656e707951574d7638"
      })
      .then((response) => {
        console.log(response.data);
        setAuth(response.data);
      });
  }, [])

  const uploadFile = async () => {
    const accessToken = auth.accessToken;
    const symblaiParams = {
      name: 'Speechanalysis101',
      url: customURI
    }

    const fetchResponse = await fetch('https://api.symbl.ai/v1/process/audio/url', {
      method: 'POST',
      body: JSON.stringify(symblaiParams),
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    });

    const responseBody = await fetchResponse.json();

    console.log(responseBody);
  }


  var a;

  if (audio) {
    a = new Audio(audio)
  }

  const handleClick = () => {
    if (buttonName === 'Play') {
      a.play()
      setButtonName('Pause')
    } else {
      a.pause()
      setButtonName('Play')
    }
  }

  const addFile = (e) => {
    const s = URL.createObjectURL(e.target.files[0])
    console.log(s);
    console.log(e.target.files)
    setAudio(s.split("blob:")[1])
    
    // console.log();
  }


  return (

    <div className="inputbox">
      <img className="logo" src={logo} alt="" />
      <h1 className="head1">Let's hear what you say</h1>
      <div className="upload">
        <button onClick={uploadFile}>Upload your audio</button>
        <input type='file' onChange={addFile} />
        {/* <UploadAudio /> */}
      </div>
      <hr />
      <h1 className="diff">OR</h1>
      <hr />
      <h1 className="head2">Record an audio</h1>
      <div className="recorder">
        <Recorder />
      </div>
    </div>
  );
};
export default Inputui;
