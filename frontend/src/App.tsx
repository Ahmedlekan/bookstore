import {BrowserRouter as Router,  Routes, Route } from "react-router-dom"
import Layout from "./components/layout/Layout"
import HomePage from "./pages/HomePage"
import Register from "./pages/Register"
import SignIn from "./pages/SignIn"
import AdminLogin from "./pages/AdminLogin"
import DashBoard from "./pages/dashboard/DashBoard"
import DashBoardLayout from "./pages/dashboard/DashBoardLayout"
import ManageBooks from "./pages/dashboard/ManageBooks"
import Books from "./pages/dashboard/Books"

function App() {

  return (
    <Router>
      <Routes>
        
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="register" element={<Register />} />
          <Route path="signin" element={<SignIn/>} />
        </Route>

        <Route path="adminlogin" element={<AdminLogin />} />

        <Route path="admin" element={<DashBoardLayout />}>
            <Route path="dashboard" element={<DashBoard />} />
            <Route path="books" element={<Books />} />
            <Route path="manage-books" element={<ManageBooks />} />
        </Route>

      </Routes>
    </Router>
  )
}

export default App
