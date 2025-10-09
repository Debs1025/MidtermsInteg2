import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* Logo Section */}
        <div className="flex justify-center items-center gap-8 mb-8">
          <a 
            href="https://vite.dev" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group transition-transform hover:scale-110"
          >
            <img 
              src={viteLogo} 
              className="h-16 w-16 group-hover:drop-shadow-lg transition-all duration-300" 
              alt="Vite logo" 
            />
          </a>
          <a 
            href="https://react.dev" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group transition-transform hover:scale-110"
          >
            <img 
              src={reactLogo} 
              className="h-16 w-16 group-hover:drop-shadow-lg transition-all duration-300 animate-spin-slow" 
              alt="React logo" 
            />
          </a>
        </div>

        {/* Main Content */}
        <h1 className="text-5xl font-bold text-gray-800 mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Vite + React
        </h1>
        
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-8 border border-white/20">
          <button 
            onClick={() => setCount((count) => count + 1)}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            count is {count}
          </button>
          <p className="mt-4 text-gray-600">
            Edit <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">src/App.jsx</code> and save to test HMR
          </p>
        </div>
        
        <p className="text-gray-500 text-sm">
          Click on the Vite and React logos to learn more
        </p>
      </div>
    </div>
  )
}

export default App
