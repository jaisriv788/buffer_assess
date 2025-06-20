import Button from "./Button";
import { motion } from "motion/react";
import { useNavigate } from "react-router";

function Navbar() {
  const navigate = useNavigate();

  function showFrom() {
    const page = document.getElementById("form");
    page.scrollIntoView();
  }

  function routeToDetail() {
    navigate("/details");
  }

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="navbar"
    >
      <div className="left">
        <div className="icon">DC</div>
        <div className="title">DataCollector</div>
      </div>
      <div className="btns">
        <Button clickFn={routeToDetail} class="details-navigation">
          Details
        </Button>
        <Button clickFn={showFrom} class="form-navigation">
          Get Started
        </Button>
      </div>
    </motion.nav>
  );
}

export default Navbar;
