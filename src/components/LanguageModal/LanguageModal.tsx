import React, { useState } from 'react';
import styles from './LanguageModal.module.scss';
import { SUPPORTED_LANGUAGES, LANGUAGE_FLAGS } from '../../utils/languages';

interface LanguageModalProps {
  isOpen: boolean;
  currentLanguage?: string;
  onClose: () => void;
  onSave: (language: string) => void;
}

export const LanguageModal: React.FC<LanguageModalProps> = ({
  isOpen,
  currentLanguage,
  onClose,
  onSave
}) => {
  const [selected, setSelected] = useState(currentLanguage || '');

  if (!isOpen) return null;

  const handleSave = () => {
    if (selected) onSave(selected);
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <h2 className={styles.title}>Set Video Language</h2>
        <p className={styles.description}>
          Selecting the correct language ensures your watch time is tracked accurately.
        </p>
        <div className={styles.languageList}>
          {SUPPORTED_LANGUAGES.map(lang => (
            <button
              key={lang.code}
              className={selected === lang.code ? styles.languageSelected : styles.languageOption}
              onClick={() => setSelected(lang.code)}
              type="button"
            >
              <img
                src={LANGUAGE_FLAGS[lang.code]}
                alt={`${lang.name} flag`}
                className={styles.flag}
              />
              <span>{lang.name}</span>
            </button>
          ))}
        </div>
        <div className={styles.actions}>
          <button className={styles.cancelButton} onClick={onClose} type="button">
            Cancel
          </button>
          <button
            className={styles.saveButton}
            onClick={handleSave}
            type="button"
            disabled={!selected}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default LanguageModal;
