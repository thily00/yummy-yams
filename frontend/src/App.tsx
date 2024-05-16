import { Route, Routes } from "react-router-dom";

import AdminRoute from "./views/AdminRoute.tsx";
import ProtectedRoute  from "./views/ProtectedRoute.tsx";


import Home from './views/app/Home.tsx'
import Admin from './views/app/Admin.tsx'
import Login from './views/auth/Login.tsx'
import Register from './views/auth/Register.tsx'
import GameResult from './views/app/GameResult.tsx'

function App() {
    return (
    <Routes>
        <Route path="/" element={<ProtectedRoute> <Home /> </ProtectedRoute>} />
        <Route path="/admin" element={<AdminRoute> <Admin /> </AdminRoute>} />
        <Route path="/result/:id" element={<AdminRoute> <GameResult /> </AdminRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
    </Routes>
    )
}

export default App