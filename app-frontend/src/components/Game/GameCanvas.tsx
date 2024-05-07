import {useEffect, useRef, useState} from 'react'
import {HomeScene} from "./HomeScene";
import {Badge, Card, Flex} from "@mantine/core";
import {useNavigate, useParams} from "react-router-dom";
import {WalletInfo} from "./WalletInfo.tsx";
import {useGlobalStore} from "../../store/useGlobalStore";
import useTronConnect from "../../utils/useTronConnect";
import {HOUSE_BUY_CONTRACT_ABI} from "../../utils/abis";
import {HOUSE_BUY_CONTRACT_ADDRESS} from "../../utils/contractAdresses";
import {coordinates, RADIUS} from "../../babylon/lib/constants";
import {TW} from "../../tronweb";

const GameCanvas = ({setSelectedCoorinate, setIsShowModal}: {
    setSelectedCoorinate: (_?: any) => void,
    setIsShowModal: (_?: any) => void,
}) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [isShowInfoModal, setIsShowInfoModal] = useState<boolean>(false)
    const navigate = useNavigate()
    const {nfts, gameScene, setGameScene, setHousesCount, housesCount} = useGlobalStore()
    const {account} = useTronConnect()
    const {id} = useParams()

    const setPlaneImages = async (nfts: any) => {
        // @ts-ignore
        await gameScene?.setImages({nfts: nfts})
    }

    const createScene = async () => {
        if (canvasRef === null) return;
        const getHouses = async () => {
            const instance = await TW.contract(HOUSE_BUY_CONTRACT_ABI, HOUSE_BUY_CONTRACT_ADDRESS);
            const housesCount = await instance.userBuildings(id).call()
            setHousesCount(parseInt(housesCount))
            return parseInt(housesCount)
        }

        getHouses().then(async (e) => {
            let newCoordinates = [...coordinates.map((item, index) => ({
                index: index,
                x_min: item?.xp - RADIUS,
                x_max: item?.xp + RADIUS,
                z_min: item?.zp - RADIUS,
                z_max: item?.zp + RADIUS,
                ...item,
            }))]
            for (let i = 1; i < e; i++) {
                newCoordinates = [...newCoordinates, ...coordinates.map((item, index) => ({
                    index: (i * 10) + index,
                    x_min: item?.xp - RADIUS + (i * 35),
                    x_max: item?.xp + RADIUS + (i * 35),
                    z_min: item?.zp - RADIUS,
                    z_max: item?.zp + RADIUS,
                    ...item,
                    xp: item.xp + (i * 35),
                }))]
            }
            // @ts-ignore
            const scene = new HomeScene(canvasRef.current!, {debug: true});
            // @ts-ignore
            await scene?.initialize({
                setIsShowInfoModal: setIsShowInfoModal,
                setIsShowModal: setIsShowModal,
                setSelectedObjectName: setSelectedCoorinate,
                coordinates: newCoordinates
            });
            setGameScene(scene)
        })
    }

    useEffect(() => {
        // @ts-ignore
        if (gameScene && gameScene.deleteAllPlans) {
            // @ts-ignore
            gameScene.deleteAllPlans()
            // @ts-ignore
            gameScene.deleteAllPlans()
            setPlaneImages(nfts)
        }
    }, [nfts, gameScene])

    useEffect(() => {
        if (canvasRef && id) {
            createScene()
        }
    }, [canvasRef, id]);

    return (
        <>
            <WalletInfo/>
            {isShowInfoModal && (account && id === account) &&
                <Card
                    style={{
                        position: 'absolute',
                        transform: 'translateX(50%)',
                        right: '50%',
                        top: 80
                    }}
                >
                    <Flex gap="3" align="center">
                        <Badge color="bronze">Press E</Badge>
                    </Flex>
                </Card>
            }
            <canvas id={'renderCanvas'} ref={canvasRef}/>
        </>
    )
};

export default GameCanvas
