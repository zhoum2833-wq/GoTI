import { motion } from 'framer-motion'
import { Trophy, Share2, RotateCcw, Sparkles, Heart, Star } from 'lucide-react'
import { useState } from 'react'

function ResultPage({ results, onRestart, enableSharing = true }) {
  const [copied, setCopied] = useState(false)

  const { topMatch, allMatches } = results

  const handleShare = async () => {
    const message = `🎸 GoTI 测试结果\n\n我最匹配的是 ${topMatch.name}！\n匹配度：${topMatch.percentage}%\n\n来测试一下你和 MyGO 谁最像吧！`
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'GoTI 人格测试',
          text: message
        })
      } catch (err) {
        copyToClipboard(message)
      }
    } else {
      copyToClipboard(message)
    }
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className="w-full max-w-3xl">
      <div className="card">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="text-center mb-8"
        >
          <div className="flex justify-center mb-4">
            <div 
              className="p-6 rounded-full"
              style={{ backgroundColor: `${topMatch.color}20` }}
            >
              <Trophy 
                className="w-20 h-20"
                style={{ color: topMatch.color }}
              />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">测试完成！</h2>
          <p className="text-gray-600">你最匹配的是...</p>
        </motion.div>

        <motion.div
          key="top-match"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mb-10"
        >
          <div 
            className="relative p-8 rounded-3xl overflow-hidden"
            style={{ 
              background: `linear-gradient(135deg, ${topMatch.color}20 0%, ${topMatch.color}40 100%)`,
              border: `4px solid ${topMatch.color}`
            }}
          >
            <div className="absolute top-4 right-4">
              <Sparkles className="w-8 h-8" style={{ color: topMatch.color }} />
            </div>
            
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring" }}
                className="inline-block mb-4"
              >
                <div 
                  className="text-6xl font-black px-6 py-2 rounded-2xl"
                  style={{ 
                    backgroundColor: topMatch.color,
                    color: 'white'
                  }}
                >
                  {topMatch.percentage}%
                </div>
              </motion.div>
              
              <h3 className="text-4xl font-bold mb-2" style={{ color: topMatch.color }}>
                {topMatch.name}
              </h3>
              <p className="text-xl text-gray-600 mb-4">{topMatch.nickname}</p>
              <p className="text-lg text-gray-700">{topMatch.description}</p>
            </div>
          </div>
        </motion.div>

        <div className="mb-8">
          <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Heart className="w-6 h-6 text-mygo-pink" />
            性格特点
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {topMatch.personality.map((trait, index) => (
              <motion.div
                key={index}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl"
              >
                <Star className="w-5 h-5 text-mygo-yellow flex-shrink-0" />
                <span className="text-gray-700">{trait}</span>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="p-4 bg-green-50 rounded-xl">
            <h5 className="font-bold text-green-700 mb-2">优势</h5>
            <p className="text-green-800">{topMatch.strengths}</p>
          </div>
          <div className="p-4 bg-orange-50 rounded-xl">
            <h5 className="font-bold text-orange-700 mb-2">需要注意</h5>
            <p className="text-orange-800">{topMatch.weaknesses}</p>
          </div>
        </div>

        <div className="p-4 bg-purple-50 rounded-xl mb-8">
          <h5 className="font-bold text-purple-700 mb-2">理想伙伴</h5>
          <p className="text-purple-800">{topMatch.idealMatch}</p>
        </div>

        <h4 className="text-xl font-bold text-gray-800 mb-4">所有角色匹配度</h4>
        <div className="space-y-4 mb-8">
          {allMatches.map((character, index) => (
            <motion.div
              key={character.id}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              className="bg-gray-50 rounded-xl p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-bold" style={{ color: character.color }}>
                    {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}`}
                  </span>
                  <div>
                    <p className="font-bold text-gray-800">{character.name}</p>
                    <p className="text-sm text-gray-500">{character.nickname}</p>
                  </div>
                </div>
                <span 
                  className="text-2xl font-black"
                  style={{ color: character.color }}
                >
                  {character.percentage}%
                </span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: character.color }}
                  initial={{ width: 0 }}
                  animate={{ width: `${character.percentage}%` }}
                  transition={{ delay: 1 + index * 0.1, duration: 0.8 }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          {enableSharing && (
            <button
              onClick={handleShare}
              className="btn-primary flex-1 flex items-center justify-center gap-2"
            >
              <Share2 className="w-5 h-5" />
              {copied ? '已复制！' : '分享结果'}
            </button>
          )}
          <button
            onClick={onRestart}
            className={enableSharing ? "btn-secondary flex-1 flex items-center justify-center gap-2" : "btn-primary w-full flex items-center justify-center gap-2"}
          >
            <RotateCcw className="w-5 h-5" />
            重新测试
          </button>
        </div>
      </div>
    </div>
  )
}

export default ResultPage
