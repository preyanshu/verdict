"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/landing/Navbar";
import { SystemLog } from "@/components/dashboard/SystemLog";
import { ActiveAgents } from "@/components/dashboard/ActiveAgents";
import { Agent } from "@/lib/types";
import { AnimatePresence, motion } from "framer-motion";
import { AgentAvatar } from "@/components/dashboard/AgentAvatar";
import { TRUSTED_DATA_SOURCES } from "@/lib/data-sources";
import {
    Users,
    Shield,
    TrendingUp,
    Terminal,
    Cpu,
    Zap,
    Search,
    Filter,
    Activity,
    ChevronRight,
    Wallet,
    Brain,
    Wrench,
    Database,
    ChevronDown,
} from "lucide-react";

export default function AgentsPage() {
    const [sidebarWidth, setSidebarWidth] = useState(450);
    const [isResizingValue, setIsResizingValue] = useState<'none' | 'horizontal'>('none');
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

    useEffect(() => {
        const updateWidth = () => {
            if (window.innerWidth < 1280 && window.innerWidth >= 768) {
                setSidebarWidth(320); // Narrower on tablets
            } else if (window.innerWidth >= 1280) {
                setSidebarWidth(450); // Standard on desktop
            }
        };
        updateWidth();
        window.addEventListener('resize', updateWidth);
        return () => window.removeEventListener('resize', updateWidth);
    }, []);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (isResizingValue === 'none') return;

            if (isResizingValue === 'horizontal') {
                const w = e.clientX;
                if (w >= 350 && w <= 700) setSidebarWidth(w);
            }
        };

        const handleMouseUp = () => setIsResizingValue('none');

        if (isResizingValue !== 'none') {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
            document.body.style.cursor = 'col-resize';
            document.body.style.userSelect = 'none';
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
            document.body.style.cursor = '';
            document.body.style.userSelect = '';
        };
    }, [isResizingValue]);

    // Mock data (matching the main dashboard for consistency)
    const agents: Agent[] = [
        {
            "id": "agent-1",
            "personality": {
                "name": "Capital Guardian",
                "riskTolerance": "low",
                "aggressiveness": 0.2,
                "memo": "I prioritize the preservation of capital above all else...",
                "traits": ["patient", "prudent", "fundamentalist", "long-term focused", "defensive"]
            },
            "strategy": "yes-no" as any,
            "vUSD": 109,
            "tokenHoldings": [{ "strategyId": "strategy-2", "tokenType": "yes", "quantity": 0.95 }],
            "trades": [
                { "type": "buy", "strategyId": "strategy-2", "tokenType": "yes", "price": 0.50, "quantity": 19.9, "timestamp": 1768315545716, "reasoning": "Focusing on Oil Market Surge..." },
                { "type": "sell", "strategyId": "strategy-2", "tokenType": "yes", "price": 0.49, "quantity": 19, "timestamp": 1768315597662, "reasoning": "Time decay and market divergence..." }
            ],
            "roundMemory": [],
            "totalValue": 109.47
        },
        {
            "id": "agent-2",
            "personality": {
                "name": "Market Navigator",
                "riskTolerance": "medium",
                "aggressiveness": 0.5,
                "memo": "I am a balanced explorer of the markets...",
                "traits": ["adaptable", "balanced", "disciplined", "opportunistic", "diversified"]
            },
            "strategy": "yes-no" as any,
            "vUSD": 124,
            "tokenHoldings": [],
            "trades": [],
            "roundMemory": [],
            "totalValue": 124.34
        },
        {
            "id": "agent-3",
            "personality": {
                "name": "Velocity Trader",
                "riskTolerance": "high",
                "aggressiveness": 0.9,
                "memo": "I thrive on dynamism and velocity in the market...",
                "traits": ["bold", "decisive", "momentum-driven", "risk-taker", "high-frequency"]
            },
            "strategy": "yes-no" as any,
            "vUSD": 148,
            "tokenHoldings": [],
            "trades": [],
            "roundMemory": [],
            "totalValue": 148.39
        },
        {
            "id": "agent-4",
            "personality": {
                "name": "Quantum Arbiter",
                "riskTolerance": "medium",
                "aggressiveness": 0.8,
                "memo": "My strategy relies entirely on sophisticated quantitative models...",
                "traits": ["systematic", "algorithmic", "high-frequency", "data-driven", "arbitrageur"]
            },
            "strategy": "yes-no" as any,
            "vUSD": 139,
            "tokenHoldings": [],
            "trades": [],
            "roundMemory": [
                {
                    "action": "buy",
                    "strategyId": "strategy-1",
                    "tokenType": "yes",
                    "quantity": 145.5,
                    "price": 0.42,
                    "reasoning": "S&P 500 momentum is strong, and TLT volatility is decreasing. This creates a high-probability entry for the bull run strategy.",
                    "timestamp": Date.now() - 1000 * 60 * 15
                },
                {
                    "action": "hold",
                    "strategyId": "strategy-2",
                    "tokenType": "no",
                    "quantity": 0,
                    "price": 0.55,
                    "reasoning": "Crude oil supply disruptions are offset by weak demand data. Maintaining neutral position until next oracle update.",
                    "timestamp": Date.now() - 1000 * 60 * 45
                }
            ],
            "totalValue": 139.11
        }
    ];

    const [expandedAgents, setExpandedAgents] = useState<string[]>([]);

    const toggleAgent = (id: string) => {
        setExpandedAgents(prev =>
            prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
        );
    };

    const totalAUM = agents.reduce((sum, agent) => sum + (agent.totalValue || 0), 0);

    return (
        <div className="h-screen bg-[#08080c] text-white selection:bg-emerald-500/30 flex flex-col relative overflow-hidden">
            <Navbar transparent={false} />

            <div className="flex flex-1 pt-20 relative z-10 overflow-hidden">
                {/* Mobile Sidebar Overlay */}
                <AnimatePresence>
                    {isMobileSidebarOpen && (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setIsMobileSidebarOpen(false)}
                                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[140] xl:hidden"
                            />
                            <motion.aside
                                initial={{ x: "-100%" }}
                                animate={{ x: 0 }}
                                exit={{ x: "-100%" }}
                                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                                className="fixed top-0 left-0 bottom-0 w-[85%] max-w-[320px] bg-[#08080c] border-r border-white/10 z-[150] xl:hidden flex flex-col overflow-hidden shadow-2xl"
                            >
                                <div className="flex items-center justify-between p-4 border-b border-white/5">
                                    <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">System Logs</span>
                                    <button onClick={() => setIsMobileSidebarOpen(false)} className="p-2 text-white/40 hover:text-white transition-colors">
                                        <ChevronDown className="w-5 h-5 -rotate-90" />
                                    </button>
                                </div>
                                <div className="flex-1 overflow-y-auto custom-scrollbar">
                                    <SystemLog agents={agents} />
                                </div>
                            </motion.aside>
                        </>
                    )}
                </AnimatePresence>

                <aside
                    style={{ width: `${sidebarWidth}px`, minWidth: '300px' }}
                    className="hidden xl:flex relative bg-[#08080c] border-r border-emerald-500/10 flex-shrink-0 flex-col overflow-hidden"
                >
                    <div className="flex-1 overflow-y-auto custom-scrollbar">
                        <SystemLog agents={agents} />
                    </div>

                    {/* Vertical Resizer Handle */}
                    <div
                        onMouseDown={() => setIsResizingValue('horizontal')}
                        className="absolute right-0 top-0 w-1.5 h-full cursor-col-resize hover:bg-emerald-500/10 active:bg-emerald-500/20 transition-colors z-50 text-white"
                    />
                </aside>

                {/* Mobile Pull Tab - Visible when sidebar is closed */}
                {!isMobileSidebarOpen && (
                    <button
                        onClick={() => setIsMobileSidebarOpen(true)}
                        className="xl:hidden fixed left-0 top-1/2 -translate-y-1/2 z-[130] bg-white/[0.03] hover:bg-white/[0.05] border-y border-r border-white/10 rounded-r-xl p-2.5 text-white/20 hover:text-white/40 transition-all flex items-center justify-center group backdrop-blur-sm"
                    >
                        <ChevronRight className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        <div className="absolute left-full ml-2 px-2 py-1 rounded bg-black/80 border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                            <span className="text-[10px] font-black uppercase tracking-widest">System Logs</span>
                        </div>
                    </button>
                )}

                {/* Right Side: Active Agents Detailed View */}
                <main className="flex-1 overflow-y-auto custom-scrollbar bg-[#050507]">
                    <div className="px-4 sm:px-6 md:px-8 lg:px-12 py-6 md:py-10 max-w-7xl mx-auto">
                        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8 md:mb-12">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 w-full">
                                <div>
                                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white mb-1 md:mb-2 uppercase leading-none">
                                        Active AI Agents
                                    </h1>
                                    <p className="text-white/40 font-medium text-[10px] sm:text-sm md:text-lg uppercase tracking-widest truncate">Fleet Performance Metrics</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="p-3 md:p-4 bg-white/5 border border-white/10 rounded-xl md:rounded-2xl">
                                    <h3 className="text-[10px] font-bold text-white/20 uppercase tracking-widest mb-1">Fleet AUM</h3>
                                    <div className="text-xl md:text-2xl font-black text-emerald-400">
                                        ${totalAUM.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </div>
                                </div>
                            </div>
                        </header>

                        {/* Agents Grid */}
                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                            {agents.map((agent) => {
                                const isExpanded = expandedAgents.includes(agent.id);
                                return (
                                    <div
                                        key={agent.id}
                                        className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 hover:bg-white/[0.05] transition-all group relative flex flex-col h-full"
                                    >
                                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 sm:gap-6">
                                            <div className="flex items-center gap-4">
                                                <AgentAvatar id={agent.id} className="w-12 h-12 sm:w-14 sm:h-14" />
                                                <div>
                                                    <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight leading-tight mb-1.5 sm:mb-2">{agent.personality.name}</h2>
                                                    <div className="flex items-center gap-3">
                                                        <span className="text-[9px] sm:text-[10px] font-black text-emerald-400 uppercase tracking-widest bg-emerald-500/10 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg border border-emerald-500/20">
                                                            {agent.personality.riskTolerance}
                                                        </span>
                                                        <span className="text-[9px] sm:text-[10px] text-white/30 font-bold uppercase tracking-[0.2em]">NODE_{agent.id.slice(-1)}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-left sm:text-right mt-2 sm:mt-0">
                                                <p className="text-[9px] sm:text-[10px] font-bold text-white/30 uppercase tracking-[0.15em] mb-0.5 sm:mb-1.5">Portfolio Value</p>
                                                <div className="text-xl sm:text-2xl font-black text-white font-mono tracking-tighter">${(agent.totalValue ?? 0).toFixed(2)}</div>
                                            </div>
                                        </div>
                                        {/* Strategy Context */}
                                        <div className="mt-8 mb-6">
                                            <div className="text-[10px] font-black text-white/20 uppercase tracking-[0.25em] mb-4">Strategy Context</div>
                                            <p className="text-[13px] leading-relaxed text-white/80 font-medium mb-5 italic">
                                                "{agent.personality.memo}"
                                            </p>
                                            <div className="flex flex-wrap gap-2">
                                                {agent.personality.traits.map((trait, i) => (
                                                    <span key={i} className="text-[10px] text-white/40 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg uppercase font-bold tracking-tight">
                                                        {trait}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="mt-auto flex flex-col sm:flex-row sm:items-end justify-between gap-6 pt-6 border-t border-white/5">
                                            <div className="flex gap-8 sm:gap-10">
                                                <div>
                                                    <p className="text-[9px] sm:text-[10px] font-bold text-white/30 uppercase mb-1 sm:mb-2 tracking-widest">Total Trades</p>
                                                    <p className="text-base sm:text-lg font-black text-white">{(agent.trades ?? []).length}</p>
                                                </div>
                                                <div>
                                                    <p className="text-[9px] sm:text-[10px] font-bold text-white/30 uppercase mb-1 sm:mb-2 tracking-widest">vUSD Balance</p>
                                                    <p className="text-base sm:text-lg font-black text-white font-mono tracking-tight">${(agent.vUSD ?? 0).toFixed(0)}</p>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => toggleAgent(agent.id)}
                                                className={`flex items-center justify-center gap-3 px-5 py-2.5 rounded-xl text-[10px] sm:text-[11px] font-black uppercase tracking-widest transition-all w-full sm:w-auto ${isExpanded
                                                    ? 'bg-emerald-500 text-black shadow-[0_0_20px_rgba(16,185,129,0.2)]'
                                                    : 'bg-white/5 text-white/40 hover:bg-white/10 hover:text-white border border-white/10'
                                                    }`}
                                            >
                                                {isExpanded ? 'Hide Details' : 'View Exposure'}
                                                <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-90' : ''}`} />
                                            </button>
                                        </div>

                                        {/* Accordion Content */}
                                        <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-[2000px] mt-8 opacity-100' : 'max-h-0 opacity-0'}`}>
                                            <div className="space-y-10 pt-6 border-t border-white/5">
                                                {/* Live Positions */}
                                                <div>
                                                    <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.25em] mb-5">Live Position Distribution</p>
                                                    <div className="grid grid-cols-1 gap-3">
                                                        {(agent.tokenHoldings ?? []).length > 0 ? (
                                                            agent.tokenHoldings.map((holding, i) => (
                                                                <div key={i} className="px-5 py-4 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between group/holding hover:bg-emerald-500/5 hover:border-emerald-500/20 transition-all">
                                                                    <div className="flex items-center gap-4">
                                                                        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-xs font-black text-emerald-400 uppercase">
                                                                            {holding.tokenType.charAt(0)}
                                                                        </div>
                                                                        <div>
                                                                            <span className="text-[13px] font-bold text-white uppercase tracking-tight block">{holding.tokenType} Token</span>
                                                                            <span className="text-[10px] text-white/20 font-bold uppercase tracking-widest">Active Exposure</span>
                                                                        </div>
                                                                    </div>
                                                                    <div className="text-right">
                                                                        <span className="text-lg font-mono font-black text-emerald-400">{holding.quantity.toFixed(2)}</span>
                                                                        <p className="text-[9px] text-white/30 font-black uppercase tracking-tighter">Tokens</p>
                                                                    </div>
                                                                </div>
                                                            ))
                                                        ) : (
                                                            <div className="px-5 py-8 rounded-2xl border-2 border-dashed border-white/5 flex flex-col items-center justify-center gap-3">
                                                                <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">No Active Positions</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Memory Section */}
                                                <div>
                                                    <div className="flex items-center justify-between mb-5">
                                                        <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.25em]">Cognitive Memory Snapshot</p>
                                                        <span className="text-[9px] px-2 py-0.5 bg-white/5 rounded text-white/40 font-bold uppercase">Recent Decisions</span>
                                                    </div>
                                                    <div className="space-y-4">
                                                        {(agent.roundMemory ?? []).length > 0 ? (
                                                            agent.roundMemory.map((mem, i) => (
                                                                <div key={i} className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3">
                                                                    <div className="flex items-center justify-between">
                                                                        <div className="flex items-center gap-2">
                                                                            <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${mem.action === 'buy' ? 'bg-emerald-500/10 text-emerald-400' : mem.action === 'sell' ? 'bg-red-500/10 text-red-400' : 'bg-white/10 text-white/60'
                                                                                }`}>
                                                                                {mem.action}
                                                                            </span>
                                                                            <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest">{mem.strategyId}</span>
                                                                        </div>
                                                                        <span className="text-[9px] text-white/20 font-mono italic">
                                                                            {new Date(mem.timestamp).toLocaleTimeString()}
                                                                        </span>
                                                                    </div>
                                                                    <p className="text-[12px] leading-relaxed text-white/70 italic border-l-2 border-white/10 pl-4">
                                                                        "{mem.reasoning}"
                                                                    </p>
                                                                </div>
                                                            ))
                                                        ) : (
                                                            <div className="px-5 py-8 rounded-2xl border-2 border-dashed border-white/5 flex flex-col items-center justify-center gap-3">
                                                                <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">No Cognitive Trace Found</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Intelligence Section */}
                                                <div>
                                                    <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.25em] mb-5">Active Intelligence Layer</p>
                                                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                                                        {TRUSTED_DATA_SOURCES.slice(0, 3).map((ds, i) => (
                                                            <div key={i} className="p-3 rounded-xl bg-white/[0.03] border border-white/5 flex items-center gap-3 hover:bg-white/5 transition-all cursor-crosshair group/intel">
                                                                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center overflow-hidden p-1.5 shrink-0 group-hover/intel:border-emerald-500/20 border border-transparent">
                                                                    <img src={ds.icon} alt={ds.name} className="w-full h-full object-contain" />
                                                                </div>
                                                                <div className="flex flex-col min-w-0">
                                                                    <span className="text-[9px] font-black text-white uppercase truncate">{ds.ticker}</span>
                                                                    <span className="text-[8px] text-white/30 font-bold uppercase truncate tracking-tighter">Live Feed</span>
                                                                </div>
                                                            </div>
                                                        ))}
                                                        <div className="p-3 rounded-xl bg-white/[0.01] border border-dashed border-white/10 flex items-center justify-center">
                                                            <span className="text-[9px] font-black text-white/20 uppercase tracking-widest leading-none">
                                                                +{TRUSTED_DATA_SOURCES.length - 3} More
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
