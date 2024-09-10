import type { Context } from 'hono'
import type { WSEvents } from 'hono/ws'

export const wsHandler = (c: Context): WSEvents | Promise<WSEvents> => ({
    onOpen: () => {
        console.log('WebSocket connection opened')
    },
    onMessage: (message) => {
        console.log('Received message:', message)
    },
    onClose: () => {
        console.log('WebSocket connection closed')
    },
    onError: (error) => {
        console.error('WebSocket error:', error)
    }
})
