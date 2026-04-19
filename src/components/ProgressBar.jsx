import { motion } from 'framer-motion'

function ProgressBar({ current, total }) {
  const percentage = Math.round((current / total) * 100)

  return (
    <div className="w-full mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-600">
          第 {current + 1} 题 / 共 {total} 题
        </span>
        <span className="text-sm font-bold text-mygo-purple">
          {percentage}%
        </span>
      </div>
      <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-mygo-pink to-mygo-purple rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
    </div>
  )
}

export default ProgressBar
