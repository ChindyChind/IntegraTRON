import {Avatar, Badge, Button, CopyButton, Group, Paper, Text, Tooltip, UnstyledButton,} from '@mantine/core';
import useConnect from "../../utils/useTronConnect.ts";
import {formatShortAddress} from "../../utils/utils.ts";
import {useParams} from "react-router-dom";

export const WalletInfo = () => {
    const {isLoadingWalletConnect, account: accountTron, handleConnect, isConnected, tronWeb, tronLink, chainId} = useConnect()
    const {id} = useParams()

    return (
        <>
            {!tronWeb && !isLoadingWalletConnect &&
                <Badge
                    variant="filled"
                    style={{zIndex: 1000, position: 'absolute', top: 30, right: 20}}
                    color="red"
                >
                    Tron Wallet not available
                </Badge>
            }

            {tronWeb && !accountTron && !isLoadingWalletConnect &&
                <Button
                    variant={'subtle'}
                    style={{zIndex: 1000, position: 'absolute', top: 20, right: 20}}
                    onClick={handleConnect}
                >
                    Connect wallet
                </Button>
            }

            {accountTron && isConnected &&
                // @ts-ignore
                <CopyButton value={id} timeout={2000}>
                    {({copied, copy}) => (
                        <Tooltip label={copied ? 'Copied' : 'Copy'} withArrow position="bottom">
                            <UnstyledButton pos={'absolute'} right={5} top={5} onClick={copy}>
                                <Paper withBorder shadow={'md'} style={{borderRadius: 10}} px={10}>
                                    <Group>
                                        <Avatar src={''} radius="xl"/>
                                        <div style={{flex: 1}}>
                                            <Text c="dimmed" size="xs">
                                                Owner
                                            </Text>
                                            {id &&
                                                <Text size="sm">
                                                    {formatShortAddress(id, 30)}
                                                </Text>
                                            }
                                        </div>
                                    </Group>
                                </Paper>
                            </UnstyledButton>
                        </Tooltip>
                    )}
                </CopyButton>
            }
        </>
    );
};
