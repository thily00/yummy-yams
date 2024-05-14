import React, { ReactNode } from 'react';

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({children}) => {
  return (
    <div className="app-layout">
    <header>
      {/* Mettez ici le contenu de votre en-tête */}
    </header>
    <main>
      {children}
    </main>
    <footer>
      {/* Mettez ici le contenu de votre pied de page */}
    </footer>
  </div>
  )
}

export default AppLayout