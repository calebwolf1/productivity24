import './Login.css';
import '../Fonts.css';
import Auth from "../components/Auth"

const Login = () => {
  return (
    <div>
      <div className='welcome'>Send confidently, Whoosh</div>
      <div className='login'>Login</div>
      <Auth />
    </div>
  )
}

export default Login;