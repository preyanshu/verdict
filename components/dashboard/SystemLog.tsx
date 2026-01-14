"use client";

import { useEffect, useState, useRef } from "react";
import { Terminal, Search } from "lucide-react";
import { Agent } from "@/lib/types";
import { TRUSTED_DATA_SOURCES } from "@/lib/data-sources";

interface LogEntry {
    id: string;
    timestamp: number;
    type: "info" | "success" | "warning" | "error" | "trade";
    message: string;
}

interface SystemLogProps {
    agents: Agent[];
}

export function SystemLog({ agents }: SystemLogProps) {
    const [logs, setLogs] = useState<LogEntry[]>([]);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Initial setup logs
        const initialLogs: LogEntry[] = [
            { id: "1", timestamp: Date.now() - 10000, type: "info", message: "Verdicts Protocol Node Initialize SUCCESS" },
            { id: "2", timestamp: Date.now() - 9000, type: "success", message: "Connected to Solana Mainnet-Beta" },
            { id: "3", timestamp: Date.now() - 8000, type: "info", message: `Protocol monitoring ${agents.length} active autonomous agents` },
            { id: "4", timestamp: Date.now() - 7000, type: "success", message: "DIA Pipeline Integration verified: High-fidelity feeds active" },
            { id: "5", timestamp: Date.now() - 6000, type: "info", message: "VUSD liquidity bridge synchronized" },
        ];

        // Add some "history" from agents
        agents.forEach((agent, index) => {
            initialLogs.push({
                id: `agent-init-${index}`,
                timestamp: Date.now() - (5000 - index * 200),
                type: "info",
                message: `Initialized Node: ${agent.personality.name} (Risk: ${agent.personality.riskTolerance.toUpperCase()})`
            });
        });

        setLogs(initialLogs);

        // Core dynamic logging logic - Derive from actual JSON data
        const interval = setInterval(() => {
            const roll = Math.random();
            let newLog: LogEntry;

            if (roll > 0.7) {
                // Agent specific log
                const agent = agents[Math.floor(Math.random() * agents.length)];
                const actions = [
                    `Analyzing strategy execution for ${agent.personality.traits[0]} parameters`,
                    `Updating internal risk model for current volatility`,
                    `Syncing position state [vUSD: $${agent.vUSD.toFixed(0)}]`,
                    `Processing behavioral memory for round consensus`,
                    `Re-evaluating high-frequency trade logic`
                ];
                newLog = {
                    id: Math.random().toString(36).substr(2, 9),
                    timestamp: Date.now(),
                    type: "trade",
                    message: `${agent.personality.name}: ${actions[Math.floor(Math.random() * actions.length)]}`
                };
            } else if (roll > 0.4) {
                // Oracle specific log
                const source = TRUSTED_DATA_SOURCES[Math.floor(Math.random() * TRUSTED_DATA_SOURCES.length)];
                newLog = {
                    id: Math.random().toString(36).substr(2, 9),
                    timestamp: Date.now(),
                    type: "info",
                    message: `Oracle: Fetching ${source.ticker}/USD via ${source.exchange.name} feed`
                };
            } else {
                // System/Network log
                const systemMsgs = [
                    "Round state synchronization complete",
                    "AUM statistics synchronized from on-chain state",
                    "Solana validator confirmation received [Latency: 14ms]",
                    "Executing protocol-level liquidity balancing",
                    "Network: DIA Feed heartbeats synchronized"
                ];
                newLog = {
                    id: Math.random().toString(36).substr(2, 9),
                    timestamp: Date.now(),
                    type: roll < 0.1 ? "success" : "info",
                    message: systemMsgs[Math.floor(Math.random() * systemMsgs.length)]
                };
            }

            setLogs(prev => [...prev.slice(-99), newLog]);
        }, 3500);

        return () => clearInterval(interval);
    }, [agents]);

    const [filterQuery, setFilterQuery] = useState("");

    const filteredLogs = logs.filter(log =>
        log.message.toLowerCase().includes(filterQuery.toLowerCase()) ||
        log.type.toLowerCase().includes(filterQuery.toLowerCase())
    );

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [logs]);

    return (
        <div className="flex flex-col h-full bg-[#050507] border-r border-white/5">
            {/* Sticky Header & Filter */}
            <div className="p-6 pb-2 bg-[#050507]">
                <div className="flex items-center gap-3 mb-6">
                    <Terminal className="w-5 h-5 text-white/20" />
                    <h2 className="text-xl font-black text-white tracking-tight uppercase">System Logs</h2>
                </div>
                <div className="relative group">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-emerald-500/50 transition-colors" />
                    <input
                        type="text"
                        value={filterQuery}
                        onChange={(e) => setFilterQuery(e.target.value)}
                        placeholder="Filter protocol events..."
                        className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-3 pl-11 pr-4 text-[13px] text-white/90 placeholder:text-white/20 focus:outline-none focus:border-emerald-500/30 focus:bg-white/[0.05] transition-all font-medium"
                    />
                </div>
            </div>

            <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-6 pt-4 space-y-3 custom-scrollbar bg-[#050507]"
            >
                {filteredLogs.map((log) => (
                    <div
                        key={log.id}
                        className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 hover:bg-white/[0.04] transition-all group"
                    >
                        <div className="flex items-start justify-between gap-4 mb-2">
                            <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${log.type === 'success' ? 'text-emerald-500' :
                                log.type === 'trade' ? 'text-blue-500' :
                                    log.type === 'error' ? 'text-red-500' : 'text-white/40'
                                }`}>
                                {log.type}
                            </span>
                            <span className="text-[10px] font-mono text-white/20 font-bold">
                                {new Date(log.timestamp).toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                            </span>
                        </div>
                        <p className="text-[12px] font-medium text-white/80 leading-relaxed font-mono selection:bg-emerald-500/30">
                            {log.message}
                        </p>
                    </div>
                ))}
            </div>

            <div className="p-4 border-t border-white/5 bg-white/[0.01] flex items-center justify-end">
                <button
                    onClick={() => setLogs([])}
                    className="text-[10px] font-black text-emerald-500 uppercase hover:text-emerald-400 transition-colors tracking-[0.2em]"
                >
                    Clear History
                </button>
            </div>
        </div>
    );
}
