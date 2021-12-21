// https://www.npmjs.com/package/react-scroll
import { Link } from "react-scroll";
// https://react-icons.github.io/react-icons/
import { FaChevronCircleDown } from "react-icons/fa";
import NavBar from "../containers/NavBar";
import SocialLinks from "./SocialLinks";

// Image
import logo from "../images/logo.svg";

const About = ({ theme, setTheme, githubUrl, name, link, bio, twitter }) => {
  const newTheme = `${theme} d-flex flex-column  justify-content-center`;

  const socialData = {
    githubUrl: githubUrl,
    link: link,
    twitter: twitter,
  };

  return (
    <header id="about" className={newTheme}>
      <NavBar theme={theme} setTheme={setTheme} />
      <div className="container text-center ">
        <div className="about_container">
       <span>A</span> 
        <img
          className="logo spin img-fluid"
          src={logo}
          alt="React Logo"
          height="45%"
          width="45%"
        />
       <span>O</span> 
        </div>
        {/* <div
         className="logo spin"
         height="45%"
          width="20%"
         
        >
          <h1 style={{fontSize:"170px", borderRadius:"50%", border:"5px solid green"}}>AD</h1>
        </div> */}
        {/* <h1>{name}</h1> */}
        <h1>Adeniyi Ogunniyi</h1>
        <hr />
        <p>{bio}</p>
        <SocialLinks {...socialData} />
        <Link className="scroll" to="skills" smooth={true} duration={750}>
          <FaChevronCircleDown id="scroll-down" />
        </Link>
      </div>
    </header>
  );
};

export default About;
