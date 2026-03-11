import { describe, it, expect } from 'vitest'
import reducer, { fetchByAuthor, fetchBlueprint } from '../src/features/blueprints/blueprintsSlice.js'

describe('blueprints slice', () => {
  it('should initialize correctly', () => {
    const state = reducer(undefined, { type: '@@INIT' })
    expect(state.authors.data).toEqual([])
  })

  it('fetchByAuthor.fulfilled actualiza byAuthor.data', () => {
    const items = [{ name: 'house', author: 'student', points: [] }]
    const action = { type: fetchByAuthor.fulfilled.type, payload: { author: 'student', items } }
    const state = reducer(undefined, action)
    expect(state.byAuthor.data['student']).toEqual(items)
    expect(state.byAuthor.status).toBe('succeeded')
  })

  it('fetchByAuthor.pending pone status loading', () => {
    const action = { type: fetchByAuthor.pending.type }
    const state = reducer(undefined, action)
    expect(state.byAuthor.status).toBe('loading')
  })

  it('fetchBlueprint.fulfilled actualiza current.data', () => {
    const bp = { name: 'house', author: 'student', points: [] }
    const action = { type: fetchBlueprint.fulfilled.type, payload: bp }
    const state = reducer(undefined, action)
    expect(state.current.data).toEqual(bp)
  })
})