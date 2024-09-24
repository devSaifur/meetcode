import type { Context } from 'hono'
import type { WSEvents } from 'hono/ws'

import { TerminalManager } from '../lib/terminal'
import { fetchDirectory } from '../utils/fs'

const terminal = new TerminalManager()

export const wsHandler = (c: Context): WSEvents | Promise<WSEvents> => ({
    onOpen: async (evt, ctx) => {
        //TODO: check auth
        const host = ctx.url?.host
        console.log('WebSocket connection from:', host)

        const sessionId = host?.split('.')[0]

        if (sessionId) {
            ctx.close()
            terminal.clear(host)
            return
        }

        try {
            const files = await fetchDirectory('/workspace', '')
            ctx.send(JSON.stringify(files))
        } catch (err) {
            console.error(err)
            ctx.close()
        }
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
