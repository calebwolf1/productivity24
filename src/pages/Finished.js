import './Finished.css';
import '../Fonts.css';
import Logo from '../whoosh.png';

const Finished = () => {
    return (
        <div>
            <div className="ready">You're ready to Whoosh!</div>
            <img src={Logo} alt="Logo" className='logo'/>;
        </div>
    );
}

export default Finished;