import useTronConnect from "../../../utils/useTronConnect.ts";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {HOUSE_BUY_CONTRACT_ABI, NFT_MINT_CONTRACT_ABI, TRC20_ABI} from "../../../utils/abis.ts";
import {
    HOUSE_BUY_CONTRACT_ADDRESS,
    NFT_MINT_CONTRACT_ADDRESS,
    USDT_TESTNET_CONTRACT_ADDRESS
} from "../../../utils/contractAdresses.ts";
import {Badge, Button, Flex, Grid, Paper} from "@mantine/core";
import {IconHome} from "@tabler/icons-react";
import {notifications} from "@mantine/notifications";

export const BuyNewHouse = () => {
    const {account, isLoadingWalletConnect, handleConnect} = useTronConnect()
    const [housesCount, setHousesCount] = useState(0)
    const [allowance, setAllowance] = useState(0)
    const {id} = useParams()
    const [isLoadingApprove, setIsLoadingApprove] = useState(false)
    const [isLoadingABuyHouse, setIsLoadingBuyHouse] = useState(false)

    useEffect(() => {
        const getHouses = async () => {
            const instance = await window.tronWeb.contract(HOUSE_BUY_CONTRACT_ABI, HOUSE_BUY_CONTRACT_ADDRESS);
            const housesCount = await instance.userBuildings(account).call()
            setHousesCount(parseInt(housesCount))
        }
        const checkUSDTAllowance = async () => {
            const instance = await window.tronWeb.contract(TRC20_ABI, USDT_TESTNET_CONTRACT_ADDRESS);
            const allowanceAmount = await instance.allowance(account, HOUSE_BUY_CONTRACT_ADDRESS).call()
            setAllowance(allowanceAmount / 10 ** 6)
        }
        if (id && account) {
            getHouses()
            checkUSDTAllowance()
        }
    }, [id, account]);


    const approve = async () => {
        try {
            const instanceBalance = await window.tronWeb.contract(NFT_MINT_CONTRACT_ABI, NFT_MINT_CONTRACT_ADDRESS);
            await instanceBalance.balanceOf(account).call();

            setIsLoadingApprove(true)
            const instance = await window.tronWeb.contract(TRC20_ABI, USDT_TESTNET_CONTRACT_ADDRESS);
            const tx = await instance.approve(HOUSE_BUY_CONTRACT_ADDRESS, 100 * (10 ** 6)).send({
                feeLimit: 100000000
            })
            setIsLoadingApprove(false)
            setAllowance(110)
            notifications.show({
                title: 'Success!',
                message: `Successful apptove!`,
                color: 'green'
            })
        } catch (e) {
            console.log(e)
            setIsLoadingApprove(false)
            notifications.show({
                title: 'Error!',
                message: e === 'Smart contract is not exist.'
                    ? 'Please switch to NILE Testnet!'
                    : "Upload error!",
                color: 'red'
            })
        }
    }

    const buyHouse = async () => {
        setIsLoadingBuyHouse(true)
        try {
            const instanceBalance = await window.tronWeb.contract(NFT_MINT_CONTRACT_ABI, NFT_MINT_CONTRACT_ADDRESS);
            await instanceBalance.balanceOf(account).call();

            const instance = await window.tronWeb.contract(HOUSE_BUY_CONTRACT_ABI, HOUSE_BUY_CONTRACT_ADDRESS);
            const tx = await instance.buyBuilding().send({
                feeLimit: 100000000
            })
            setIsLoadingBuyHouse(false)
            setHousesCount(housesCount + 1)
            notifications.show({
                title: 'Success!',
                message: `Successful apptove!`,
                color: 'green'
            })
            window.location.reload()
        } catch (e) {
            console.log(e)
            setIsLoadingBuyHouse(false)
            notifications.show({
                title: 'Error!',
                message: e === 'Smart contract is not exist.'
                    ? 'Please switch to NILE Testnet!'
                    : "Upload error!",
                color: 'red'
            })
        }
    }

    return <>
        {!window.tronWeb && !isLoadingWalletConnect &&
            <Badge
                variant="filled"
                style={{zIndex: 1000, position: 'absolute', top: 30, right: 20}}
                color="red"
            >
                Tron Wallet not available
            </Badge>
        }

        {window.tronWeb && !account && !isLoadingWalletConnect &&
            <Badge
                variant="filled"
                style={{zIndex: 1000, position: 'absolute', top: 30, right: 20}}
                color="red"
            >
                Please connect Tron Wallet
            </Badge>
        }

       <Paper p={10} withBorder shadow={'md'} mb={30}>
           <Flex direction={'column'}  gap={20}>
               <Button loading={isLoadingApprove} fullWidth onClick={approve} disabled={allowance >= 100}>
                   Approve
               </Button>
               <Button loading={isLoadingABuyHouse} fullWidth onClick={buyHouse} disabled={allowance < 100}>
                   Buy new house
               </Button>
           </Flex>
       </Paper>

        <Paper>
            <Grid>
                {Array.from({length: housesCount}).map((house, index) =>
                    <Grid.Col span={3}>
                        <Paper withBorder shadow={'md'} p={10}>
                            <Flex direction={'column'} align={'center'} justify={'space-between'}>
                                <IconHome size={50}/>
                                <Badge>
                                    #{index + 1}
                                </Badge>
                            </Flex>
                        </Paper>
                    </Grid.Col>
                )}
            </Grid>
        </Paper>
    </>
}