import {useEffect, useState} from "react";
import {TW} from "../tronweb";
import TRC20_ABI from "./TRC20_ABI.json";

export const WIN_ADDRESS = 'TU2T8vpHZhCNY8fXGVaHyeZrKm8s6HEXWe'
export const USDJ_ADDRESS = 'TLBaRhANQoJFTqre9Nf1mjuwNWjCJeYqUL'
export const JST_ADDRESS = 'TF17BgPaZYbz8oxbjhriubPDsA7ArKoLX3'

export const USDT_ADDRESS = 'TXLAQ63Xg1NAzckPwKHvzw7CSEmLMEqcdj'


const useTronConnect = () => {
    const [account, setAccount] = useState('');
    const [isConnected, setIsConnected] = useState(false);
    const [chainId, setChainId] = useState('');
    const [isLoadingWalletConnect, setIsLoadingWalletConnect] = useState(true)
    const [tokenBalances, setTokenBalances] = useState<any>()
    const [nativeBalance, setNativeBalance] = useState<any>()

    useEffect(() => {
        if (window.tronWeb && window.tronWeb.isTronLink) {
            setIsLoadingWalletConnect(false)
        } else if (!window.tronWeb) {
            setIsLoadingWalletConnect(false)
        }
    }, []);

    const handleConnect = async () => {
        const {code} = await window?.tronWeb?.request({method: 'tron_requestAccounts'});
        code && code !== 200 && console.log(code);
        setAccount(window?.tronWeb.defaultAddress?.base58 || '');
    };

    const getTokenBalance = async ({
                                       tokenAddress,
                                       walletAddress,
                                       chain,
                                       name
                                   }: {
        tokenAddress: string,
        walletAddress: string,
        chain: any,
        name: string
    }) => {
        if (chain === 'NILE') {
            const instance = await TW.contract(TRC20_ABI, tokenAddress);
            const balance = await instance.balanceOf(walletAddress).call();
            const decimals = await instance.decimals().call();
            setTokenBalances((prev: any) => ({
                ...prev,
                [name]: {
                    address: tokenAddress,
                    balance: balance / 10 ** decimals
                }
            }))
        }
    }

    const getNativeBalance = async ({walletAddress, chain}: any) => {
        if (chain === 'NILE') {
            const balance = await TW.trx.getBalance(walletAddress);
            setNativeBalance(balance / 10**6)
        }
    }

    const getAllTokensBalance = () => {
        getTokenBalance({
            tokenAddress: USDJ_ADDRESS,
            walletAddress: window?.tronWeb?.defaultAddress.base58,
            chain: 'NILE',
            name: 'USDJ'
        })

        getTokenBalance({
            tokenAddress: WIN_ADDRESS,
            walletAddress: window?.tronWeb?.defaultAddress.base58,
            chain: 'NILE',
            name: 'WIN'
        })

        getTokenBalance({
            tokenAddress: JST_ADDRESS,
            walletAddress: window?.tronWeb?.defaultAddress.base58,
            chain: 'NILE',
            name: 'JST'
        })

        getTokenBalance({
            tokenAddress: USDT_ADDRESS,
            walletAddress: window?.tronWeb?.defaultAddress.base58,
            chain: 'NILE',
            name: 'USDT'
        })

        getNativeBalance({
            walletAddress: window?.tronWeb?.defaultAddress.base58,
            chain: 'NILE',
        })
    }

    useEffect(() => {
        if (window?.tronWeb?.defaultAddress) {
            setAccount(window?.tronWeb.defaultAddress?.base58 || '');
            setIsConnected(true)
        }

        window.addEventListener('message', (e) => {
            if (!e.data?.isTronLink) return
            const {action, data} = e.data.message

            if (action === 'accountsChanged') {
                setAccount(data.address);
                setIsConnected(true);
            } else if (action === 'disconnect' || action === "disconnectWeb") {
                setIsConnected(false);
                setAccount('');
                setChainId('')
            } else if (action === 'setNode') {
                setChainId(data.node.chainId)
            } else if (action === 'connect') {
                setIsConnected(true)
            } else if (action === 'tabReply') {
                const user = data.data
                if (user.isAuth != undefined) {
                    setIsConnected(user.isAuth == 'true')
                }
                if (user?.node?.chainId)
                    setChainId(user.node.chainId)
            }
        });
    }, []);

    return {setNativeBalance, setTokenBalances, getAllTokensBalance: getAllTokensBalance, nativeBalance, isLoadingWalletConnect, tokenBalances, account, handleConnect, isConnected, chainId, tronWeb: window?.tronWeb, tronLink: window?.tronLink};
};

export default useTronConnect