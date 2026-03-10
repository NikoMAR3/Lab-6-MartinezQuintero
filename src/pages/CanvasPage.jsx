import { useSelector, useDispatch } from 'react-redux'
import { createBlueprint } from '../features/blueprints/blueprintsSlice.js'
import DrawableCanvas from '../components/DrawableCanvas.jsx'
import { useState } from 'react'

export default function CanvasPage() {
  const dispatch = useDispatch()
  const { current } = useSelector((s) => s.blueprints)
  const [bpName, setBpName] = useState('')
  const username = localStorage.getItem('username')
  const [drawnPoints, setDrawnPoints] = useState([])

  const handleSave = () => {
  if (!bpName) return alert('Ingresa un nombre')
  dispatch(createBlueprint({ author: username, name: bpName, points: drawnPoints }))
  setBpName('')
  setDrawnPoints([])
}

  return (
  <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
    
    {/* Canvas */}
    <div>
      <DrawableCanvas width={800} height={500} onPointAdded={setDrawnPoints} />
    </div>

    {/* Card */}
    <div className="card" style={{ minWidth: 250 }}>
      <h2 style={{ marginTop: 0 }}>Crear Blueprint</h2>

      <input
        className="input"
        placeholder="Nombre del blueprint"
        value={bpName}
        onChange={(e) => setBpName(e.target.value)}
        style={{ marginBottom: 12 }}
      />

      <button className="btn" onClick={handleSave}>
        Guardar
      </button>
    </div>

  </div>
  );
}