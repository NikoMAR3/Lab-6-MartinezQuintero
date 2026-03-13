const blueprints = [
  { author: 'student', name: 'house', points: [{ x: 0, y: 0 }, { x: 10, y: 0 }, { x: 10, y: 10 }, { x: 0, y: 10 }] },
  { author: 'student', name: 'garage', points: [{ x: 5, y: 5 }, { x: 15, y: 5 }, { x: 15, y: 15 }] },
  { author: 'admin', name: 'garden', points: [{ x: 2, y: 2 }, { x: 3, y: 4 }, { x: 6, y: 7 }] },
]

export default {
  getAll: async () => blueprints,
  getByAuthor: async (author) => blueprints.filter(bp => bp.author === author),
  getByAuthorAndName: async (author, name) => blueprints.find(bp => bp.author === author && bp.name === name),
  create: async (bp) => { blueprints.push(bp); return bp },
}