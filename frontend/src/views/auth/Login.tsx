import { useState } from 'react';
import { Button } from 'primereact/button';
import { loginUser } from '../../services/auth';
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import TextInput from '../../components/base/TextInput';
import Password from '../../components/base/PasswordInput';

import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { login } from '../../store/authSlice';
import { AxiosError } from 'axios';


const Login:React.FC = () => {
    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

  const handleLogin = async():Promise<void> => {
    try {
        setLoading(true);
        const result = await loginUser({ email, password });
        if (result) { 
            dispatch(login(result));
            if(result.userRole === 'admin') {
                navigate('/admin');
            }else{
                navigate('/');
            }
        }
    } catch (error) {
        setLoading(false);
        console.error('Registration failed:', error);
        if(error instanceof AxiosError) {
            toast.error(error?.response?.data?.message, { position: "top-center" });
        }
    }
  }

  const handleInputChange = (setValue: React.Dispatch<React.SetStateAction<string>>) => (newValue: React.SetStateAction<string>) => {
    setValue(newValue);
  };

  const goToRegister = () => {
    navigate('/register');
  }

  return (
    <div className='fullscreen bg-primary d-flex justify-content-center align-items-center'>
        <div className="auth-form d-flex flex-column align-items-center">
            <div className='w-full'>
               <p className='logo'>YUMMY YAM'S</p>
            </div>

            <div className="w-full d-flex justify-content-between my-4">
                <h3>Connexion</h3>
                <Button label="Vous n'avez pas de compte" link onClick={goToRegister}/>
            </div>

            <div className="w-full">
                <TextInput label="email" placeholder="Adresse email" onUpdate={handleInputChange(setEmail)} />
                <Password label="password" placeholder="Mot de passe" onUpdate={handleInputChange(setPassword)} />
            </div>

            <div className="w-full my-4">
                <Button label="Se connecter" size="small" className="w-full" loading={loading} onClick={handleLogin}/>
            </div>
        </div> 
        <ToastContainer />
    </div>
  )
}

export default Login
