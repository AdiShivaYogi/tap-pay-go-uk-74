
import { supabase } from "@/integrations/supabase/client";

export type SupportedLanguage = {
  code: string;
  name: string;
};

export const SUPPORTED_LANGUAGES: SupportedLanguage[] = [
  { code: "RO", name: "Română" },
  { code: "EN", name: "Engleză" },
  { code: "FR", name: "Franceză" },
  { code: "DE", name: "Germană" },
  { code: "ES", name: "Spaniolă" },
  { code: "IT", name: "Italiană" },
  { code: "PT", name: "Portugheză" },
  { code: "NL", name: "Olandeză" },
  { code: "PL", name: "Poloneză" },
  { code: "RU", name: "Rusă" }
];

export const DEFAULT_LANGUAGE = "RO";

export async function getLanguageFromIP(): Promise<string> {
  try {
    const { data: { ip_language } } = await supabase.functions.invoke('detect-language-from-ip');
    
    // Check if the detected language is supported
    const isSupported = SUPPORTED_LANGUAGES.some(lang => lang.code === ip_language);
    return isSupported ? ip_language : DEFAULT_LANGUAGE;
  } catch (error) {
    console.error('Error detecting language:', error);
    return DEFAULT_LANGUAGE;
  }
}
