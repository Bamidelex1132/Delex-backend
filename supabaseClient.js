const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabasekey = process.env.SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabasekey);

module.exports = supabase;