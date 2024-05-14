import { Password } from 'primereact/password';
import React, { useState, ChangeEvent } from 'react';


interface InputTextProps {
    label?: string;
    placeholder: string;
    onUpdate: (value: string) => void;
}
  
const PasswordInput:React.FC<InputTextProps> = ({label, placeholder, onUpdate}) => {
    const [value, setValue] = useState('');

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        setValue(newValue);
        onUpdate(newValue);
    };

  return (
    <div className="w-full d-flex flex-column gap-2 mb-3">
        <label htmlFor={label}>Confirmation du mot de passe</label>
        <Password value={value} onChange={handleChange} placeholder={placeholder} toggleMask className="p-inputtext-sm" />
    </div>
  )
}


export default PasswordInput