import { Auth } from '@supabase/auth-ui-react'
import {
  // Import predefined theme
  ThemeSupa,
} from '@supabase/auth-ui-shared'

// const supabase = createClient(
//   '<INSERT PROJECT URL>',
//   '<INSERT PROJECT ANON API KEY>'
// )

const supabase = createClient(
  'https://tdpvfocnhwbinnfcjxrr.supabase.co/',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRkcHZmb2NuaHdiaW5uZmNqeHJyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI1ODA5NjcsImV4cCI6MjAyODE1Njk2N30.YXLICxBQjXkJwnVdAULNG93_5KQnkH6HtIV6kv6J-SI'
)


export function Login(){
  <Auth
    supabaseClient={supabase}
    appearance={{ theme: ThemeSupa }}
  />
}