import React, { useState, useEffect } from 'react';
import styles from './LanguageSettings.module.scss';
import LanguageToggle from '../LanguageToggle';
import { SUPPORTED_LANGUAGES } from '../../utils/languages';
import { 
  getSelectedLanguages, 
  saveSelectedLanguages, 
  selectAllLanguages, 
  deselectAllLanguages 
} from '../../utils/messaging';

const LanguageSettings: React.FC = () => {
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadSelectedLanguages();
  }, []);

  const loadSelectedLanguages = async () => {
    try {
      const languages = await getSelectedLanguages();
      setSelectedLanguages(languages);
    } catch (error) {
      console.error('Error loading language settings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggle = async (code: string, isSelected: boolean) => {
    try {
      const updatedLanguages = isSelected
        ? [...selectedLanguages, code]
        : selectedLanguages.filter(lang => lang !== code);
      
      setSelectedLanguages(updatedLanguages);
      await saveSelectedLanguages(updatedLanguages);
    } catch (error) {
      console.error('Error toggling language:', error);
    }
  };

  const handleSelectAll = async () => {
    try {
      const allLanguages = await selectAllLanguages();
      setSelectedLanguages(allLanguages);
    } catch (error) {
      console.error('Error selecting all languages:', error);
    }
  };

  const handleDeselectAll = async () => {
    try {
      const emptyLanguages = await deselectAllLanguages();
      setSelectedLanguages(emptyLanguages);
    } catch (error) {
      console.error('Error deselecting all languages:', error);
    }
  };

  if (isLoading) {
    return <div>Loading language settings...</div>;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Language Settings</h2>
      
      <div className={styles.bulkActions}>
        <button 
          className={styles.actionButton} 
          onClick={handleSelectAll}
        >
          Select All
        </button>
        <button 
          className={styles.actionButton} 
          onClick={handleDeselectAll}
        >
          Deselect All
        </button>
      </div>
      
      <div className={styles.languageList}>
        {SUPPORTED_LANGUAGES.map(language => (
          <LanguageToggle
            key={language.code}
            language={language}
            isSelected={selectedLanguages.includes(language.code)}
            onToggle={handleToggle}
          />
        ))}
      </div>
    </div>
  );
};

export default LanguageSettings; 