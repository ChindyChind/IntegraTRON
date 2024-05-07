import express from 'express';
import morgan from "morgan";
import helmet from 'helmet';
import cors from 'cors';
import 'dotenv/config'
import {db} from "./db";
import {nftPositionSchema} from "./schema";
import {TW} from "./tronweb";
import {NFT_MINT_CONTRACT_ABI} from "./abis";
import {NFT_MINT_CONTRACT_ADDRESS} from "./contractAdresses";
import axios from "axios";
import {eq} from "drizzle-orm";
import {queryGetAssetDetail} from "./queries";

const PORT = process.env.PORT || 5000

const app = express()

app.use(cors())

app.use(
    helmet({
        contentSecurityPolicy: false,
        crossOriginEmbedderPolicy: false,
    })
)

app.use(function (req, res, next) {
    res.setHeader('Cross-Origin-Resource-Policy', '*')
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next()
})

app.use(express.json())
app.use(morgan('dev'))
app.use(express.urlencoded({extended: true}))

app.post('/set-nft', async (req, res) => {
    try {
        const {imageUrl, imageName, color, nftType, nftContract, signature, tokenId, walletAddress, positionIndex} = req.body as {
            walletAddress: string,
            nftType: string,
            nftContract: string,
            tokenId: string,
            positionIndex: number,
            signature: string,
            imageUrl: string,
            imageName: string,
            color: string
        }

        const insertNft = async () => {
            await db.insert(nftPositionSchema).values({
                type: nftType,
                tokenId: tokenId,
                nftContract: nftContract,
                positionIndex: positionIndex,
                userAddress: walletAddress,
                imageUrl: imageUrl,
                imageName: imageName,
                ...(color ? {color: color} : {})
            }).onConflictDoUpdate({
                target: [nftPositionSchema.positionIndex, nftPositionSchema.userAddress], set: {
                    type: nftType,
                    tokenId: tokenId,
                    nftContract: nftContract,
                    positionIndex: positionIndex,
                    userAddress: walletAddress,
                    imageUrl: imageUrl,
                    imageName: imageName,
                    ...(color ? {color: color} : {})
                }
            });
        }

        if (!['apenft', 'created'].includes(nftType)) {
            res.status(400).send('Wrong NFT type!');
        } else if (!TW.isAddress(walletAddress)) {
            res.status(400).send('Wrong Wallet Address!');
        } else if (!nftContract) {
            res.status(400).send('Wrong NFT contract!');
        } else if (tokenId === undefined || tokenId === null) {
            res.status(400).send('Wrong Token ID!');
        } else if (positionIndex < 0 || positionIndex === null || positionIndex === undefined) {
            res.status(400).send('Wrong Position Index!');
        } else if (!signature) {
            res.status(400).send('Wrong Signature!');
        } else if (!imageUrl) {
            res.status(400).send('Wrong Image URL!');
        } else if (!imageName) {
            res.status(400).send('Wrong Image Name!');
        } else {
            const base58Address = await TW.trx.verifyMessageV2("Message", signature);
            if (base58Address.toUpperCase() === walletAddress.toUpperCase()) {
                if (nftType === 'apenft') {
                    const response = await axios.post('https://api-gateway.apenft.io/graphql', {
                        query: queryGetAssetDetail,
                        variables: {
                            token_id: tokenId,
                            collection: nftContract
                        }
                    })

                    if (walletAddress === response.data?.data?.asset?.owners[0].owner_address) {
                        await insertNft()
                        res.status(200).send('Success');
                    } else {
                        res.status(400).send('Error.');
                    }
                } else {
                    const instance = await TW.contract(NFT_MINT_CONTRACT_ABI, NFT_MINT_CONTRACT_ADDRESS);
                    const ownerHex = await instance.ownerOf(tokenId).call();
                    const owner = TW.address.fromHex(ownerHex);

                    if (walletAddress === owner) {
                        await insertNft()
                        res.status(200).send('Array received successfully');
                    } else {
                        console.log('Error')
                        res.status(400).send('Error');
                    }
                }
            }
        }
    } catch (e) {
        console.log(e)
        res.status(400).send('Error');
    }
});


app.get('/nfts', async (req, res) => {
    try {
       if(req.query.walletAddress) {
           // @ts-ignore
           const result = await db.select().from(nftPositionSchema).where(eq(nftPositionSchema.userAddress, req.query.walletAddress)).values({
               type: true,
               tokenId: true,
               nftContract: true,
               positionIndex: true,
               userAddress: true,
               color: true
           })
           res.status(200).json(result);
       } else {
           res.status(400).json('Wrong wallet address!');
       }
    } catch (e) {
        console.log(e)
        res.status(400).send('Error');
    }
});

app.listen(PORT, () => {
    console.info(`server up on port ${PORT}`)
})


