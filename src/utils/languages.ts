import frFlag from '@/assets/flags/fr.svg';
import esFlag from '@/assets/flags/es.svg';
import itFlag from '@/assets/flags/it.svg';
import deFlag from '@/assets/flags/de.svg';
import brFlag from '@/assets/flags/br.svg';
import usFlag from '@/assets/flags/us.svg';
import inFlag from '@/assets/flags/in.svg';
import krFlag from '@/assets/flags/kr.svg';
import jpFlag from '@/assets/flags/jp.svg';
import cnFlag from '@/assets/flags/cn.svg';

export interface Language {
  code: string;
  name: string;
  flag: string;
}

export const SUPPORTED_LANGUAGES: Language[] = [
  { code: 'es', name: 'Spanish', flag: esFlag },
  { code: 'fr', name: 'French', flag: frFlag },
  { code: 'de', name: 'German', flag: deFlag },
  { code: 'it', name: 'Italian', flag: itFlag },
  { code: 'pt', name: 'Portuguese', flag: brFlag },
  { code: 'en', name: 'English', flag: usFlag },
  { code: 'hi', name: 'Hindi', flag: inFlag },
  { code: 'ko', name: 'Korean', flag: krFlag },
  { code: 'ja', name: 'Japanese', flag: jpFlag },
  { code: 'zh', name: 'Chinese', flag: cnFlag },
];

export const DEFAULT_LANGUAGE = 'es';

export const LANGUAGE_FLAGS: Record<string, string> = {
  fr: frFlag,
  es: esFlag,
  it: itFlag,
  de: deFlag,
  pt: brFlag,
  en: usFlag,
  hi: inFlag,
  ko: krFlag,
  ja: jpFlag,
  zh: cnFlag,
};

export function getLanguageByCode(code: string): Language | undefined {
  return SUPPORTED_LANGUAGES.find(lang => lang.code === code);
} 