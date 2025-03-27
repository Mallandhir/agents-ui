export const PROGRESS_VALUE = 60;
export const DATE_RANGE = "1 Mar - Today";

export const SUMMARY_TEXT = {
  prefix: "Found ",
  highlight: "10 high-potential markets",
  suffix: " with significant growth opportunities"
} as const;

export const SECTIONS = {
  SUMMARY: "SUMMARY",
  OUTPUT_DATA: "OUTPUT DATA",
  THINKING_PROCESS: "THINKING PROCESS"
} as const;

export const BADGES = {
  ENTIRE_PERIOD: {
    text: "Entire Period",
    className:
      "px-1 py-0.5 mr-1 rounded shadow-[inset_0px_4px_8.9px_#ffffff40] bg-[rgba(218,203,225,0.13)] text-[#c072ca] text-xs border-none font-normal"
  },
  DATE_RANGE: {
    text: DATE_RANGE,
    className: "px-2 py-1 rounded shadow-[inset_0px_4px_8.9px_#ffffff40] text-[#292929] text-xs border-none font-normal"
  },
  PREVIEW: {
    text: "PREVIEW",
    className:
      "px-2 py-1 cursor-pointer hover:bg-[#DB91E530] transition-all duration-300 rounded-md font-normal border border-solid border-[#00000008] shadow-[inset_0px_4px_8.9px_#ffffff40] bg-[rgba(218,203,225,0.13)] text-[#c072ca] text-xs"
  }
} as const;

export const CHAT_INPUT = {
  placeholder: "Chat with Nova",
  className: "h-12 pl-4 pr-16 text-sm text-[#292929]"
} as const;

export const BUTTON_STYLES = {
  common:
    "w-6 h-6 rounded-full shadow-[inset_0px_4px_8.9px_#ffffff40] bg-gradient-to-b from-[rgba(187,144,242,1)] to-[rgba(227,146,227,1)]"
} as const;

export const HEADER_INFO = {
  title: "Nova",
  subtitle: "/Industry Scout",
  avatarSize: {
    width: "w-6",
    height: "h-6"
  }
} as const;

export const CARD_STYLES = {
  common:
    "w-full border border-solid border-[#62456f0d] backdrop-blur-[8.95px] backdrop-brightness-[100%] bg-[rgba(0,0,0,0.03)]"
} as const;

export const THINKING_STEPS = [
  "Initializing market analysis parameters and data sources",
  "Loading historical industry performance metrics",
  "Analyzing global market trends and patterns",
  "Identifying emerging sectors with high growth potential",
  "Cross-referencing market caps and growth rates"
];

export const RECOMMENDED_INDUSTRIES = ["Healthcare", "Financial Services", "Software", "Real Estate"];
