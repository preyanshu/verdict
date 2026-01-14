export interface MarketStrategy {
    id: string;
    name: string;
    description: string; // Strategy definition (e.g., "S&P 500 exceeds $700")
    evaluationLogic: string; // Clear human-readable logic for frontend display
    mathematicalLogic: string; // Exact mathematical formula (e.g., "price > 700")
    usedDataSources: Array<{
        id: number;
        currentValue: number;
        targetValue: number;
        operator?: string;
    }>;
    resolutionDeadline: number; // Timestamp when the strategy should be verified
    // Shared liquidity pool: YES tokens * NO tokens = k (constant product)
    yesToken: {
        tokenReserve: number; // YES tokens in the pool
        volume: number;
        history: Array<{ price: number; timestamp: number }>;
        twap: number; // Time-Weighted Average Price
        twapHistory: Array<{ twap: number; timestamp: number }>;
    };
    noToken: {
        tokenReserve: number; // NO tokens in the pool
        volume: number;
        history: Array<{ price: number; timestamp: number }>;
        twap: number; // Time-Weighted Average Price
        twapHistory: Array<{ twap: number; timestamp: number }>;
    };
    timestamp: number;
    resolved: boolean;
    winner: 'yes' | 'no' | null;
}

// Market state with multiple strategies
export interface MarketState {
    strategies: MarketStrategy[];
    timestamp: number;
    roundNumber: number;
    roundStartTime: number;
    roundEndTime: number;
    roundDuration: number; // in milliseconds
    roundsUntilResolution: number;
    lastRoundEndTime: number | null;
    isExecutingTrades: boolean;
    isMakingBatchLLMCall: boolean;
}

export type StrategyType = 'yes-no' | 'twap' | 'momentum' | 'mean-reversion';

export interface AgentPersonality {
    name: string;
    riskTolerance: 'low' | 'medium' | 'high';
    aggressiveness: number; // 0-1
    memo: string;
    traits: string[];
}

export interface AgentTokenHoldings {
    strategyId: string;
    tokenType: 'yes' | 'no';
    quantity: number;
}

export interface AgentRoundMemory {
    action: 'buy' | 'sell' | 'hold';
    strategyId: string;
    tokenType: 'yes' | 'no';
    quantity: number;
    price: number;
    reasoning: string;
    timestamp: number;
}

export interface Agent {
    id: string;
    personality: AgentPersonality;
    strategy: StrategyType;
    vUSD: number; // Balance (starts at 100)
    tokenHoldings: AgentTokenHoldings[];
    trades: Array<{
        type: 'buy' | 'sell';
        strategyId: string;
        tokenType: 'yes' | 'no';
        price: number;
        quantity: number;
        timestamp: number;
        reasoning?: string;
    }>;
    roundMemory: AgentRoundMemory[];
    totalValue?: number; // Calculated on server
}

export interface TradeDecision {
    agentId: string;
    action: 'buy' | 'sell' | 'hold';
    strategyId: string;
    tokenType: 'yes' | 'no';
    quantity: number;
    price: number;
    reasoning: string;
}
