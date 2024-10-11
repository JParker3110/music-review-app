// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

console.log('Supabase URL:', process.env.SUPABASE_URL); // Debugging line
console.log('Supabase Key:', process.env.SUPABASE_KEY); // Debugging line

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;