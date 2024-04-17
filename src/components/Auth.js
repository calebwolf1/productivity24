import { useState } from "react"
import { auth, db } from "../firebase-config"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { collection, doc, getDocs, query, where } from "firebase/firestore";
import '../Fonts.css';
import './Auth.css';

const Auth = () => {
  const clientsRef = collection(db, "clients");

  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");

  const [clientName, setClientName] = useState("");
  const [groupName, setGroupName] = useState("");
  const [clientSelected, setClientSelected] = useState(false);  // if true, clientName and clientID will be of a valid client
  const [clientID, setClientID] = useState("");

  const onSignUp = async () => {
    if(!clientSelected) {
      console.log("No client selected! Try again after selecting a valid client.");
      return;
    }
    // only allow sign-up if email exists in database
    const groupsRef = collection(db, `clients/${clientID}/groups`);
    // for each group, check if any user matches in users
    const groupsData = await getDocs(groupsRef);
    const groupIDs = groupsData.docs.map((doc) => (
      doc.id
    ));

    for(const groupID of groupIDs) {
      console.log("ID: " + groupID);
      
      const usersRef = collection(db, `clients/${clientID}/groups/${groupID}/users`);
      const q = query(usersRef, where("email", "==", signUpEmail));
      const user = await getDocs(q);
      const userDocs = user.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      }));
      if(userDocs.length == 1) {  // user can only be in one group with this setup
        console.log(userDocs[0].name);
        try {
          await createUserWithEmailAndPassword(auth, signUpEmail, signUpPassword);
        } catch (err) {
          console.error(err);
        }
        return;
      }
    }
    // at this point, user does not exist in this organization
    console.log("Invalid user, try again");
  };

  const onSignIn = async () => {
    if(!clientSelected) {
      console.log("No client selected! Try again after selecting a valid client.");
      return;
    }
    // don't need to check if email in database here
    try {
      await signInWithEmailAndPassword(auth, signInEmail, signInPassword);
    } catch (err) {
      console.error(err);
    }
  };

  const onSelectClient = async () => {
    const q = query(clientsRef, where("name", "==", clientName));
    try {
      const clients = await getDocs(q);
      // throw error if there is more than 1 result, change in future
      const clientDocs = clients.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      }));
      console.log(clientDocs);
      if(clientDocs.length > 1) {
        throw new Error("Multiple clients selected");
      }

      if(clientDocs.length == 0) {
        console.log("Invalid client name");
        setClientSelected(false);
        return;
      }

      // valid client name, get id
      console.log(clientDocs[0].id);
      setClientID(clientDocs[0].id);
      setClientSelected(true);
    } catch (err) {
      console.error(err);
    }
  };

  const onSelectGroup = async () => {
    if(!clientSelected) {
      console.log("No client selected! Try again after selecting a valid client.");
      return;
    }

    const groupsRef = collection(db, `clients/${clientID}/groups`);
    const q = query(groupsRef, where("name", "==", groupName));
    try {
      const groupData = await getDocs(q);
      const groups = groupData.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      }));
    } catch (err) {
      console.error(err);
    }
    
  };

  return (
    <div>
      <div>
        {/* TODO: Have a dropdown that lists all organizations matching the current pattern typed */}
        <div className="gentext orgtext">Organization Name</div>
        <input className="textfield orgtextfield"
          //placeholder="Organization name"
          onChange={(e) => setClientName(e.target.value)} />
        {/* <button onClick={onSelectClient}>Select your organization</button> */}
      </div>
      {/* <div>
        <input 
          placeholder="Group name"
          onChange={(e) => setGroupName(e.target.value)} />
        <button onClick={onSelectGroup}>Select your group</button>
      </div> */}
      {/* <div>
        <div className="gentext emailtext">Email</div>
        <input className="textfield emailtextfield"
          //placeholder="Email"
          onChange={(e) => setSignUpEmail(e.target.value)} />
        <div className="gentext passwordtext">Password</div>
        <input
          //placeholder="Password"
          type="password"
          onChange={(e) => setSignUpPassword(e.target.value)} />
        <button onClick={onSignUp}>Sign up</button>
      </div> */}
      <div>
        <div className="gentext emailtext">Email</div>
        <input className="textfield emailtextfield"
          //placeholder="Email"
          onChange={(e) => setSignInEmail(e.target.value)} />
        <div className="gentext passwordtext">Password</div>  
        <input className="textfield passwordtextfield"
          //placeholder="Password"
          type="password"
          onChange={(e) => setSignInPassword(e.target.value)} />
        <button onClick={onSignIn} className="loginbutton">Login</button>
        <div className="forgotpassword">Forgot password</div>
      </div>
    </div>
  );
};

export default Auth;