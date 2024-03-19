import { useEffect, useState } from "react";
import {db} from '../firebase-config'
import {getDocs, collection, doc, getDoc, addDoc, setDoc, deleteDoc} from 'firebase/firestore'


// eventually will use a card view to display group previews
const GroupCard = ({group, clientID, onDeleteGroup}) => {
  const groupPath = `clients/${clientID}/groups/${group.id}`;
  const groupRef = doc(db, groupPath);
  const ticketsRef = collection(db, groupPath + "/tickets");
  const usersRef = collection(db, groupPath + "/users");

  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newTicketQuestion, setNewTicketQuestion] = useState('');
  const [newTicketAnswer, setNewTicketAnswer] = useState('');
  const [newGroupName, setNewGroupName] = useState('');

  const getData = async () => {
    const groupData = await getDoc(groupRef);  // don't need this read every time
    const ticketsData = await getDocs(ticketsRef);
    const tickets = ticketsData.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id
    }))

    const usersData = await getDocs(usersRef);
    const users = usersData.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id
    }))
    
    return {
      name: groupData.data().name,
      id: group.id,  // shouldn't change
      tickets: tickets,
      users: users
    };
  }

  const onSubmitNewUser = async () => {
    console.log(`NAME: ${newUserName} /// EMAIL: ${newUserEmail}`)
    try {
      await addDoc(usersRef, {
        name: newUserName,
        email: newUserEmail
      });
      setIsLoading(true);
    } catch (err) {
      console.error(err);
    }
  }

  const onSubmitNewTicket = async () => {
    try {
      await addDoc(ticketsRef, {
        question: newTicketQuestion,
        answer: newTicketAnswer
      });
      setIsLoading(true);
    } catch (err) {
      console.error(err);
    }
  }

  const onSubmitNewGroupName = async () => {
    try {
      await setDoc(groupRef, {
        name: newGroupName
      });
      setIsLoading(true);
    } catch (err) {
      console.error(err);
    }
  }

  const onDeleteUser = async (userID) => {
    try {
      await deleteDoc(doc(db, groupPath + `/users/${userID}`));
      setIsLoading(true);
    } catch (err) {
      console.error(err);
    }
  }

  const onDeleteTicket = async (ticketID) => {
    try {
      await deleteDoc(doc(db, groupPath + `/tickets/${ticketID}`));
      setIsLoading(true);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataTemp = await getData();
        setData(dataTemp);
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
        <p>
          {data.name}
          <button onClick={() => onDeleteGroup(groupRef)}>Delete Group</button>
        </p>
      )}
      <div>
        <input
          placeholder="New group name"
          onChange={(e) => setNewGroupName(e.target.value)} />
        <button 
          onClick={onSubmitNewGroupName}>Change Name</button>
      </div>
      
      <p>Users:</p>
      <div>
        <input
          placeholder="Name"
          onChange={(e) => setNewUserName(e.target.value)}
        />
        <input
          placeholder="Email"
          onChange={(e) => setNewUserEmail(e.target.value)}
        />
        <button onClick={onSubmitNewUser}>Add user</button>
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        data.users.map((user) => (
          <div>
            <p>
              {user.name} ({user.email}) 
              <button 
                onClick={() => onDeleteUser(user.id)}>
                  Remove
              </button> 
            </p>
          </div>
        ))
      )
      }
      <p>Tickets:</p>
      <input
        placeholder="Question"
        onChange={(e) => setNewTicketQuestion(e.target.value)}
      />
      <input
        placeholder="Answer"
        onChange={(e) => setNewTicketAnswer(e.target.value)}
      />
      <button onClick={onSubmitNewTicket}>Add Ticket</button>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        data.tickets.map((ticket) => (
          <div>
            <button onClick={() => onDeleteTicket(ticket.id)}>
              Remove Ticket Below
            </button>
            <p>Question: {ticket.question}</p>
            <p>Answer: {ticket.answer}</p>
          </div>
        ))
      )
      }
    </div>
  )
}

export default GroupCard;