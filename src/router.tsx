import { createBrowserRouter } from "react-router-dom";

import App from "./App";
import EmployeesList from "./pages/EmployeeList/EmployeeList";
import EmployeeEdit from "./pages/EmployeeEdit/EmployeeEdit";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <EmployeesList />,
      },
      {
        path: "employees",
        element: <EmployeesList />,
      },
      {
        path: "employees/new",
        element: <EmployeeEdit />,
      },
      {
        path: "employees/:id",
        element: <EmployeeEdit />,
      },
    ],
  },
]);
