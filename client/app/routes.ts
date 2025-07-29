import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("routes/root/root-layout.tsx", [
    index("routes/root/home.tsx"),
    route("/about", "routes/root/about.tsx"),
    route("/contact", "routes/root/contact.tsx"),
    route("/testimonials", "routes/root/testimonials.tsx"),
  ]),

  layout("routes/auth/auth-layout.tsx", [
    route("/secret/login", "routes/auth/sign-in.tsx"),
    route("/secret/register", "routes/auth/sign-up.tsx"),
    route("/secret/forgot-password", "routes/auth/forgot-password.tsx"),
  ]),

  layout("routes/dashboard/dashboard-layout.tsx", [
    route("/dashboard", "routes/dashboard/dashboard.tsx"),
  ]),
] satisfies RouteConfig;
