export interface MenuItemTypes {
  key: string;
  label: string;
  isTitle?: boolean;
  icon?: string;
  url?: string;
  badge?: {
    variant: string;
    text: string;
  };
  parentKey?: string;
  target?: string;
  children?: MenuItemTypes[];
}

const MENU_ITEMS: MenuItemTypes[] = [
  {
    key: "dashboards",
    label: "Dashboards",
    isTitle: false,
    icon: "bi bi-house",
    badge: { variant: "success", text: "02" },
    children: [
      {
        key: "ds-ecommerce",
        label: "Ecommerce",
        url: "/dashboard/ecommerce",
        parentKey: "dashboards"
      },
      {
        key: "ds-analytics",
        label: "Analytics",
        url: "/dashboard/analytics",
        parentKey: "dashboards"
      }
    ]
  },
  { key: "apps", label: "Apps", isTitle: true },
  {
    key: "apps-calendar",
    label: "Calendar",
    isTitle: false,
    icon: "bi bi-calendar",
    url: "/apps/calendar"
  },
  {
    key: "apps-chat",
    label: "Chat",
    isTitle: false,
    icon: "bi bi-chat-dots",
    url: "/apps/chat"
  }
];

const HORIZONTAL_MENU_ITEMS: MenuItemTypes[] = [
  {
    key: "dashboards",
    icon: "bi bi-house",
    label: "Dashboards",
    isTitle: true,
    children: [
      {
        key: "ds-ecommerce",
        label: "Ecommerce",
        url: "/dashboard/ecommerce",
        parentKey: "dashboards"
      },
      {
        key: "ds-analytics",
        label: "Analytics",
        url: "/dashboard/analytics",
        parentKey: "dashboards"
      }
    ]
  },
  {
    key: "apps",
    icon: "bi bi-layers",
    label: "Apps",
    isTitle: true,
    children: [
      {
        key: "apps-calendar",
        label: "Calendar",
        isTitle: false,
        url: "/apps/calendar",
        parentKey: "apps"
      },
      {
        key: "apps-chat",
        label: "Chat",
        isTitle: false,
        url: "/apps/chat",
        parentKey: "apps"
      }
    ]
  }
];

const TWO_COl_MENU_ITEMS: MenuItemTypes[] = [
  {
    key: "dashboards",
    label: "Dashboards",
    isTitle: true,
    icon: "bi bi-house",
    children: [
      {
        key: "ds-ecommerce",
        label: "Ecommerce",
        url: "/dashboard/ecommerce",
        parentKey: "dashboards"
      },
      {
        key: "ds-analytics",
        label: "Analytics",
        url: "/dashboard/analytics",
        parentKey: "dashboards"
      }
    ]
  },
  {
    key: "apps",
    icon: "bi bi-grid",
    label: "Apps",
    isTitle: true,
    children: [
      {
        key: "apps-calendar",
        label: "Calendar",
        isTitle: false,
        icon: "bi bi-calendar",
        url: "/apps/calendar",
        parentKey: "apps"
      },
      {
        key: "apps-chat",
        label: "Chat",
        isTitle: false,
        icon: "bi bi-chat-dots",
        url: "/apps/chat",
        parentKey: "apps"
      }
    ]
  }
];

export { HORIZONTAL_MENU_ITEMS, MENU_ITEMS, TWO_COl_MENU_ITEMS };
