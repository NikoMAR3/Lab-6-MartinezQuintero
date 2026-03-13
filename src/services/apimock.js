const blueprints = [
  { author: 'student', name: 'house', points: [{ x: 0, y: 0 }, { x: 10, y: 0 }] },
  { author: 'student', name: 'garage', points: [{ x: 5, y: 5 }, { x: 15, y: 5 }] },
  { author: 'admin', name: 'garden', points: [{ x: 2, y: 2 }, { x: 3, y: 4 }] },
]

export default {
  getAll: async () => blueprints,
  getByAuthor: async (author) => blueprints.filter(bp => bp.author === author),
  getByAuthorAndName: async (author, name) => blueprints.find(bp => bp.author === author && bp.name === name),
  create: async (bp) => { blueprints.push(bp); return bp },
  addPoint: async (author, name, x, y) => {
    const bp = blueprints.find(b => b.author === author && b.name === name)
    if (bp) bp.points.push({ x, y })
  },
  deleteBlueprint: async (author, name) => {
    const i = blueprints.findIndex(b => b.author === author && b.name === name)
    if (i !== -1) blueprints.splice(i, 1)
  },
}