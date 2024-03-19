import {db} from '../firebase-config'
import {doc, getDoc} from 'firebase/firestore'
import { useEffect, useState } from 'react';
import DisplayGroups from '../components/DisplayGroups';

const Dashboard = () => {
  const clientID = "client0";
  const clientRef = doc(db, `clients/${clientID}`)

  const [clientName, setClientName] = useState("");

  const getClientName = async () => {
    try {
      const data = await getDoc(clientRef);
      console.log(data.data());
      setClientName(data.data().name)
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getClientName();
  }, [])

  return (
    <div>
      <header>Hello business dashboard!</header>
      <header>Logged in as: {clientName}</header>
      <DisplayGroups clientID={clientID}/>
    </div>
  )
}

export default Dashboard;