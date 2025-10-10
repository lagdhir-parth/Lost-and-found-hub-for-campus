import "../stylesheets/contentBar.css";
import { Link } from "react-router-dom";

const ContentBar = () => {
  return (
    <div className="contentBar-main">
      <div className="bar-container">
        <Link to="/createItem" style={{ textDecoration: "none" }}>
          <div className="bar-left ">
            <i className="fa-solid fa-plus fa-xl"></i>
          </div>
        </Link>
        <div className="bar-middle">
          <input type="text" placeholder="Search Here..." />
          <div className="magnifier">
            <i className="fa-solid fa-magnifying-glass fa-xl"></i>
          </div>
        </div>
        <div className="bar-right">
          <div className="list-div">
            <i className="fa-solid fa-list fa-xl"></i>
          </div>
          <div className="grid-div">
            <i className="fa-solid fa-grip fa-xl"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentBar;
