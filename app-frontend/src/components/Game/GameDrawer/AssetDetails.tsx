import {AssetsFieldsFragment} from "../../../generated/queries.ts";
import {
    ActionIcon,
    Avatar,
    Badge,
    Button,
    Card, CopyButton,
    Flex,
    Grid, Group,
    Image,
    Paper,
    Spoiler,
    Text,
    Tooltip,
    UnstyledButton
} from "@mantine/core";
import {NavLink} from "react-router-dom";
import {IconBrandDiscord, IconBrandTwitter, IconExternalLink, IconGlobe} from "@tabler/icons-react";
import {formatShortAddress, transformString} from "../../../utils/utils.ts";
import {TOKENS_INFO} from "../../../utils/contants.ts";

export const AssetDetails = ({asset}: { asset: AssetsFieldsFragment }) => {
    return <Grid>
        <Grid.Col span={4}>
            <Image style={{borderRadius: 5}} src={asset.image_url}/>
            <Button
                fullWidth
                my={5}
                component={NavLink}
                to={`https://apenft.io/#/asset/${asset.collection?.contract_address}/${asset.token_id}`}
            >
                APE NFT marketplace
                <IconExternalLink/>
            </Button>

            {asset &&
                <Card>
                    <Spoiler maxHeight={250} showLabel="Show more" hideLabel="Hide">
                        {asset.description}
                    </Spoiler>

                    <Flex justify={'end'} gap={5} mt={5}>
                        {asset?.collection?.discord_link &&
                            <ActionIcon variant={'default'} component={NavLink} to={asset.collection.discord_link}>
                                <IconBrandDiscord/>
                            </ActionIcon>
                        }

                        {asset?.collection?.twitter_link &&
                            <ActionIcon variant={'default'} component={NavLink}
                                        to={`https://twitter.com/${asset?.collection.twitter_link}`}>
                                <IconBrandTwitter/>
                            </ActionIcon>
                        }

                        {(asset?.collection?.website_link || asset?.collection?.external_url) &&
                            <ActionIcon
                                variant={'default'}
                                component={NavLink}
                                to={asset?.collection.external_url ?? asset?.collection.website_link ?? ''}
                            >
                                <IconGlobe/>
                            </ActionIcon>
                        }
                    </Flex>
                </Card>
            }

        </Grid.Col>
        <Grid.Col span={'auto'}>
            {asset?.owners &&
                // @ts-ignore
                <CopyButton value={asset?.owners[0]?.owner?.profile?.account_address} timeout={2000}>
                    {({copied, copy}) => (
                        <Tooltip label={copied ? 'Copied' : 'Copy'} withArrow position="bottom">
                            <UnstyledButton onClick={copy}>
                                <Paper p={10} mt={5} shadow={'md'} withBorder>
                                    <Text fz={15} c={'gray'}>Owner: </Text>
                                    <Flex align={'center'} gap={10}>
                                        {/*// @ts-ignore*/}
                                        <Avatar size={25} src={asset?.owners[0]?.owner?.profile?.profile_image_url ?? ''}/>
                                        <Text>
                                            {/*// @ts-ignore*/}
                                            {transformString(asset?.owners[0]?.owner?.profile?.account_address, 10)}
                                        </Text>
                                    </Flex>
                                </Paper>
                            </UnstyledButton>
                        </Tooltip>
                    )}
                </CopyButton>
            }

            {asset.asks_v2 && asset?.asks_v2?.length !== 0 &&
                <Paper p={10} mt={5} shadow={'md'} withBorder>
                    {/*// @ts-ignore*/}
                    <Avatar src={TOKENS_INFO[asset.asks_v2[0]?.bestAskToken].logo}/>
                    {asset.asks_v2[0]?.bestAskPrice}
                    <Badge>
                        {asset.asks_v2[0]?.bestAskPriceUSD} $
                    </Badge>
                </Paper>
            }

            {asset?.attributes?.length !== 0 &&
                <Paper p={10} mt={5} shadow={'md'} withBorder>
                    <Text fw={700} mb={5}>
                        Attributes:
                    </Text>
                    <Flex wrap={'wrap'} gap={5}>
                        {asset?.attributes?.map(attribute =>
                            <Badge style={{textTransform: 'inherit', fontWeight: 500}}>
                                {attribute?.trait_type}: {attribute?.value}
                            </Badge>
                        )}
                    </Flex>
                </Paper>
            }

            <Paper p={10} mt={5} shadow={'md'} withBorder>
                <Text fw={700}>Description: </Text>
                {asset.description}
            </Paper>
        </Grid.Col>
    </Grid>
}