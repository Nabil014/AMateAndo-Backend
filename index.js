const server = require('./app')
const dotenv = require('dotenv')
dotenv.config()

// Settings
const PORT = process.env.PORT || 3000

// Server is listening
server.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})
