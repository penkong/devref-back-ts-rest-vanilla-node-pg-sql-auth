import { IncomingMessage } from 'http'
/*
 ** Description :
 */

// ---

declare namespace NodeJS {
  export interface ProcessEnv {
    PORT: string
    DBURL: string
    DBNAME: string
    NODE_ENV: string
    PGPASS: string
    PGUSER: string
    CORS: string // http://localhost:3000
    DOMAIN: string
    JWT_KEY: string // -fdsfdsf
    JWT_TTL: string // 365d
  }
}
