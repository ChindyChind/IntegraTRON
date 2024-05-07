import React, {useEffect, useState} from 'react';
import {
    AssetsFieldsFragment,
    AssetSortBy,
    Collection,
    useInfiniteGetAssetsQuery,
    useInfiniteGetCollectionsQuery
} from "../../generated/queries";
import {
    Box,
    Button,
    Center,
    Flex,
    Grid,
    Image,
    Loader,
    Modal,
    Paper,
    ScrollArea,
    Stack,
    Tabs,
    Text,
    UnstyledButton
} from "@mantine/core";
import {useGlobalStore} from "../../store/useGlobalStore";
import useTronConnect from "../../utils/useTronConnect";
import {reactQueryParams} from "./GameDrawer/GameDrawer.tsx";
import {useParams} from "react-router-dom";
import {TW} from "../../tronweb";
import {NFT_MINT_CONTRACT_ABI} from "../../utils/abis";
import {NFT_MINT_CONTRACT_ADDRESS} from "../../utils/contractAdresses";
import axios from "axios";
import {notifications} from "@mantine/notifications";
import {PROXY} from "../../utils/contants.ts";


const Collections = ({
                         selectedAsset,
                         setSelectedAsset,
                         setSelectedCollection,
                         id,
                         selectedCollection
                     }: { selectedAsset: AssetsFieldsFragment | null, setSelectedAsset: any, selectedCollection: Collection | null, setSelectedCollection: any, id: any }) => {
    const [cursor, setCursor] = useState<string | null | undefined>(null)
    const {data, fetchNextPage, isLoading, isInitialLoading} = useInfiniteGetCollectionsQuery({
        pagination: {first: 50, ...(cursor ? {cursor: cursor} : undefined)},
        asset_owners: id,
    }, {
        ...reactQueryParams,
        queryKey: [id],
        getNextPageParam(lastPage) {
            return {
                pagination: {
                    first: 50,
                    cursor: lastPage.collections?.pagination?.cursor
                }
            }
        },
        onSuccess: (e) => {
            // @ts-ignore
            if (!selectedCollection && e.pages[0].collections.items) {
                // @ts-ignore
                setSelectedCollection(e.pages[0].collections.items[0])
            }
        }
    })


    return <>
        <ScrollArea style={{marginTop: 20}}>
            <Flex style={{marginInline: 30}} gap={20}>
                {data?.pages.map((page) =>
                    <>
                        {page?.collections?.items!.map((collection, ind) =>
                            <UnstyledButton
                                style={{padding: 10, background: selectedCollection?.contract_address === collection?.contract_address ? '#4e4e4e' : undefined, borderRadius: '50% 50% 0 0 '}}
                                onClick={() => setSelectedCollection(collection)}>
                                <Image
                                    style={{borderRadius: '50%', width: 50, height: 'auto'}}
                                    src={collection?.image_url}
                                />
                            </UnstyledButton>
                        )}
                    </>
                )}
            </Flex>
        </ScrollArea>

        {data?.pages[0].collections?.items?.length === 0 &&
            <Paper p={10} withBorder shadow={'md'}>
                Collections not found
            </Paper>
        }

        {(isLoading || isInitialLoading) &&
            <Center mt={50}>
                <Loader/>
            </Center>
        }

        {selectedCollection
            ? <Box style={{background: '#4e4e4e', padding: 10, borderRadius: '10px'}}>
                <Assets
                    setSelectedAsset={setSelectedAsset} id={id}
                    setSelectedCollection={setSelectedCollection}
                    selectedCollection={selectedCollection} selectedAsset={selectedAsset}
                />
            </Box>
            : <></>
        }
    </>
}


