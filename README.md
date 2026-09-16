# ⚡ Interactive 3D Strassen Matrix Multiplication Laboratory & Historical Archive

> **Academic Project / Course Submission**  
> **Course:** Design and Analysis of Algorithms  
> **Institution:** S.B. Jain Institute of Technology, Management and Research, Nagpur  
> **Department:** Department of Computer Science & Engineering (Data Science)  
> **Author:** Shravil Karotiya (USN: CD24049)  

---

## 🌌 Overview

The **Interactive 3D Strassen Matrix Multiplication Laboratory** is a modern, animated, educational web application designed to visually explain and verify the divide-and-conquer mechanics of **Volker Strassen's (1969)** seminal algorithm.

The visualizer allows users to input custom matrices, observe step-by-step 3D spatial partitioning, compute the 7 strategic intermediate products, and recombine them into the final matrix with real-time arithmetic verification against standard $\mathcal{O}(n^3)$ matrix multiplication.

---

## 🚀 Key Features

- **Interactive 3D Spatial Stage (Three.js & OrbitControls)**:
  - 3D floating textured matrix cubes with real-time rotation, zoom, and perspective presets.
  - Animated quadrant splitting offsets and calculation laser arcs.
- **13-Stage Step Engine**:
  - Interactive scrubber covering Matrix Input $\to$ Quadrant Partitioning $\to$ Setup $\to$ 7 Strassen Multiplications ($P_1 \dots P_7$) $\to$ Recombination ($C_{11} \dots C_{22}$) $\to$ Final Verified Matrix.
- **Dedicated Historical Archive & Biography**:
  - Showcases German mathematician **Prof. Volker Strassen**, his 1969 breakthrough *“Gaussian Elimination is not Optimal”*, the **Solovay–Strassen Primality Test (1977)**, the **Knuth Prize (2008)**, and the connection to **Google DeepMind AlphaTensor (2022)**.
- **Live Arithmetic & Max-Delta Verification**:
  - Real-time side-by-side verification comparing Strassen results against classical $\mathcal{O}(n^3)$ algorithm with exact delta tracking ($\text{Max } \Delta = 0$).
- **Matrix Input Laboratory**:
  - Support for $2 \times 2$, $4 \times 4$, and $8 \times 8$ matrices.
  - Presets for Default, Negative Numbers & Zeroes, Identity Matrices, 4×4 Recursive decomposition, Randomizer, and Zero matrices.
- **Comparative Complexity Arena**:
  - Master Theorem complexity proof: $T(n) = 7T(n/2) + \Theta(n^2) \implies \mathcal{O}(n^{\log_2 7}) \approx \mathcal{O}(n^{2.8074})$.
  - Operation scaling table comparing classical vs Strassen multiplications from $N=2$ to $N=2048$.
- **Export & Audio Synthesizer**:
  - Export calculation proofs directly to LaTeX, Markdown, or JSON.
  - Web Audio API synthesizer for interactive step ticks, product chimes, and verification fanfare.
  - 100% Client-side execution (Zero backend / zero cloud dependency).

---

## 📐 The Strassen Mathematical Formulations

Given two partitioned $2 \times 2$ matrices $A$ and $B$:

$$
A = \begin{bmatrix} A_{11} & A_{12} \\ A_{21} & A_{22} \end{bmatrix}, \quad
B = \begin{bmatrix} B_{11} & B_{12} \\ B_{21} & B_{22} \end{bmatrix}
$$

### The 7 Strategic Products ($P_1 \dots P_7$)
$$P_1 = (A_{11} + A_{22})(B_{11} + B_{22})$$
$$P_2 = (A_{21} + A_{22})B_{11}$$
$$P_3 = A_{11}(B_{12} - B_{22})$$
$$P_4 = A_{22}(B_{21} - B_{11})$$
$$P_5 = (A_{11} + A_{12})B_{22}$$
$$P_6 = (A_{21} - A_{11})(B_{11} + B_{12})$$
$$P_7 = (A_{12} - A_{22})(B_{21} + B_{22})$$

### Recombination of Submatrices ($C_{11} \dots C_{22}$)
$$C_{11} = P_1 + P_4 - P_5 + P_7$$
$$C_{12} = P_3 + P_5$$
$$C_{21} = P_2 + P_4$$
$$C_{22} = P_1 - P_2 + P_3 + P_6$$

---

## 💻 Quick Start & Running Locally

### Option 1: Direct Browser Opening (No installation required)
Simply double-click `index.html` or open it in any modern web browser (Chrome, Edge, Firefox, Safari).

### Option 2: Local HTTP Server (Node.js)
```bash
# 1. Clone the repository
git clone https://github.com/shravil-karotiya123/Strassen_Matrix_TAE.git
cd Strassen_Matrix_TAE

# 2. Run the lightweight server
node server.cjs
```
Visit **http://localhost:5173** in your browser.

---

## 🛠️ Tech Stack

- **Frontend Framework**: React 18
- **3D Graphics Engine**: Three.js (r128) & OrbitControls
- **Styling**: Tailwind CSS & Custom Obsidian Glassmorphic Theme
- **Sound Effects**: HTML5 Web Audio API Synthesizer
- **Particles**: Canvas Confetti

---

## 📜 License

MIT License. Developed for educational, research, and coursework presentation purposes.
