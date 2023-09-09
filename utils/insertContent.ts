// utils/insertContent.ts
import { supabase } from "../lib/supabase.ts";

export async function insertContent(data) {
  const { title, keywords, user_input, full_gpt_response } = data;

  try {
    const { error } = await supabase
      .from('content')
      .insert([{
        title: title,
        keywords: keywords,
        user_input: user_input,
        full_gpt_response: full_gpt_response
      }]);

    if (error) {
      throw error;
    }
  } catch (error) {
    console.error("Supabase Insertion Error:", error);
    throw error;
  }
}