import {BrowserRouter as Router,  Routes, Route,
  useLocation, Outlet, Navigate } from "react-router-dom"
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
import Favorites from "./pages/general/Favorites"
import ContactUs from "./pages/general/ContactUs"
// import Account from "./pages/general/Account"
import Checkout from "./pages/general/Checkout"
import AboutUs from "./pages/general/AboutUs"
import { useAppContext } from "./context/useAppContext"

const ProtectedRoute = () => {
  const { isLoggedIn } = useAppContext();
  const location = useLocation();

  // Redirect unauthenticated users to the sign-in page
  if (!isLoggedIn) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return <Outlet />;
};


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
          <Route path="favorites" element={<Favorites />} />
          <Route path="contact-us" element={<ContactUs />} />
          <Route path="about-us" element={<AboutUs />} />

            {/* Wrap protected routes with ProtectedRoute */}
            <Route element={<ProtectedRoute />}>
              <Route path="checkout" element={<Checkout />} />
            </Route>
        </Route>

        <Route path="adminlogin" element={<AdminLogin />} />
          {/* Admin routes wrapped with ProtectedRoute */}
          <Route element={<ProtectedRoute />}>
            <Route path="admindashboard" element={<DashBoardLayout />}>
              <Route path="dashboard" element={<DashBoard />} />
              <Route path="books" element={<Books />} />
              <Route path="manage-books" element={<ManageBooks />} />
            </Route>
          </Route>

          {/* Redirect unknown routes to home */}
          <Route path="*" element={<Navigate to="/" />} /> 
      
      </Routes>
    </Router>
  )
}

export default App
