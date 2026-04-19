import apiClient from '../api'

class ApiDataLoader {
  async getQuestions() {
    const response = await apiClient.get('/questions')
    return response.data
  }

  async getCharacters() {
    const response = await apiClient.get('/characters')
    return response.data
  }

  async getCharacterById(id) {
    const response = await apiClient.get(`/characters/${id}`)
    return response.data
  }

  async saveResult(result) {
    const response = await apiClient.post('/results', result)
    return response.data
  }
}

export default new ApiDataLoader()
