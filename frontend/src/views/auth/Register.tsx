import { useState} from 'react';
import { Button } from 'primereact/button';
import 'react-toastify/dist/ReactToastify.css';
import { registerUser } from '../../services/auth';
import { ToastContainer, toast } from 'react-toastify';
import TextInput from '../../components/base/TextInput';
import { NavigateFunction, useNavigate } from "react-router-dom";
import Password from '../../components/base/PasswordInput';


const Register:React.FC = () => {
  const navigate:NavigateFunction = useNavigate();

  const [email, setEmail] = useState('');
  const [fullname, setFullname] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async ():Promise<void> => {
    try {
      setLoading(true);
      if (password !== confirmPassword) {
        toast.error("Les mots de passe ne correspondent pas", { position: "top-center" });
        setLoading(false);
        return;
      }

      const result = await registerUser({ name:fullname, email:email, password:password });
      if (result) {
        toast.success("Inscription réussie", { position: "top-center" });
        setTimeout(() => {navigate('/login');}, 1000);
      }
    } catch (error) {
      setLoading(false);
      console.error('Registration failed:', error);
      if (error instanceof Error) {
        toast.error(error.message, { position: "top-center" });
      }
    }
  }

  const handleInputChange = (setValue: React.Dispatch<React.SetStateAction<string>>) => (newValue: React.SetStateAction<string>) => {
    setValue(newValue);
  };


  const goToLogin = () => {
    navigate('/login');
  }

  return (
    <div className='fullscreen bg-primary d-flex justify-content-center align-items-center'>
        <div className="auth-form d-flex flex-column align-items-center">
            <div className='w-full'>
                <p className='logo'>YUMMY YAM'S</p>
            </div>

            <div className="w-full d-flex justify-content-between my-4">
                <h3>Inscription</h3>
                <Button label="Vous avez déja un compte" link onClick={goToLogin}/>
            </div>

            <div className="w-full">
                <TextInput label="Nom complet" placeholder="Nom d'utilisateur" onUpdate={handleInputChange(setFullname)} />
                <TextInput label="email" placeholder="Adresse email" onUpdate={handleInputChange(setEmail)} />
                <Password label="password" placeholder="Mot de passe" onUpdate={handleInputChange(setPassword)} />
                <Password label="password" placeholder="Confirmation du mot de passe" onUpdate={handleInputChange(setConfirmPassword)} />
            </div>

            <div className="w-full my-4">
                <Button label="S'inscrire" size="small" className="w-full" loading={loading} onClick={handleRegister}/>
            </div>
        </div> 
        <ToastContainer />
    </div>
  )
}

export default Register