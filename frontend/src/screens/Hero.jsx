import Navbar from "../components/Navbar";
import Button from "../components/Button";
import { Github, Linkedin } from "lucide-react";
import { motion } from "motion/react";
import { useNavigate } from "react-router";

function Hero() {
    const navigate = useNavigate();

  function github() {
    window.open(
      "https://github.com/jaisriv788",
      "_blank",
      "noopener,noreferrer"
    );
  }

  function linkedin() {
    window.open(
      "https://www.linkedin.com/in/jaisrivastava788/",
      "_blank",
      "noopener,noreferrer"
    );
  }

  function routeToDetail() {
    navigate("/details");
  }

  return (
    <section id="hero" className="screens hero-section">
      <video autoPlay loop muted playsInline className="background-video">
        <source src="https://cdn.pixabay.com/video/2021/09/08/87786-602074234_large.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <Navbar />
      <div className="hero-content">
        <main className="main-title">
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            Streamline Your
          </motion.div>
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.8 }}
            className="second"
          >
            Data Collection Process
          </motion.div>
        </main>
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 2.6 }}
          className="discription"
        >
          Professional form solution that securely captures and stores your
          data. Simple, <br /> efficient, and built for modern businesses.
        </motion.div>
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 3.2 }}
          className="home-buttons"
        >
          <Button clickFn={github} class="social1">
            <Github />
            Github
          </Button>
          <Button clickFn={linkedin} class="social2">
            {" "}
            <Linkedin /> LinkedIn
          </Button>
        </motion.div>
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 4 }}
          className="home-buttons w-3/4"
        >
          <button clickFn={routeToDetail} className="small-screen-details w-full" >
            Get Details
          </button>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
