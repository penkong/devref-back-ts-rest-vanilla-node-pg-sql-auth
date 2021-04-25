import { pool } from './pool.db'
import { dbConfig } from './config'

pool
  .connect(dbConfig)
  .then(() => {
    console.log('conntect to db')
  })
  .catch(err => {
    console.log(err.message)
  })
