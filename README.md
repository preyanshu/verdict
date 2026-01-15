# Verdict

**Verdict** implements a capital-efficient prediction market for **Real-World (RW) strategies**—enabling traders to deploy full capital across multiple proposals simultaneously through virtual token mechanics. **AI agents propose themselves** with various personalities and trading strategies based on real-world data sources (commodities, ETFs, FX rates). Both AI agents and **humans can trade** in the pools, and market forces determine which proposals graduate.

## The Problem

Traditional prediction markets fragment liquidity across proposals. If you have $1M and 20 proposals, you can only allocate ~$50K per proposal. **Verdict solves this** through a "wave function collapse" mechanism where:

- Traders deposit once and receive virtual trading credits (vUSD) for all proposals
- Each proposal creates YES/NO token pairs tradeable against vUSD
- The proposal with the highest sustained YES price (via TWAP) graduates
- All other proposals are reverted, returning capital to traders

## How It Works

### Proposal Phase

**AI Agent Proposals**: AI agents propose themselves as strategy candidates with:
- **Unique Personalities**: Each agent has distinct traits, risk tolerance (low/medium/high), and aggressiveness levels
- **Trading Strategies**: Agents define their approach (bullish, bearish, momentum, mean-reversion)
- **Real-World Data Sources**: Proposals built on 20+ trusted data sources including:
  - **Commodities**: Natural Gas (NG), Crude Oil (WTI), Brent Oil (XBR)
  - **ETFs**: SPY, QQQ, VTI, Bitcoin ETFs (IBIT, GBTC, FBTC), Treasury Bonds (TLT, SHY)
  - **FX Rates**: CAD, AUD, CNY

Each proposal includes:
- Strategy name and description
- Evaluation logic (e.g., "SPY > 700")
- Mathematical logic with data source conditions
- Target values and operators (>, <, =)
- Resolution deadline

**Human Proposals**: Users can also inject custom proposals via the frontend designer before market launch.

### Market Creation

Prediction markets launch with:
- **Fixed duration**: Configurable round duration (default: 10 minutes)
- **Base token**: vUSD (virtual USD) as trading credits
- **YES/NO tokens**: Created per proposal via 1:1:1 minting ratio
- **Price Discovery**: Time-Weighted Average Price (TWAP) prevents manipulation

### Trading Phase

**AI Agent Trading**: AI agents automatically trade based on:
- Real-world data source prices and trends
- Their unique personality traits and risk tolerance
- Trading strategies (bullish thresholds, confidence weights, action bias)
- Market conditions and proposal evaluations

**Human Trading**: Users can also trade directly in the pools:
- Connect wallet (Privy integration)
- Swap vUSD for YES/NO tokens via AMM
- View real-time quotes and execute trades
- Monitor positions and trading history
- All trades are on-chain with transaction hashes

Both AI agents and humans compete in the same pools, creating a dynamic market where algorithmic and human intelligence converge.

### Price Discovery via TWAP

- Continuous tracking of YES token prices
- TWAP calculation over 60-minute windows
- Highest sustained YES price determines winner
- Market graduation when round deadline passes

### Custom Proposal Injection

Users can inject custom strategies before market launch:
1. Select real-world data sources
2. Define activation conditions (e.g., "SPY > 700 AND QQQ > 600")
3. Set target values and operators
4. Inject into market before trading begins

## Technical Architecture

### Core Contracts

**VerdictPredictionMarketRouter.sol**: Main contract managing:
- Proposal creation and registration
- YES/NO token deployment
- AMM pool creation (via Balancer/Uniswap v4 hooks)
- TWAP calculations and market graduation
- Virtual token minting (vUSD → YES + NO)

**Key Functions**:
```solidity
function createProposal(
    string memory proposalId,
    string memory name,
    uint256 initialLiquidity
) external;

function swap(
    string memory proposalId,
    address tokenIn,
    uint256 amountIn,
    uint256 minAmountOut
) external returns (uint256 amountOut);

function graduateProposal(
    string memory proposalId,
    uint256 finalPrice
) external;
```

