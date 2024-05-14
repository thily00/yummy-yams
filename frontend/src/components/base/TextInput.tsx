import { InputText } from "primereact/inputtext";
import React, { useState, ChangeEvent } from 'react';


interface InputTextProps {
    label?: string;
    placeholder: string;
    onUpdate: (value: string) => void;
}
  
const TextInput:React.FC<InputTextProps> = ({label, placeholder, onUpdate}) => {
    const [value, setValue] = useState('');

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        setValue(newValue);
        onUpdate(newValue);
    };

  return (
    <div className="w-full d-flex flex-column gap-2 mb-3">
        <label htmlFor={label}>{ label }</label>
        <InputText id={label} className="p-inputtext-sm" placeholder={placeholder} value={value} onChange={handleChange} />
    </div>
  )
}


export default TextInput