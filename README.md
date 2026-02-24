# Project Title  

**Camera Drift — A Meditative Constellation Experience**

---

# Group Members  

Elizabeth Ciceu  
WatID: eciceu  
Student Number: (add your student number here)

---

# Description  

Camera Drift is a reflective, camera-led experience inspired by the Week 5 prompt to create a meditative scrolling world larger than the screen. Instead of building a traditional platformer, the interaction removes direct character control and focuses on pacing, motion, and visual discovery.

The camera slowly drifts through a horizontally extended world. As it passes near hidden points, constellation-like patterns reveal themselves through glowing stars and connecting lines. These discoveries trigger short reflective messages that appear briefly on screen.

The experience emphasizes:

- Slow, intentional pacing  
- Atmospheric movement rather than challenge  
- Visual storytelling through constellations  
- Discovery driven by proximity rather than player action  

Rather than rewarding skill or speed, the piece encourages observation and quiet engagement.

---

# Setup and Interaction Instructions  

## How to Run  

1. Open the project using Live Server or GitHub Pages.
2. Ensure `index.html` is in the root directory.
3. The experience will load directly in the browser.

## How to Play  

1. Press **Start** on the opening screen.
2. The camera will begin drifting through the world automatically.
3. Watch for glowing points.
4. When the camera passes near one, a constellation will reveal itself.
5. A short message will briefly appear.

## Controls  

- **R** → Restart the experience  
- **+ / -** → Adjust camera speed  

There is no direct blob movement. The camera is the primary interactive mechanic.

---

# Iteration Notes  

## Post-Playtest: Changes Made  

1. Removed player-controlled movement to better align with the meditative theme.
2. Simplified architecture to eliminate JSON dependencies that caused loading issues.
3. Replaced simple glow effects with constellation-style reveals to improve visual clarity and atmosphere.

## Post-Showcase: Planned Improvements  

1. Add subtle ambient sound to deepen immersion.
2. Implement a gentle parallax background layer for additional depth.

---

# Assets  

This project uses:

- p5.js library (local copy in `libraries/` folder)

All constellation visuals, animations, and graphical elements were created programmatically in p5.js.

---

# References  

p5.js. (n.d.). *p5.js reference*. https://p5js.org/reference/

Cochrane, K. (2026). *GBDA 302 Lecture Slides — Week 5*.
