import DashboardLayout from "@/pages/Dashboard/Layout/DashboardLayout.vue";
import AuthLayout from "@/pages/Dashboard/Pages/AuthLayout.vue";

// Dashboard pages
import Dashboard from "@/pages/Dashboard/Dashboard.vue";
// Profile
import UserProfile from "@/pages/Dashboard/Examples/UserProfile.vue";

// User Management
import ListUserPage from "@/pages/Dashboard/Examples/UserManagement/ListUserPage.vue";

// Pages
import RtlSupport from "@/pages/Dashboard/Pages/RtlSupport.vue";
import Login from "@/pages/Dashboard/Pages/Login.vue";
import Register from "@/pages/Dashboard/Pages/Register.vue";


import Customers from "@/pages/Dashboard/Pages/Customers/Customers.vue";
import Addresses from "@/pages/Dashboard/Pages/Addresses/Addresses.vue";
import ScheduleType from "@/pages/Dashboard/Pages/ScheduleTypes/ScheduleType.vue";
import Schedule from "@/pages/Dashboard/Pages/Schedules/Schedule.vue";
import FormSchedule from "@/pages/Dashboard/Pages/Schedules/Components/FormSchedule.vue";
import EditSchedule from "@/pages/Dashboard/Pages/Schedules/Components/EditSchedule.vue";
import ShowSchedule from "@/pages/Dashboard/Pages/Schedules/Components/ShowSchedule.vue";
import ExternalCustomer from "@/pages/Dashboard/Pages/ExternalCustomers/ExternalCustomer.vue";
import Mining from "@/pages/Dashboard/Pages/Mining/Mining.vue";

// Components pages
import Notifications from "@/pages/Dashboard/Components/Notifications.vue";
import Icons from "@/pages/Dashboard/Components/Icons.vue";
import Typography from "@/pages/Dashboard/Components/Typography.vue";

// TableList pages
import RegularTables from "@/pages/Dashboard/Tables/RegularTables.vue";

// Maps pages
import FullScreenMap from "@/pages/Dashboard/Maps/FullScreenMap.vue";

//import middleware
import auth from "@/middleware/auth";
import guest from "@/middleware/guest";

let componentsMenu = {
  path: "/components",
  component: DashboardLayout,
  redirect: "/components/notification",
  name: "Components",
  children: [
    {
      path: "table",
      name: "Table",
      components: { default: RegularTables },
      meta: { middleware: auth }
    },
    {
      path: "customers",
      name: "Customers",
      components: { default: Customers },
      meta: { middleware: auth }
    },
    {
      path: "address",
      name: "Endereços",
      components: { default: Addresses },
      meta: { middleware: auth }
    },
    {
      path: "scheduletype",
      name: "Tipos de Agendamento",
      components: { default: ScheduleType },
      meta: { middleware: auth }
    },
    {
      path: "schedules",
      name: "Agendamentos",
      components: { default: Schedule },
      meta: { middleware: auth }
    },
    {
      path: "schedules/create",
      name: "Criar Evento",
      components: { default: FormSchedule },
      meta: { middleware: auth }
    },
    {
      path: "schedules/edit/:id",
      name: "Editar Evento",
      components: { default: EditSchedule },
      meta: { middleware: auth }
    },
    {
      path: "schedules/show/:id",
      name: "Visualizar Evento",
      components: { default: ShowSchedule },
      meta: { middleware: auth }
    },
    {
      path: "customers/external",
      name: "Clientes Externos",
      components: { default: ExternalCustomer },
      meta: { middleware: auth }
    },
    {
      path: "schedules/images",
      name: "Imagem dos Eventos",
      components: { default: Mining },
      meta: { middleware: auth }
    },
    {
      path: "typography",
      name: "Typography",
      components: { default: Typography },
      meta: { middleware: auth }
    },
    {
      path: "icons",
      name: "Icons",
      components: { default: Icons },
      meta: { middleware: auth }
    },
    {
      path: "maps",
      name: "Maps",
      meta: {
        hideContent: true,
        hideFooter: true,
        navbarAbsolute: true,
        middleware: auth
      },
      components: { default: FullScreenMap }
    },
    {
      path: "notifications",
      name: "Notifications",
      components: { default: Notifications },
      meta: { middleware: auth }
    },
    {
      path: "rtl",
      name: "وحة القيادة",
      meta: {
        rtlActive: true,
        middleware: auth
      },
      components: { default: RtlSupport }
    }
  ]
};

let examplesMenu = {
  path: "/examples",
  component: DashboardLayout,
  name: "Examples",
  children: [
    {
      path: "user-profile",
      name: "User Profile",
      components: { default: UserProfile },
      meta: { middleware: auth }
    },
    {
      path: "user-management/list-users",
      name: "List Users",
      components: { default: ListUserPage },
      meta: { middleware: auth }
    }
  ]
};

let authPages = {
  path: "/",
  component: AuthLayout,
  name: "Authentication",
  children: [
    {
      path: "/login",
      name: "Login",
      component: Login,
      meta: { middleware: guest }
    },
    {
      path: "/register",
      name: "Register",
      component: Register,
      meta: { middleware: guest }
    }
  ]
};

const routes = [
  {
    path: "/",
    redirect: "/dashboard",
    name: "Home"
  },
  {
    path: "/",
    component: DashboardLayout,
    meta: { middleware: auth },
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        components: { default: Dashboard },
        meta: { middleware: auth },
      },
    ]
  },
  componentsMenu,
  examplesMenu,
  authPages
];

export default routes;
