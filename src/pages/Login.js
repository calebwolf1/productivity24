import './Login.css';
import '../Fonts.css';
import Auth from "../components/Auth"
import Logo from '../whoosh.png';

const Login = () => {
  return (
    <div>
      <div className="box"></div>
      <img src={Logo} alt="Logo" className='logo'/>;
      <div className='welcome'>Send confidently, Whoosh</div>
      <div className='login'>Login</div>
      <Auth />
    </div>
  )
}

export default Login;