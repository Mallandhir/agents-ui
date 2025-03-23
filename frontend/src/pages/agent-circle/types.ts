import { ReactNode } from "react";

export interface EntityData {
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
}

export interface EllipseData {
  src: string;
  width: string;
  height: string;
  top: string;
  left: string;
}

export interface EntityCardProps {
  entity: EntityData;
  onEntityClick: (entity: EntityData) => void;
}

export interface SectionProps {
  className: string;
  style?: React.CSSProperties;
  ellipses: EllipseData[];
  entities: EntityData[];
  onEntityClick: (entity: EntityData) => void;
  children?: ReactNode;
}
