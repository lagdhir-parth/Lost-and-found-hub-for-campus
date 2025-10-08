import { Route, Routes } from "react-router-dom";
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

const App = () => {
  return (
    <>
      <div className="main-div">
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />}></Route>
          <Route path="/lostItemPage" element={<LostItemPage />}></Route>
          <Route path="/foundItemPage" element={<FoundItemPage />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          {/* <Route path="/createItem" element={<CreateItem/>}></Route> */}
          {/* <Route path="/profile" element={<Profile />}></Route> */}

          {/* 🔐 PROTECTED ROUTE 🔐 */}
          <Route
            path="/profile"
            element={<ProtectedRoute element={<Profile />}/>}
          ></Route>
          <Route
            path="/createItem"
            element={<ProtectedRoute element={<CreateItem />}/>}
          ></Route>
        </Routes>
      </div>
    </>
  );
};

export default App;
