import { useState } from 'react';
import { Button } from 'primereact/button';
import { useNavigate } from "react-router-dom";


import TextInput from '../../components/base/TextInput';
import Password from '../../components/base/PasswordInput';

const Login:React.FC = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleInputChange = (setValue) => (newValue) => {
        setValue(newValue);
    };

    const login = () => {
        console.log( email, password);
    }

    const goToRegister = () => {
        navigate('/register');
    }
  return (
    <div className='fullscreen bg-gray d-flex justify-content-center align-items-center'>
        <div className="auth-form d-flex flex-column align-items-center">
            <div className='w-full'>
                <p>LOGO</p>
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
                <Button label="Se connecter" size="small" className="w-full" onClick={login}/>
            </div>
        </div> 
    </div>
  )
}

export default Login
