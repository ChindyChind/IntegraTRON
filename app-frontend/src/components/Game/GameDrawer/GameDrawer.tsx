import {useEffect, useState} from "react";
import useTronConnect from "../../../utils/useTronConnect.ts";
import {AssetsFieldsFragment, Collection} from "../../../generated/queries.ts";
import {useDisclosure} from "@mantine/hooks";
import {
    ActionIcon,
    Avatar,
    Badge,
    Box,
    Center,
    Drawer,
    Flex,
    Paper,
    Popover,
    Switch,
    Tabs,
    Text,
    UnstyledButton
} from "@mantine/core";
import {
    IconApps,
    IconBrush,
    IconChevronLeft,
    IconChevronRight,
    IconExchange,
    IconEyeCancel,
    IconFileUpload,
    IconHome,
    IconPhoto,
    IconSearch,
    IconWallet
} from "@tabler/icons-react";
import {CreateNft} from "./CreateNft.tsx";
import {MyBalance} from "./MyBalance.tsx";
import {MyCreatedNfts} from "./MyCreatedNfts.tsx";
import {UploadImg} from "./UploadImg.tsx";
import {BuyNewHouse} from "./BuyNewHouse.tsx";
import {CollectionList} from "./CollectionList.tsx";
import {SearchUser} from "./SearchUser.tsx";

export const reactQueryParams: any = {
    refetchOnReconnect: false,
    refetchIntervalInBackground: false,
    refetchOnWindowFocus: false,
    refetchInterval: false,
    retryOnMount: false,
    refetchOnMount: false,
}

const DrawerTabHeaderItem = ({value, icon, description}: any) => {
    const [opened, {close, open}] = useDisclosure(false);

    return <Tabs.Tab value={value}>
        <Popover width={200} position="bottom" withArrow shadow="md" opened={opened}>
            <Popover.Target>
                <Box onMouseEnter={open} onMouseLeave={close}>
                    {icon}
                </Box>
            </Popover.Target>
            <Popover.Dropdown style={{pointerEvents: 'none'}}>
                <Text>
                    {description}
                </Text>
            </Popover.Dropdown>
        </Popover>
    </Tabs.Tab>
}


