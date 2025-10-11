import { Route, Routes, useLocation } from "react-router-dom";
import "./stylesheets/App.css";
import Navbar from "./Components/Navbar";
import LandingPage from "./pages/LandingPage";
import LostItemPage from "./pages/LostItemPage";
import CreateItem from "./pages/CreateItem";
import About from "./pages/About";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import ProtectedRoute from "./Components/ProtectedRoute";
import FoundItemPage from "./pages/FoundItemPage";
import UserLostItems from "./pages/userItemPages/UserLostItems";
import UserFoundItem from "./pages/userItemPages/UserFoundItem";
import UserItems from "./pages/userItemPages/userItems";
import Admin from "./pages/admin/adminIndex";
import AdminItemList from './pages/admin/AdminItemList'  
import AdminUsers from './pages/admin/AdminUsers';
import AdminAllItemList from "./pages/admin/AdminAllItemList";

const App = () => {
  // 1. Get the current location object
  const location = useLocation();

  // 2. Check if the current pathname starts with "/admin"
  const isAdminRoute = location.pathname.startsWith("/admin");
  return (
    <>
      <div className="main-div">
        {!isAdminRoute && <Navbar />}
        <Routes>
          <Route path="/" element={<LandingPage />}></Route>
          <Route path="/lostItemPage" element={<LostItemPage />}></Route>
          <Route path="/foundItemPage" element={<FoundItemPage />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          {/* <Route path="/createItem" element={<CreateItem/>}></Route> */}
          {/* <Route path="/profile" element={<Profile />}></Route> */}
          {/* <Route path="/admin" element={<Admin />}>
            <Route path="all-items" element={<AdminItemList type="all" />} />
            <Route path="lost-items" element={<AdminItemList type="lost" />} />
            <Route
              path="found-items"
              element={<AdminItemList type="found" />}
            />
            <Route path="users" element={<AdminUsers />} />
          </Route> */}

          {/* 🔐 PROTECTED ROUTE 🔐 */}
          <Route
            path="/profile"
            element={<ProtectedRoute element={<Profile />} />}
          >
            <Route path="userItems" element={<UserItems />} />{" "}
            {/* Default "All" */}
            <Route path="userLostItems" element={<UserLostItems />} />{" "}
            <Route path="userFoundItems" element={<UserFoundItem />} />
          </Route>
          <Route
            path="/createItem"
            element={<ProtectedRoute element={<CreateItem />} />}
          ></Route>
          <Route path="/admin" element={<ProtectedRoute element={<Admin />} />}>
            <Route path="all-items" element={<AdminAllItemList />} />
            <Route path="lost-items" element={<AdminItemList type="lost" />} />
            <Route
              path="found-items"
              element={<AdminItemList type="found" />}
            />
            <Route path="users" element={<AdminUsers />} />
          </Route>
        </Routes>
      </div>
    </>
  );
};

export default App;
