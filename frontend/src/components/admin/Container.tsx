import React from 'react'

interface AdminContaierProps {
  children: React.ReactNode;
}

const AdminContaier:React.FC<AdminContaierProps> = ({children}) => {
  return (
    <div className='adminContainer w-full h-full p-3 d-flex flex-column align-items-center '>
      {children}
    </div>
  )
}

export default AdminContaier