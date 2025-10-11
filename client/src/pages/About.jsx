import "../stylesheets/about.css";
import img from "../assets/imagefound.png";

export default function AboutUs() {
  return (
    <div className="pagal">
      <div className="about-container fade-in-content">
        <h1 className="about">About Us</h1>
        <p className="para1">
          Welcome to our Campus Lost and Found website! Our platform is designed
          to help students, faculty, and staff easily report and recover lost
          items within the campus. We understand how stressful it can be to
          misplace important belongings like ID cards, books, or accessories, so
          we created a simple and secure system where users can post details
          about lost or found items. Our goal is to connect finders and owners
          quickly, promote honesty and responsibility, and build a helpful
          community within the campus. With this website, we aim to make the
          process of finding and returning lost items faster, easier, and more
          reliable for everyone
        </p>
        <h2 className="about-misson">Our Mission</h2>
        <p className="para">
          Our journey began with a simple observation — students often lose
          important belongings like ID cards, notes, or personal items on
          campus, and there was no proper system to help them get those items
          back. What started as a small idea among a few classmates turned into
          a project with a purpose: to create a reliable digital platform where
          lost and found items could be reported and recovered easily. Through
          teamwork, creativity, and a shared desire to help others, we built
          this website to make campus life a little less stressful and a lot
          more connected. Today, our Lost and Found website stands as a
          reflection of our dedication to solving real-world problems through
          technology and collaboration.
        </p>
        <div className="about-img">
          <div>
            <h2 className="about-misson">Our Team</h2>
            <ul className="about-ul">
              <li className="lim">Lagdhir Parth</li>
              <li className="lim">Dabhi Chandresh</li>
              <li className="lim">Bagathariya Tanisha</li>
              <li className="lim">Rathod Krisha</li>
            </ul>
          </div>
          <img className="animate-about-image" src={img} alt=""></img>
        </div>

        <h2 className="about-cont">Contact Us</h2>
        <p className="para">
          <a href="https://www.google.com" target>
            lagdhirparth2007@gmail.com
          </a><br/>
          <a href="https://www.google.com" target>
            krisharathod1905@gmail.com
          </a><br/>
          <a href="https://www.google.com" target>
            tanisha@gmail.com
          </a><br/>
          <a href="https://www.google.com" target>
            chandreshdabhi2006@gmail.com
          </a>
        </p>
      </div>
    </div>
  );
}
