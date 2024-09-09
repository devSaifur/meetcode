import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { App } from './app'

import './styles/index.css'

import { Providers } from '@/components/providers'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Providers>
      <App />
    </Providers>
  </StrictMode>
)
