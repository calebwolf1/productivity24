import './App.css';
import './Fonts.css'
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import UserUpload from './pages/UserUpload';
import Finished from './pages/Finished';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        {/* Admin dashboard */}
        <Route path='/dashboard' element={<Dashboard/>} /> 
        {/* User upload interface, FKA user dashboard */}
        <Route path='/userUpload' element={<UserUpload/>} />
        <Route path='/finished' element={<Finished/>} />
      </Routes>
    </div>
  );
}

export default App;
