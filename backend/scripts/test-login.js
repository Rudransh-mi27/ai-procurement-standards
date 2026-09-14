require("dotenv").config();

const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
 process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

async function login() {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: "rudranshmishra153@gmail.com",
    password: "pass1234"
  });

  if (error) {
    console.error("Login failed:", error.message);
    return;
  }

  console.log("User ID:", data.user.id);
  console.log("Access Token:");
  console.log(data.session.access_token);
}

login();