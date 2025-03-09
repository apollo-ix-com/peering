// export interface MenuItemType {
//   heading?: string;
//   text?: string;
//   link?: string; // Ensure link is always a string
//   badge?: string;
//   header?: string;
//   newTab?: boolean;
//   active?: boolean;
//   icon?: string;
//   subMenu?: MenuItemType[];
//   subPanel?: MenuItemType[];
// }

export interface MenuItemType {
    heading?: string;
    icon?: string;
    text?: string;
    link?: string;
    badge?: string;
    active?: boolean;
    newTab?: boolean;
    header?: string;
    subMenu?: MenuItemType[];
}

const menuData: MenuItemType[] = [
  {
    heading: "Dashboards",
    icon: "dashboard",
    subMenu: [
      {
        icon: "dashlite",
        text: "Default Dashboard",
        link: "/",
      },
    ],
  },
  {
    heading: "Applications",
    icon: "menu-circled",
    subMenu: [
      {
        text: "Mailbox",
        icon: "inbox-fill",
        link: "/app-inbox",
      },
      {
        text: "File Manager",
        icon: "folder",
        link: "/app-file-manager",
        badge: "new",
      },
    ],
  },
  {
    heading: "Pages",
    icon: "files",
    subMenu: [
      {
        text: "Projects",
        icon: "tile-thumb",
        active: false,
        subMenu: [
          {
            text: "Project Cards",
            link: "/project-card",
          },
          {
            text: "Project List",
            link: "/project-list",
          },
        ],
      },
      {
        icon: "users",
        text: "User Manage",
        active: false,
        subMenu: [
          {
            text: "User List - Regular",
            link: "/user-list-regular",
          },
          {
            text: "User List - Compact",
            link: "/user-list-compact",
          },
          {
            text: "User Details - Regular",
            link: "/user-details-regular/1",
          },
          {
            text: "User Profile - Regular",
            link: "/user-profile-regular",
          },
          {
            text: "User Contact - Card",
            link: "/user-contact-card",
          },
        ],
      },
      {
        icon: "file-docs",
        text: "AML / KYCs",
        active: false,
        subMenu: [
          {
            text: "KYC List - Regular",
            link: "/kyc-list-regular",
          },
          {
            text: "KYC Details - Regular",
            link: "/kyc-details-regular/UD01544",
          },
        ],
      },
      {
        icon: "tranx",
        text: "Transaction",
        active: false,
        subMenu: [
          {
            text: "Trans List - Basic",
            link: "/transaction-basic",
          },
          {
            text: "Trans List - Crypto",
            link: "/transaction-crypto",
          },
        ],
      },
      {
        text: "Products",
        icon: "card-view",
        active: false,
        subMenu: [
          {
            text: "Product List",
            link: "/product-list",
          },
          {
            text: "Product Card",
            link: "/product-card",
          },
          {
            text: "Product Details",
            link: "/product-details/0",
          },
        ],
      },
      {
        text: "Invoice",
        icon: "file-docs",
        active: false,
        subMenu: [
          {
            text: "Invoice List",
            link: "/invoice-list",
          },
          {
            text: "Invoice Details",
            link: "/invoice-details/1",
          },
        ],
      },
      {
        text: "Pricing Table",
        icon: "view-col-fill",
        link: "/pricing-table",
      },
      {
        text: "Image Gallery",
        icon: "img-fill",
        link: "/image-gallery",
      },
      {
        text: "Blank / Startup",
        icon: "file-fill",
        link: "/_blank",
      },
      {
        text: "Faqs / Help",
        icon: "file-fill",
        link: "/pages/faq",
      },
      {
        text: "Terms / Policy",
        icon: "file-fill",
        link: "/pages/terms-policy",
      },
      {
        text: "Regular Page - v1",
        icon: "file-fill",
        link: "/pages/regular-v1",
      },
      {
        text: "Regular Page - v2",
        icon: "file-fill",
        link: "/pages/regular-v2",
      },
    ],
  },
  {
    heading: "Misc Pages",
    icon: "server",
    subMenu: [
      {
        text: "Login / Signin",
        link: "/auth-login",
        newTab: true,
      },
    ],
  },
  {
    heading: "Error Pages",
    icon: "alert-c",
    subMenu: [
      {
        text: "404 Classic",
        link: "/errors/404-classic",
        newTab: true,
      },
    ],
  },
  {
    heading: "Components",
    icon: "layers",
    subMenu: [
      {
        text: "Ui Elements",
        icon: "layers",
        active: false,
        subMenu: [
          {
            text: "Component List",
            link: "/admin/components",
          },
          {
            text: "Utilities",
            active: false,
            subMenu: [
              {
                text: "Borders",
                link: "/admin/components/util-border",
              },
              {
                text: "Borders",
                link: "/admin/components/util-border",
              },
            ],
          },
        ],
      },
      {
        text: "Crafted icons",
        active: false,
        icon: "dot-box-fill",
        subMenu: [
          {
            text: "SVG Icon - Exclusive",
            link: "/svg-icons",
          },
          {
            text: "Nioicon - HandCrafted",
            link: "/nioicon",
          },
        ],
      },
      {
        text: "Tables",
        active: false,
        icon: "table-view-fill",
        subMenu: [
          {
            text: "Basic Tables",
            link: "/table-basic",
          },
          {
            text: "Special Tables",
            link: "/table-special",
          },
          {
            text: "DataTables",
            link: "/table-datatable",
          },
        ],
      },
      {
        text: "Forms",
        active: false,
        icon: "todo-fill",
        subMenu: [
          {
            text: "Form Elements",
            link: "/admin/components/forms/form-elements",
          },
          {
            text: "Checkbox Radio",
            link: "/admin/components/forms/checkbox-radio",
          },
          {
            text: "Advanced Controls",
            link: "/admin/components/forms/advanced-controls",
          },
          {
            text: "Input Group",
            link: "/admin/components/forms/input-group",
          },
          {
            text: "Form Upload",
            link: "/admin/components/forms/form-upload",
          },
          {
            text: "Date Time Picker",
            link: "/admin/components/forms/datetime-picker",
          },
          {
            text: "Number Spinner",
            link: "/admin/components/forms/number-spinner",
          },
          {
            text: "noUiSlider",
            link: "/admin/components/forms/nouislider",
          },
          {
            text: "Wizard Basic",
            link: "/admin/components/forms/form-wizard",
          },
          {
            text: "Rich Editor",
            active: false,
            subMenu: [
              {
                text: "Quill",
                link: "/admin/components/quill",
              },
              {
                text: "Tinymce",
                link: "/admin/components/tinymce",
              },
            ],
          },
        ],
      },
      {
        text: "Charts",
        active: false,
        icon: "pie-fill",
        subMenu: [
          {
            text: "Chart Js",
            link: "/charts/chartjs",
          },
          {
            text: "Knobs",
            link: "/charts/knobs",
          },
        ],
      },
      {
        icon: "puzzle",
        text: "Widgets",
        subMenu: [
          {
            text: "Card Widgets",
            link: "/admin/components/widgets/cards",
          },
          {
            text: "Chart Widgets",
            link: "/admin/components/widgets/charts",
          },
          {
            text: "Rating Widgets",
            link: "/admin/components/widgets/rating",
          },
        ],
      },
      {
        icon: "block-over",
        text: "Miscellaneous",
        subMenu: [
          {
            text: "Slick Sliders",
            link: "/admin/components/misc/slick-slider",
          },
          {
            text: "JsTree",
            link: "/admin/components/misc/jsTree",
          },
          {
            text: "React Toastify",
            link: "/admin/components/misc/toastify",
          },
          {
            text: "Sweet Alert",
            link: "/admin/components/misc/sweet-alert",
          },
          {
            text: "React DualListBox",
            link: "/admin/components/misc/dual-list",
          },
          {
            text: "React Beautiful Dnd",
            link: "/admin/components/misc/beautiful-dnd",
          },
          {
            text: "Google Map",
            link: "/admin/components/misc/map",
          },
        ],
      },
      {
        text: "Email Template",
        icon: "template-fill",
        link: "/email-template",
        active: false,
      },
    ],
  },
];
export default menuData;
