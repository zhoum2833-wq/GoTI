import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Home } from 'lucide-react'
import ProgressBar from './ProgressBar'

function QuestionPage({ 
  question, 
  currentIndex, 
  totalQuestions, 
  selectedAnswer, 
  onSelectAnswer, 
  onNext, 
  onPrevious,
  onBackToWelcome 
}) {
  return (
    <div className="w-full max-w-2xl">
      <div className="card">
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={onBackToWelcome}
            className="flex items-center gap-2 text-gray-500 hover:text-mygo-purple transition-colors"
          >
            <Home className="w-5 h-5" />
            <span className="text-sm">返回首页</span>
          </button>
        </div>

        <ProgressBar current={currentIndex} total={totalQuestions} />

        <motion.div
          key={question.id}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center">
            {question.question}
          </h2>

          <div className="space-y-4 mb-8">
            {question.options.map((option, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onSelectAnswer(index)}
                className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-200 ${
                  selectedAnswer === index
                    ? 'border-mygo-purple bg-purple-50 shadow-md'
                    : 'border-gray-200 hover:border-mygo-pink hover:bg-pink-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                    selectedAnswer === index
                      ? 'bg-mygo-purple text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {String.fromCharCode(65 + index)}
                  </div>
                  <span className={`font-medium ${
                    selectedAnswer === index ? 'text-mygo-purple' : 'text-gray-700'
                  }`}>
                    {option.text}
                  </span>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        <div className="flex justify-between gap-4">
          <button
            onClick={onPrevious}
            disabled={currentIndex === 0}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all ${
              currentIndex === 0
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
            上一题
          </button>

          <button
            onClick={onNext}
            disabled={selectedAnswer === undefined}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all ${
              selectedAnswer === undefined
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'btn-primary'
            }`}
          >
            {currentIndex === totalQuestions - 1 ? '查看结果' : '下一题'}
            {currentIndex !== totalQuestions - 1 && <ChevronRight className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </div>
  )
}

export default QuestionPage
