import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';

const QuizResults = () => {
  const navigate = useNavigate();
  const [results, setResults] = useState(null);

  useEffect(() => {
    // Retrieve results from localStorage
    const resultsData = localStorage.getItem('quizResults');
    
    if (!resultsData) {
      navigate('/dashboard');
      return;
    }
    
    setResults(JSON.parse(resultsData));
  }, [navigate]);

  const handleBackToDashboard = () => {
    // Clear results from localStorage
    localStorage.removeItem('quizResults');
    navigate('/dashboard');
  };

  const handleCreateNewQuiz = () => {
    // Clear results from localStorage
    localStorage.removeItem('quizResults');
    navigate('/create-quiz');
  };

  if (!results) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8 sm:px-6 text-center">
        <p>Loading results...</p>
      </div>
    );
  }

  // Calculate score percentage
  const scorePercentage = results.score ? results.score : 
    Math.round((results.correct_answers / results.quiz.questions.length) * 100);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 sm:px-6">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Quiz Results</h1>
          <p className="text-lg text-gray-600">
            You scored {results.correct_answers || 0} out of {results.quiz.questions.length} questions correctly.
          </p>
          
          <div className="mt-6 flex justify-center">
            <div className="relative h-36 w-36">
              <svg className="h-full w-full" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#E5E7EB"
                  strokeWidth="3"
                  strokeDasharray="100, 100"
                />
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke={scorePercentage >= 70 ? "#10B981" : scorePercentage >= 40 ? "#F59E0B" : "#EF4444"}
                  strokeWidth="3"
                  strokeDasharray={`${scorePercentage}, 100`}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl font-bold">{scorePercentage}%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Question Review</h2>
          
          <div className="space-y-6">
            {results.quiz.questions.map((question, index) => {
              const userAnswer = results.userAnswers[question.question_id];
              const isCorrect = userAnswer === question.correct_option;
              
              return (
                <div key={question.question_id} className="border rounded-lg overflow-hidden">
                  <div className={`p-4 ${isCorrect ? 'bg-green-50' : 'bg-red-50'}`}>
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium text-gray-900">Question {index + 1}</h3>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {isCorrect ? 'Correct' : 'Incorrect'}
                      </span>
                    </div>
                    <p className="mt-1">{question.question_text}</p>
                  </div>
                  
                  <div className="p-4 bg-white space-y-2">
                    {Object.entries(question.options).map(([key, value]) => (
                      <div 
                        key={key}
                        className={`p-3 rounded-md ${
                          key === question.correct_option
                            ? 'bg-green-100 border border-green-300'
                            : key === userAnswer && key !== question.correct_option
                              ? 'bg-red-100 border border-red-300'
                              : 'bg-gray-50 border border-gray-200'
                        }`}
                      >
                        <div className="flex items-start">
                          <div className="flex-shrink-0 h-5 w-5 mr-2">
                            {key === question.correct_option ? (
                              <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            ) : key === userAnswer && key !== question.correct_option ? (
                              <svg className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            ) : null}
                          </div>
                          <span className={`${
                            key === question.correct_option
                              ? 'text-green-800'
                              : key === userAnswer && key !== question.correct_option
                                ? 'text-red-800'
                                : 'text-gray-800'
                          }`}>
                            {key.toUpperCase()}. {value}
                            {key === userAnswer && (
                              <span className="ml-2 font-medium">
                                (Your answer)
                              </span>
                            )}
                            {key === question.correct_option && key !== userAnswer && (
                              <span className="ml-2 font-medium">
                                (Correct answer)
                              </span>
                            )}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
          <Button
            onClick={handleBackToDashboard}
            variant="secondary"
            className="w-full sm:w-auto"
          >
            Back to Dashboard
          </Button>
          <Button
            onClick={handleCreateNewQuiz}
            className="w-full sm:w-auto"
          >
            Create New Quiz
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuizResults;