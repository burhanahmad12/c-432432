// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://wefcbzspqrnqvkspynyb.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndlZmNienNwcXJucXZrc3B5bnliIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk3OTYyMzYsImV4cCI6MjA1NTM3MjIzNn0.2gpPp3ougom1VwkTFZLYo2xJgSw2J8PdD980z-tuAaA";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);