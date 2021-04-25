import { PoolConfig } from 'pg'
import { config } from './'

export const dbConfig: PoolConfig = {
  host: config.DBURL,
  port: 5432,
  database: config.DBNAME,
  user: config.PGUSER,
  password: config.PGPASS
}
