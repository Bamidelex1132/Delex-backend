require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl) {
  console.error('Error: SUPABASE_URL is not set in environment variables.');
}
if (!supabaseKey) {
  console.error('Error: SUPABASE_ANON_KEY is not set in environment variables.');
}

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
