import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Report from './pages/Report'

function NavBar() {
  return (
    <nav className="flex-shrink-0 bg-blue-900 text-white flex items-center gap-6 px-4 py-3 text-sm font-semibold shadow z-50">
      <Link to="/" className="hover:text-blue-200">
        Map
      </Link>
      <Link to="/report" className="hover:text-blue-200">
        Report
      </Link>
    </nav>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col h-screen">
        <NavBar />
        <div className="flex-1 overflow-hidden">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/report" element={<Report />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}
