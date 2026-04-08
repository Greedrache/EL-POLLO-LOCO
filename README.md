# 🌮 El Pollo Loco

A 2D jump-and-run browser game built with vanilla JavaScript and object-oriented programming.
Help the Mexican hero Pepe fight his way through waves of chickens to defeat the final boss – El Pollo Loco!

---

## 🎮 Gameplay

You control Pepe, a fearless Mexican on a mission. Jump over chickens, collect coins and salsa bottles,
and take down the endboss to win. Watch your health – the chickens bite back!

**Controls:**

| Key | Action |
|-----|--------|
| `←` `→` | Move left / right |
| `Space` | Jump |
| `S` | Throw salsa bottle |

---

## ✨ Features

- Smooth 2D side-scrolling gameplay
- Object-oriented architecture (classes for every game object)
- Animated sprites for characters, enemies, and collectibles
- Sound effects and background music (toggleable)
- Health bar, coin bar, and bottle bar HUD
- Endboss with its own AI and health system
- Responsive canvas rendering
- Imprint page included

---

## 🛠️ Tech Stack

- HTML5 / Canvas
- CSS3
- JavaScript (ES6+ / OOP)

No frameworks, no libraries – pure vanilla JavaScript.

---

## 📁 Project Structure

```
EL-POLLO-LOCO/
├── audio/          # Sound effects and music
├── classes/        # All game object classes (player, enemies, items, etc.)
├── fonts/          # Custom fonts
├── img/            # Sprite sheets and background images
├── js/             # Core game logic (game loop, input, collision, etc.)
├── levels/         # Level definitions
├── index.html      # Entry point
├── style.css       # Main stylesheet
├── impressum.html  # Legal notice
└── impressum.css   # Legal notice styles
```

---

## 🚀 Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/Greedrache/EL-POLLO-LOCO .
```

### 2. Open with Live Server

Open the project in **VS Code** and start it with the **Live Server** extension.

Or simply open `index.html` directly in your browser.

> ⚠️ Some audio features may require a local server due to browser autoplay policies.

---

## 🧠 OOP Concepts Used

This project was built as a showcase of object-oriented JavaScript:

- Inheritance via `extends` and `super()`
- Encapsulation of game logic per class
- Polymorphism through shared base classes (e.g. `MovableObject`)
- Separation of concerns between game loop, rendering, and object state

---

## 📜 License

This project is licensed under the MIT License.

---

**🌮 El Pollo Loco – ¡Que empiece el juego!**
