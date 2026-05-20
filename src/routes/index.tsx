import React from "react";

import { TabRoutes as AppRoutes } from "./AppRoutes/tab.routes";
import { AuthRoutes } from "./AuthRoutes/auth.route";
import { useAppSelector } from "@/hooks/useRedux";

const Routes: React.FC = () => {
  const auth = useAppSelector((state) => state.authState);

  return !auth.isAuthenticated ? <AuthRoutes /> : <AppRoutes />;
};

export default Routes;
