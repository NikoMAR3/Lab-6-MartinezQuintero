import { useSelector } from 'react-redux'
import BlueprintCanvas from "../components/BlueprintCanvas.jsx";

export default function CanvasPage() {
  const { current } = useSelector((s) => s.blueprints)

  return (
    <div className="canvas-card">
      <BlueprintCanvas points={current.data?.points || []} width={800} height={500} />
    </div>
  )
}