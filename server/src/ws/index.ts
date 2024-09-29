import type { Context } from 'hono'
import type { WSEvents } from 'hono/ws'

import { TerminalManager } from '../lib/terminal'

const terminal = new TerminalManager()

export const wsHandler = (c: Context): WSEvents | Promise<WSEvents> => ({
    onOpen: async (evt, ctx) => {
        //TODO: check auth
        const host = ctx.url?.host
        console.log('WebSocket connection from:', host)

        const sessionId = host?.split('.')[0]

        if (sessionId) {
            ctx.send(`Welcome ${sessionId}`)
        }
    },
    onMessage: (msg, ctx) => {
        console.log('Received message:', msg.data)
        ctx.send('Hello from server')
        ctx.send(`Received message: ${msg.data}`)
    },
    onClose: (evt, ctx) => {
        console.log('WebSocket connection closed')
    },
    onError: (evt, ctx) => {
        console.error('WebSocket error:', evt)
    }
})
