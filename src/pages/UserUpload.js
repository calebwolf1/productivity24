import './UserUpload.css';
import '../Fonts.css';
import { useEffect, useState } from 'react';
import getMessages from '../utils/ParseResponse';


// prereq for component loading: user must be authenticated
const UserUpload = () => {
  const [messages, setMessages] = useState([]);
  const [selectedMsgIDs, setSelectedMsgIDs] = useState([]);

  useEffect(() => {
    console.log("here");
    (async () => {
      console.log("Fetching emails...");
      let result = await getMessages();
      // console.log(window.gapi.client);
      console.log(result);
      setMessages(result);
    })();
  }, []);

  return (
    <div>
      <p className='message'>Hello</p> 
    </div>
  );
};

export default UserUpload;