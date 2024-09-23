import type { Context } from 'hono'
import type { WSEvents } from 'hono/ws'

export const wsHandler = (c: Context): WSEvents | Promise<WSEvents> => ({
    onOpen: (evt, ctx) => {
        const host = ctx.url?.host
        console.log('WebSocket connection opened')
    },
    onMessage: (msg, ctx) => {
        console.log('Received message:', msg)
    },
    onClose: (evt, ctx) => {
        console.log('WebSocket connection closed')
    },
    onError: (evt, ctx) => {
        console.error('WebSocket error:', evt)
    }
})
