import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import { api } from '../utils/api';

const TakeQuiz = () => {
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Retrieve quiz data from localStorage
    const quizData = localStorage.getItem('currentQuiz');
    
    if (!quizData) {
      navigate('/dashboard');
      return;
    }
    
    setQuiz(JSON.parse(quizData));
  }, [navigate]);

  const handleAnswerSelect = (questionId, option) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: option
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Prepare submission data in the correct format
      const submissionData = {
        quiz_id: quiz.quiz_id,
        answers: Object.fromEntries(
          Object.entries(selectedAnswers).map(([questionId, answer]) => [
            parseInt(questionId, 10),
            answer
          ])
        )
      };

      const resultData = await api.post('/quiz/submit', submissionData);
      
      // Store results in localStorage
      localStorage.setItem('quizResults', JSON.stringify({
        ...resultData,
        quiz: quiz,
        userAnswers: selectedAnswers
      }));
      
      // Clear the current quiz
      localStorage.removeItem('currentQuiz');
      
      // Navigate to results page
      navigate('/quiz-results');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleReviewQuestionClick = (index) => {
    setCurrentQuestion(index);
    setQuizCompleted(false);
  };

  if (!quiz) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8 sm:px-6 text-center">
        <p>Loading quiz...</p>
      </div>
    );
  }

  const question = quiz.questions[currentQuestion];

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 sm:px-6">
      {error && (
        <div className="bg-red-50 text-red-500 p-4 rounded-lg mb-6">
          {error}
        </div>
      )}

      <div className="bg-white p-8 rounded-lg shadow-md">
        {!quizCompleted ? (
          <>
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900">Question {currentQuestion + 1} of {quiz.questions.length}</h2>
                <span className="text-sm text-gray-500">
                  {Object.keys(selectedAnswers).length} of {quiz.questions.length} answered
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-indigo-600 h-2.5 rounded-full" 
                  style={{ width: `${((currentQuestion + 1) / quiz.questions.length) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">{question.question_text}</h3>
              
              <div className="space-y-3">
                {Object.entries(question.options).map(([key, value]) => (
                  <div 
                    key={key}
                    onClick={() => handleAnswerSelect(question.question_id, key)}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedAnswers[question.question_id] === key 
                        ? 'bg-indigo-100 border-indigo-500' 
                        : 'hover:bg-gray-50 border-gray-300'
                    }`}
                  >
                    <div className="flex items-start">
                      <div className={`flex-shrink-0 h-5 w-5 border rounded-full mr-2 mt-0.5 ${
                        selectedAnswers[question.question_id] === key 
                          ? 'border-indigo-500 bg-indigo-500' 
                          : 'border-gray-300'
                      }`}>
                        {selectedAnswers[question.question_id] === key && (
                          <svg className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                            <circle cx="10" cy="10" r="5" />
                          </svg>
                        )}
                      </div>
                      <span className="text-gray-900">{key.toUpperCase()}. {value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-between">
              <Button
                variant="secondary"
                onClick={handlePreviousQuestion}
                disabled={currentQuestion === 0}
                className={currentQuestion === 0 ? 'opacity-50 cursor-not-allowed' : ''}
              >
                Previous
              </Button>
              <Button onClick={handleNextQuestion}>
                {currentQuestion === quiz.questions.length - 1 ? 'Review Answers' : 'Next'}
              </Button>
            </div>
          </>
        ) : (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Review Your Answers</h2>
            
            <div className="space-y-4">
              {quiz.questions.map((q, index) => (
                <div 
                  key={q.question_id} 
                  className="p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => handleReviewQuestionClick(index)}
                >
                  <div className="flex justify-between">
                    <h3 className="font-medium text-gray-900">Question {index + 1}</h3>
                    <div className={`text-sm font-medium text-right ${
                      selectedAnswers[q.question_id] 
                        ? 'text-green-600' 
                        : 'text-red-600'
                    }`}>
                      {selectedAnswers[q.question_id] 
                        ? (
                          <>
                            Answer: {selectedAnswers[q.question_id].toUpperCase()}
                            <br />
                            <span className="text-gray-600">({q.options[selectedAnswers[q.question_id]]})</span>
                          </>
                        ) 
                        : 'Not answered'}
                    </div>
                  </div>
                  <p className="mt-1 text-gray-600">{q.question_text}</p>
                </div>
              ))}
            </div>
            
            <div className="pt-4">
              <p className="mb-4 text-gray-600">
                You've answered {Object.keys(selectedAnswers).length} out of {quiz.questions.length} questions.
                {Object.keys(selectedAnswers).length < quiz.questions.length && 
                  " You can go back to answer all questions or submit as is."}
              </p>
              
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                <Button
                  variant="secondary"
                  onClick={() => setQuizCompleted(false)}
                  className="w-full sm:w-auto"
                >
                  Go Back to Questions
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full sm:w-auto"
                >
                  {loading ? 'Submitting...' : 'Submit Quiz'}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TakeQuiz;