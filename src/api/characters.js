import apiClient from './index'
import config from '../config'

export const charactersApi = {
  getAll: async () => {
    if (config.isLocal()) {
      const { characters } = await import('../data/characters')
      return characters
    }
    return apiClient.get(config.api.endpoints.characters)
  },

  getById: async (id) => {
    if (config.isLocal()) {
      const { characters } = await import('../data/characters')
      return characters[id]
    }
    return apiClient.get(`${config.api.endpoints.characters}/${id}`)
  },
}
