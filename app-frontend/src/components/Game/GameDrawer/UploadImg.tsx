import {useState} from "react";
import useTronConnect from "../../../utils/useTronConnect.ts";
import axios from "axios";
import {NFT_MINT_CONTRACT_ABI} from "../../../utils/abis.ts";
import {NFT_MINT_CONTRACT_ADDRESS} from "../../../utils/contractAdresses.ts";
import {notifications} from "@mantine/notifications";
import {Badge, Box, Button, FileInput, Flex, Image, LoadingOverlay, Paper, TextInput} from "@mantine/core";
import {fileToByteArray} from "../../../utils/utils.ts";

export const UploadImg = () => {
    const [value, setValue] = useState<File | null>(null);
    const [valueBuffer, setValueBuffer] = useState<number[]>([]);
    const [isLoadingUpload, setIsLoadingUpload] = useState(false)
    const {account, isLoadingWalletConnect, handleConnect} = useTronConnect()
    const [name, setName] = useState('')

    const handlerUploadToBTFS = async () => {
        setIsLoadingUpload(true)
        try {
            const instanceBalance = await window.tronWeb.contract(NFT_MINT_CONTRACT_ABI, NFT_MINT_CONTRACT_ADDRESS);
            await instanceBalance.balanceOf(account).call();

            const resUploadFile = await axios.post('https://nft-backend.btfs.io/api/upload', {
                content: valueBuffer,
                size: valueBuffer.length,
                address: account,
                type: value?.type,
                name: `${name}_IMAGE`
            })

            const metadata = {
                name: name,
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
                name: `${name}_JSON`
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
            setValue(null)
            setValueBuffer([])
        } catch (e) {
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

    return <Box ml={5}>
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

        <Paper>
            <Flex direction={'column'} gap={10}>
                <TextInput
                    w={'100%'}
                    disabled={!account || isLoadingUpload}
                    placeholder="Name"
                    withAsterisk
                    value={name}
                    label="Enter name"
                    onChange={(e) => setName(e.target.value)}
                />

                <FileInput
                    accept="image/png,image/jpeg"
                    disabled={!account || isLoadingUpload}
                    value={value}
                    onChange={(e) => {
                        setValue(e)
                        fileToByteArray(e, setValueBuffer)
                    }}
                    label="Upload image"
                    placeholder="Upload file"
                    mb={10}
                />

                {value &&
                    <Box pos="relative">
                        <LoadingOverlay visible={isLoadingUpload} zIndex={1000}
                                        overlayProps={{radius: "sm", blur: 2}}/>
                        <Image radius={10} src={URL.createObjectURL(value)}/>
                    </Box>
                }

                <Button loading={isLoadingUpload} onClick={handlerUploadToBTFS}>
                    Upload
                </Button>
            </Flex>
        </Paper>
    </Box>
}