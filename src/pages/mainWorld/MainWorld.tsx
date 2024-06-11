import React from 'react';
import { motion } from 'framer-motion';
import './mainWorld.scss';
import { Link} from 'react-router-dom';
import exampleImage from './map.png';
import { Description } from './Description';

export function MainWorld() {
  return (
    <div className="main-container">
      <motion.div
        className="content"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <h1>
          It's a <span>QuakeSphere</span> Website
        </h1>
        <p className="details">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
        </p>
        <Link to="./home">
          <motion.a
            className="btn"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Explorar Más
          </motion.a>
        </Link>
      </motion.div>
      <motion.div
        className="image-container"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <img src={exampleImage} alt="MapAmerica" />
      </motion.div>
      {/* <div>
        <Description />
      </div> */}
    </div>
  );
}
