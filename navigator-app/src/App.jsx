import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import { Routes, Route, useNavigate } from "react-router-dom"
import Dashboard from "../src/components/Dashboard.jsx"
import './App.css'

/* SOS Feature Inputs */
import SOSButton from './components/SOSButton'

function App() {
  const [count, setCount] = useState(0)
  const navigate = useNavigate()

  return (
    <>
      <Routes>
        <Route path="/" element={
          <>
            <section id="center">
            <div className="hero">
              <img src={heroImg} className="base" width="170" height="179" alt="" />
              <img src={reactLogo} className="framework" alt="React logo" />
              <img src={viteLogo} className="vite" alt="Vite logo" />
            </div>
            <div>
              <h1>Get started</h1>
              <p>
                Edit <code>src/App.jsx</code> and save to test <code>HMR</code>
              </p>
            </div>
            <button
              className="counter"
              onClick={() => setCount((count) => count + 1)}
            >
              Count is {count}
            </button>
          </section>

          <div className="ticks"></div>

          <section id="next-steps">
            <div id="docs">
              <svg className="icon" role="presentation" aria-hidden="true">
                <use href="/icons.svg#documentation-icon"></use>
              </svg>
              <h2>Documentation</h2>
              <p>Your questions, answered</p>
              <ul>
                <li>
                  <a href="https://vite.dev/" target="_blank">
                    <img className="logo" src={viteLogo} alt="" />
                    Explore Vite
                  </a>
                </li>
                <li>
                  <a href="https://react.dev/" target="_blank">
                    <img className="button-icon" src={reactLogo} alt="" />
                    Learn more
                  </a>
                </li>
              </ul>
            </div>
            <div id="social">
              <svg className="icon" role="presentation" aria-hidden="true">
                <use href="/icons.svg#social-icon"></use>
              </svg>
              <h2>Connect with us</h2>
              <p>Join the Vite community</p>
              <ul>
                <li>
                  <a href="https://github.com/vitejs/vite" target="_blank">
                    <svg
                      className="button-icon"
                      role="presentation"
                      aria-hidden="true"
                    >
                      <use href="/icons.svg#github-icon"></use>
                    </svg>
                    GitHub
                  </a>
                </li>
                <li>
                  <a href="https://chat.vite.dev/" target="_blank">
                    <svg
                      className="button-icon"
                      role="presentation"
                      aria-hidden="true"
                    >
                      <use href="/icons.svg#discord-icon"></use>
                    </svg>
                    Discord
                  </a>
                </li>
                <li>
                  <a href="https://x.com/vite_js" target="_blank">
                    <svg
                      className="button-icon"
                      role="presentation"
                      aria-hidden="true"
                    >
                      <use href="/icons.svg#x-icon"></use>
                    </svg>
                    X.com
                  </a>
                </li>
                <li>
                  <a href="https://bsky.app/profile/vite.dev" target="_blank">
                    <svg
                      className="button-icon"
                      role="presentation"
                      aria-hidden="true"
                    >
                      <use href="/icons.svg#bluesky-icon"></use>
                    </svg>
                    Bluesky
                  </a>
                </li>
              </ul>
            </div>
          </section>

          <div className="ticks"></div>
          <section id="spacer"></section>

          {/* SOS Feature Blocks added here */}
          <SOSButton />
          </>
        } />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>

      {/* Temporary navbar to implement dashboard page */}
      <section id="navbar">
        <nav className="fixed top-0 left-0 w-full h-14 bg-blue-600
            flex items-center justify-between px-2 shadow-sm">
            
          <button className="text-sm font-bold text-white
              px-5 py-3 rounded-full hover:shadow-2xl
              hover:text-zinc-900 hover:bg-blue-400 transition-colors"
              
              onClick={() => navigate("/")}>
            Home
          </button>

          <button className="text-sm font-bold text-white
              px-5 py-3 rounded-full hover:shadow-2xl
              hover:text-zinc-900 hover:bg-blue-400 transition-colors"
              
              onClick={() => navigate("/dashboard")}>
            Dashboard
          </button>

        </nav>
      </section>
    </>
  )
}

export default App
