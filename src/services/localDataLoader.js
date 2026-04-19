import { questions } from '../data/questions'
import { characters } from '../data/characters'

class LocalDataLoader {
  async getQuestions() {
    return Promise.resolve(questions)
  }

  async getCharacters() {
    return Promise.resolve(characters)
  }

  async getCharacterById(id) {
    const char = characters[id]
    if (!char) {
      throw new Error(`Character with id ${id} not found`)
    }
    return Promise.resolve(char)
  }

  async saveResult(result) {
    console.log('Result saved locally:', result)
    return Promise.resolve({ success: true, id: Date.now() })
  }
}

export default new LocalDataLoader()
