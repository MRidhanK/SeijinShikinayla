const SUPABASE_URL = "https://iwgmuiudxvndkkyzohbs.supabase.co";

const SUPABASE_KEY = "sb_publishable_-hhT7A-E66-jYyEmohCfgA_p08NIfnT";

const supabaseClient =
supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

console.log("Supabase Connected");
console.log(SUPABASE_URL);
