import {useState} from "react";
import {useInfiniteGetCollectionsQuery} from "../../../generated/queries.ts";
import {Avatar, Center, Flex, Group, Loader, Paper, rem, Text, ThemeIcon, UnstyledButton} from "@mantine/core";
import {IconCheck, IconChevronRight} from "@tabler/icons-react";
import {reactQueryParams} from "./GameDrawer.tsx";

export const Collections = ({setSelectedCollection, id}: { setSelectedCollection: any, id: any }) => {
    const [cursor, setCursor] = useState<string | null | undefined>(null)

    const {data, fetchNextPage, isLoading, isInitialLoading} = useInfiniteGetCollectionsQuery({
        pagination: {first: 50, ...(cursor ? {cursor: cursor} : undefined)},
        asset_owners: id,
    }, {
        ...reactQueryParams,
        queryKey: [id],
        getNextPageParam(lastPage, allPages) {
            return {
                pagination: {
                    first: 20,
                    cursor: lastPage.collections?.pagination?.cursor
                }
            }
        },
    })

    return <>
        {data?.pages.map((page) =>
            <Flex gap={5} w={'100%'} direction={'column'}>
                {page?.collections?.items!.map((collection, ind) =>
                    <UnstyledButton
                        onClick={() => setSelectedCollection(collection)}
                        style={{padding: 10, borderRadius: 10}} className={'user_button'}>
                        <Group>
                            <Avatar
                                src={collection?.image_url}
                                radius="xl"
                            />

                            <Flex align={'center'} gap={10} style={{flex: 1}}>
                                <Text size="sm" fw={500}>
                                    {collection?.name}
                                </Text>
                                {collection?.is_verified ?
                                    <ThemeIcon style={{borderRadius: '50%'}} p={2} color={'green'} variant={"light"}
                                               size="xs">
                                        <IconCheck/>
                                    </ThemeIcon>
                                    : <></>
                                }
                            </Flex>

                            <Text c="dimmed" size="xs">
                                {collection?.object_count}
                            </Text>

                            <IconChevronRight style={{width: rem(14), height: rem(14)}} stroke={1.5}/>
                        </Group>
                    </UnstyledButton>
                )}
            </Flex>
        )}

        {data?.pages[0].collections?.items?.length === 0 &&
            <Paper p={10} withBorder shadow={'md'}>
                Collections not found
            </Paper>
        }

        {(isLoading || isInitialLoading) &&
            <Center>
                <Loader/>
            </Center>
        }
    </>
}