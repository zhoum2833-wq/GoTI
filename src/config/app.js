export const appConfig = {
  title: import.meta.env.VITE_APP_TITLE || 'GoTI 人格测试',
  description: import.meta.env.VITE_APP_DESCRIPTION || 'MyGO 角色匹配度测试',
  version: '1.0.0',
  
  storage: {
    progressKey: 'goti-progress',
    resultsKey: 'goti-results',
  }
}
