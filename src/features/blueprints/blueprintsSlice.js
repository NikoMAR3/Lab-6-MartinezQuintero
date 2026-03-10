import { createAsyncThunk, createSlice, createSelector } from '@reduxjs/toolkit'
import api from '../../services/apiClient.js'

export const fetchAuthors = createAsyncThunk('blueprints/fetchAuthors', async () => {
  const { data } = await api.get('/blueprints')
  const blueprints = data.data 
  // Expecting API returns array of {author, name, points}
  const authors = [...new Set(blueprints.map((bp) => bp.author))]
  return authors
})

export const fetchByAuthor = createAsyncThunk('blueprints/fetchByAuthor', async (author) => {
  const { data } = await api.get(`/blueprints/${encodeURIComponent(author)}`)
  return { author, items: data.data }
})

export const fetchBlueprint = createAsyncThunk(
  'blueprints/fetchBlueprint',
  async ({ author, name }) => {
    const { data } = await api.get(
      `/blueprints/${encodeURIComponent(author)}/${encodeURIComponent(name)}`,
    )
    return data.data
  },
)

export const selectTop5Blueprints = createSelector(
  (state) => state.blueprints.byAuthor.data,
  (byAuthorData) => {
    const allBlueprints = Object.values(byAuthorData).flatMap(items => items)
    return allBlueprints
      .sort((a, b) => b.points.length - a.points.length)
      .slice(0, 5)
  }
)

export const addPoint = createAsyncThunk('blueprints/addPoint', async ({ author, name, x, y }) => {
  await api.put(`/blueprints/${encodeURIComponent(author)}/${encodeURIComponent(name)}/points`, { x, y })
  return { author, name, x, y }
})

export const deleteBlueprint = createAsyncThunk('blueprints/deleteBlueprint', async ({ author, name }) => {
  await api.delete(`/blueprints/${encodeURIComponent(author)}/${encodeURIComponent(name)}`)
  return { author, name }
})
 
export const createBlueprint = createAsyncThunk('blueprints/createBlueprint', async (payload) => {
  const { data } = await api.post('/blueprints', payload)
  return data
})



const slice = createSlice({
  name: 'blueprints',
  initialState: 
  {
  authors: { data: [], status: 'idle', error: null },
  byAuthor: { data: {}, status: 'idle', error: null },
  current: { data: null, status: 'idle', error: null },
  }
  ,
  reducers: {},
 extraReducers: (builder) => {
  builder
    .addCase(fetchAuthors.pending, (s) => {
      s.authors.status = 'loading'
      s.authors.error = null
    })
    .addCase(fetchAuthors.fulfilled, (s, a) => {
      s.authors.status = 'succeeded'
      s.authors.data = a.payload
    })
    .addCase(fetchAuthors.rejected, (s, a) => {
      s.authors.status = 'failed'
      s.authors.error = a.error.message
    })
    .addCase(fetchByAuthor.pending, (s) => {
      s.byAuthor.status = 'loading'
      s.byAuthor.error = null
    })
    .addCase(fetchByAuthor.fulfilled, (s, a) => {
      s.byAuthor.status = 'succeeded'
      s.byAuthor.data[a.payload.author] = a.payload.items
    })
    .addCase(fetchByAuthor.rejected, (s, a) => {
      s.byAuthor.status = 'failed'
      s.byAuthor.error = a.error.message
    })
    .addCase(fetchBlueprint.pending, (s) => {
      s.current.status = 'loading'
      s.current.error = null
    })
    .addCase(fetchBlueprint.fulfilled, (s, a) => {
      s.current.status = 'succeeded'
      s.current.data = a.payload
    })
    .addCase(fetchBlueprint.rejected, (s, a) => {
      s.current.status = 'failed'
      s.current.error = a.error.message
    })
    .addCase(createBlueprint.fulfilled, (s, a) => {
      const bp = a.payload
      if (s.byAuthor.data[bp.author]) s.byAuthor.data[bp.author].push(bp)
    })
    .addCase(deleteBlueprint.fulfilled, (s, a) => {
    const { author, name } = a.payload
    if (s.byAuthor.data[author]) {
      s.byAuthor.data[author] = s.byAuthor.data[author].filter(bp => bp.name !== name)
      }
    })
    .addCase(addPoint.fulfilled, (s, a) => {
    const { author, name, x, y } = a.payload
    if (s.byAuthor.data[author]) {
    const bp = s.byAuthor.data[author].find(b => b.name === name)
    if (bp) bp.points.push({ x, y })
    }
    if (s.current.data?.author === author && s.current.data?.name === name) {
      s.current.data.points.push({ x, y })
    }
    })
    .addCase(addPoint.pending, (s, a) => {
    const { author, name, x, y } = a.meta.arg
    if (s.byAuthor.data[author]) {
      const bp = s.byAuthor.data[author].find(b => b.name === name)
    if (bp) bp.points.push({ x, y })
    }
    if (s.current.data?.author === author && s.current.data?.name === name) {
    s.current.data.points.push({ x, y })
    }
    })
    .addCase(addPoint.rejected, (s, a) => {
    const { author, name, x, y } = a.meta.arg
    if (s.byAuthor.data[author]) {
    const bp = s.byAuthor.data[author].find(b => b.name === name)
    if (bp) bp.points = bp.points.filter(p => !(p.x === x && p.y === y))
    }
    if (s.current.data?.author === author && s.current.data?.name === name) {
    s.current.data.points = s.current.data.points.filter(p => !(p.x === x && p.y === y))
    }
    })
  },
})

export default slice.reducer
