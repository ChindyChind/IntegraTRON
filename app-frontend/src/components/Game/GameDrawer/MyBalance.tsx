import useTronConnect from "../../../utils/useTronConnect.ts";
import {useEffect, useState} from "react";
import {useClipboard} from "@mantine/hooks";
import {Anchor, Avatar, Divider, Badge, Box, Flex, Loader, Paper, Stack, Text, UnstyledButton} from "@mantine/core";
import {transformString} from "../../../utils/utils.ts";
import {IconCopy} from "@tabler/icons-react";
import {TOKENS_INFO_TESTNET} from "../../../utils/contants.ts";
import {NavLink} from "react-router-dom";
import {Center} from "@mantine/core";

export const MyBalance = () => {
    const {account, tokenBalances, nativeBalance, getAllTokensBalance} = useTronConnect()
    const [isLoadingBalance, setIsLoadingBalance] = useState(false)

    useEffect(() => {
        if (account) {
            setIsLoadingBalance(true)
            getAllTokensBalance()
            setIsLoadingBalance(false)
        }
    }, [account]);

    const clipboard = useClipboard({timeout: 500});

    // @ts-ignore
    return <Box>
        {isLoadingBalance &&
            <Loader/>
        }

        <Flex direction={'column'} align={'center'} justify={"center"} gap={15}>
            <UnstyledButton onClick={() => clipboard.copy('Hello, world!')}>
                <Badge color={clipboard.copied ? 'teal' : 'blue'} style={{textTransform: 'uppercase'}} size={'xl'}>
                    <Flex align={'center'} justify={"center"} gap={10}>
                        {transformString(account, 11)}
                        <IconCopy/>
                    </Flex>
                </Badge>
            </UnstyledButton>
            <Paper shadow={'xl'} withBorder style={{height: 'max-content', padding: 10}}>
                <Flex gap={10}>
                    <Text fz={24} fw={700}>
                        Balance: {nativeBalance} {' '}
                    </Text>
                    <Text c={'blue'} fz={24} fw={700}>TRX</Text>
                </Flex>
            </Paper>

            <Badge color={'orange'} fz={15} fw={600}>
                NILE Testent
            </Badge>

        </Flex>

        <Divider my="xs" label="Tokens" labelPosition="center" />

        {isLoadingBalance &&
            <Center>
                <Loader/>
            </Center>
        }

        <Stack mt={20}>
            {account && tokenBalances && Object.entries(tokenBalances).map(([key, token]) =>
                <Paper withBorder shadow={'md'}>
                    <Flex pr={20} align={'center'} gap={30} style={{width: "100%", padding: 6}}>
                        <Avatar
                            // @ts-ignore
                            src={TOKENS_INFO_TESTNET[token.address]?.logo}
                            radius="xl"
                        />

                        <Flex style={{width: "100%",}} align={'center'} justify={'space-between'}>
                            <div>
                                <Text size="sm" fw={500}>
                                    {key}
                                </Text>

                                <UnstyledButton>
                                    <Flex align={'center'} gap={5}>
                                        <Text c="dimmed" size="xs">
                                            {/*// @ts-ignore*/}
                                            {transformString(token?.address, 8)}
                                        </Text>
                                        <IconCopy size={10}/>
                                    </Flex>
                                </UnstyledButton>
                            </div>
                            <Text fw={800}>
                                {/*// @ts-ignore*/}
                                {token?.balance}
                            </Text>
                        </Flex>
                    </Flex>
                </Paper>
            )}
        </Stack>

        <Flex justify={'end'} mt={'20'}>
            <Anchor
                component={NavLink}
                variant="gradient"
                gradient={{from: 'orange', to: 'white'}}
                fw={500}
                fz="xl"
                target={'_blank'}
                to={'https://nileex.io/join/getJoinPage'}
            >
                Faucet
            </Anchor>
        </Flex>
    </Box>
}