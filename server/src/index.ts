import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { filesRoute } from '../routes/files'

const app = new Hono().basePath('/api').route('/files', filesRoute)

app.get('/', (c) => {
    return c.text('Hello World!')
})

app.use(
    cors({
        origin: '*'
    })
)

const port = 3000
console.log(`Server is running on port ${port}`)

serve({
    fetch: app.fetch,
    port
})