const Assets = ({selectedCollection, setSelectedCollection, id, setSelectedAsset, selectedAsset}: { selectedAsset: AssetsFieldsFragment | null, setSelectedAsset: any, selectedCollection: Collection, setSelectedCollection: any, id: any }) => {
    const [cursor, setCursor] = useState<string | null | undefined>(null)

    const {data, isLoading, isInitialLoading, fetchNextPage, hasNextPage} = useInfiniteGetAssetsQuery({
        pagination: {first: 50, ...(cursor ? {cursor: cursor} : undefined)},
        collections: [selectedCollection!.contract_address!],
        owners: [id],
        sort: AssetSortBy.PriceHighToLow
    }, {
        ...reactQueryParams,
        queryKey: [id],
        enabled: selectedCollection !== undefined,
        getNextPageParam(lastPage) {
            return {
                pagination: {
                    first: 50,
                    cursor: lastPage.assets?.pagination?.cursor
                }
            }
        },

    })

    useEffect(() => {
        if (selectedCollection)
            setCursor('')
    }, [selectedCollection]);

    return <Flex w={'100%'} direction={'column'} gap={5}>
        <Grid>
            {data?.pages.map(page =>
                <>
                    {page?.assets?.items!.map(asset =>
                        <Grid.Col span={3}>
                            <UnstyledButton onClick={() => {
                                if (selectedAsset?.token_id === asset?.token_id) {
                                    setSelectedAsset(null)
                                } else {
                                    setSelectedAsset(asset)
                                }
                            }}>
                                <Paper
                                    style={{transition: '.3s', border: `6px solid ${selectedAsset?.token_id === asset?.token_id ? 'rgb(255 255 255)' : '#4e4e4e'}`}}
                                    withBorder shadow={'md'}>
                                    <Stack gap={0} align={'center'}>
                                        <Image src={asset?.image_url}/>
                                        <Text style={{textAlign: 'center'}}>
                                            {asset?.name}
                                        </Text>
                                    </Stack>
                                </Paper>
                            </UnstyledButton>
                        </Grid.Col>
                    )}
                </>
            )}
        </Grid>
        {data?.pages[data?.pages.length - 1]?.assets!.pagination!.has_next &&
            <Button fullWidth loading={isLoading || isInitialLoading} onClick={fetchNextPage as any}>
                Load more
            </Button>
        }
        {(isLoading || isInitialLoading) &&
            <Center>
                <Loader/>
            </Center>
        }
    </Flex>
}


const MyCreatedNfts = ({selectedAsset, setSelectedAsset}: {
    selectedAsset: any, setSelectedAsset: any
}) => {
    const [nfts, setNfts] = useState<any>([])
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

            if (typeof d.name != "string" || !d.name) {
                d.name = 'xxxxx'
            }

            data.push({name: '', ...d, token_id: parseInt(tokenIds[i])})
        }

        setNfts(data)
        setIsLoadingNfts(false)
    }

    useEffect(() => {
        if (account) {
            getMyCreatedNfts({walletAddress: account})
        }
    }, [account]);

    return nfts?.length !== 0
        ? <Box style={{background: '#4e4e4e', padding: 10, borderRadius: '10px'}}>
            {isLoadingNfts &&
                <Center mt={50}>
                    <Loader/>
                </Center>
            }
            <Grid>
                {nfts.map((nft: any) =>
                    <Grid.Col span={3}>
                        <UnstyledButton style={{height: '100%'}} onClick={() => {
                            if (selectedAsset?.token_id === nft?.token_id) {
                                setSelectedAsset(null)
                            } else {
                                setSelectedAsset(nft)
                            }
                        }}>
                            <Paper
                                style={{height: '100%', transition: '.3s', border: `6px solid ${selectedAsset?.token_id === nft?.token_id ? 'rgb(255 255 255)' : '#4e4e4e'}`}}
                                withBorder shadow={'md'}>
                                <Stack style={{height: '100%'}} gap={0} align={'center'} justify={'space-between'}>
                                    <Image src={`${PROXY}https://gateway.btfs.io/btfs/${nft.image}`}/>
                                    <Text style={{textAlign: 'center'}}>
                                        {nft?.name}
                                    </Text>
                                </Stack>
                            </Paper>
                        </UnstyledButton>
                    </Grid.Col>
                )}
            </Grid>
        </Box>
        : !isLoadingNfts ? <Paper mt={5} p={10} withBorder shadow={'md'}>
            Collections not found
        </Paper> : <></>
}

