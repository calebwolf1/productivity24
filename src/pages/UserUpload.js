import './UserUpload.css';
import '../Fonts.css';
import { useEffect, useState } from 'react';
import getMessages from '../utils/ParseResponse';
import CheckedIcon from '../checked.png';
import UncheckedIcon from '../unchecked.png';
import CheckedIcon1 from '../checked1.png';
import UncheckedIcon1 from '../unchecked1.png';
import { useNavigate } from 'react-router-dom';

// prereq for component loading: user must be authenticated
const UserUpload = () => {
  const navigate = useNavigate();

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

  const [currentImage, setCurrentImage] = useState(1);
  const [currentImages, setCurrentImages] = useState(Array(12).fill(1));

  // Function to handle image click and switch to the next image
  const handleClick = (index) => {
    // Increment the current image index (assuming there are only 2 images)
    // setCurrentImage(currentImage === 1 ? 0 : 1);
    let newArr = [...currentImages];
    newArr[index] = newArr[index] === 1 ? 0 : 1
    setCurrentImages(newArr);
  };

  return (
    <div>
      <div className="glow"></div>
      <div className="gentext nametext">Hello, Allison</div>
      <div className="bigtext teamtext">Sales Team</div>
      <div className="smalltext employeetext">32 Employees</div>
      <div className="emailheader">
        <div className="uploadbutton" onClick={() => {navigate('/finished')}}></div>
        <div className="uploadtext">Upload</div>
        <div className="emailnumber">30</div>
        <div className="colordot"></div>
      </div>
      <div className="indivemail color1 email">
        <div className="smalltext emailsender">David Sullivan</div>
        <div className="smalltext emailsubject">Warranty Expiry</div>
        <div className="lighttext emailtext">I purchased a microwave oven from BrownBox last month and added the warranty, but I don't know when...</div>
        <img
          src={currentImages[0] === 1 ? CheckedIcon : UncheckedIcon}
          alt="Switchable Image"
          onClick={() => {handleClick(0)}}
          className="icon"
        />
      </div>
      <div className="indivemail color2 email">
        <div className="smalltext emailsender">Graham Smith</div>
        <div className="smalltext emailsubject">Delivery Time</div>
        <div className="lighttext emailtext">I'm still waiting on my coffee maker order- what is the estimated delivery time for my order?</div>
        <img
          src={currentImages[1] === 1 ? CheckedIcon : UncheckedIcon}
          alt="Switchable Image"
          onClick={() => {handleClick(1)}}
          className="icon"
        />
      </div>
      <div className="indivemail color1 email">
        <div className="smalltext emailsender">Chris Rostron</div>
        <div className="smalltext emailsubject">Delivery Request</div>
        <div className="lighttext emailtext">I purchased an order from your company a few days ago, and I was wondering if I could receive rushed...</div>
        <img
          src={currentImages[2] === 1 ? CheckedIcon : UncheckedIcon}
          alt="Switchable Image"
          onClick={() => {handleClick(2)}}
          className="icon"
        />
      </div>
      <div className="indivemail color2 email">
        <div className="smalltext emailsender">Jennifer Hill</div>
        <div className="smalltext emailsubject">Login Error</div>
        <div className="lighttext emailtext">I am having trouble logging into my BrownBox account on the mobile app. Even when using the mobile...</div>
        <img
          src={currentImages[3] === 1 ? CheckedIcon : UncheckedIcon}
          alt="Switchable Image"
          onClick={() => {handleClick(3)}}
          className="icon"
        />
      </div>
      <div className="indivemail color1 email">
        <div className="smalltext emailsender">Madison Laury</div>
        <div className="smalltext emailsubject">Returns</div>
        <div className="lighttext emailtext">I recently received a toaster from your company- I realized that I do not like it so I would like to return it...</div>
        <img
          src={currentImages[4] === 1 ? CheckedIcon : UncheckedIcon}
          alt="Switchable Image"
          onClick={() => {handleClick(4)}}
          className="icon"
        />
      </div>
      <div className="indivemail color2 email">
        <div className="smalltext emailsender">Abigail Gomez</div>
        <div className="smalltext emailsubject">Login Verification</div>
        <div className="lighttext emailtext">I'm trying to login to the website but having trouble with the verification.</div>
        <img
          src={currentImages[5] === 1 ? CheckedIcon : UncheckedIcon}
          alt="Switchable Image"
          onClick={() => {handleClick(5)}}
          className="icon"
        />
      </div>
      <div className="indivemail color1 email">
        <div className="smalltext emailsender">Shannon Clayton</div>
        <div className="smalltext emailsubject">Late Order</div>
        <div className="lighttext emailtext">I ordered a stroller last week and it still hasn't arrived. When will it get here?</div>
        <img
          src={currentImages[6] === 1 ? CheckedIcon : UncheckedIcon}
          alt="Switchable Image"
          onClick={() => {handleClick(6)}}
          className="icon"
        />
      </div>
      <div className="indivemail color2 email">
        <div className="smalltext emailsender">Corbin Anderson</div>
        <div className="smalltext emailsubject">Order Status</div>
        <div className="lighttext emailtext">Is my order was delayed? I purchased a kitchen set 2 weeks ago, but I haven't received any updates yet...</div>
        <img
          src={currentImages[7] === 1 ? CheckedIcon : UncheckedIcon}
          alt="Switchable Image"
          onClick={() => {handleClick(7)}}
          className="icon"
        />
      </div>
      <div className="indivemail color1 email">
        <div className="smalltext emailsender">Emily Green</div>
        <div className="smalltext emailsubject">Refund Request</div>
        <div className="lighttext emailtext">I want to return an electric cooker that I received from your company. How can I go through with this...</div>
        <img
          src={currentImages[8] === 1 ? CheckedIcon : UncheckedIcon}
          alt="Switchable Image"
          onClick={() => {handleClick(8)}}
          className="icon"
        />
      </div>
      <div className="indivemail color2 email">
        <div className="smalltext emailsender">Henry Murray</div>
        <div className="smalltext emailsubject">Order Issues</div>
        <div className="lighttext emailtext">I ordered a blender from you recently and am having some issues. I noticed additional charges in my...</div>
        <img
          src={currentImages[9] === 1 ? CheckedIcon : UncheckedIcon}
          alt="Switchable Image"
          onClick={() => {handleClick(9)}}
          className="icon"
        />
      </div>
      <div className="indivemail color1 email">
        <div className="smalltext emailsender">Tania Mack</div>
        <div className="smalltext emailsubject">Expedited Delivery</div>
        <div className="lighttext emailtext">I need to purchase a mobile phone from your website, and I was wondering if there is an option for exped...</div>
        <img
          src={currentImages[10] === 1 ? CheckedIcon : UncheckedIcon}
          alt="Switchable Image"
          onClick={() => {handleClick(10)}}
          className="icon"
        />
      </div>
      <div className="indivemail color2 email">
        <div className="smalltext emailsender">Karen Moran</div>
        <div className="smalltext emailsubject">Microwave problem</div>
        <div className="lighttext emailtext">My order number is BB123456. I ordered a microwave and it's not working like how it's supposed to. I wan...</div>
        <img
          src={currentImages[11] === 1 ? CheckedIcon : UncheckedIcon}
          alt="Switchable Image"
          onClick={() => {handleClick(11)}}
          className="icon"
        />
      </div>
    </div>
  );
};

export default UserUpload;