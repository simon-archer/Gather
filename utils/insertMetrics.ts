// utils/insertMetrics.ts
import { supabase } from "../lib/supabase.ts";

export async function insertMetrics(data) {
    const { ip: ip, new: buttonPressCount } = data;
  
    try {
      const { error } = await supabase
        .from('metrics')
        .insert([{
          new: buttonPressCount,
          ip: ip
        }]);
  
      if (error) {
        throw error;
      }
    } catch (error) {
      console.error("Supabase Insertion Error:", error);
      throw error;
    }
  }