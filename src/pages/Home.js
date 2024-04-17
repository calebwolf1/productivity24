import './Home.css';
import '../Fonts.css';
import { useNavigate } from "react-router-dom";
import { BrowserRouter } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Home = () => {
  const navigate = useNavigate();
  const handleGoToSignUp = () => navigate("Login");
  
  return (
    <div>
    <Navbar />
    <div>
      <div className='title'>Whoosh</div>
      <div className='paragraph'>Whoosh optimizes the email creating and sending process. It’s built for high-performance businesses.</div>
      <button onClick={handleGoToSignUp} className="tosignup">Sign up for free</button>
    </div>
    </div>
  );
};

export default Home;