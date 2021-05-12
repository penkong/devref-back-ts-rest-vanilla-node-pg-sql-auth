import pg, { PoolConfig, QueryArrayConfig } from 'pg'

class Pool {
  _pool: pg.Pool
  constructor() {}

  connect(options: PoolConfig) {
    this._pool = new pg.Pool(options)
    return this._pool.query('select 1+1;')
  }

  close() {
    return this._pool.end()
  }

  query(sql: string | QueryArrayConfig<any[]>, params: any[]) {
    return this._pool.query(sql, params)
  }

  on(event: 'error', cb: Function) {
    return this._pool.on(event, () => {
      cb()
    })
  }

  end() {
    return this._pool.end()
  }
}

export const pool = new Pool()
