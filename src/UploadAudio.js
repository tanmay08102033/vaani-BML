import React, {useState, useEffect} from 'react'
import axios from 'axios';

const UploadAudio = () => {
    const [buttonName, setButtonName] = useState('Play')
    const [audio, setAudio] = useState();
    const [auth, setAuth] = useState()
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

const uploadFile = async() =>{
    const accessToken = auth.accessToken;
    const symblaiParams = {
        'name': 'Speechanalysis101',
        'url': audio
    }

    const fetchResponse = await fetch('https://api.symbl.ai/v1/process/audio/url', {
        method: 'post',
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
        setAudio(s)
        console.log(s);
    }

    return (
        <div>
            <button onClick={uploadFile}>Upload your audio</button>
            <input type='file' onChange={addFile} />
        </div >
    )
}

export default UploadAudio