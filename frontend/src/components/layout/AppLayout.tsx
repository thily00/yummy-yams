import React, { ReactNode } from 'react';

import Navbar from './Navbar';

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({children}) => {
  return (
    <div className="app-layout">
    <Navbar />
    <main>
      {children}
    </main>
  </div>
  )
}

export default AppLayout