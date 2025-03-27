import { IAgentThinkingStep } from "@/stores/GroupChat";

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
  output: {
    text: string;
  };
}

export interface IThinkingProcessCard {
  title: string;
  steps: IAgentThinkingStep[];
  onClickPreview: (step: IAgentThinkingStep) => void;
}

export interface ChatInputProps {
  placeholder: string;
  onSend: (message: string) => void;
  onVoice: () => void;
}

export interface ReportsSnapshotProps {
  title: string;
  badges: {
    text: string;
    className: string;
  }[];
  summaryData: Omit<SummaryCardProps, "title">;
  outputData: Omit<OutputDataProps, "title">;
  thinkingProcess: Omit<IThinkingProcessCard, "title">;
}
