import './Home.css';
import '../Fonts.css';
import Auth from "../components/Auth"

const Home = () => {
  return (
    <div>
      <div className='welcome'>Send confidently, Whoosh</div>
      <div className='login'>Login</div>
      <Auth />
    </div>
  )
}

export default Home;