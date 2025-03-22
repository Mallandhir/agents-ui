export interface HeaderProps {
  title: string;
  subtitle: string;
  progress: number;
  avatarUrl: string;
}

export interface SummaryCardProps {
  title: string;
  text: {
    prefix: string;
    highlight: string;
    suffix: string;
  };
}

export interface OutputDataProps {
  title: string;
  label: string;
  industries: string[];
}

export interface ThinkingProcessProps {
  title: string;
  steps: string[];
}

export interface ChatInputProps {
  placeholder: string;
  onSend: (message: string) => void;
  onVoice: () => void;
}

export interface ReportsSnapshotProps {
  title: string;
  dateRange: string;
  badges: {
    text: string;
    className: string;
  }[];
  summaryData: Omit<SummaryCardProps, 'title'>;
  outputData: Omit<OutputDataProps, 'title'>;
  thinkingProcess: Omit<ThinkingProcessProps, 'title'>;
}