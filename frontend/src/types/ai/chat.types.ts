import { ICacheControlEphemeral, IToolUseBlock } from "./ai.types";

import { IContentBlock } from "./ai.types";

export interface IGenerateEmailToolUse extends IToolUseBlock {
  name: "generate_email_content";
  input: IGenerateEmailContentOutput;
  cache_control?: ICacheControlEphemeral | null;
}

export type ICleanAIChatMessage = {
  role: "user" | "assistant";
  content: Array<IContentBlock>;
  cache_control?: ICacheControlEphemeral | null;
};

export interface IAIChatMessage {
  id: string;
  type?: string;
  role: "user" | "assistant";
  contact?: IChatMessageContact;
  model?: string;
  content: Array<IContentBlock>;
  stop_reason?: "end_turn" | "max_tokens" | "stop_sequence" | "tool_use" | null;
  stop_sequence?: string | null;
  cache_control?: ICacheControlEphemeral | null;
  // timestamps
  createdAt?: string;
  updatedAt?: string;
  // Fields specific to different Apps. Ex: Email chat, Social post chat, etc.
  // emailStructure?: IEmailStructureInput;
  // postInfo?: ISocialPostInfo;
  // isPublished?: boolean;
}

export interface IChatMessageContact {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  jobTitle: string;
  domain: string;
  externalId?: string;
  linkedinUrl?: string;
}

export enum ESocialPostLifecycleState {
  REVIEW = "REVIEW",
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
  PENDING = "PENDING",
  SCHEDULED = "SCHEDULED",
  FAILED = "FAILED"
}

export enum ESocialPostRequestType {
  REVIEW = "REVIEW",
  DRAFT = "DRAFT",
  NOW = "POST_NOW",
  SCHEDULE = "SCHEDULE"
}

export interface ISocialPostInfo {
  // request fields
  requestType: ESocialPostRequestType;
  message?: string;
  // post related fields
  chatMessageId: string;
  content: string;
  state?: ESocialPostLifecycleState;
  postId?: string;
  // timestamps
  scheduledAt?: Date;
  completedAt?: Date;
  // job related fields
  jobId?: string;
}

// Document interface
export interface IAIChat {
  _id: string;
  userId: string;
  orgId: string | null;
  promptId: string;
  messages: IAIChatMessage[];
  name: string;
  // toolIds?: IOneshotToolId[];
  // promptSections: IPromptSections;
  // purpose?: IPromptPurpose;
}
export interface IAICheckpoint {
  id: string;
  type: "checkpoint";
  // emailStructure?: IEmailStructureInput;
  isPublished?: boolean;
}

export interface IGenerateEmailContentOutput {
  email: IEmailSection[];
}

export interface IEmailSection {
  label: string;
  text: string;
  citations: ICitation[];
}

export interface ICitation {
  source: string;
  text: string;
}

export interface IEmailStructureSection {
  label: string;
  purpose: string;
  how_to_write: string;
  rule?: string;
}
