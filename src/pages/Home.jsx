import React from 'react'
import Button from '../components/ui/Button'

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            AI-Powered Quiz App
          </h1>
          <p className="text-lg md:text-xl text-gray-600">
            Specify what kind of quiz you'd like to do and let AI generate it instantly!
          </p>
        </div>

        <div className="space-y-6">
          <div className="space-y-4">
            <Button
              onClick={() => {/* Add registration handler */}}
              className="w-full sm:w-auto"
            >
              Get Started
            </Button>
          </div>

          <div className="space-y-2">
            <p className="text-gray-600">
              Already have an account?
            </p>
            <Button
              variant="secondary"
              onClick={() => {/* Add login handler */}}
              className="w-full sm:w-auto"
            >
              Login
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home