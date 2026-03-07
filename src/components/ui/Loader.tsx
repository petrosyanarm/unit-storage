export default function Loader() {
    return (
        <div className="animate-pulse">
            <table className="min-w-full divide-y divide-gray-200">
                <thead>
                    <tr>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            <div className="h-4 bg-gray-200 rounded"></div>
                        </th>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            <div className="h-4 bg-gray-200 rounded"></div>
                        </th>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            <div className="h-4 bg-gray-200 rounded"></div>
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    <tr className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                                <div className="flex-shrink-0 size-10 bg-gray-200 rounded-full"></div>
                                <div className="ml-4">
                                    <div className="h-4 bg-gray-200 rounded w-48"></div>
                                    <div className="mt-2 h-4 bg-gray-200 rounded w-32"></div>
                                </div>
                            </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <div className="h-4 bg-gray-200 rounded w-24"></div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <div className="h-4 bg-gray-200 rounded w-40"></div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

    )
}