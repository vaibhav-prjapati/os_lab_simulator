import { Nav, TeamCard } from '../components'
import '../styles/About.css'

import ashishImg from '../assets/teamImage/vaibhavImage.png'
import kavyaImg from '../assets/teamImage/gauravImage.jpg'
import socialImg from '../assets/teamImage/Social.png'
//import InstructorCard from '../components/InstructorCard'
import Footer from '../components/Footer'


const About = () => {
  return (
    <div className='about-us-page'>
      <div className='title-section'>
        <Nav />
        <h1 className='title'></h1>
      </div>

     <div className="parent-div">
     <div className='our-team-container'>
        <h1 style={{ color: '#444' }}>Our Team</h1>
        <div className='team'>
          <TeamCard name="Vaibhav Kumar" id='1' image = {ashishImg} social={socialImg} />
          <TeamCard name="Gaurav Prakash" id='2' image={kavyaImg}  social={socialImg} />
        </div>
      </div>
      {/* <div className="out-instructor-container">
        <InstructorCard/>
      </div> */}
      <Footer/>
     </div>
    </div>
  )
}

export default About