import { LuLayoutDashboard } from "react-icons/lu";
import { LuUsers } from "react-icons/lu";
import { FaUserCheck } from "react-icons/fa";
import { MdOutlineSettingsInputComposite } from "react-icons/md";

export const items = [
  {
    menu: "Pages",
    datas: [
      {
        title: "Dashboard",
        path: "/dashboard",
        icon: <LuLayoutDashboard />,
      },
      {
        title: "Users",
        path: "/dashboard/users",
        icon: <LuUsers />,
      },
    ],
  },
  {
    menu: "Settings",
    datas: [
      {
        title: "Profile",
        path: "/dashboard/profile",
        icon: <FaUserCheck />,
      },
      {
        title: "Site settings",
        path: "/dashboard/site-settings",
        icon: <MdOutlineSettingsInputComposite />,
      },
    ],
  },
];
