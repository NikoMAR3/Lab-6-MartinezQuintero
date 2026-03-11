import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import BlueprintCanvas from '../src/components/BlueprintCanvas.jsx'

describe('BlueprintCanvas', () => {
  it('renderiza un canvas', () => {
  const { container } = render(<BlueprintCanvas points={[{ x: 10, y: 10 }, { x: 50, y: 60 }]} />)
  expect(container.querySelector('canvas')).toBeInTheDocument()
  })
})
