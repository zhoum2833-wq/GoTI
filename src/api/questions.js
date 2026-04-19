import apiClient from './index'
import config from '../config'

export const questionsApi = {
  getAll: async () => {
    if (config.isLocal()) {
      const { questions } = await import('../data/questions')
      return questions
    }
    return apiClient.get(config.api.endpoints.questions)
  },

  getById: async (id) => {
    if (config.isLocal()) {
      const { questions } = await import('../data/questions')
      return questions.find(q => q.id === id)
    }
    return apiClient.get(`${config.api.endpoints.questions}/${id}`)
  },
}
