import type { ApiServer } from '@server/index'
import { hc } from 'hono/client'

const client = hc<ApiServer>('/')

export const api = client.api
