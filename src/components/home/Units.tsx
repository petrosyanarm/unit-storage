"use client"
import Search from "@/public/assets/images/Search.svg"
import NotificationIcon from "@/public/assets/images/notificationIcon.svg"

export default function Units() {
    return (
        <div className="w-full pl-8 pr-7 py-4 pb-3 flex justify-between border-b border-slate-100 ">
            <div className="flex flex-col gap-1">
                <h3 className="font-bold text-2xl leading-[125%]">Units</h3>
                <div className="flex gap-1">
                    <span className="text-xs font-normal text-[rgba(15,23,42,1)] leading-[160%]">10 facilities |</span>
                    <span className="text-xs font-normal text-primary leading-[160%]"> Manage facility units here.</span>
                </div>
            </div>
            <div className="flex gap-6">
                <div className="relative py-1">
                    <input type="text" placeholder="Search anything..." className="max-w-68.75 w-full pl-12 py-3 border rounded-xl focus:outline-none border-[rgba(226,232,240,1)] placeholder:text-sm font-normal leading-[160%] text-primary" />
                    <div className="absolute top-5 left-4">
                        <Search className="size-5" />
                    </div>
                </div>
                <div className="py-2">
                    <NotificationIcon className="size-10" />
                </div>
            </div>
        </div>
    )
}