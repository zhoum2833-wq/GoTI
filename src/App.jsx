import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import WelcomePage from './components/WelcomePage'
import QuestionPage from './components/QuestionPage'
import ResultPage from './components/ResultPage'
import dataService from './services/dataService'
import config from './config'
import { Loader2, AlertCircle } from 'lucide-react'

function App() {
  const [currentPage, setCurrentPage] = useState('welcome')
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [results, setResults] = useState(null)
  const [questions, setQuestions] = useState([])
  const [characters, setCharacters] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const [questionsData, charactersData] = await Promise.all([
        dataService.getQuestions(),
        dataService.getCharacters()
      ])
      
      setQuestions(questionsData)
      setCharacters(charactersData)
    } catch (err) {
      setError(err.message || '加载数据失败')
      console.error('Failed to load data:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!config.features.progressSave) return
    
    const savedData = localStorage.getItem(config.app.storage.progressKey)
    if (savedData) {
      const { page, questionIndex, savedAnswers } = JSON.parse(savedData)
      setCurrentPage(page)
      setCurrentQuestionIndex(questionIndex)
      setAnswers(savedAnswers)
    }
  }, [])

  useEffect(() => {
    if (!config.features.progressSave) return
    
    if (currentPage === 'welcome') {
      localStorage.removeItem(config.app.storage.progressKey)
    } else if (currentPage === 'questions') {
      localStorage.setItem(config.app.storage.progressKey, JSON.stringify({
        page: 'questions',
        questionIndex: currentQuestionIndex,
        savedAnswers: answers
      }))
    }
  }, [currentPage, currentQuestionIndex, answers])

  const startTest = () => {
    setCurrentPage('questions')
    setCurrentQuestionIndex(0)
    setAnswers({})
  }

  const selectAnswer = (questionId, optionIndex) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }))
  }

  const goToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
    } else {
      calculateResults()
      setCurrentPage('results')
    }
  }

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1)
    }
  }

  const calculateResults = () => {
    const scores = {}
    
    Object.keys(characters).forEach(charId => {
      scores[charId] = 0
    })

    questions.forEach((question) => {
      const answerIndex = answers[question.id]
      if (answerIndex !== undefined) {
        const selectedOption = question.options[answerIndex]
        Object.keys(selectedOption.weights).forEach(charId => {
          scores[charId] = (scores[charId] || 0) + selectedOption.weights[charId]
        })
      }
    })

    const maxScore = Math.max(...Object.values(scores))

    const percentages = {}
    Object.keys(scores).forEach(charId => {
      percentages[charId] = Math.round((scores[charId] / maxScore) * 100)
    })

    const sortedCharacters = Object.entries(percentages)
      .sort(([, a], [, b]) => b - a)
      .map(([charId, percentage]) => ({
        ...characters[charId],
        percentage,
        rawScore: scores[charId]
      }))

    const result = {
      topMatch: sortedCharacters[0],
      allMatches: sortedCharacters,
      scores,
      percentages,
      timestamp: new Date().toISOString()
    }

    setResults(result)
    
    if (config.features.analytics) {
      dataService.saveResult(result).catch(err => {
        console.error('Failed to save result:', err)
      })
    }
  }

  const restartTest = () => {
    setCurrentPage('welcome')
    setCurrentQuestionIndex(0)
    setAnswers({})
    setResults(null)
  }

  const resumeTest = () => {
    setCurrentPage('questions')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="card text-center">
          <Loader2 className="w-12 h-12 animate-spin text-mygo-purple mx-auto mb-4" />
          <p className="text-gray-600">加载中...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="card text-center max-w-md">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-800 mb-2">加载失败</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button onClick={loadData} className="btn-primary">
            重试
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <AnimatePresence mode="wait">
        {currentPage === 'welcome' && (
          <motion.div
            key="welcome"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <WelcomePage 
              onStart={startTest}
              hasSavedProgress={config.features.progressSave && !!localStorage.getItem(config.app.storage.progressKey)}
              onResume={resumeTest}
              title={config.app.title}
              description={config.app.description}
            />
          </motion.div>
        )}

        {currentPage === 'questions' && questions.length > 0 && (
          <motion.div
            key="questions"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
          >
            <QuestionPage
              question={questions[currentQuestionIndex]}
              currentIndex={currentQuestionIndex}
              totalQuestions={questions.length}
              selectedAnswer={answers[questions[currentQuestionIndex].id]}
              onSelectAnswer={(optionIndex) => 
                selectAnswer(questions[currentQuestionIndex].id, optionIndex)
              }
              onNext={goToNextQuestion}
              onPrevious={goToPreviousQuestion}
              onBackToWelcome={restartTest}
            />
          </motion.div>
        )}

        {currentPage === 'results' && results && (
          <motion.div
            key="results"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
          >
            <ResultPage
              results={results}
              onRestart={restartTest}
              enableSharing={config.features.resultSharing}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
