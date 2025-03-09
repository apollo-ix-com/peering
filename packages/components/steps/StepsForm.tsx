// import React, { ReactNode } from "react";
// import { StepProvider } from "./StepContext";
// import Navigation from "./Navigation";
// import Progress from "./Progress";
// import Steps from "./Steps";

// interface StepsFormProps {
//   children?: ReactNode; // Optional additional content passed into StepsForm
//   ProgressComponent?: ReactNode; // Optional custom Progress bar component
//   SidebarComponent?: ReactNode; // Optional custom Sidebar component
// }

// const StepsForm: React.FC<StepsFormProps> = ({
//   children,
//   ProgressComponent = <Progress />, // Default Progress if none provided
//   SidebarComponent, // Optional Sidebar
// }) => {
//   return (
//     <StepProvider>
//       {/* Custom Progress component or default */}
//       {ProgressComponent}

//       {/* Optional Sidebar displaying step details */}
//       {SidebarComponent && <div>{SidebarComponent}</div>}

//       {/* Steps component to handle rendering different steps */}
//       <Steps>{children}</Steps>

//       {/* Navigation to move between steps */}
//       <Navigation />
//     </StepProvider>
//   );
// };

// export default StepsForm;
