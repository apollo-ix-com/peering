// import React, { useState } from 'react';
// import classNames from 'classnames';
// import SimpleBar from 'simplebar-react';
// import Menu from '../menu/Menu';
// import Navside from '../navside/Navside';

// import { useTheme, useThemeUpdate } from '../provider/Theme';

// // Define the prop types for Sidebar component
// interface SidebarProps {
//   fixed?: boolean;
//   className?: string;
// }

// const Sidebar: React.FC<SidebarProps> = ({ fixed, className }) => {
//   const [currentMenuTab, setCurrentMenuTab] = useState<string>('Dashboards'); // Initialize the active menu tab state

//   const theme = useTheme(); // Get the current theme settings
//   const themeUpdate = useThemeUpdate(); // Get the function to update the theme

//   // Dynamic class names for sidebar styles based on the theme
//   const mainClass = classNames({
//     'nk-sidebar-main': true,
//     [`is-light`]: theme.sidebar === 'white',
//     [`is-${theme.sidebar}`]:
//       theme.sidebar !== 'white' && theme.sidebar !== 'light',
//     [`${className}`]: className,
//   });

//   const compClass = classNames({
//     'nk-sidebar': true,
//     'nk-sidebar-fixed': fixed, // Conditionally add a fixed class
//     'nk-sidebar-mobile': theme.sidebarMobile, // Mobile-specific styles
//     'nk-sidebar-active': theme.sidebarVisibility && theme.sidebarMobile, // Handle sidebar visibility on mobile
//   });

//   return (
//     <>
//       <div className={compClass}>
//         {/* The Navside component for navigation links or menu headings */}
//         <Navside setCurrentMenuTab={setCurrentMenuTab} />

//         <div className={mainClass}>
//           <SimpleBar className="nk-sidebar-inner">
//             <Menu
//               currentMenuTab={currentMenuTab}
//               sidebarToggle={() => {}}
//               mobileView={theme.sidebarMobile}
//             />
//           </SimpleBar>
//         </div>
//       </div>

//       {/* Sidebar overlay for mobile view */}
//       {theme.sidebarVisibility && (
//         <div
//           onClick={themeUpdate.sidebarVisibility} // Toggle the sidebar visibility
//           className="nk-sidebar-overlay"
//         ></div>
//       )}
//     </>
//   );
// };

// export default Sidebar;
