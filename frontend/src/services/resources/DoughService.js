import { HttpClient } from '../base/HttpClient.js'
import httpProvider from '../providers/index.js'

const BASE_URL = '/api'

class DoughService extends HttpClient {
  async getAll() {
    return this.get('/dough')
  }

  async getById(id) {
    return this.get(`/dough/${id}`)
  }
}

export default new DoughService({
  httpProvider,
  baseURL: BASE_URL,
})
