import mock from './apimock.js'
import api from './apiClient.js'

const client = {
  getAll: async () => (await api.get('/blueprints')).data.data,
  getByAuthor: async (author) => (await api.get(`/blueprints/${encodeURIComponent(author)}`)).data.data,
  getByAuthorAndName: async (author, name) => (await api.get(`/blueprints/${encodeURIComponent(author)}/${encodeURIComponent(name)}`)).data.data,
  create: async (bp) => (await api.post('/blueprints', bp)).data.data,
  addPoint: async (author, name, x, y) => (await api.put(`/blueprints/${encodeURIComponent(author)}/${encodeURIComponent(name)}/points`, { x, y })).data,
  deleteBlueprint: async (author, name) => api.delete(`/blueprints/${encodeURIComponent(author)}/${encodeURIComponent(name)}`),
}

export default import.meta.env.VITE_USE_MOCK === 'true' ? mock : client