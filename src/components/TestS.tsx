"use client"
import React, { useState } from 'react'

const TestS = () => {
  const [pocitat, setPocitat] = useState<number>(0)

  return (
    <button onClick={() => setPocitat(prev => prev + 1)}>
      Click me! {pocitat}
    </button>
  )
}

export default TestS
