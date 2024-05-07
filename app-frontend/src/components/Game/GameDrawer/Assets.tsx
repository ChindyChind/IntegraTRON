import {AssetSortBy, Collection, useInfiniteGetAssetsQuery} from "../../../generated/queries.ts";
import {useEffect, useState} from "react";
import {Button, Card, Center, Flex, Grid, Image, Loader, Text, UnstyledButton} from "@mantine/core";
import {reactQueryParams} from "./GameDrawer.tsx";

export const Assets = ({selectedCollection, setSelectedCollection, id, setSelectedAsset}: { setSelectedAsset: any, selectedCollection: Collection, setSelectedCollection: any, id: any }) => {
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
                    first: 20,
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
                        <Grid.Col span={6}>
                            <UnstyledButton>
                                <Card onClick={() => setSelectedAsset(asset)} withBorder radius="md"
                                      className={'assertCard'}>
                                    <Card.Section>
                                        <Image
                                            fallbackSrc="https://placehold.co/600x400?text=Placeholder"
                                            src={asset?.image_url}
                                            height={180}
                                        />
                                    </Card.Section>

                                    <Text style={{cursor: 'pointer'}} fz={15} mt={5} className={'assertCardTitle'}
                                          fw={500}>
                                        {asset?.name}
                                    </Text>
                                </Card>
                            </UnstyledButton>
                        </Grid.Col>
                    )}
                </>
            )}
        </Grid>
        {data?.pages[data?.pages.length - 1]?.assets!.pagination!.has_next &&
            // @ts-ignore
            <Button fullWidth loading={isLoading || isInitialLoading} onClick={fetchNextPage}>
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