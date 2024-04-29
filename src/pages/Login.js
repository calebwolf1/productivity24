import './Login.css';
import '../Fonts.css';
import Auth from "../components/Auth"
import Logo from '../whoosh.png';
import Navbar from '../components/Navbar';
import GmailAuth from "../components/GmailAuth"

const Login = () => {
  return (
    <div>
      <Navbar />
    <div>
      <GmailAuth />
    <div>
      <div className="box"></div>
      <img src={Logo} alt="Logo" className='logo'/>;
      <div className='welcome'>Send confidently, Whoosh</div>
      <div className='login'>Login</div>
      <Auth />
    </div>
    </div>
    </div>
  )
}

export default Login;