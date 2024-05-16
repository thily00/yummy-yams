import React from 'react';
import { clearSession } from '../../store/gameSlice';
import { logout } from '../../store/authSlice';
import { AppDispatch } from '../../store';
import { useDispatch } from 'react-redux';

const Navbar:React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const discnnect = () => {
    dispatch(clearSession());
    dispatch(logout());
  }

  return (
    <div className="navbar">
        <div>
            <p className='logo'>YUMMY YAM'S</p>
        </div>
        <div className='cursor-pointer' onClick={discnnect}>
            Déconnexion
        </div>
    </div>
  )
}

export default Navbar
