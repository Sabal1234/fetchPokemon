import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import { Pokemon } from './component/Pokemon.jsx'

function App() {
    const client = new QueryClient();
  return (
    <div>
      < QueryClientProvider client={client}>
      <Pokemon />
      </QueryClientProvider>
</div>
  )
}

export default App
