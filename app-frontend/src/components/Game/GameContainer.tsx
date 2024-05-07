import {useEffect, useState} from "react";
import GameCanvas from "./GameCanvas";
import axios from "axios";
import {useGlobalStore} from "../../store/useGlobalStore";
import ModalSelectNft from "./ModalSelectNft";
import {TW} from "../../tronweb";
import {notifications} from "@mantine/notifications";
import {useNavigate, useParams} from "react-router-dom";
import {GameDrawer} from "./GameDrawer/GameDrawer.tsx";
import {useDisclosure} from "@mantine/hooks";
import {ActionIcon} from "@mantine/core";
import {IconCategory} from "@tabler/icons-react";
import useTronConnect from "../../utils/useTronConnect";

const GameContainer = () => {
    const [isShowModal, setIsShowModal] = useState<boolean>(false)
    const [selectedCoordinate, setSelectedCoordinate] = useState<any>('')
    const {setNfts} = useGlobalStore()
    const navigate = useNavigate()
    const {id} = useParams()
    const {account} = useTronConnect()
    const [opened, {open, close}] = useDisclosure(false);

    useEffect(() => {
        const getDbNfts = async () => {
            try {
                const {data} = await axios.get(`${import.meta.env.VITE_EXPRESS}/nfts`, {
                    params: {walletAddress: id}
                })
                setNfts(data)
                // await gameScene?.setImages({nfts: data, isLoading: false})
            } catch (e) {
                console.log(e)
            }
        }
        if (id) getDbNfts()
    }, [id]);

    useEffect(() => {
        if (!(id && TW.isAddress(id))) {
            notifications.show({
                title: 'Error!',
                message: `Wrong Wallet Address!`,
                color: 'red'
            })
            navigate('/')
        }
    }, [id]);

    return (
        <>
            {account &&
                <>
                    <GameDrawer opened={opened} open={open} close={close}/>
                    <ActionIcon variant={'default'} pos={'absolute'} left={5} top={5} size={40} onClick={open}>
                        <IconCategory/>
                    </ActionIcon>
                </>
            }

            {window.tronWeb &&
                <ModalSelectNft/>
            }

            <GameCanvas
                setSelectedCoorinate={setSelectedCoordinate}
                setIsShowModal={setIsShowModal}
            />
        </>
    );
}

export default GameContainer;