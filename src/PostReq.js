import React, { useEffect, useState } from 'react'
import axios from 'axios'

const PostReq = () => {

    const [auth, setAuth] = useState()

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




    // const accessToken = 'auth.accessToken';
    // const symblaiParams = {
    //     'name': '<NAME>',
    //     'url': '<URL>'
    // }

    // const fetchResponse = await fetch('https://api.symbl.ai/v1/process/audio/url', {
    //     method: 'post',
    //     body: JSON.stringify(symblaiParams),
    //     headers: {
    //         'Authorization': `Bearer ${accessToken}`,
    //         'Content-Type': 'application/json'
    //     }
    // });

    // const responseBody = await fetchResponse.json();

    // console.log(responseBody);


    return (
        <div>
            <h1>hello api page</h1>
        </div>
    )
}

export default PostReq