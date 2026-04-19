import apiClient from './index'
import config from '../config'

export const resultsApi = {
  save: async (result) => {
    if (config.isLocal()) {
      console.log('Result saved:', result)
      return { success: true, id: Date.now() }
    }
    return apiClient.post(config.api.endpoints.results, result)
  },

  getById: async (id) => {
    if (config.isLocal()) {
      return null
    }
    return apiClient.get(`${config.api.endpoints.results}/${id}`)
  },

  getByUserId: async (userId) => {
    if (config.isLocal()) {
      return []
    }
    return apiClient.get(`${config.api.endpoints.results}/user/${userId}`)
  },
}
