import React, { useEffect, useState } from 'react';
import styles from './LanguageStatus.module.scss';
import { LanguageStats } from '../../types';
import { SUPPORTED_LANGUAGES } from '../../utils/languages';

interface FormattedStats {
  language: string;
  languageName: string;
  daily: string;
  weekly: string;
  total: string;
}

function formatTime(seconds: number): string {
  if (seconds === 0) return '';

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  if (hours > 0) {
    return `${hours}h ${minutes > 0 ? `${minutes}m` : ''}`.trim();
  }
  return `${minutes}m`;
}

function getLanguageName(code: string): string {
  return SUPPORTED_LANGUAGES.find(lang => lang.code === code)?.name || code.toUpperCase();
}

function formatStats(stats: LanguageStats): FormattedStats[] {
  return Object.entries(stats)
    .map(([language, data]) => ({
      language,
      languageName: getLanguageName(language),
      daily: formatTime(data.dailyWatchTimeSeconds),
      weekly: formatTime(data.weeklyWatchTimeSeconds),
      total: formatTime(data.totalWatchTimeSeconds)
    }))
    .filter(stat => stat.daily || stat.weekly || stat.total)
    .sort((a, b) => a.languageName.localeCompare(b.languageName));
}

const LanguageStatus: React.FC = () => {
  const [stats, setStats] = useState<FormattedStats[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchStats() {
    try {
      setIsLoading(true);
      const response = await chrome.runtime.sendMessage({ type: 'GET_LANGUAGE_WATCH_TIMES' });

      if (response.success) {
        setStats(formatStats(response.stats));
      } else {
        setError('Failed to load language stats');
      }
    } catch (err) {
      setError('Error loading language stats');
      console.error('Error fetching language stats:', err);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchStats();

    // Listen for real-time updates
    const messageListener = (message: any) => {
      if (message.type === 'LANGUAGE_STATS_UPDATED') {
        fetchStats();
      }
    };

    chrome.runtime.onMessage.addListener(messageListener);
    return () => chrome.runtime.onMessage.removeListener(messageListener);
  }, []);

  if (isLoading) {
    return <div className={styles.loading}>Loading stats...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  if (stats.length === 0) {
    return <div className={styles.empty}>No watch time recorded yet</div>;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Watch Time</h2>
      <div className={styles.table}>
        <div className={styles.header}>
          <div className={styles.cell}>Language</div>
          <div className={styles.cell}>Today</div>
          <div className={styles.cell}>Week</div>
          <div className={styles.cell}>Total</div>
        </div>
        {stats.map(stat => (
          <div key={stat.language} className={styles.row}>
            <div className={styles.cell}>{stat.languageName}</div>
            <div className={styles.cell}>{stat.daily}</div>
            <div className={styles.cell}>{stat.weekly}</div>
            <div className={styles.cell}>{stat.total}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LanguageStatus;
