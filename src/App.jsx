import { useState } from 'react'
import RegistrationForm from './components/RegistrationForm'

function App() {
  const [currentPage, setCurrentPage] = useState('home')

  const renderPage = () => {
    switch (currentPage) {
      case 'registration':
        return <RegistrationForm />
      case 'home':
      default:
        return (
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="max-w-4xl mx-auto text-center">
              {/* Logo Section */}
              <div className="flex justify-center items-center gap-8 mb-8">
                <div className="text-6xl">🚀</div>
              </div>

              {/* Main Content */}
              <h1 className="text-5xl font-bold text-gray-800 mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Welcome to Our Platform
              </h1>
              
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-8 border border-white/20">
                <p className="text-gray-600 mb-6 text-lg">
                  Join thousands of users who are already part of our community
                </p>
                <button 
                  onClick={() => setCurrentPage('registration')}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300"
                >
                  Get Started - Create Account
                </button>
              </div>
              
              <p className="text-gray-500 text-sm">
                Ready to begin your journey with us?
              </p>
            </div>
          </div>
        )
    }
  }

  return (
    <div>
      {renderPage()}
    </div>
  )
}

export default App
