import { createPublicClient, http, formatUnits, parseAbi, parseUnits, parseGwei } from 'viem';
import abiData from './abi.json';
import { NETWORK_CONFIG, CONTRACT_ADDRESSES, GAS_CONFIG } from './config';

// Re-export router address for backward compatibility
export const ROUTER_ADDRESS = CONTRACT_ADDRESSES.router;

// Chain definition built from config
export const quantumEVM = {
    id: NETWORK_CONFIG.chainId,
    name: NETWORK_CONFIG.chainName,
    network: NETWORK_CONFIG.networkSlug,
    nativeCurrency: {
        decimals: NETWORK_CONFIG.nativeCurrency.decimals,
        name: NETWORK_CONFIG.nativeCurrency.name,
        symbol: NETWORK_CONFIG.nativeCurrency.symbol,
    },
    rpcUrls: {
        public: { http: [NETWORK_CONFIG.rpcUrl] },
        default: { http: [NETWORK_CONFIG.rpcUrl] },
    },
    blockExplorers: {
        default: {
            name: NETWORK_CONFIG.explorerName,
            url: NETWORK_CONFIG.explorerUrl,
        },
    },
} as const;

export const publicClient = createPublicClient({
    chain: quantumEVM,
    transport: http(NETWORK_CONFIG.rpcUrl),
});

export const verdictAbi = abiData;

export const getVUSDCBalance = async (address: string): Promise<string> => {
    try {
        const balance = await publicClient.readContract({
            address: ROUTER_ADDRESS as `0x${string}`,
            abi: verdictAbi,
            functionName: 'getVUSDCBalance',
            args: [address as `0x${string}`],
        });

        return formatUnits(balance as bigint, 18);
    } catch (error) {
        console.error('Error fetching vUSDC balance:', error);
        return '0.00';
    }
};

export const claimFaucet = async (walletClient: any): Promise<`0x${string}`> => {
    const [address] = await walletClient.getAddresses();

    // Use direct writeContract with explicit gas price from config
    return await walletClient.writeContract({
        account: address,
        address: ROUTER_ADDRESS as `0x${string}`,
        abi: verdictAbi,
        functionName: 'userFaucet',
        chain: quantumEVM,
        gasPrice: parseGwei(GAS_CONFIG.gasPriceGwei),
    });
};

export const getVUSDCTokenAddress = async (): Promise<`0x${string}`> => {
    return await publicClient.readContract({
        address: ROUTER_ADDRESS as `0x${string}`,
        abi: verdictAbi,
        functionName: 'vUSDCToken',
    }) as `0x${string}`;
};

export const getYesTokenAddress = async (proposalId: string): Promise<`0x${string}`> => {
    return await publicClient.readContract({
        address: ROUTER_ADDRESS as `0x${string}`,
        abi: verdictAbi,
        functionName: 'getYesTokenAddress',
        args: [proposalId],
    }) as `0x${string}`;
};

export const getSwapQuote = async (proposalId: string, tokenIn: string, amountIn: string): Promise<string> => {
    if (!amountIn || isNaN(Number(amountIn)) || Number(amountIn) <= 0) return '0.00';
    try {
        const quote = await publicClient.readContract({
            address: ROUTER_ADDRESS as `0x${string}`,
            abi: verdictAbi,
            functionName: 'getSwapQuote',
            args: [proposalId, tokenIn as `0x${string}`, parseUnits(amountIn, 18)],
        });
        return formatUnits(quote as bigint, 18);
    } catch (error) {
        console.error('Error getting swap quote:', error);
        return '0.00';
    }
};

export const executeSwap = async (
    walletClient: any,
    proposalId: string,
    tokenIn: string,
    amountIn: string | bigint,
    minAmountOut: string
): Promise<`0x${string}`> => {
    const [address] = await walletClient.getAddresses();

    const finalAmountIn = typeof amountIn === 'bigint' ? amountIn : parseUnits(amountIn, 18);

    // Use direct writeContract with explicit gas price from config
    return await walletClient.writeContract({
        account: address,
        address: ROUTER_ADDRESS as `0x${string}`,
        abi: verdictAbi,
        functionName: 'swap',
        args: [proposalId, tokenIn as `0x${string}`, finalAmountIn, parseUnits(minAmountOut, 18)],
        chain: quantumEVM,
        gasPrice: parseGwei(GAS_CONFIG.gasPriceGwei),
    });
};

export const getYESBalance = async (proposalId: string, address: string): Promise<string> => {
    try {
        const balance = await publicClient.readContract({
            address: ROUTER_ADDRESS as `0x${string}`,
            abi: verdictAbi,
            functionName: 'getYESBalance',
            args: [proposalId, address as `0x${string}`],
        });

        return formatUnits(balance as bigint, 18);
    } catch (error) {
        console.error('Error fetching YES balance:', error);
        return '0.00';
    }
};

export const getRawYESBalance = async (proposalId: string, address: string): Promise<bigint> => {
    try {
        const balance = await publicClient.readContract({
            address: ROUTER_ADDRESS as `0x${string}`,
            abi: verdictAbi,
            functionName: 'getYESBalance',
            args: [proposalId, address as `0x${string}`],
        });
        return balance as bigint;
    } catch (error) {
        console.error('Error fetching raw YES balance:', error);
        return BigInt(0);
    }
};

const erc20Abi = parseAbi([
    'function allowance(address owner, address spender) view returns (uint256)',
    'function approve(address spender, uint256 amount) returns (bool)',
    'function balanceOf(address account) view returns (uint256)',
]);

export const getAllowance = async (tokenAddress: string, owner: string, spender: string): Promise<bigint> => {
    try {
        return await publicClient.readContract({
            address: tokenAddress as `0x${string}`,
            abi: erc20Abi,
            functionName: 'allowance',
            args: [owner as `0x${string}`, spender as `0x${string}`],
        }) as bigint;
    } catch (error) {
        console.error('Error fetching allowance:', error);
        return BigInt(0);
    }
};

export const approveToken = async (
    walletClient: any,
    tokenAddress: string,
    spender: string,
    amount: bigint = BigInt("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff")
): Promise<`0x${string}`> => {
    const [address] = await walletClient.getAddresses();

    // Use direct writeContract with explicit gas price from config
    return await walletClient.writeContract({
        account: address,
        address: tokenAddress as `0x${string}`,
        abi: erc20Abi,
        functionName: 'approve',
        args: [spender as `0x${string}`, amount],
        chain: quantumEVM,
        gasPrice: parseGwei(GAS_CONFIG.gasPriceGwei),
    });
};
