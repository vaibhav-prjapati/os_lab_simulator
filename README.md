# OS Lab Simulator

A modern React + Vite web application for simulating and visualizing Operating System algorithms, especially CPU scheduling. Includes interactive documentation, algorithm explorer, and a full-featured simulator.

## Features
- **CPU Scheduling Simulator**: Visualize and experiment with FCFS, SJF, SRTF, Priority, Round Robin, and Multilevel Queue algorithms.
- **Algorithm Explorer**: Browse and learn about Graph, Sorting, Searching, Backtracking, Dynamic Programming, and AI algorithms.
- **Interactive Docs**: Rich documentation for each algorithm, including theory, advantages, disadvantages, complexity, and applications.
- **Team & About**: Meet the creators and learn about the project.
- **Authentication**: Sign in/up for personalized experience.
- **Responsive UI**: Works on desktop and mobile.
- **Modern Stack**: Built with React, Vite, Tailwind CSS, and Clerk authentication.

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- npm or yarn

### Installation
```sh
npm install
```

### Running the App
```sh
npm run dev
```
Visit [https://os-lab-simulator-y3q2.vercel.app](https://os-lab-simulator-y3q2.vercel.app) in your browser.

## Project Structure
```
├── public/           # Static assets
├── src/
│   ├── assets/       # Images, data files
│   ├── components/   # Reusable React components
│   ├── pages/        # Route pages (Home, Docs, Simulator, About, Auth)
│   ├── styles/       # CSS files
│   ├── App.jsx       # Main app with routes
│   └── main.jsx      # Entry point
├── package.json      # Project metadata
├── tailwind.config.js
├── vite.config.js
└── README.md
```

## Routes
| Path         | Page Component   | Description                                      |
|--------------|------------------|--------------------------------------------------|
| `/`          | HomePage         | Landing page, intro, features, quick start        |
| `/docs`      | DocsPage         | Interactive documentation & algorithm explorer    |
| `/simulator` | SimulatorPage    | CPU scheduling simulator                         |
| `/about`     | AboutPage        | Team info, project background                    |
| `/sign-in`   | SignInPage       | User sign-in                                     |
| `/sign-up`   | SignUpPage       | User sign-up                                     |

## Algorithm Categories in Docs
- CPU Scheduling (FCFS, SJF, SRTF, Priority, RR, Multilevel Queue)
- Graph Algorithms (BFS, DFS, Dijkstra, Bellman-Ford, etc.)
- Sorting Algorithms (Bubble, Merge, Quick, etc.)
- Searching Algorithms (Linear, Binary, Exponential, etc.)
- Backtracking Algorithms
- Dynamic Programming Algorithms
- AI Algorithms (K-Means, Genetic, NLP, etc.)

## Contributing
1. Fork the repo
2. Create your feature branch (`git checkout -b feature/my-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/my-feature`)
5. Open a Pull Request

## License
MIT

---

Made with ❤️ by Vaibhav Kumar & Gaurav Prakash
