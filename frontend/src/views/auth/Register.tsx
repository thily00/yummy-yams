import { useState } from 'react';
import { Button } from 'primereact/button';
import { useNavigate } from "react-router-dom";


import TextInput from '../../components/base/TextInput';
import Password from '../../components/base/PasswordInput';

        
const Register:React.FC = () => {
  const navigate = useNavigate();

  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleInputChange = (setValue) => (newValue) => {
    setValue(newValue);
  };

  const register = () => {
    console.log(fullname, email, password, confirmPassword);
  }

  const goToLogin = () => {
    navigate('/login');
  }

  return (
    <div className='fullscreen bg-gray d-flex justify-content-center align-items-center'>
        <div className="auth-form d-flex flex-column align-items-center">
            <div className='w-full'>
                <p>LOGO</p>
            </div>

            <div className="w-full d-flex justify-content-between my-4">
                <h3>Inscription</h3>
                <Button label="Vous avez déja un compte" link onClick={goToLogin}/>
            </div>

            <div className="w-full">
                <TextInput label="username" placeholder="Nom d'utilisateur" onUpdate={handleInputChange(setFullname)} />
                <TextInput label="email" placeholder="Adresse email" onUpdate={handleInputChange(setEmail)} />
                <Password label="password" placeholder="Mot de passe" onUpdate={handleInputChange(setPassword)} />
                <Password label="password" placeholder="Confirmation du mot de passe" onUpdate={handleInputChange(setConfirmPassword)} />
            </div>

            <div className="w-full my-4">
                <Button label="S'inscrire" size="small" className="w-full" onClick={register}/>
            </div>
        </div> 
    </div>
  )
}

export default Register