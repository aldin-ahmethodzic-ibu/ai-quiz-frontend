import React from 'react';

const About = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          About AI-Powered Quiz App
        </h1>
        <p className="mt-4 text-xl text-gray-500">
          An intelligent platform for personalized learning and assessment
        </p>
      </div>

      <div className="space-y-8 text-gray-700">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Project Overview</h2>
          <p className="mb-4">
            The AI-Powered Quiz App is a web-based platform developed as part of the IT 309 - Software Engineering 
            course at International Burch University. It allows users to register, log in, and generate custom 
            quizzes based on selected topics, difficulty levels, and question count.
          </p>
          
          <p>
            The system leverages artificial intelligence to generate questions dynamically, providing a unique 
            learning experience tailored to each user's preferences. Users can view their profiles, quiz statistics 
            (such as quizzes taken and scores), and quiz history, including details of their past attempts and mistakes.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Features</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>User authentication (registration and login)</li>
            <li>AI-powered quiz generation based on user preferences</li>
            <li>Customizable quiz parameters (topic, difficulty, question count)</li>
            <li>Interactive quiz-taking experience</li>
            <li>Detailed performance statistics and history</li>
            <li>User profile management</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Development Approach</h2>
          <p>
            This project follows agile methodology and is built as a full-stack web application with separate 
            frontend and backend components. The development process included detailed planning, architecture design, 
            implementation using design patterns, comprehensive testing, version control, and deployment.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Technology Stack</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><span className="font-semibold">Frontend:</span> React, Vite, Tailwind CSS</li>
            <li><span className="font-semibold">Backend:</span> FastAPI, MongoDB</li>
            <li><span className="font-semibold">AI Integration:</span> OpenAI API</li>
            <li><span className="font-semibold">Deployment:</span> Digital Ocean</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Project Team</h2>
          <p>
            This application was developed by Aldin Ahmethodžić and Andrej Herman as part of the IT 309 - Software 
            Engineering course at International Burch University, under the guidance of Professor Nermina Durmic 
            and laboratory assistants Lejla Breščić and Ajla Korman.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;