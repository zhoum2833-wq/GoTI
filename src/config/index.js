import { apiConfig } from './api'
import { appConfig } from './app'

export const config = {
  dataSource: import.meta.env.VITE_DATA_SOURCE || 'local',
  
  api: apiConfig,
  app: appConfig,
  
  features: {
    resultSharing: import.meta.env.VITE_ENABLE_RESULT_SHARING !== 'false',
    progressSave: import.meta.env.VITE_ENABLE_PROGRESS_SAVE !== 'false',
    analytics: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
  },
  
  isLocal: () => config.dataSource === 'local',
  isRemote: () => config.dataSource === 'remote',
}

export default config
