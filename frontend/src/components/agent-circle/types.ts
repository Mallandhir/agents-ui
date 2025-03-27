import { IAgentData } from "@/stores/GroupChat";
import { ReactNode } from "react";

export type EntityData = IAgentData & {
  id: string;
  name: string;
  role: string;
  status: "Running" | "Scheduled";
  textColor?: string;
  imageSrc: string;
  icon?: {
    src: string;
    width: string;
    height: string;
  };
  results?: {
    count: number;
    type: string;
    description: string;
  };
  timestamp?: {
    lastRun: string;
    timeTaken: string;
  };
  events?: {};
};

export interface EllipseData {
  src: string;
  width: string;
  height: string;
  top: string;
  left: string;
}

export interface SectionProps {
  className: string;
  style?: React.CSSProperties;
  ellipses: EllipseData[];
  entities: EntityData[];
  onEntityClick: (entity: EntityData) => void;
  children?: ReactNode;
}
