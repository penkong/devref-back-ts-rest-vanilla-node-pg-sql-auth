export * from './mimeTypes.const'
export * from './validRoutes.const'
export * from './validMethods.const'
export * from './getBody.util'

// const dataSql = fs.readFileSync('./data/sql/init.sql')

// console.log(dataSql)
// let sl = path.join(__dirname, './data/sql/init.sql')
// console.log(sl)

// var rl = readline.createInterface({
//   input: fs.createReadStream(path.join(__dirname, './data/sql/init.sql')),
//   terminal: true
// })

// rl.on('line', function (chunk) {
//   // console.log(chunk.toString())
//   pool.query(chunk.toString(), [])
// })

// rl.on('close', function () {
//   console.log('finished')
// })
