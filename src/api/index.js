import config from '../config'

const createApiClient = () => {
  const baseUrl = config.api.baseUrl
  const timeout = config.api.timeout

  const request = async (endpoint, options = {}) => {
    const url = `${baseUrl}${endpoint}`
    
    const defaultOptions = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const mergedOptions = {
      ...defaultOptions,
      ...options,
      headers: {
        ...defaultOptions.headers,
        ...options.headers,
      },
    }

    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), timeout)

      const response = await fetch(url, {
        ...mergedOptions,
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      if (error.name === 'AbortError') {
        throw new Error('Request timeout')
      }
      throw error
    }
  }

  return {
    get: (endpoint, options = {}) => 
      request(endpoint, { ...options, method: 'GET' }),
    
    post: (endpoint, data, options = {}) => 
      request(endpoint, {
        ...options,
        method: 'POST',
        body: JSON.stringify(data),
      }),
    
    put: (endpoint, data, options = {}) => 
      request(endpoint, {
        ...options,
        method: 'PUT',
        body: JSON.stringify(data),
      }),
    
    delete: (endpoint, options = {}) => 
      request(endpoint, { ...options, method: 'DELETE' }),
  }
}

export default createApiClient()
