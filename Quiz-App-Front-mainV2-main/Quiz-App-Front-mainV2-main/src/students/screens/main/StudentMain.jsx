import { Outlet } from "react-router-dom";
import Layout from "../../../components/layout/Layout";
import { STUDENT_MENU_ITEMS} from  "../../../routes/studentRoutes"

export default function StudentMain() {
  return (
    <Layout links={STUDENT_MENU_ITEMS}>
      <Outlet />
    </Layout>
    )
}