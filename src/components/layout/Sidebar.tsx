import Image from "next/image"
import SidebarMenu from "@/src/components/layout/SidebarMenu"
export default function Sidebar() {
    return (
        <div className="max-w-62.5 bg-[rgba(255,255,255,1)] w-full border-r border-slate-100 fixed z-10 left-0 h-screen">
            <div className="px-6 pt-8 pb-6.5 border-b border-r border-slate-100 ">
                <Image loading="eager" src={'/assets/images/headerLogo.png'} width={96} height={30} alt={"Logo"} />
            </div>
            <SidebarMenu />
        </div>
    )
}