// frontend/db/supabaseClient.ts
import { supabaseKey, supabaseUrl } from "../utils/envVariables";
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(supabaseUrl, supabaseKey);

{ data, error } = await supabase.from("new_contributions").select("*");