import type { WebSocketServer } from '@server/index'
import { hc } from 'hono/client'

const client = hc<WebSocketServer>('/')

export const ws = client.ws.$ws()
