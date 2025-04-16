import React from 'react'
import { SilentSheet } from '@silentsheet/react'

function App() {
  return (
    <div className="app">
      <h1>SilentSheet Development</h1>
      <div className="test-area">
        <SilentSheet onChange={() => {}} />
      </div>
    </div>
  )
}

export default App