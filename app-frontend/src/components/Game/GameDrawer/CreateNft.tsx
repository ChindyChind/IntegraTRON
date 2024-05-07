import {useState} from "react";
import useTronConnect from "../../../utils/useTronConnect.ts";
import {useField} from "@mantine/form";
import axios from "axios";
import {NFT_MINT_CONTRACT_ABI} from "../../../utils/abis.ts";
import {NFT_MINT_CONTRACT_ADDRESS} from "../../../utils/contractAdresses.ts";
import {notifications} from "@mantine/notifications";
import {Badge, Box, Button, Card, ColorInput, Flex, NumberInput, TextInput} from "@mantine/core";
import {ReactPainter} from "../../canvas/ReactPainter.tsx";
import {convertBlobToByteArray} from "../../../utils/utils.ts";

export const CreateNft = ({activeTab}: { activeTab: any }) => {
    const [isShowCanvas, setIsShowCanvas] = useState(true)
    const [isLoadingUpload, setIsLoadingUpload] = useState(false)
    const {account, chainId, isLoadingWalletConnect, handleConnect} = useTronConnect()

    const name = useField({
        initialValue: '',
        validateOnChange: false,
        validate: (e) => e !== '' ? null : "Please enter NFT name!",
    });

    const clearCanvas = () => {
        setIsShowCanvas(false)
        setTimeout(() => {
            setIsShowCanvas(true)
        }, 0.1)
    }

    const handlerUploadToBTFS = async (byteArray: any, fileType: any) => {
        setIsLoadingUpload(true)
        try {
            const instanceBalance = await window.tronWeb.contract(NFT_MINT_CONTRACT_ABI, NFT_MINT_CONTRACT_ADDRESS);
            await instanceBalance.balanceOf(account).call();

            const resUploadFile = await axios.post('https://nft-backend.btfs.io/api/upload', {
                content: byteArray,
                size: byteArray.length,
                address: account,
                type: fileType,
                name: `${name.getValue()}_IMAGE`
            })

            const metadata = {
                name: name.getValue(),
                image: resUploadFile?.data?.data?.file_hash
            }

            const objectString = JSON.stringify(metadata);
            const textEncoder = new TextEncoder();
            const metadataValueBuffer = Object.values(textEncoder.encode(objectString));

            const resUploadMetadata = await axios.post('https://nft-backend.btfs.io/api/upload', {
                content: metadataValueBuffer,
                size: metadataValueBuffer.length,
                address: account,
                type: "application/json",
                name: `${name.getValue()}_JSON`
            })

            const instance = await window.tronWeb.contract(NFT_MINT_CONTRACT_ABI, NFT_MINT_CONTRACT_ADDRESS);
            const txID = await instance.mintWithTokenURI(resUploadMetadata?.data?.data?.file_hash).send({
                feeLimit: 100000000
            })

            await window.tronWeb.trx.getTransaction(txID);

            setIsLoadingUpload(false)
            notifications.show({
                title: 'Success!',
                message: `Successful upload!`,
                color: 'green'
            })
            clearCanvas()
            name.setValue('')
        } catch (e: any) {
            console.log(e)
            setIsLoadingUpload(false)
            notifications.show({
                title: 'Error!',
                message: e === 'Smart contract is not exist.'
                    ? 'Please switch to NILE Testnet!'
                    : "Upload error!",
                color: 'red'
            })
        }
    }

    return <Box>
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

        {isShowCanvas &&
            <ReactPainter
                width={330}
                initialLineWidth={5}
                initialColor={'black'}
                initialLineCap={'round'}
                initialLineJoin={'round'}
                height={330}
                onSave={blob => {
                    name.validate().then((e) => {
                        convertBlobToByteArray(blob, (x: any) => {
                            if (!e) handlerUploadToBTFS(Object.values(x), blob.type)
                        })
                    })

                }}
                render={({canvas, triggerSave, setColor, setLineWidth, getCanvasProps}) => (
                    <Card>
                        <Flex gap={10} direction={'column'}>
                            <Flex gap={10}>
                                <NumberInput
                                    disabled={!account || isLoadingUpload}
                                    placeholder="Line width"
                                    min={1}
                                    defaultValue={5}
                                    onChange={(e) => {
                                        console.log(e)
                                        setLineWidth(parseInt(e.toString()))
                                    }}
                                />
                                <ColorInput defaultValue={'black'} disabled={!account || isLoadingUpload} disallowInput
                                            onChange={e => setColor(e)}/>
                            </Flex>

                            <div>{canvas}</div>

                            <TextInput
                                disabled={!account || isLoadingUpload}
                                label="NFT name"
                                placeholder="Enter name"
                                {...name.getInputProps()}
                            />

                            <Flex gap={10}>
                                <Button
                                    loading={!account || isLoadingUpload}
                                    fullWidth
                                    color={'red'}
                                    onClick={clearCanvas}
                                >
                                    Reset
                                </Button>
                                <Button
                                    loading={!account || isLoadingUpload} fullWidth onClick={triggerSave}>Save
                                    Canvas</Button>
                            </Flex>
                        </Flex>
                    </Card>
                )}
            />
        }
    </Box>
}