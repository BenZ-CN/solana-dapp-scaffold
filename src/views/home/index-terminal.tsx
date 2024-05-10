// Next, React
import { FC, useEffect, useState } from 'react';
import Link from 'next/link';

// Wallet
import { useWallet, useConnection } from '@solana/wallet-adapter-react';

// Components
import { RequestAirdrop } from '../../components/RequestAirdrop';
import pkg from '../../../package.json';

// Store
import useUserSOLBalanceStore from '../../stores/useUserSOLBalanceStore';

export const HomeView: FC = ({ }) => {
    const wallet = useWallet();
    const { connection } = useConnection();

    const balance = useUserSOLBalanceStore((s) => s.balance)
    const { getUserSOLBalance } = useUserSOLBalanceStore()

    useEffect(() => {
        if (wallet.publicKey) {
            console.log(wallet.publicKey.toBase58())
            getUserSOLBalance(wallet.publicKey, connection)
        }
    }, [wallet.publicKey, connection, getUserSOLBalance])

    // https://terminal.jup.ag/
    return (
        <div className="md:hero mx-auto p-4">
            <div id="integrated-terminal"></div>
            <button
                className="px-8 m-2 btn animate-pulse bg-gradient-to-br from-indigo-500 to-fuchsia-500 hover:from-white hover:to-purple-300 text-black"
                onClick={() => {
                    window.Jupiter.init({
                        // displayMode: "widget",
                        // displayMode: "integrated",
                        // integratedTargetId: "integrated-terminal",
                        endpoint: "https://api.mainnet-beta.solana.com",
                        onSuccess: ({ txid, swapResult }) => {
                            console.log({ txid, swapResult });
                        },
                        onSwapError: ({ error }) => {
                            console.log('onSwapError', error);
                        },
                        // containerStyles: { zIndex: 100 },
                        // containerStyles: { maxHeight: '90vh' },
                        // containerClassName: 'max-h-[90vh] lg:max-h-[600px]',
                        // endpoint: RPC_ENDPOINT,
                        strictTokenList: false,
                        // formProps: {
                        //     fixedoutputMint: true,
                        //     initialAmount: "8888888800",
                        //     initialInputMint: "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263",
                        //     initialoutputMint: "AZSHEMXd",
                        // }
                    });
                }}
            >
                <span>Launch Jupiter Terminal</span>
            </button>
        </div>
    );
};