export const GameDrawer = ({open, opened, close}: any) => {
    const [selectedCollection, setSelectedCollection] = useState<Collection | null>(null)
    const {account} = useTronConnect()
    const [activeTab, setActiveTab] = useState<string | null>('balance');
    const [selectedAsset, setSelectedAsset] = useState<AssetsFieldsFragment | null>(null)
    const [isFirstPersonMode, setIsFirstPersonMode] = useState(false)
    const [openedPopoverViewMode, {close: closePopoverViewMode, open: openPopoverViewMode}] = useDisclosure(false);

    const TAB_MENU_ITEMS = {
        balance: {
            description: "My balance",
            icon: <IconWallet/>,
            path: 'balance'
        },
        myCollections: {
            description: "My collections",
            icon: <IconApps/>,
            path: 'my-collections'
        },
        createNft: {
            description: "Create NFT",
            icon: <IconBrush/>,
            path: 'create-nft'
        },
        uploadNft: {
            description: "Upload NFT",
            icon: <IconFileUpload/>,
            path: 'upload-nft'
        },
        createdNfts: {
            description: "My created NFTs",
            icon: <IconPhoto/>,
            path: 'my-created-nfts'
        },
        searchUser: {
            description: "Search user",
            icon: <IconSearch/>,
            path: 'search-user'
        },
        buyHouse: {
            description: "Buy new house (100 USDT)",
            icon: <IconHome/>,
            path: 'buy-house'
        },
        swapTokens: {
            description: "Swap tokens",
            icon: <IconExchange color={'gray'}/>,
            path: 'swap-tokens'
        },
        privateContent: {
            description: "Private content (BTFS)",
            icon: <IconEyeCancel color={'gray'}/>,
            path: 'private-content'
        },
    }

    const toggleFirtPersonView = () => {
        if (isFirstPersonMode) {
            localStorage.setItem('first-person', 'false')
            setIsFirstPersonMode(false)
            setTimeout(() => {
                window.location.reload()
            }, 100)
        } else {
            localStorage.setItem('first-person', 'true')
            setIsFirstPersonMode(true)
            setTimeout(() => {
                window.location.reload()
            }, 100)
        }
    }

    useEffect(() => {
        setIsFirstPersonMode(localStorage.getItem('first-person') === 'true')
    }, [])

    return <Drawer
        withCloseButton={false}
        opened={opened}
        size={selectedAsset ? 'xl' : 'md'}
        styles={{
            body: {
                paddingLeft: 0
            },
            header: {
                width: '100%'
            }
        }}
        onClose={() => {
            close()
            setSelectedCollection(null)
            setSelectedAsset(null)
        }}
        title={<Flex gap={20} justify={'space-between'} align={'center'} style={{width: '100%'}}>
            {selectedCollection &&
                <ActionIcon onClick={() => {
                    if (!selectedAsset && selectedCollection) {
                        setSelectedCollection(null)
                    } else if (selectedAsset) {
                        setSelectedAsset(null)
                    }
                }}>
                    <IconChevronLeft/>
                </ActionIcon>
            }

            {selectedCollection &&
                <>
                    <UnstyledButton onClick={() => {
                        setSelectedAsset(null)
                    }}>
                        <Flex align={'center'} gap={20}>
                            <Avatar radius="xl" src={selectedCollection.image_url}/>
                            <Text fz={20} fw={700}>
                                {selectedCollection.name}
                            </Text>
                            {!selectedAsset &&
                                <Badge>
                                    {selectedCollection.object_count} NFTs
                                </Badge>
                            }
                        </Flex>
                    </UnstyledButton>
                </>
            }

            {!selectedCollection && activeTab && <Text fz={20} fw={700}>
                {/*// @ts-ignore*/}
                {Object.values(TAB_MENU_ITEMS).find(tab => tab.path === activeTab).description}
            </Text>
            }

            {selectedAsset &&
                <>
                    <IconChevronRight/>
                    <Text fz={20} fw={500}>
                        {selectedAsset.name}
                    </Text>
                </>
            }
        </Flex>
        }
    >
        <Tabs
            onChange={(e) => {
                setSelectedCollection(null)
                setSelectedAsset(null)
                setActiveTab(e)
            }}
            value={activeTab}
            orientation="vertical"
        >
            <Flex style={{height: '100%'}} direction={"column"}>
                <Tabs.List h={'100%'}>
                    {Object.values(TAB_MENU_ITEMS).map(tab =>
                        <DrawerTabHeaderItem value={tab.path} description={tab.description} icon={tab.icon}/>
                    )}
                </Tabs.List>
                <Center mt={'100%'}>
                    <Popover width={200} position="bottom" withArrow shadow="md" opened={openedPopoverViewMode}>
                        <Popover.Target>
                          <UnstyledButton  onMouseEnter={openPopoverViewMode} onMouseLeave={closePopoverViewMode}>
                              <Switch
                                  size={'sm'}
                                  onClick={toggleFirtPersonView}
                                  checked={isFirstPersonMode}
                              />
                          </UnstyledButton>
                        </Popover.Target>
                        <Popover.Dropdown style={{pointerEvents: 'none'}}>
                            <Text size="sm">
                                {isFirstPersonMode
                                    ? 'Switch to First Person Control'
                                    : 'Switch to Third Person Control'
                                }
                            </Text>
                        </Popover.Dropdown>
                    </Popover>
                </Center>
            </Flex>

            <Box ml={'5'} style={{width: '100%'}}>
                <Tabs.Panel value="my-collections">
                    <CollectionList
                        selectedCollection={selectedCollection}
                        setSelectedCollection={setSelectedCollection}
                        address={account} selectedAsset={selectedAsset}
                        setSelectedAsset={setSelectedAsset}
                    />
                </Tabs.Panel>
                <Tabs.Panel value="search-user">
                    <SearchUser
                        setSelectedAsset={setSelectedAsset} activeTab={activeTab}
                        setSelectedCollection={setSelectedCollection}
                        selectedCollection={selectedCollection} selectedAsset={selectedAsset}/>
                </Tabs.Panel>
                <Tabs.Panel value="balance">
                    <MyBalance/>
                </Tabs.Panel>
                <Tabs.Panel value="create-nft">
                    <CreateNft activeTab={activeTab}/>
                </Tabs.Panel>
                <Tabs.Panel value="upload-nft">
                    <UploadImg/>
                </Tabs.Panel>
                <Tabs.Panel value="my-created-nfts">
                    <MyCreatedNfts/>
                </Tabs.Panel>
                <Tabs.Panel value={'swap-tokens'}>
                    <Paper withBorder shadow={'md'} p={10}>
                        <Text c={'orange'}>
                            Planned to be added in future updates
                        </Text>
                    </Paper>
                </Tabs.Panel>
                <Tabs.Panel value={'private-content'}>
                    <Paper>
                        Store "private" content and visible to yourself or designated users only, using BTFS Encrypted
                        Storage Protocol
                    </Paper>
                    <Paper mt={5} withBorder shadow={'md'} p={10}>
                        <Text c={'orange'}>
                            Planned to be added in future updates
                        </Text>
                    </Paper>
                </Tabs.Panel>
                <Tabs.Panel value={'buy-house'}>
                    <BuyNewHouse/>
                </Tabs.Panel>
            </Box>
        </Tabs>

    </Drawer>
}
