import { useState, useEffect } from "react";
import getMessages from "../utils/ParseResponse";
import './GmailAuth.css';
import '../Fonts.css';

const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest';
const SCOPES = 'https://www.googleapis.com/auth/gmail.readonly';

const GmailAuth = () => {
  const [tokenClient, setTokenClient] = useState(null);

  /**
   * Callback after the API client is loaded. Loads the
   * discovery doc to initialize the API.
   */
  async function initializeGapiClient() {
    await window.gapi.client.init({
      apiKey: process.env.REACT_APP_GMAIL_API_KEY,
      discoveryDocs: [DISCOVERY_DOC],
    });
  }

  function handleAuthClick() {
    console.log(tokenClient);
    // make sure tokenClient is not used after this function
    tokenClient.callback = async (resp) => {
      if (resp.error !== undefined) {
        throw (resp);
      }
      // document.getElementById('signout_button').style.visibility = 'visible';
      // document.getElementById('authorize_button').innerText = 'Refresh';
      let result = await getMessages();
      console.log("done!")
      console.log(result[0]);
      console.log(result[1])
    };

    if (window.gapi.client.getToken() === null) {
      // Prompt the user to select a Google Account and ask for consent to share their data
      // when establishing a new session.
      console.log("token client")
      tokenClient.requestAccessToken({prompt: 'consent'});
    } else {
      // Skip display of account chooser and consent dialog for an existing session.
      tokenClient.requestAccessToken({prompt: ''});
    }
    window.location.href='/userUpload';
  }

  function handleSignoutClick() {
    const token = window.gapi.client.getToken();
    if (token !== null) {
      window.google.accounts.oauth2.revoke(token.access_token);
      window.gapi.client.setToken('');
    }
  }

  useEffect(() => {
    window.gapi.load('client', initializeGapiClient);
    let tokenClientTemp = window.google.accounts.oauth2.initTokenClient({
      client_id: process.env.REACT_APP_CLIENT_ID,
      scope: SCOPES,
      callback: '', // defined later
    });
    setTokenClient(tokenClientTemp);
  }, []);

  return (
    <>
    <button onClick={handleAuthClick} className="authbutton">Sign in with Google</button>
    {/* <button onClick={handleSignoutClick}>Sign Out</button> */}
    </>
  )
};

export default GmailAuth;