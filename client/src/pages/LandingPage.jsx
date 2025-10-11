import "../stylesheets/landingPage.css";
import landingImg from "../assets/new-character.png";
import clickMeImg from "../assets/clickMe-img2.png";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";

const LandingPage = () => {
  const { auth } = useContext(AuthContext);
  return (
    <div>
      <div className="main-container">
        <img className="character animate-character-float" src={landingImg} />
        <div className="content animate-stagger">
          <p>Welcome, to our website.</p>
          <p>THE PROBLEM SOLVED...</p>
          <p>
            You can now find your lost items <br />
            through our website
          </p>
          <center>
            <Link to="/foundItemPage">
              <button className="explore-btn">
                Explore <i className="fa-solid fa-up-right-from-square"></i>
              </button>
            </Link>
          </center>
        </div>
        {auth.isLoggedIn ? <></> : <img className="clickMe animate-click-me" src={clickMeImg} />}
      </div>
    </div>
  );
};

export default LandingPage;
