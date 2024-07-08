import React from 'react';
import { motion } from 'framer-motion';
import './mainWorld.scss';
import { Link } from 'react-router-dom';
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
          It's a <span className="neon-text">QuakeSphere</span> Website
        </h1>
        <p className="details">
        Have you ever wondered how and why earthquakes occur in Latin America? We live in a region where earthquakes are common, but understanding their origin and behavior can help us be better prepared. Thanks to scientific and technological advancements, we are unraveling the mysteries of these natural phenomena. Discover how researchers are using seismic data and innovative tools to enhance our understanding of earthquakes. The key to our safety might be closer than you think!
        </p>
        <Link to="./home">
          <motion.a
            className="btn"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Explore More
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
