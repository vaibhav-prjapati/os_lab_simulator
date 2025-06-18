// import logo from '../assets/logo1.svg'
// import logo from '../assets/logo.SVG'
import "../styles/TeamCard.css";
import { FaLinkedin } from "react-icons/fa6";
import { FaInstagramSquare } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const TeamCard = ({ name, image, social, id }) => {
  return (
    <>
      <div className="big-box">
        {id == 1 ? (
          <div className="maincontainer maincontainer-1">
            <div className="back">
              <h2>About Me & Project</h2>
              <p>
                {" "}
                Myself Vaibhav kumar , student of Information Technology
                Panjab University Chandigarh. <br />
                Currently studying in 3rd year. <br />I have developed this
                project to understand the complex algorithms of our syllabus in
                a easy way.{" "}
              </p>
            </div>
            <div className="front front-1">
              <div className="image">
                <img src={image} alt="Vaibhav kumar" />
                <h2>{name}</h2>
              </div>
            </div>
          </div>
        ) : (
          <div className="maincontainer maincontainer-2">
            <div className="back">
              <h2>About Me & Project</h2>
              <p>
                Hey Everyone ! This is Gaurav Prakash, a third-year BE CSE student
                at Panjab University. Purpose of developing
                this project is to sharp my Full Stack Skills and help our
                juniors to understand easily the world of Algorithms.
              </p>
            </div>
            <div className="front front-2">
              <div className="image">
                <img src={image} alt="Gaurav Prakash" />
                <h2>{name}</h2>
              </div>
            </div>
          </div>
        )}

        {/* jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj */}

        {id == 1 ? (
          <div className={`container container-1`}>
            <div className="card">
              <div className="face bg-face face1">
                <h1>Lets Get Connect </h1>
              </div>
              <div className="face face2">
                <div className=" c1 content">
                  <h3>
                    <a
                      href="https://www.linkedin.com/in/adamdipinto/"
                      target="_blank"
                    >
                      Follow Us
                    </a>
                  </h3>

                  <div className="social-link">
                    <a
                      href="https://www.linkedin.com/in/vaibhav-kumar-3a1b62257/"
                      target="_blank"
                    >
                      <FaLinkedin />
                    </a>
                    <a href="https://github.com/vaibhav-prjapati" target="_blank">
                      {" "}
                      <FaGithub />
                    </a>
                    <a href="mailto:vaibhavop569@gmail.com" target="_blank">
                      {" "}
                      <MdEmail />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className={`container container-2`}>
            <div className="card">
              <div className="face bg-face face1">
                <h1>Lets Get Connect </h1>
              </div>
              <div className="face face2">
                <div className="c2 content">
                  <h3>
                    <a
                      href="https://www.linkedin.com/in/adamdipinto/"
                      target="_blank"
                    >
                      Follow Us
                    </a>
                  </h3>

                  <div className="social-link">
                    <a
                      href="https://www.linkedin.com/in/gaurav-prakashh/"
                      target="_blank"
                    >
                      <FaLinkedin />
                    </a>
                    <a href="https://github.com/iamgaurav12" target="_blank">
                      {" "}
                      <FaGithub />
                    </a>
                    <a href="mailto:prakashgaurav189@gmail.com" target="_blank">
                      {" "}
                      <MdEmail />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default TeamCard;