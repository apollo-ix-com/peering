// import React, { useState } from "react";
// import { Dropdown, DropdownMenu, DropdownToggle } from "react-bootstrap";
// import { Link } from "react-router-dom";
// import { Icon } from "../../../../components/Component";

// const AppDropdown: React.FC = () => {
//   const [open, setOpen] = useState<boolean>(false); // State for dropdown open/close

//   const toggle = (): void => {
//     setOpen(!open); // Toggle dropdown open/close state
//   };

//   return (
//     <Dropdown isOpen={open} toggle={toggle}>
//       <DropdownToggle
//         tag="a"
//         href="#dropdown"
//         onClick={(ev) => ev.preventDefault()} // Prevent default behavior
//         className="dropdown-toggle nk-quick-nav-icon"
//       >
//         <div className="icon-status icon-status-na">
//           <Icon name="menu-circled" />
//         </div>
//       </DropdownToggle>
//       <DropdownMenu end className="dropdown-menu-lg">
//         <div className="dropdown-body">
//           <ul className="list-apps">
//             <li>
//               <Link to={`${process.env.PUBLIC_URL}/`} onClick={toggle}>
//                 <span className="list-apps-media">
//                   <Icon name="dashlite" className="bg-primary text-white" />
//                 </span>
//                 <span className="list-apps-title">Dashboard</span>
//               </Link>
//             </li>
//             <li>
//               <Link to={`${process.env.PUBLIC_URL}/app-chat`} onClick={toggle}>
//                 <span className="list-apps-media">
//                   <Icon name="dashlite" className="bg-info-dim" />
//                 </span>
//                 <span className="list-apps-title">Chats</span>
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to={`${process.env.PUBLIC_URL}/app-messages`}
//                 onClick={toggle}
//               >
//                 <span className="list-apps-media">
//                   <Icon name="dashlite" className="bg-success-dim" />
//                 </span>
//                 <span className="list-apps-title">Messages</span>
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to={`${process.env.PUBLIC_URL}/app-calender`}
//                 onClick={toggle}
//               >
//                 <span className="list-apps-media">
//                   <Icon name="dashlite" className="bg-danger-dim" />
//                 </span>
//                 <span className="list-apps-title">Calender</span>
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to={`${process.env.PUBLIC_URL}/components`}
//                 onClick={toggle}
//               >
//                 <span className="list-apps-media">
//                   <Icon name="dashlite" className="bg-secondary-dim" />
//                 </span>
//                 <span className="list-apps-title">Components</span>
//               </Link>
//             </li>
//           </ul>
//         </div>
//       </DropdownMenu>
//     </Dropdown>
//   );
// };

// export default AppDropdown;
