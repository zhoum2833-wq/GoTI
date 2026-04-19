import { motion } from 'framer-motion'
import { Sparkles, Music, Users, Play } from 'lucide-react'

function WelcomePage({ onStart, hasSavedProgress, onResume, title, description }) {
  return (
    <div className="w-full max-w-2xl">
      <motion.div 
        className="card text-center"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
        >
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-r from-mygo-pink to-mygo-purple p-4 rounded-full">
              <Sparkles className="w-16 h-16 text-white" />
            </div>
          </div>
        </motion.div>

        <motion.h1 
          className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-mygo-pink to-mygo-purple bg-clip-text text-transparent"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {title || 'GoTI 人格测试'}
        </motion.h1>

        <motion.p 
          className="text-xl text-gray-600 mb-2"
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {description || 'MyGO 角色匹配度测试'}
        </motion.p>

        <motion.p 
          className="text-gray-500 mb-8"
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          回答 20 道题目，发现你与 MyGO 成员的人格匹配度！
        </motion.p>

        <motion.div 
          className="flex flex-wrap justify-center gap-4 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex items-center gap-2 bg-pink-50 px-4 py-2 rounded-full">
            <Music className="w-5 h-5 text-mygo-pink" />
            <span className="text-sm text-gray-600">音乐主题</span>
          </div>
          <div className="flex items-center gap-2 bg-purple-50 px-4 py-2 rounded-full">
            <Users className="w-5 h-5 text-mygo-purple" />
            <span className="text-sm text-gray-600">5 位角色</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          {hasSavedProgress ? (
            <div className="space-y-4">
              <p className="text-gray-600 mb-4">检测到未完成的测试，是否继续？</p>
              <button
                onClick={onResume}
                className="btn-primary w-full flex items-center justify-center gap-2"
              >
                <Play className="w-5 h-5" />
                继续测试
              </button>
              <button
                onClick={onStart}
                className="btn-secondary w-full"
              >
                重新开始
              </button>
            </div>
          ) : (
            <button
              onClick={onStart}
              className="btn-primary w-full flex items-center justify-center gap-2 text-lg py-4"
            >
              <Play className="w-6 h-6" />
              开始测试
            </button>
          )}
        </motion.div>
      </motion.div>
    </div>
  )
}

export default WelcomePage
