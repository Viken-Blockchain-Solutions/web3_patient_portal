// utils/db/supabaseClient.ts
import { supabaseKey, supabaseUrl } from "../envVariables";
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(supabaseUrl, supabaseKey);