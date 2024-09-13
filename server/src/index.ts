import { serve } from '@hono/node-server'
import { createNodeWebSocket } from '@hono/node-ws'
import { Hono } from 'hono'
import { logger } from 'hono/logger'

import { filesRoute } from './routes/files'
import { wsHandler } from './ws'

const app = new Hono()

app.use(logger())

const { upgradeWebSocket, injectWebSocket } = createNodeWebSocket({ app })

const apiServer = app.basePath('/api').route('/files', filesRoute)

const wsServer = app.get('/ws', upgradeWebSocket(wsHandler))

const port = 3000
console.log(`Server is running on port ${port}`)

const server = serve({
    fetch: app.fetch,
    port
})

injectWebSocket(server)

export type WebSocketServer = typeof wsServer
export type ApiServer = typeof apiServer

export default server
