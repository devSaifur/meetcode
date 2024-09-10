import fs from 'node:fs/promises'
import { Hono } from 'hono'

export const filesRoute = new Hono().get('/', async (c) => {
    try {
        const data = await fs.readdir('./files', { withFileTypes: true })
        const files = data.map((file) => {
            return {
                name: file.name,
                type: file.isDirectory() ? 'dir' : 'file'
            }
        })

        return c.json(files, { status: 200 })
    } catch (err) {
        console.error(err)
        return c.json({ error: 'Something went wrong' }, { status: 500 })
    }
})