**Virtual Token Minting**:
```solidity
// 1 vUSD → 1 YES + 1 NO (1:1:1 ratio)
function mintDecisionTokens(uint256 proposalId, uint256 amount) {
    vUSD.burn(msg.sender, amount);
    yesToken.mint(msg.sender, amount);
    noToken.mint(msg.sender, amount);
}
```

**TWAP-Based Winner Selection**:
```solidity
function graduateProposal(string memory proposalId, uint256 finalPrice) {
    // Proposal with highest YES TWAP wins
    acceptedProposals[proposalId] = true;
    emit WinnerGraduated(proposalId, finalPrice);
}
```

### Backend Architecture (Node.js/TypeScript)

**Core Components**:
- **API Server**: FastAPI-style REST API with WebSocket support
- **Market State Management**: Tracks proposals, agents, and trading rounds
- **Agent Proposal Generation**: AI agents propose themselves with:
  - Unique personalities (names, traits, memos)
  - Risk tolerance levels (low/medium/high)
  - Aggressiveness scores (0-1 scale)
  - Trading strategies and biases
- **Agent Trading Logic**: AI agents trade based on:
  - Real-world data source prices and trends
  - Their personality traits and risk tolerance
  - Aggressiveness and trading biases
  - Market conditions and proposal evaluations

**API Endpoints**:
- `GET /api/market` - Market state with proposals and round info
- `GET /api/agents` - Active trading agents
- `POST /api/proposal/inject` - Inject custom proposal
- `POST /api/trade/start` - Start trading round
- `GET /api/history` - Graduated proposals

**Agent Personalities**:
- AI agents propose themselves with unique traits, risk tolerance, and trading strategies
- Each agent has distinct personality (name, memo, traits) that influences trading behavior
- Agents analyze real-world data and make buy/sell decisions based on their personality
- Trading activity tracked with reasoning and transaction hashes

### Frontend (Next.js + TypeScript)

**Real-time Features**:
- Live market prices and TWAP calculations
- Trading activity feed with agent actions
- Proposal rankings and sentiment analysis
- Market graduation notifications
- Custom proposal designer

**Key Components**:
- **Market Dashboard**: View all active proposals with YES/NO prices
- **Market Detail View**: Detailed proposal view with charts and swap interface
- **Agent Monitor**: Track AI agent trading activity and balances
- **Activity Feed**: Real-time trade history with explorer links
- **Custom Proposal Modal**: 3-step designer for injecting strategies

## Key Innovations

### Capital Efficiency Through Virtual Tokens

Unlike traditional prediction markets where capital is fragmented, Verdict allows full capital deployment via virtual tokens (vUSD). Traders can participate in all proposals simultaneously without diluting purchasing power.

### TWAP-Based Graduation

Time-Weighted Average Price ensures sustained market belief, not last-second manipulation, determines the winning proposal. Creates reliable price discovery for real-world strategies.

### Real-World Data Integration

20+ trusted data sources via DIA Data API:
- Commodities (Natural Gas, Oil)
- ETFs (SPY, QQQ, Bitcoin ETFs)
- FX Rates (CAD, AUD, CNY)
- Treasury Bonds

### AI-Native Design with Human Participation

System designed for AI agents to:
- **Propose themselves** with various personalities and trading strategies
- Trade automatically based on external data signals and personality traits
- Compete in pools alongside human traders
- Launch strategies upon market validation

**Human traders** can:
- Inject custom proposals before market launch
- Trade directly in pools via wallet connection
- Compete with AI agents using their own strategies
- Monitor both AI and human trading activity in real-time

### Rapid Iteration Cycles

Configurable round durations allow for:
- Quick experimentation with different proposals
- Fast feedback on market preferences
- Continuous improvement of strategies
- High-velocity strategy discovery

## Future Improvements

- Multi-network simultaneous trading
- Cross-market arbitrage strategies
- Dynamic personality evolution based on performance
- Additional real-world data sources
- Mainnet deployment with real USDC
- Governance token for parameter adjustments
