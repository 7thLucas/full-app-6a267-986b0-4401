import { redirect, Outlet } from "react-router";
import type { LoaderFunctionArgs } from "react-router";
import { getUserFromRequest } from "~/modules/authentication/authentication.server";
import { UserRole } from "~/modules/authentication/authentication.types";
import { DashboardLayout } from "~/components/layout/dashboard-layout";

export async function loader({ request }: LoaderFunctionArgs) {
  const user = getUserFromRequest(request);
  if (!user) return redirect("/auth/login");
  if (user.role !== UserRole.Admin) return redirect("/dashboard");
  return { user };
}

export default function AdminLayoutRoute() {
  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  );
}
