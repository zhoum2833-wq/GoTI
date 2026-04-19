export const apiConfig = {
  baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api',
  timeout: parseInt(import.meta.env.VITE_API_TIMEOUT) || 10000,
  
  endpoints: {
    questions: '/questions',
    characters: '/characters',
    results: '/results',
  }
}
