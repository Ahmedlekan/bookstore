import {BrowserRouter as Router,  Routes, Route } from "react-router-dom"
import Layout from "./components/layout/Layout"
import HomePage from "./pages/general/HomePage"
import Register from "./pages/auth/Register"
import SignIn from "./pages/auth/SignIn"
import AdminLogin from "./pages/auth/AdminLogin"
import DashBoard from "./pages/dashboard/DashBoard"
import DashBoardLayout from "./pages/dashboard/DashBoardLayout"
import ManageBooks from "./pages/dashboard/ManageBooks"
import Books from "./pages/dashboard/Books"
import BooksStore from "./pages/general/BooksStore"
import BookDetails from "./pages/general/BookDetails"

function App() {

  return (
    <Router>
      <Routes>
        
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="register" element={<Register />} />
          <Route path="signin" element={<SignIn/>} />
          <Route path="books-store" element={<BooksStore />} />
          <Route path="book/:bookId" element={<BookDetails />} />
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
