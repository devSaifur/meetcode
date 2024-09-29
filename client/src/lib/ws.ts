import type { WebSocketServer } from '@server/index'
import { hc } from 'hono/client'

export const wsClient = hc<WebSocketServer>(import.meta.env.VITE_WS_SERVER_URL)
