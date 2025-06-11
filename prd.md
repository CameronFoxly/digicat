# Digi-Cat Web Game PRD

## Overview
Digi-Cat is a web-based virtual pet game styled as a retro terminal. Players interact with an ASCII art cat by typing terminal-style commands to keep it alive and happy. The game features animated ASCII art, stat management, and a pixel-perfect terminal UI.

## Core Features
- **Terminal-Style UI**: Mimics a classic terminal window, including colors, fonts, and layout as shown in the provided screenshot.
- **ASCII Art Cat**: The cat is displayed using ASCII art, with multiple states (idle, happy, sad, eating, etc.) and simple animations.
- **Stats**:
  - **Hunger**: Increases when the user types `feed`. Decreases over time.
  - **Happiness**: Increases when the user types `pet`. Decreases over time.
  - If either stat reaches zero, the game ends with a "Game Over" message and a restart button.
- **Command Input**: Users type commands (`feed`, `pet`) and press Enter to interact. Only these commands are accepted.
- **Game Over & Restart**: When the cat "dies," a message and restart button appear. Restart resets stats and state.
- **Pixel-Perfect Styling**: Terminal window, colors, fonts, and layout closely match the provided screenshot.
- **Animation**: ASCII art animates (e.g., blinking, tail movement, state changes on actions).

## User Flow
1. User sees the terminal window with the cat, stats, and command prompt.
2. User types `feed` or `pet` and presses Enter.
3. The cat animates and stats update accordingly.
4. Stats decrease over time. If either stat reaches zero, a game over message appears.
5. User can click a button to restart the game.

## Technical Requirements
- **Framework**: React (JavaScript)
- **Styling**: CSS Modules or Styled Components for pixel-perfect design
- **State Management**: React hooks (useState, useEffect)
- **Animation**: CSS animations or React state-driven frame changes
- **No external backend**: All logic runs client-side

## Stretch Goals (Future)
- More commands (play, sleep, etc.)
- Sound effects
- Persistent stats (localStorage)
- Mobile responsiveness

---

This PRD covers the MVP for Digi-Cat as described. Next, the React project will be scaffolded and implementation will begin.
