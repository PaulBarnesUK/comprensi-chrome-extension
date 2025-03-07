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

/**
 * Mapping of language codes to their respective flag icons.
 * The extension supports the following languages:
 * - French (fr)
 * - Spanish (es)
 * - Italian (it)
 * - German (de)
 * - Portuguese (pt) - using Brazilian flag
 * - English (en) - using US flag
 * - Hindi (hi) - using Indian flag
 * - Korean (ko)
 * - Japanese (ja)
 * - Chinese (zh) - using Chinese flag
 */
const LANGUAGE_FLAGS: Record<string, string> = {
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

export default LANGUAGE_FLAGS; 