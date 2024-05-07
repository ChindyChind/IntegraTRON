import {AssetsFieldsFragment, Collection} from "../../../generated/queries.ts";
import {ActionIcon, Flex, Paper, Spoiler} from "@mantine/core";
import {NavLink} from "react-router-dom";
import {IconBrandDiscord, IconBrandTwitter, IconGlobe} from "@tabler/icons-react";
import {AssetDetails} from "./AssetDetails.tsx";
import {Assets} from "./Assets.tsx";
import {Collections} from "./Collections.tsx";

export const CollectionList = ({selectedAsset, address, selectedCollection, setSelectedAsset, setSelectedCollection}: {
    selectedAsset: AssetsFieldsFragment | null, address: string,
    selectedCollection: Collection | null, setSelectedAsset: (x: any) => void,
    setSelectedCollection: (x: any) => void
}) => {
    return <>
        {selectedCollection && !selectedAsset &&
            <Paper withBorder shadow={'xl'} mb={10} p={10}>
                {selectedCollection.description &&
                    <Flex mb={'sm'} gap={10} w={'100%'} direction={'column'} justify={'center'} align={'center'}>
                        <Spoiler styles={{
                            root: {
                                width: '100%'
                            },
                            content: {
                                width: '100%'
                            },
                            control: {
                                width: '100%'
                            }
                        }} style={{width: '100%'}} maxHeight={120} showLabel="Show more" hideLabel="Hide">
                            <div dangerouslySetInnerHTML={{__html: selectedCollection.description}}/>
                        </Spoiler>
                    </Flex>
                }

                <Flex justify={'end'}>
                    {selectedCollection.discord_link &&
                        <ActionIcon mr={'md'} variant={'default'} component={NavLink} to={selectedCollection.discord_link}>
                            <IconBrandDiscord/>
                        </ActionIcon>
                    }

                    {selectedCollection.twitter_link &&
                        <ActionIcon variant={'default'} mr={'md'} component={NavLink}
                                    to={`https://twitter.com/${selectedCollection.twitter_link}`}>
                            <IconBrandTwitter/>
                        </ActionIcon>
                    }

                    {(selectedCollection.website_link || selectedCollection.external_url) &&
                        <ActionIcon
                            variant={'default'} component={NavLink}
                            to={selectedCollection.external_url ?? selectedCollection.website_link ?? ''}
                        >
                            <IconGlobe/>
                        </ActionIcon>
                    }
                </Flex>
            </Paper>
        }
        {selectedAsset
            ? <AssetDetails asset={selectedAsset}/>
            : selectedCollection
                ? <Flex gap={10} w={'100%'} direction={'column'} justify={'center'} align={'center'}>
                    <Assets
                        setSelectedAsset={setSelectedAsset} id={address}
                        setSelectedCollection={setSelectedCollection}
                        selectedCollection={selectedCollection}
                    />
                </Flex>
                : <Flex gap={10} w={'100%'} direction={'column'} justify={'center'} align={'center'}>
                    <Collections id={address} setSelectedCollection={setSelectedCollection}/>
                </Flex>
        }
    </>
}