import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import Login from "../Views/Login"
import Register from "../Views/Register/Register"
import HomeView from "../Views/PrincipalView"

const AppRouter = () => {
    return (
    <Router basename="/">
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/content" element={<HomeView />} />
            </Routes>
    </Router>
    )
}

export default AppRouter