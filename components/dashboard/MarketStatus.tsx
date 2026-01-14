"use client";

import { MarketState } from "@/lib/types";
import { Clock, RefreshCw, BarChart3, Users } from "lucide-react";
interface MarketStatusProps {
    state: MarketState;
    agentCount: number;
}

export function MarketStatus({ state, agentCount }: MarketStatusProps) {
    const timeLeft = state.roundEndTime - Date.now();
    const minutesLeft = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const secondsLeft = Math.floor((timeLeft % (1000 * 60)) / 1000);

    const stats = [
        {
            label: "Round Time",
            value: `${minutesLeft}m ${secondsLeft}s`,
            icon: Clock,
            active: true
        },
        {
            label: "Active Agents",
            value: agentCount.toString(),
            icon: Users,
            active: false
        },
        {
            label: "Active Markets",
            value: state.strategies.length.toString(),
            icon: BarChart3,
            active: false
        },
        {
            label: "Status",
            value: state.isExecutingTrades ? 'Executing' : 'Standing By',
            icon: RefreshCw,
            active: state.isExecutingTrades,
            spin: state.isExecutingTrades
        }
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {stats.map((stat, i) => (
                <div
                    key={i}
                    className="relative group bg-white/[0.03] backdrop-blur-md border border-white/10 p-7 rounded-2xl hover:border-white/20 hover:bg-white/[0.05] transition-all duration-300"
                >
                    <div className="flex flex-col gap-4">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${stat.active ? 'bg-emerald-500/20 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.1)]' : 'bg-white/5 text-white/20 group-hover:bg-white/10 group-hover:text-white/40'}`}>
                            <stat.icon className={`w-5 h-5 ${stat.spin ? 'animate-spin' : ''}`} />
                        </div>
                        <div>
                            <p className="text-[11px] text-white/40 uppercase tracking-[0.25em] font-black mb-1.5 transition-colors group-hover:text-white/60">
                                {stat.label}
                            </p>
                            <p className="text-2xl font-black text-white tracking-tight group-hover:text-emerald-500 transition-colors">
                                {stat.value}
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
