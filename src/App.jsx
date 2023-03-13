import { useState } from 'react'

import './App.css'

function App() {
  const [name, setName] = useState('')
  const [recipient, setRecipient] = useState('')
  const [network, setNetwork] = useState('')
  const [loading, setLoading] = useState(false)
  console.log('🚀 ~ App ~ network:', network)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    await fetch('https://minting-rafts-api.herokuapp.com/create-raft', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        recipient,
        network,
      }),
    })
    setLoading(false)
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <label>Choose a network</label>
        <select onChange={(e) => setNetwork(e.target.value)}>
          <option value="goerli">Goerli</option>
          <option value="optimism">Optimism</option>
          <option value="optimism-goerli">Optimism-Goerli</option>
        </select>
        <label>Give the Raft a name</label>
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        <label>Add recipeint's address</label>
        <input
          type="text"
          onChange={(e) => setRecipient(e.target.value)}
          placeholder="Recipient"
        />
        <button type="submit">Create Raft</button>
      </form>
      {loading && <p>Loading...</p>}
    </div>
  )
}

export default App
