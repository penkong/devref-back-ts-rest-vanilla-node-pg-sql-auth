import pg, { PoolConfig, QueryArrayConfig } from 'pg'

class Pool {
  _pool: pg.Pool | null = null
  constructor() {}

  connect(options: PoolConfig) {
    this._pool = new pg.Pool(options)
    return this._pool.query('select 1+1;')
  }

  close() {
    return this._pool!.end()
  }

  query(sql: string | QueryArrayConfig<any[]>, params: any[]) {
    return this._pool!.query(sql, params)
  }
}

export const pool = new Pool()