const ModalSelectNft = () => {
    const [activeTab, setActiveTab] = useState<string | null>('first');
    const {setIsOpenNftModal, isOpenNftModal, selectedCoordinate, gameScene} = useGlobalStore()
    const [selectedCollection, setSelectedCollection] = useState<Collection | null>(null)
    const {account} = useTronConnect()
    const {id} = useParams()
    const [selectedAsset, setSelectedAsset] = useState<AssetsFieldsFragment | null>(null)

    // const {data: dataAssetDetails} = useGetAssetDetailQuery({
    //     token_id: selectedAsset?.token_id,
    //     collection: selectedAsset?.contract_address ?? NFT_MINT_CONTRACT_ADDRESS
    // }, {
    //     queryKey: [selectedAsset?.token_id, selectedAsset?.contract_address ?? NFT_MINT_CONTRACT_ADDRESS]
    // })

    const getDbNfts = async () => {
        try {
            const {data} = await axios.get(`${import.meta.env.VITE_EXPRESS}/nfts`, {
                params: {
                    walletAddress: account
                }
            })
            // @ts-ignore
            await gameScene?.setImages({nfts: data, isLoading: false})
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        if (account) {
            getDbNfts()
        }
    }, [account]);

    const signMessage = async ({
                                   walletAddress,
                                   nftType,
                                   nftContract,
                                   tokenId,
                                   positionIndex,
                                   imageName,
                                   imageUrl
                               }: {
        walletAddress: any,
        nftType: 'apenft' | 'created',
        nftContract: any,
        tokenId: any,
        positionIndex: any,
        imageName: any
        imageUrl: any
    }) => {
        const signature = await window.tronWeb.trx.signMessageV2('Message')

        try {
            const r = await axios.post(`${import.meta.env.VITE_EXPRESS}/set-nft`, {
                walletAddress,
                nftType,
                nftContract,
                tokenId,
                positionIndex,
                signature,
                imageName,
                imageUrl
            })
            // @ts-ignore
            gameScene?.deleteAllPlans()
            // @ts-ignore
            gameScene?.deleteAllPlans()
            await getDbNfts()
        } catch (e: any) {
            notifications.show({
                title: 'Error!',
                message: e?.request.response,
                color: 'red'
            })
        }
    }

    const handlerSetAft = async () => {
        if (window.tronWeb && account) {
            signMessage({
                walletAddress: account,
                nftType: selectedAsset?.contract_address ? 'apenft' : 'created',
                nftContract: selectedAsset?.contract_address ?? NFT_MINT_CONTRACT_ADDRESS,
                tokenId: selectedAsset?.token_id,
                positionIndex: selectedCoordinate,
                imageName: selectedAsset?.name,
                // @ts-ignore
                imageUrl: selectedAsset?.image_url ?? selectedAsset?.image,
            })
        }

    }


    return (
        <>
            <Modal
                styles={{
                    body: {
                        minHeight: '50vh'
                    }
                }}
                centered size={'xl'}
                opened={isOpenNftModal}
                onClose={() => setIsOpenNftModal(false)}
                withCloseButton={false}
            >
                <Tabs value={activeTab}
                      onChange={(e) => {
                          setActiveTab(e)
                          setSelectedAsset(null)
                      }}>
                    <Flex style={{width: '100%'}} justify={'space-between'}>
                        <Tabs.List>
                            <Tabs.Tab value="first">My collections</Tabs.Tab>
                            <Tabs.Tab value="second">CreatedCollections</Tabs.Tab>
                        </Tabs.List>
                        <Button onClick={handlerSetAft} disabled={!selectedAsset} size={'xs'}>
                            Set NFT
                        </Button>
                    </Flex>

                    <Tabs.Panel value="first">
                        <Collections
                            selectedAsset={selectedAsset}
                            setSelectedAsset={setSelectedAsset}
                            selectedCollection={selectedCollection}
                            setSelectedCollection={setSelectedCollection} id={account}/>
                    </Tabs.Panel>
                    <Tabs.Panel value="second">
                        <MyCreatedNfts
                            selectedAsset={selectedAsset}
                            setSelectedAsset={setSelectedAsset}
                        />
                    </Tabs.Panel>
                </Tabs>
            </Modal>
        </>
    );
};

export default ModalSelectNft;