import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  dialect: 'sqlite',
  driver: 'turso',
  schema: './src/server/db/schema.ts',
  dbCredentials: {
    url: 'file:./local.db'
  }
})
