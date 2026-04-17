import { Outlet } from "react-router-dom";
import Layout from "../../../components/layout/Layout";
import { ADMIN_MENU_ITEMS } from "../../../routes/adminRoutes";

export default function Main() {
  return (
    <Layout links={ADMIN_MENU_ITEMS}>
      <Outlet />
    </Layout>
  );
}
