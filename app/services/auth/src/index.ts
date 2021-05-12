import { app } from './app'
import { pool } from './service'
import { config, dbConfig } from './config'
import fs from 'fs'
import path from 'path'

async function main() {
  try {
    await pool.connect(dbConfig)
    await pool.query(
      fs.readFileSync(path.join(__dirname, './data/sql/init.sql')).toString(),
      []
    )

    console.log('conntect to db')

    if (config.PORT)
      app.listen(parseInt(config.PORT), () =>
        console.log(`Server running on port ${config.PORT}`)
      )

    pool.on('error', async () => await pool.end())
  } catch (err) {
    console.log(err.message)
  }
}

main()
process.on('warning', e => console.warn(e.stack))
