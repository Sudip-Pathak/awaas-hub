import { ArrowUpRight, ArrowDownRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface StatBadgeProps {
    change: string | number
}

export function StatBadge({ change }: StatBadgeProps) {
    const changeValue = typeof change === 'string'
        ? parseFloat(change.replace('%', '').replace('+', ''))
        : change

    const isPositive = changeValue >= 0

    return (
        <div className="flex items-center gap-1 text-xs font-medium">
            <Badge
                className={
                    isPositive
                        ? "bg-green-100 text-green-700 hover:bg-green-100 dark:bg-green-950 dark:text-green-400"
                        : "bg-red-100 text-red-700 hover:bg-red-100 dark:bg-red-950 dark:text-red-400"
                }
            >
                {isPositive ? (
                    <ArrowUpRight className="h-3 w-3" />
                ) : (
                    <ArrowDownRight className="h-3 w-3" />
                )}
                {Math.abs(changeValue)}%
            </Badge>
        </div>
    )
}

