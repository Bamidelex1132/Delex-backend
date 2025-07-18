require('dotenv').config()
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const app = express()

// Middleware
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser())

// Serve static frontend (if needed)
app.use(express.static(path.join(__dirname, '../public')))

// Routes
const authRoutes = require('./routes/auth')
app.use('/auth', authRoutes) // Use '/auth' as base route

// Start server
const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

// Optional: Test Supabase query
const supabase = require('./supabaseClient')
;(async () => {
  const { data, error } = await supabase.from('users').select('*')
  if (error) {
    console.error('Supabase Error:', error)
  } else {
    console.log('Users:', data)
  }
})()
