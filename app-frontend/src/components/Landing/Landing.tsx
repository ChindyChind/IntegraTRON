import {Button, Container, AspectRatio, Image, Text, TextInput, Title} from '@mantine/core';
import {Dots} from './Dots.tsx';
import classes from './Landing.module.css';
import useTronConnect from "../../utils/useTronConnect.ts";
import {useField} from "@mantine/form";
import {TW} from "../../tronweb.ts";
import {useNavigate} from "react-router-dom";

export function Landing() {
    const {handleConnect, account, isLoadingWalletConnect} = useTronConnect()
    const navigate = useNavigate()

    const address = useField({
        initialValue: '',
        validateOnChange: false,
        validate: (e) => TW.isAddress(e) ? null : "Wrong address!",
    });

    const handlerSearch = () => {
        address.validate().then((e) => {
            if (!e) navigate(`/profile/${address.getValue()}`)
        })
    }

    return (
        <Container className={classes.wrapper} size={1400} style={{height: '100vh'}}>
            <Dots className={classes.dots} style={{left: 0, top: 0}}/>
            <Dots className={classes.dots} style={{left: 60, top: 0}}/>
            <Dots className={classes.dots} style={{left: 0, top: 140}}/>
            <Dots className={classes.dots} style={{right: 0, top: 60}}/>

            <div className={classes.inner}>
                <Title className={classes.title}>
                    Integra{' '}
                    <Text component="span" className={classes.highlight} inherit>
                        TRON
                    </Text>{' '}
                </Title>

                <Container p={0} size={600}>
                    <Text size="lg" c="dimmed" className={classes.description}>
                        The project goal is to create an all-in-one dapp that serves as a central hub for
                        various activities within the TRON ecosystem, integrating elements of fun, gaming, and the
                        metaverse. “IntegraTRON” aims to streamline user experience by consolidating multiple
                        functionalities into a single platform, providing convenience and accessibility for TRON users.
                    </Text>
                </Container>

                <TextInput
                    mt={20}
                    placeholder="Enter wallet address"
                    {...address.getInputProps()}
                />

                <div className={classes.controls}>
                    {!window.tronWeb && !isLoadingWalletConnect &&
                        <Button variant={'outline'} disabled={true} className={classes.control} size="lg">
                            Tron Wallet not available
                        </Button>
                    }
                    {window.tronWeb && !account && !isLoadingWalletConnect &&
                        <Button className={classes.control} size="lg">
                            Connect Wallet
                        </Button>
                    }
                    <Button onClick={handlerSearch} className={classes.control} size="lg" variant="default"
                            color="gray">
                        Search user
                    </Button>
                    {window.tronWeb && account && !isLoadingWalletConnect &&
                        <Button onClick={() => navigate(`/profile/${account}`)} className={classes.control} size="lg">
                            My Profile
                        </Button>
                    }
                </div>
            </div>
        </Container>
    );
}