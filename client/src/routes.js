import { useRoutes } from "react-router-dom";
import Dashboard from "./views/dashboard"
import AddBill from "./views/addBill"

const AllRoutes = () => {

  const allRoutes = useRoutes([
    {
      path: "/",
      element: <Dashboard />,
    },
    {
      path: "/addBill",
      element: <AddBill />
    },
    {
      path: "/:id/edit",
      element: <AddBill />
    }
  ]);

  return allRoutes;
};

export default AllRoutes;
