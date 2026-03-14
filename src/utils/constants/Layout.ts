import MenuIcon1 from "@/public/assets/images/menuIcon1.svg";
import MenuIcon2 from "@/public/assets/images/menuIcon2.svg";
import MenuIcon3 from "@/public/assets/images/location.svg";
import MenuIcon4 from "@/public/assets/images/menuIcon4.svg";
import MenuIcon5 from "@/public/assets/images/menuIcon5.svg";
import MenuIcon6 from "@/public/assets/images/menuIcon6.svg";
import chevronDown from "@/public/assets/images/chevron-down1.svg";
export const NAVBAR_LINKS = [
  { id: 1, title: "Dashboard", icon: MenuIcon1 },
  {
    id: 2,
    title: "Tenants",
    icon: MenuIcon2,
    select: chevronDown,
    children: [{ title: "Leads" }, { title: "Tenants" }],
  },
  { id: 3, title: "Facilities", icon: MenuIcon3, select: chevronDown },
  { id: 4, title: "Units", icon: MenuIcon4, select: chevronDown },
  { id: 5, title: "Analytics", icon: MenuIcon5, select: chevronDown },
  {
    id: 6,
    title: "Settings",
    icon: MenuIcon6,
    select: chevronDown,
    children: [
      { id: 20, title: "Unit" },
      { id: 21, title: "Unit" },
    ],
  },
];
