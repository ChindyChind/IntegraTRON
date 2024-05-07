
![image](https://github.com/ChindyChind/IntegraTRON/assets/74771402/9a8dc669-7601-4f28-997f-556cfe7251a7)

# IntegraTRON - the AIO (All-In-One) Metaverse


## Project goal

The project goal is to create an all-in-one dapp that serves as a central hub for various activities within the TRON ecosystem, integrating elements of fun, gaming, and the metaverse. “IntegraTRON” aims to streamline user experience by consolidating multiple functionalities into a single platform, providing convenience and accessibility for TRON users.

## What it does

#### Main features of the project:

1. **Ability to switch from first-person to third-person and vice versa.**

2. **Create and Mint NFTs:** Users can mint NFTs on Nile Testnet by upload images or create new directly on a canvas within IntegraTRON. Ensure metadata associated with each minted NFT, including title, description, and other information, is securely stored on BTFS for easy retrieval and verification.

3. **View native balance and most popular tokens on Nile Testnet:** Provide users with a comprehensive dashboard displaying their native balance and the most popular tokens on the Nile testnet.

4. **View NFTs of any user on TRON Mainnet:** ApeNFT Marketplace API allows users to view their NFTs and those of other users directly within IntegraTRON. Provide filtering and sorting options to help users easily navigate and manage their NFT collections.

5. **Customize virtual house/room with personal NFTs:** Offer users the ability to customize their virtual house or room within IntegraTRON by attaching their NFTs to virtual walls. Provide a user-friendly interface for arranging and decorating the virtual space, allowing users to showcase their NFT collections in a personalized and immersive environment.

6. **Buy additional buildings to increase space for NFT placement:** Introduce the option for users to purchase new virtual buildings, providing additional space for NFT placement and display. Offer a variety of virtual building options, ranging from small galleries to large exhibition halls.

7. **Option to visit the customized virtual room of any user:** Foster community engagement by allowing users to visit and explore the customized virtual rooms of each other. Facilitate social connections and networking opportunities by encouraging users to share their virtual room experiences and collaborate.

## How we built it

In our pursuit of achieving the project goal of creating IntegraTRON, the all-in-one dapp for the TRON ecosystem, we strategically began by integrating the core protocols of the TRON network. Our first focus was on seamlessly incorporating the **BitTorrent File System (BTFS)** and **APE NFT** - TRON's largest NFT marketplace. 

---

- ![image|350x56](https://global.discourse-cdn.com/business4/uploads/trondao/original/2X/b/bdf4d9ee0c021b0386eea53f28c92fd0fc8b428a.png)

    ### **BitTorrent File System (BTFS):** 
    BTFS is a decentralized file storage system that leverages the BitTorrent protocol to enable secure and distributed storage of files across a network of nodes. It operates on the principles of peer-to-peer sharing, breaking down files into smaller chunks and distributing them across multiple nodes. This decentralized approach ensures data redundancy, fault tolerance, and resistance to censorship.

#### Integrations:

**Storing NFT Images and Metadata:** One of the primary uses of BTFS within IntegraTRON is to store NFT images and metadata when minting NFTs through our platform. By utilizing BTFS for this purpose, we ensure that NFT assets are securely stored and accessible to users across the TRON ecosystem. This integration enhances the reliability and availability of NFT content, facilitating seamless transactions and interactions within the marketplace.

**Integrating BTFS Encrypted Storage Protocol for Private Content:** We are in the process of integrating the option to store "private" content on BTFS, visible only to designated users or the content owner. This feature leverages BTFS Encrypted Storage Protocol, which provides secure and encrypted storage for sensitive data. 

---

   - ![image|444x156, 75%](https://global.discourse-cdn.com/business4/uploads/trondao/original/2X/a/a1de73cf27ebacf8baf568a0097035533ae49ce0.png)

**ApeNFT Marketplace:**

ApeNFT stands as a prominent marketplace within the TRON ecosystem, renowned for its extensive collection of non-fungible tokens (NFTs) spanning digital art, collectibles, gaming assets, and more. 

#### Integrations:

**API Integration for Data Accessibility:** IntegraTRON has integrated with ApeNFT's API, enabling users to access comprehensive information about collections, NFTs, owners, and more directly from our platform. With our user-friendly interface, users can effortlessly navigate and explore the ApeNFT marketplace, accessing the same rich dataset seamlessly integrated within IntegraTRON.

**Direct Buy/Sell Integration (Upcoming):** The next goal is to enable users to buy and sell NFTs directly on ApeNFT through IntegraTRON, simplifying the trading process for enhanced user convenience.


## Project Test Instructions: 

1. Open IntegraTRON app & connect your TronLink wallet;
2. There will be a button in the upper left corner. Clicking on it will open the main menu on the left side of the screen and you will see all available sections. Let's quickly go through each:
   - **Portfolio**: You will see the native balance in the NILE network and the balance of several popular tokens. Also, you will see the link to Faucet
    - **NFT collections (Mainnet)** - you will see all your NFT collections from TRON mainnet (fetched using APE NFT API)
   - **Draw & Mint NFT** - you will be able to create a NFT using a canvas & also mint it on Nile Testnet. Image & Metadata will be stored on BTFSl
    - **Upload & Mint NFT** - you can upload a image from your device and mint it as NFT  on Nile Testnet;
    - **My Created NFTs (Testnet)** - you will see all NFTs created with above methods ↑
    - **Search NFTs of an user** - you can look at NFT collections of someone;
    - **Buy a new building** - you can buy an additional building (that will cost ~ 100 Testnet USDT). You can buy max. 3 additional buildings for now. That will increase the number of places where you can attach your NFTs

---

   - If you want to attach your NFT (from the Mainnet or created and minted in the testnet), you must go close to the desired stand on the wall of your building, click on the key “E”. A modal window will open where there will be 2 lists of your NFTs: One is a list of NFTs from the Mainnet, and the second list is NFTs minted on the testnet using our platform. Select any NFT, click on the “Set NFT” button.

   - The TronLink wallet will open with a request to sign the message. Signing does not incur a commission. This is a free action designed to prove that you have access to the connected wallet.
   - After successfully signing the message, a request will be sent to the server and your NFT will be added to the database, and will also appear on the wall where you wanted to put it.

---


## Challenges we ran into

**Integration Complexity:** Integrating multiple protocols and APIs, such as BTFS and ApeNFT Marketplace API, presented technical challenges. Ensuring seamless communication between different systems while maintaining data integrity required thorough planning and implementation.

**User Experience Optimization:** Designing a user-friendly interface for minting NFTs, navigating the dashboard, and customizing virtual rooms posed challenges in terms of usability and intuitiveness. Iterative testing and feedback were essential to refine the user experience.

## Accomplishments that we're proud of

**Successful Integration:** Overcoming the challenges of integrating BTFS and ApeNFT Marketplace API into IntegraTRON was a significant achievement. Seamless integration of these core components enhances the platform's functionality and user experience.

**Feature Implementation:** Successfully implementing key features such as NFT minting, virtual room customization, demonstrates commitment to delivering a comprehensive platform.

**Continuous Improvement:** Embracing a mindset of continuous improvement, we have identified areas for enhancement and have a roadmap for future updates and features, ensuring that IntegraTRON remains innovative and relevant in the dynamic TRON ecosystem.

## What we learned

The development process led to a better understanding of decentralized storage systems and API integration. Additionally, overcoming challenges inherent in blockchain development reinforced the importance of adaptability and resilience. Embracing change and learning from setbacks were key in overcoming obstacles and driving the project forward.


## What's next for IntegraTRON

- ✔️ TronLink wallet integration;
- ✔️ Option to mint NFTs (on Nile Testnet);
- ✔️ Integrate BTFS: Secure storage of NFT images and metadata;
- ✔️ Possibility to customize personal virtual house / room using NFTs pinned to walls;
- ✔️ Ability to purchase additional virtual buildings to increase NFT placement space;
- ✔️ Integrate Ape NFT Marketplace API, enabling users to get data about NFT collections, items, owners and other relevant information about NFTs.
- ⏳ Integrate the option to store on BTFS “private” content and visible to yourself or designated users only, using BTFS Encrypted Storage Protocol;
- ⏳ Integrate the multiplayer feature that will allow users to connect and engage with each other within the metaverse;
- ⏳ Integrate more protocols from TRON Ecosystem;
- and other
.
