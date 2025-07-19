// routes/auth.js
const express = require('express')
const supabase = require('../supabaseClient') // <- CommonJS import

const router = express.Router()

// Register route
router.post('/register', async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' })
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })

  if (error) {
    return res.status(400).json({ error: error.message })
  }

  res.status(200).json({ message: 'User registered successfully', user: data.user })
})

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' })
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return res.status(400).json({ error: error.message })
  }

  res.status(200).json({
    message: 'Login successful',
    user: data.user,
    access_token: data.session?.access_token,
  })
})

module.exports = router // <- CommonJS export
