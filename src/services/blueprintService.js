import mock from './apimock.js'
import client from './apiClient.js'

export default import.meta.env.VITE_USE_MOCK === 'true' ? mock : client