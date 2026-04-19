import config from '../config'
import localDataLoader from './localDataLoader'
import apiDataLoader from './apiDataLoader'

class DataService {
  constructor() {
    this.loader = config.isLocal() ? localDataLoader : apiDataLoader
    this.cache = {
      questions: null,
      characters: null,
    }
  }

  async getQuestions() {
    if (this.cache.questions) {
      return this.cache.questions
    }

    const questions = await this.loader.getQuestions()
    this.cache.questions = questions
    return questions
  }

  async getCharacters() {
    if (this.cache.characters) {
      return this.cache.characters
    }

    const characters = await this.loader.getCharacters()
    this.cache.characters = characters
    return characters
  }

  async getCharacterById(id) {
    const characters = await this.getCharacters()
    return characters[id] || null
  }

  async saveResult(result) {
    return await this.loader.saveResult(result)
  }

  clearCache() {
    this.cache = {
      questions: null,
      characters: null,
    }
  }
}

export default new DataService()
