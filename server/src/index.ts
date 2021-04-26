import { app } from './app'
import { pool } from './service'
import { config, dbConfig } from './config'

async function main() {
  try {
    await pool.connect(dbConfig)

    pool.query('select 1 + 1', [])

    console.log('conntect to db')

    if (config.PORT)
      app.listen(parseInt(config.PORT), () =>
        console.log(`Server running on port ${config.PORT}`)
      )
  } catch (err) {
    console.log(err.message)
  }
}

main()
