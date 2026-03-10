import { useEffect, useRef, useState } from 'react'

export default function DrawableCanvas({ width = 520, height = 360, onPointAdded }) {
  const ref = useRef(null)
  const [points, setPoints] = useState([])

  const scale = 1.486
  const handleClick = (e) => {
  const rect = ref.current.getBoundingClientRect()
  const x = Math.round((e.clientX - rect.left) / scale)
  const y = Math.round((e.clientY - rect.top) / scale)
  const newPoints = [...points, { x, y }]
  setPoints(newPoints)
  onPointAdded(newPoints)
}

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = '#0b1220'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.strokeStyle = 'rgba(148,163,184,0.15)'
    ctx.lineWidth = 1
    for (let x = 0; x < canvas.width; x += 40) {
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, canvas.height)
      ctx.stroke()
    }
    for (let y = 0; y < canvas.height; y += 40) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(canvas.width, y)
      ctx.stroke()
    }
    if (points.length > 1) {
  ctx.strokeStyle = '#93c5fd'
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.moveTo(points[0].x * scale, points[0].y * scale)  // ← * scale
  for (let i = 1; i < points.length; i++) {
    const p = points[i]
    ctx.lineTo(p.x * scale, p.y * scale)  // ← * scale
  }
  ctx.stroke()
}
ctx.fillStyle = '#fbbf24'
for (const p of points) {
  ctx.beginPath()
  ctx.arc(p.x * scale, p.y * scale, 4, 0, Math.PI * 2)  // ← * scale
  ctx.fill()
}
  }, [points])

  return (
    <div>
    <canvas
      ref={ref}
      width={width}
      height={height}
      onClick={handleClick}
      style={{ cursor: 'crosshair' }}
    />
    </div>
  )
}

