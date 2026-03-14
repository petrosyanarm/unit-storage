import { useDrawerStore } from "@/src/store/useDrawerStore"

export default function DimensionModal() {
    const { openDimension, setOpenDimension } = useDrawerStore()
    if (!openDimension) return null
    return (
        <div className="w-80 h-full bg-black shadow">
            <button onClick={() => setOpenDimension(false)}>Close</button>
            Drawer content
        </div>
    )
}