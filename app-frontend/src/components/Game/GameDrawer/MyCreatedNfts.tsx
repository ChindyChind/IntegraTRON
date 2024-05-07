import {useEffect, useState} from "react";
import useTronConnect from "../../../utils/useTronConnect.ts";
import {TW} from "../../../tronweb.ts";
import {NFT_MINT_CONTRACT_ABI} from "../../../utils/abis.ts";
import {NFT_MINT_CONTRACT_ADDRESS} from "../../../utils/contractAdresses.ts";
import {Center, Flex, Grid, Image, Loader, Paper, Text, UnstyledButton} from "@mantine/core";
import {IconReload} from "@tabler/icons-react";
import {PROXY} from "../../../utils/contants.ts";

export const MyCreatedNfts = () => {
    const [nfts, setNfts] = useState<any[]>([])
    const {account} = useTronConnect()
    const [isLoadingNfts, setIsLoadingNfts] = useState(false)
    const getMyCreatedNfts = async ({walletAddress}: { walletAddress: string }) => {
        setIsLoadingNfts(true)

        const instance = await TW.contract(NFT_MINT_CONTRACT_ABI, NFT_MINT_CONTRACT_ADDRESS);
        const nftsCount = await instance.balanceOf(walletAddress).call();

        const batchPromisesTokenIds = [];
        for (let i = 0; i < nftsCount; i++) {
            batchPromisesTokenIds.push(instance.tokenOfOwnerByIndex(walletAddress, i).call());
        }
        const tokenIds = await Promise.all(batchPromisesTokenIds);

        const batchPromisesTokenMetadata = [];
        for (let i = 0; i < nftsCount; i++) {
            batchPromisesTokenMetadata.push(instance.tokenURI(tokenIds[i]).call());
        }
        const tokenMetadata = await Promise.all(batchPromisesTokenMetadata);

        const data = []
        for (let i = 0; i < tokenMetadata?.length; i++) {
            const res = await fetch(`${PROXY}https://gateway.btfs.io/btfs/` + tokenMetadata[i])
            const d = await res.json()
            console.log(d)
            if (typeof d.name != "string" || !d.name) {
                d.name = 'xxxxx'
            }
            data.push({name: '', ...d})
        }

        setNfts(data)
        setIsLoadingNfts(false)
    }

    useEffect(() => {
        if (account) {
            getMyCreatedNfts({walletAddress: account})
        }
    }, [account]);

    return <>
        {isLoadingNfts &&
            <Center>
                <Loader/>
            </Center>
        }
        {!isLoadingNfts && nfts.length === 0 &&
            <Paper withBorder shadow={'md'} p={10}>
                You haven't created any NFTs
            </Paper>
        }

        <Grid>
            {nfts.map(nft =>
                <Grid.Col span={6}>
                    <Paper style={{height: '100%', borderRadius: 5}} withBorder shadow={'md'} radius={'md'}>
                        <Flex align={'center'} direction={'column'} justify={'space-between'} style={{height: '100%'}}>
                            <Image
                                style={{objectFit: 'cover', height: 'auto', borderRadius: 5}}
                                // @ts-ignore
                                src={`${PROXY}https://gateway.btfs.io/btfs/${nft.image}`}
                            />
                            <Text>
                                {/*// @ts-ignore*/}
                                {nft?.name}
                            </Text>
                        </Flex>
                    </Paper>
                </Grid.Col>
            )}
        </Grid>
        {nfts.length !== 0 &&
            <Flex justify={'center'} align={'center'} mt={10}>
                <UnstyledButton onClick={() => getMyCreatedNfts({walletAddress: account})}>
                    <IconReload/>
                </UnstyledButton>
            </Flex>
        }
    </>
}