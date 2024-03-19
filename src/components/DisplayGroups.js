import { addDoc, collection, deleteDoc, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase-config";
import GroupCard from "./GroupCard";


const DisplayGroups = ({clientID}) => {
  const groupsRef = collection(db, `clients/${clientID}/groups`);

  const [groupNames, setGroupNames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [newGroupName, setNewGroupName] = useState('');

  const getGroupNames = async () => {
    const groupNamesTemp = await getDocs(groupsRef);
    return groupNamesTemp.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id
    }));
  }

  const onSubmitNewGroup = async () => {
    try {
      await addDoc(groupsRef, {
        name: newGroupName
      });
      setIsLoading(true);
    } catch (err) {
      console.error(err);
    }
  }

  const onDeleteGroup = async (groupRef) => {
    try {
      await deleteDoc(groupRef);
      setIsLoading(true);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataTemp = await getGroupNames();
        setGroupNames(dataTemp);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [isLoading]);

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
        ) : (
          groupNames.map((group) => (
            <GroupCard 
              group={group}
              clientID={clientID}
              onDeleteGroup={onDeleteGroup} />
          ))
        )
      }
      <input 
        placeholder="Group name"
        onChange={(e) => setNewGroupName(e.target.value)} />
      <button onClick={onSubmitNewGroup}>Create New Group</button>
    </div>
  )
}

export default DisplayGroups;