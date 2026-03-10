import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchAuthors,
  fetchByAuthor,
  fetchBlueprint,
  deleteBlueprint,
  addPoint,
  selectTop5Blueprints,
} from '../features/blueprints/blueprintsSlice.js'
import BlueprintCanvas from '../components/BlueprintCanvas.jsx'

export default function BlueprintsPage() {
  const dispatch = useDispatch()
  const { byAuthor, current } = useSelector((s) => s.blueprints)
  const [authorInput, setAuthorInput] = useState('')
  const [selectedAuthor, setSelectedAuthor] = useState('')
  const items = (selectedAuthor && byAuthor.data[selectedAuthor]) || []
  const top5 = useSelector(selectTop5Blueprints)
  const [pointInput, setPointInput] = useState({ x: '', y: '' })

  useEffect(() => {
    dispatch(fetchAuthors())
  }, [dispatch])

  const totalPoints = useMemo(
    () => items.reduce((acc, bp) => acc + (bp.points?.length || 0), 0),
    [items],
  )

  const getBlueprints = () => {
    if (!authorInput) return
    setSelectedAuthor(authorInput)
    dispatch(fetchByAuthor(authorInput))
  }

  const openBlueprint = (bp) => {
    dispatch(fetchBlueprint({ author: bp.author, name: bp.name }))
  }

  return (
    <div className="grid" style={{ gridTemplateColumns: '1.1fr 1.4fr', gap: 24 }}>
      <section className="grid" style={{ gap: 16 }}>
        <div className="card">
          <h2 style={{ marginTop: 0 }}>Blueprints</h2>
          <div style={{ display: 'flex', gap: 12 }}>
            <input
              className="input"
              placeholder="Author"
              value={authorInput}
              onChange={(e) => setAuthorInput(e.target.value)}
            />
            <button className="btn primary" onClick={getBlueprints}>
              Get blueprints
            </button>
          </div>
        </div>
        <div className="card "> 
        <thead>
            <tr>
              <th
                style={{
                  textAlign: 'left',
                  padding: '10px',
                }}
              >
                Top 5 blueprints of all users queried
              </th>
            </tr>
          </thead>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 8 }}>
            {top5.map((bp) => (
            <div key={bp.name} style={{        
              borderRadius: 6, 
              padding: '6px 12px',
              fontSize: 13
          }}>
          <strong>{bp.name}</strong>  { bp.points?.length || 0} pts
          </div>
          ))}
          </div>
        </div>
        <div className="card">
          
          <h3 style={{ marginTop: 0 }}>
            {selectedAuthor ? `${selectedAuthor}'s blueprints:` : 'Results'}
          </h3>
          {byAuthor.status === 'loading' && <p>Cargando...</p>}
          {byAuthor.error && <p style={{ color: '#f87171' }}>{byAuthor.error}</p>}
          {!items.length && byAuthor.status !== 'loading' && !byAuthor.error && <p>Sin resultados.</p>}
          {!!items.length && (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th
                      style={{
                        textAlign: 'left',
                        padding: '8px',
                        borderBottom: '1px solid #334155',
                      }}
                    >
                      Blueprint name
                    </th>
                    <th
                      style={{
                        textAlign: 'right',
                        padding: '8px',
                        borderBottom: '1px solid #334155',
                      }}
                    >
                      Number of points
                    </th>
                    <th style={{ padding: '8px', borderBottom: '1px solid #334155' }}></th>
                    
                  </tr>
                  
                </thead>
                <tbody>
                  {items.map((bp) => (
                    <tr key={bp.name}>
                      <td style={{ padding: '8px', borderBottom: '1px solid #1f2937' }}>
                        {bp.name}
                      </td>
                      <td
                        style={{
                          padding: '8px',
                          textAlign: 'right',
                          borderBottom: '1px solid #1f2937',
                        }}
                      >
                        {bp.points?.length || 0}
                      </td>
                      <td
  style={{
    padding: '8px',
    borderBottom: '1px solid #1f2937',
    display: 'flex',
    gap: '8px'
  }}
>
  <button className="btn" onClick={() => openBlueprint(bp)}>
    Open
  </button>

  <button
    className="btn"
    style={{ background: '#dc2626' }}
    onClick={() =>
      dispatch(deleteBlueprint({ author: bp.author, name: bp.name }))
    }
  >
    Delete
  </button>
</td>
                      
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          
          <p style={{ marginTop: 12, fontWeight: 700 }}>Total user points: {totalPoints}</p>
        </div>
      </section>

      <section className="card">
  <h3 style={{ marginTop: 0 }}>Current blueprint: {current.data?.name || '...'}</h3>
  <BlueprintCanvas points={current.data?.points || []} />
  
  {current.data && (
    <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
      <input
        type="number"
        placeholder="x"
        className="input"
        style={{ width: 70 }}
        value={pointInput.x}
        onChange={(e) => setPointInput(p => ({ ...p, x: e.target.value }))}
      />
      <input
        type="number"
        placeholder="y"
        className="input"
        style={{ width: 70 }}
        value={pointInput.y}
        onChange={(e) => setPointInput(p => ({ ...p, y: e.target.value }))}
      />
      <button className="btn primary"
        onClick={() => dispatch(addPoint({ 
          author: current.data.author, 
          name: current.data.name, 
          x: Number(pointInput.x), 
          y: Number(pointInput.y) 
        }))}>
        Add Point
      </button>
    </div>
  )}
</section>
    </div>
  )
}
