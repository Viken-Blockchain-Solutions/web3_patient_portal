// utils/db/supabaseClient.ts
import { supabaseKey, supabaseUrl } from "../src/utils/envVariables";
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(supabaseUrl, supabaseKey);