import { useQuery, useInfiniteQuery, UseQueryOptions, UseInfiniteQueryOptions } from '@tanstack/react-query';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };

function fetcher<TData, TVariables>(query: string, variables?: TVariables) {
  return async (): Promise<TData> => {
    const res = await fetch("https://api-gateway.apenft.io/graphql", {
    method: "POST",
    ...({
  headers: {
    "Content-Type": "application/json",
    "X-Chain-Name": "tron"
  }
}
),
      body: JSON.stringify({ query, variables }),
    });

    const json = await res.json();

    if (json.errors) {
      const { message } = json.errors[0];

      throw new Error(message);
    }

    return json.data;
  }
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

/** asset sort by */
export enum AssetSortBy {
  EndingSoon = 'EndingSoon',
  HighestLastSale = 'HighestLastSale',
  PriceHighToLow = 'PriceHighToLow',
  PriceLowToHigh = 'PriceLowToHigh',
  RecentlyCreated = 'RecentlyCreated',
  RecentlyListed = 'RecentlyListed',
  RecentlySold = 'RecentlySold',
  RecentlyTransfer = 'RecentlyTransfer'
}

/** asset status */
export enum AssetStatus {
  BuyNow = 'BUY_NOW',
  HasOffers = 'HAS_OFFERS',
  OnAuction = 'ON_AUCTION',
  Verified = 'VERIFIED'
}

/** filter by collection's attributes */
export type AttributesFilter = {
  trait_type?: InputMaybe<Scalars['String']['input']>;
  values?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

/** collection model */
export type Collection = {
  __typename?: 'Collection';
  /** collection traits, namely stat/aggregation of all NFT's traits in this collection */
  attributes?: Maybe<CollectionTraitsStat>;
  banner_image_original_url?: Maybe<Scalars['String']['output']>;
  banner_image_url?: Maybe<Scalars['String']['output']>;
  categories?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  co_operators?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  contract_address?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  discord_link?: Maybe<Scalars['String']['output']>;
  external_url?: Maybe<Scalars['String']['output']>;
  facebook_link?: Maybe<Scalars['String']['output']>;
  flag?: Maybe<Scalars['String']['output']>;
  fore_banner_image_url?: Maybe<Scalars['String']['output']>;
  image_original_url?: Maybe<Scalars['String']['output']>;
  image_url?: Maybe<Scalars['String']['output']>;
  in_activity?: Maybe<Scalars['Boolean']['output']>;
  instagram_link?: Maybe<Scalars['String']['output']>;
  is_edit_disabled?: Maybe<Scalars['Int']['output']>;
  is_trade_disabled?: Maybe<Scalars['Int']['output']>;
  is_verified?: Maybe<Scalars['Int']['output']>;
  medium_link?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  object_count?: Maybe<Scalars['Int']['output']>;
  /** user info */
  owner?: Maybe<User>;
  owner_address?: Maybe<Scalars['String']['output']>;
  payment_tokens?: Maybe<Array<Maybe<Currency>>>;
  royalty?: Maybe<Scalars['Int']['output']>;
  royalty_address?: Maybe<Scalars['String']['output']>;
  /** collection statistics */
  stat?: Maybe<CollectionStat>;
  symbol?: Maybe<Scalars['String']['output']>;
  telegram_link?: Maybe<Scalars['String']['output']>;
  token_type?: Maybe<Scalars['String']['output']>;
  twitter_link?: Maybe<Scalars['String']['output']>;
  website_link?: Maybe<Scalars['String']['output']>;
  weibo_link?: Maybe<Scalars['String']['output']>;
};


/** collection model */
export type CollectionOwnerArgs = {
  address?: InputMaybe<Scalars['String']['input']>;
  chain?: InputMaybe<Scalars['String']['input']>;
};

/** collection daily trade stat */
export type CollectionDailyTradeStat = {
  __typename?: 'CollectionDailyTradeStat';
  avg_price?: Maybe<Scalars['Float']['output']>;
  num_sale?: Maybe<Scalars['Float']['output']>;
  timestamp?: Maybe<Scalars['DateTime']['output']>;
  volume?: Maybe<Scalars['Float']['output']>;
};

/** collection list with pagination */
export type CollectionList = {
  __typename?: 'CollectionList';
  items?: Maybe<Array<Maybe<Collection>>>;
  pagination?: Maybe<PagingInfo>;
};

/** sort collection by */
export enum CollectionSortBy {
  AssetsTotal = 'AssetsTotal',
  AvgPrice7d = 'AvgPrice7d',
  AvgPrice24h = 'AvgPrice24h',
  AvgPrice30d = 'AvgPrice30d',
  AvgPriceRatio7d = 'AvgPriceRatio7d',
  AvgPriceRatio24h = 'AvgPriceRatio24h',
  AvgPriceRatio30d = 'AvgPriceRatio30d',
  FloorPrice = 'FloorPrice',
  FloorPrice7d = 'FloorPrice7d',
  FloorPrice24h = 'FloorPrice24h',
  FloorPrice30d = 'FloorPrice30d',
  FloorPriceRatio7d = 'FloorPriceRatio7d',
  FloorPriceRatio24h = 'FloorPriceRatio24h',
  FloorPriceRatio30d = 'FloorPriceRatio30d',
  OwnersTotal = 'OwnersTotal',
  TopPrice7d = 'TopPrice7d',
  TopPrice24h = 'TopPrice24h',
  TopPrice30d = 'TopPrice30d',
  TopPriceRatio7d = 'TopPriceRatio7d',
  TopPriceRatio24h = 'TopPriceRatio24h',
  TopPriceRatio30d = 'TopPriceRatio30d',
  Volume7d = 'Volume7d',
  Volume24h = 'Volume24h',
  Volume30d = 'Volume30d',
  VolumeRatio7d = 'VolumeRatio7d',
  VolumeRatio24h = 'VolumeRatio24h',
  VolumeRatio30d = 'VolumeRatio30d',
  VolumeTotal = 'VolumeTotal'
}

/** collection statistics */
export type CollectionStat = {
  __typename?: 'CollectionStat';
  assets_total?: Maybe<Scalars['Float']['output']>;
  avg_price_7d?: Maybe<Scalars['Float']['output']>;
  avg_price_24h?: Maybe<Scalars['Float']['output']>;
  avg_price_30d?: Maybe<Scalars['Float']['output']>;
  avg_price_ratio_7d?: Maybe<Scalars['Float']['output']>;
  avg_price_ratio_24h?: Maybe<Scalars['Float']['output']>;
  avg_price_ratio_30d?: Maybe<Scalars['Float']['output']>;
  floor_price?: Maybe<Scalars['Float']['output']>;
  floor_price_7d?: Maybe<Scalars['Float']['output']>;
  floor_price_24h?: Maybe<Scalars['Float']['output']>;
  floor_price_30d?: Maybe<Scalars['Float']['output']>;
  floor_price_ratio_7d?: Maybe<Scalars['Float']['output']>;
  floor_price_ratio_24h?: Maybe<Scalars['Float']['output']>;
  floor_price_ratio_30d?: Maybe<Scalars['Float']['output']>;
  owners_total?: Maybe<Scalars['Float']['output']>;
  top_price_7d?: Maybe<Scalars['Float']['output']>;
  top_price_24h?: Maybe<Scalars['Float']['output']>;
  top_price_30d?: Maybe<Scalars['Float']['output']>;
  top_price_ratio_7d?: Maybe<Scalars['Float']['output']>;
  top_price_ratio_24h?: Maybe<Scalars['Float']['output']>;
  top_price_ratio_30d?: Maybe<Scalars['Float']['output']>;
  volume_7d?: Maybe<Scalars['Float']['output']>;
  volume_24h?: Maybe<Scalars['Float']['output']>;
  volume_30d?: Maybe<Scalars['Float']['output']>;
  volume_ratio_7d?: Maybe<Scalars['Float']['output']>;
  volume_ratio_24h?: Maybe<Scalars['Float']['output']>;
  volume_ratio_30d?: Maybe<Scalars['Float']['output']>;
  volume_today?: Maybe<Scalars['Float']['output']>;
  volume_total?: Maybe<Scalars['Float']['output']>;
  volume_yesterday?: Maybe<Scalars['Float']['output']>;
};

/** collection trading trend */
export type CollectionTradeTrend = {
  __typename?: 'CollectionTradeTrend';
  avg_price?: Maybe<Scalars['Float']['output']>;
  day_stats?: Maybe<Array<Maybe<CollectionDailyTradeStat>>>;
  num_sale?: Maybe<Scalars['Float']['output']>;
  volume?: Maybe<Scalars['Float']['output']>;
};

/** collection trade trend filter by days */
export enum CollectionTradeTrendFilterDays {
  Days_7 = 'Days_7',
  Days_14 = 'Days_14',
  Days_30 = 'Days_30',
  Days_60 = 'Days_60',
  Days_90 = 'Days_90',
  Days_365 = 'Days_365',
  DaysAll = 'Days_All'
}

/** collection trait stat */
export type CollectionTraitStat = {
  __typename?: 'CollectionTraitStat';
  trait_type?: Maybe<Scalars['String']['output']>;
  values?: Maybe<Array<Maybe<CollectionTraitValues>>>;
  values_total?: Maybe<Scalars['Int']['output']>;
};

/** collection trait values */
export type CollectionTraitValues = {
  __typename?: 'CollectionTraitValues';
  count?: Maybe<Scalars['Int']['output']>;
  value?: Maybe<Scalars['String']['output']>;
};

/** collection traits stat */
export type CollectionTraitsStat = {
  __typename?: 'CollectionTraitsStat';
  asset_total?: Maybe<Scalars['Int']['output']>;
  trait_types?: Maybe<Array<Maybe<CollectionTraitStat>>>;
  trait_types_total?: Maybe<Scalars['Int']['output']>;
};

/** currency info */
export type Currency = {
  __typename?: 'Currency';
  /** currency address */
  address?: Maybe<Scalars['String']['output']>;
  decimal?: Maybe<Scalars['Int']['output']>;
  icon?: Maybe<Scalars['String']['output']>;
  /** currency symbol, `''` if unknown */
  symbol?: Maybe<Scalars['String']['output']>;
};

/** event model */
export type Event = {
  __typename?: 'Event';
  contract_address?: Maybe<Scalars['String']['output']>;
  event_time?: Maybe<Scalars['DateTime']['output']>;
  event_type?: Maybe<Scalars['String']['output']>;
  expire_time?: Maybe<Scalars['DateTime']['output']>;
  from?: Maybe<User>;
  from_address?: Maybe<Scalars['String']['output']>;
  /** paid tokens and amount; NFT maybe paid with multiple tokens */
  payments?: Maybe<Array<Maybe<EventPayments>>>;
  quantity?: Maybe<Scalars['String']['output']>;
  to?: Maybe<User>;
  to_address?: Maybe<Scalars['String']['output']>;
  /** simplified NFT */
  token?: Maybe<TokenBase>;
  token_id?: Maybe<Scalars['String']['output']>;
  tx_hash?: Maybe<Scalars['String']['output']>;
};

/** event list with pagination */
export type EventList = {
  __typename?: 'EventList';
  items?: Maybe<Array<Maybe<Event>>>;
  pagination?: Maybe<PagingInfo>;
};

/** sale payments info */
export type EventPayments = {
  __typename?: 'EventPayments';
  /** currency info */
  currency?: Maybe<Currency>;
  /** price, unit wei */
  price?: Maybe<Scalars['String']['output']>;
  /** total paid, unit wei */
  value?: Maybe<Scalars['String']['output']>;
};

/** event type */
export enum EventType {
  Burn = 'Burn',
  CancelListing = 'CancelListing',
  CancelOffer = 'CancelOffer',
  Listing = 'Listing',
  Mint = 'Mint',
  Offer = 'Offer',
  Sale = 'Sale',
  Transfer = 'Transfer'
}

/** last sale info of NFT */
export type LastSaleItemV3 = {
  __typename?: 'LastSaleItemV3';
  /** collection detail */
  collection?: Maybe<Collection>;
  /** currency info */
  currency?: Maybe<Currency>;
  /** LastSalePrice */
  last_sale_price?: Maybe<Scalars['String']['output']>;
  /** lastSaleQuantity */
  last_sale_quantity?: Maybe<Scalars['String']['output']>;
  /** simplified NFT */
  token?: Maybe<TokenBase>;
};


/** last sale info of NFT */
export type LastSaleItemV3CollectionArgs = {
  address?: InputMaybe<Scalars['String']['input']>;
  chain?: InputMaybe<Scalars['String']['input']>;
};

/** best ask order info of NFT */
export type NftBestAsk = {
  __typename?: 'NFTBestAsk';
  /** BestAskCreatedTime */
  bestAskCreatedDate?: Maybe<Scalars['Int']['output']>;
  /** BestAskExpirationDate */
  bestAskExpirationDate?: Maybe<Scalars['Int']['output']>;
  /** whether best ask is private */
  bestAskIsPrivate?: Maybe<Scalars['Boolean']['output']>;
  /** BestAskListingDate */
  bestAskListingDate?: Maybe<Scalars['Int']['output']>;
  /** BestAskOrderQuantity */
  bestAskOrderQuantity?: Maybe<Scalars['Int']['output']>;
  /** BestAskOrderString */
  bestAskOrderString?: Maybe<Scalars['String']['output']>;
  /** BestAskOrderType */
  bestAskOrderType?: Maybe<Scalars['Int']['output']>;
  /** BestAskPrice */
  bestAskPrice?: Maybe<Scalars['Float']['output']>;
  /** BestAskPriceBase */
  bestAskPriceBase?: Maybe<Scalars['Float']['output']>;
  /** BestAskPriceCny */
  bestAskPriceCNY?: Maybe<Scalars['Float']['output']>;
  /** BestAskPriceUsd */
  bestAskPriceUSD?: Maybe<Scalars['Float']['output']>;
  /** BestAskSaleKind */
  bestAskSaleKind?: Maybe<Scalars['Int']['output']>;
  /** BestAskToken */
  bestAskToken?: Maybe<Scalars['String']['output']>;
  /** BestAskTokenId */
  bestAskTokenId?: Maybe<Scalars['Int']['output']>;
  /** Chain */
  chain?: Maybe<Scalars['String']['output']>;
  /** ChainId */
  chainId?: Maybe<Scalars['String']['output']>;
  /** collection detail */
  collection?: Maybe<Collection>;
  /** ContractAddress */
  contractAddress?: Maybe<Scalars['String']['output']>;
  /** NFT best ask's currency info */
  currency?: Maybe<Currency>;
  /** simplified NFT */
  token?: Maybe<TokenBase>;
  /** TokenId */
  tokenId?: Maybe<Scalars['String']['output']>;
};


/** best ask order info of NFT */
export type NftBestAskCollectionArgs = {
  address?: InputMaybe<Scalars['String']['input']>;
  chain?: InputMaybe<Scalars['String']['input']>;
};

/** best bid order info of NFT */
export type NftBestBid = {
  __typename?: 'NFTBestBid';
  /** BestBidCreatedTime */
  bestBidCreatedDate?: Maybe<Scalars['Int']['output']>;
  /** BestBidListingTime */
  bestBidListingDate?: Maybe<Scalars['Int']['output']>;
  /** BestBidOrderQuantity */
  bestBidOrderQuantity?: Maybe<Scalars['Int']['output']>;
  /** BestBidOrderString */
  bestBidOrderString?: Maybe<Scalars['String']['output']>;
  /** BestBidPrice */
  bestBidPrice?: Maybe<Scalars['Float']['output']>;
  /** BestBidPriceBase */
  bestBidPriceBase?: Maybe<Scalars['Float']['output']>;
  /** BestBidPriceCny */
  bestBidPriceCNY?: Maybe<Scalars['Float']['output']>;
  /** BestBidPriceUsd */
  bestBidPriceUSD?: Maybe<Scalars['Float']['output']>;
  /** BestBidToken */
  bestBidToken?: Maybe<Scalars['String']['output']>;
  /** BestBidTokenId */
  bestBidTokenId?: Maybe<Scalars['Int']['output']>;
  /** Chain */
  chain?: Maybe<Scalars['String']['output']>;
  /** ChainId */
  chainId?: Maybe<Scalars['String']['output']>;
  /** collection detail */
  collection?: Maybe<Collection>;
  /** ContractAddress */
  contractAddress?: Maybe<Scalars['String']['output']>;
  /** NFT best bid's currency info */
  currency?: Maybe<Currency>;
  /** simplified NFT */
  token?: Maybe<TokenBase>;
  /** TokenId */
  tokenId?: Maybe<Scalars['String']['output']>;
};


/** best bid order info of NFT */
export type NftBestBidCollectionArgs = {
  address?: InputMaybe<Scalars['String']['input']>;
  chain?: InputMaybe<Scalars['String']['input']>;
};

/** last sale info of NFT */
export type NftLastSale = {
  __typename?: 'NFTLastSale';
  /** collection detail */
  collection?: Maybe<Collection>;
  /** currency info */
  currency?: Maybe<Currency>;
  /** LastSalePrice */
  lastSalePrice?: Maybe<Scalars['String']['output']>;
  /** lastSaleQuantity */
  lastSaleQuantity?: Maybe<Scalars['String']['output']>;
  /** simplified NFT */
  token?: Maybe<TokenBase>;
};


/** last sale info of NFT */
export type NftLastSaleCollectionArgs = {
  address?: InputMaybe<Scalars['String']['input']>;
  chain?: InputMaybe<Scalars['String']['input']>;
};

/** NFT owner and his balance */
export type NftOwnerBalance = {
  __typename?: 'NFTOwnerBalance';
  balance?: Maybe<Scalars['String']['output']>;
  /** user info */
  owner?: Maybe<User>;
  owner_address?: Maybe<Scalars['String']['output']>;
};


/** NFT owner and his balance */
export type NftOwnerBalanceOwnerArgs = {
  address?: InputMaybe<Scalars['String']['input']>;
  chain?: InputMaybe<Scalars['String']['input']>;
};

/** User notification detail */
export type Notice = {
  __typename?: 'Notice';
  /** Category */
  category?: Maybe<Scalars['String']['output']>;
  /** Content */
  content?: Maybe<Scalars['String']['output']>;
  /** HasRead */
  has_read?: Maybe<Scalars['Boolean']['output']>;
  /** ID */
  id?: Maybe<Scalars['Int']['output']>;
  /** ImageUrl */
  image_url?: Maybe<Scalars['String']['output']>;
  /** PublishTime */
  publish_time?: Maybe<Scalars['String']['output']>;
  /** Title */
  title?: Maybe<Scalars['String']['output']>;
  /** simplified NFT */
  token?: Maybe<TokenBase>;
};

/** User notification list */
export type NoticeList = {
  __typename?: 'NoticeList';
  items?: Maybe<Array<Maybe<Notice>>>;
  pagination?: Maybe<PagingInfo>;
};

/** order detail model v3 */
export type OrderItemV3 = {
  __typename?: 'OrderItemV3';
  /** simplified NFT */
  asset?: Maybe<TokenBase>;
  /** AssetContract  标的物 (collection) contract address */
  asset_contract?: Maybe<Scalars['String']['output']>;
  /** AssetQuantity  标的物数量，ERC721 为 1，ERC1155 时可以是多个 */
  asset_quantity?: Maybe<Scalars['String']['output']>;
  /** AssetTokenId  标的物 tokenId */
  asset_token_id?: Maybe<Scalars['String']['output']>;
  /** AssetType  标的物类型，参见 common.AssetTypeXXX */
  asset_type?: Maybe<Scalars['Int']['output']>;
  /** BasicOrderType  基本订单类型，参见 common.BasicOrderTypeXXX */
  basic_order_type?: Maybe<Scalars['Int']['output']>;
  /** Chain  chain, tron/eth */
  chain?: Maybe<Scalars['String']['output']>;
  /** ChainId  chainId */
  chain_id?: Maybe<Scalars['String']['output']>;
  /** ClientSignature  maker 对 ExchangeData 的 EIP712签名 */
  client_signature?: Maybe<Scalars['String']['output']>;
  /** CloseTime  关闭时间，e.g. 竞拍接近尾声时提前关闭❓ */
  close_time?: Maybe<Scalars['Int']['output']>;
  /** collection detail */
  collection?: Maybe<Collection>;
  /** DoneTime  成交/取消/下架时间 */
  done_time?: Maybe<Scalars['Int']['output']>;
  /** EndTime  Offer 有效时间-结束 */
  end_time?: Maybe<Scalars['Int']['output']>;
  /** EnglishAuctionReservePrice  英拍保留价，为最大精度 */
  english_auction_reserve_price?: Maybe<Scalars['String']['output']>;
  /** ExchangeContract  交易合约地址 */
  exchange_contract?: Maybe<Scalars['String']['output']>;
  /** IsCancelled  是否已取消 */
  is_cancelled?: Maybe<Scalars['Boolean']['output']>;
  /** IsMatchable  是否可以撮合成交 */
  is_matchable?: Maybe<Scalars['Boolean']['output']>;
  /** IsPrivate  是否私有(定向)订单 */
  is_private?: Maybe<Scalars['Boolean']['output']>;
  /** ListingTime  挂单时间，是否就是 ExchangeData.StartTime❓ */
  listing_time?: Maybe<Scalars['Int']['output']>;
  /** Maker  maker address, 等于 ExchangeData.Offerer */
  maker?: Maybe<Scalars['String']['output']>;
  /** MakerProtocolFee  maker 手续费，乘了1w */
  maker_protocol_fee?: Maybe<Scalars['Int']['output']>;
  /** MakerRoyaltyFee  maker 版税，乘了1w */
  maker_royalty_fee?: Maybe<Scalars['Int']['output']>;
  maker_user?: Maybe<User>;
  /** OrderHash  订单hash❓，可用作订单唯一标识 */
  order_hash?: Maybe<Scalars['String']['output']>;
  /** OrderKind  (链下)订单类型，参见 common.OrderKindXXX */
  order_kind?: Maybe<Scalars['Int']['output']>;
  /** OrderSide  挂单or报价，参见 common.OrderSideXXX */
  order_side?: Maybe<Scalars['Int']['output']>;
  /** OrderKind  (链下)订单状态，参见 common.OrderStatusXXX */
  order_status?: Maybe<Scalars['Int']['output']>;
  /** OrderType  订单类型，参见 common.OrderTypeXXX */
  order_type?: Maybe<Scalars['Int']['output']>;
  /** PayAmount  支付金额，TRX为零地址 */
  pay_amount?: Maybe<Scalars['String']['output']>;
  /** currency info */
  pay_currency?: Maybe<Currency>;
  /** PayPrice  支付单价(=pay_amount/asset_quantity)，为最大精度，e.g. 1000000 (1WTRX) */
  pay_price?: Maybe<Scalars['String']['output']>;
  /** PayPriceInNative  转换为本币(TRX)后的单价，e.g. 1.0，也即 1TRX */
  pay_price_in_native?: Maybe<Scalars['Float']['output']>;
  /** PayPriceInUsd  转换为USD后的单价，e.g. 0.082，也即 1WTRX */
  pay_price_in_usd?: Maybe<Scalars['Float']['output']>;
  /** PayToken  支付币种地址，TRX为零地址 */
  pay_token?: Maybe<Scalars['String']['output']>;
  /** ProtocolFeeRecipient  手续费接受地址 */
  protocol_fee_recipient?: Maybe<Scalars['String']['output']>;
  /** RoyaltyFeeRecipient  版税接受地址 */
  royalty_fee_recipient?: Maybe<Scalars['String']['output']>;
  /** ServerSignature  服务端签名❓ */
  server_signature?: Maybe<Scalars['String']['output']>;
  /** StartTime  Offer 有效时间-开始 */
  start_time?: Maybe<Scalars['Int']['output']>;
  /** Taker  taker address，多个 taker 时❓ */
  taker?: Maybe<Scalars['String']['output']>;
  /** TakerProtocolFee  taker 手续费，乘了1w，多个 taker 时❓ */
  taker_protocol_fee?: Maybe<Scalars['Int']['output']>;
  /** TakerRoyaltyFee  taker 版税，乘了1w，多个 taker 时❓ */
  taker_royalty_fee?: Maybe<Scalars['Int']['output']>;
  taker_user?: Maybe<User>;
};


/** order detail model v3 */
export type OrderItemV3CollectionArgs = {
  address?: InputMaybe<Scalars['String']['input']>;
  chain?: InputMaybe<Scalars['String']['input']>;
};

/** order list with pagination */
export type OrderListV2 = {
  __typename?: 'OrderListV2';
  items?: Maybe<Array<Maybe<OrderV2>>>;
  pagination?: Maybe<PagingInfo>;
};

/** order list with pagination */
export type OrderListV3 = {
  __typename?: 'OrderListV3';
  items?: Maybe<Array<Maybe<OrderItemV3>>>;
  pagination?: Maybe<PagingInfo>;
};

/** order model v2 */
export type OrderV2 = {
  __typename?: 'OrderV2';
  /** ApprovedOnChain */
  approvedOnChain?: Maybe<Scalars['Boolean']['output']>;
  /** BasePrice */
  basePrice?: Maybe<Scalars['String']['output']>;
  /** Cancelled */
  cancelled?: Maybe<Scalars['Boolean']['output']>;
  /** Chain */
  chain?: Maybe<Scalars['String']['output']>;
  /** ChainId */
  chainId?: Maybe<Scalars['String']['output']>;
  /** ClosedTime */
  closedTime?: Maybe<Scalars['Int']['output']>;
  /** ClosingDate */
  closingDate?: Maybe<Scalars['String']['output']>;
  /** collection detail */
  collection?: Maybe<Collection>;
  /** CreatedDate */
  createdDate?: Maybe<Scalars['String']['output']>;
  /** currency info */
  currency?: Maybe<Currency>;
  /** DataToCall */
  dataToCall?: Maybe<Scalars['String']['output']>;
  /** EngAuctionResPrice */
  englishAuctionReservePrice?: Maybe<Scalars['String']['output']>;
  /** Exchange */
  exchange?: Maybe<Scalars['String']['output']>;
  /** ExchangeData */
  exchangeData?: Maybe<Scalars['String']['output']>;
  /** ExpirationTime */
  expirationTime?: Maybe<Scalars['Int']['output']>;
  /** Extra */
  extra?: Maybe<Scalars['String']['output']>;
  /** FeeMethod */
  feeMethod?: Maybe<Scalars['Int']['output']>;
  /** FeeRecipient */
  feeRecipient?: Maybe<Scalars['String']['output']>;
  /** Finalized */
  finalized?: Maybe<Scalars['Boolean']['output']>;
  /** HowToCall */
  howToCall?: Maybe<Scalars['Int']['output']>;
  /** Id */
  id?: Maybe<Scalars['Int']['output']>;
  /** ListingTime */
  listingTime?: Maybe<Scalars['Int']['output']>;
  /** Maker */
  maker?: Maybe<Scalars['String']['output']>;
  /** MakerProtocolFee */
  makerProtocolFee?: Maybe<Scalars['String']['output']>;
  /** MakerRelayerFee */
  makerRelayerFee?: Maybe<Scalars['String']['output']>;
  makerUser?: Maybe<User>;
  /** MarkedInvalid */
  markedInvalid?: Maybe<Scalars['Boolean']['output']>;
  metadata?: Maybe<OrderV2Metadata>;
  /** OrderHash */
  orderHash?: Maybe<Scalars['String']['output']>;
  /** OrderType */
  orderType?: Maybe<Scalars['Int']['output']>;
  /** PaymentToken */
  paymentToken?: Maybe<Scalars['String']['output']>;
  /** Price */
  price?: Maybe<Scalars['Float']['output']>;
  /** PriceBase */
  priceBase?: Maybe<Scalars['Float']['output']>;
  /** PriceCny */
  priceCNY?: Maybe<Scalars['Float']['output']>;
  /** PriceUsd */
  priceUSD?: Maybe<Scalars['Float']['output']>;
  /** Quantity */
  quantity?: Maybe<Scalars['String']['output']>;
  /** R */
  r?: Maybe<Scalars['String']['output']>;
  /** ReplacementPattern */
  replacementPattern?: Maybe<Scalars['String']['output']>;
  /** S */
  s?: Maybe<Scalars['String']['output']>;
  /** SaleKind */
  saleKind?: Maybe<Scalars['Int']['output']>;
  /** Salt */
  salt?: Maybe<Scalars['String']['output']>;
  /** Side */
  side?: Maybe<Scalars['Int']['output']>;
  /** Standard */
  standard?: Maybe<Scalars['String']['output']>;
  /** StaticExtraData */
  staticExtradata?: Maybe<Scalars['String']['output']>;
  /** StaticTarget */
  staticTarget?: Maybe<Scalars['String']['output']>;
  /** Taker */
  taker?: Maybe<Scalars['String']['output']>;
  /** TakerProtocolFee */
  takerProtocolFee?: Maybe<Scalars['String']['output']>;
  /** TakerRelayerFee */
  takerRelayerFee?: Maybe<Scalars['String']['output']>;
  takerUser?: Maybe<User>;
  /** Target */
  target?: Maybe<Scalars['String']['output']>;
  /** simplified NFT */
  token?: Maybe<TokenBase>;
  /** V */
  v?: Maybe<Scalars['Int']['output']>;
};


/** order model v2 */
export type OrderV2CollectionArgs = {
  address?: InputMaybe<Scalars['String']['input']>;
  chain?: InputMaybe<Scalars['String']['input']>;
};

/** order's asset metadata */
export type OrderV2AssetMeta = {
  __typename?: 'OrderV2AssetMeta';
  /** Collection contract address */
  address?: Maybe<Scalars['String']['output']>;
  /** Data */
  data?: Maybe<Scalars['String']['output']>;
  /** NFT Id */
  id?: Maybe<Scalars['String']['output']>;
  /** Quantity traded */
  quantity?: Maybe<Scalars['String']['output']>;
};

/** order's metadata */
export type OrderV2Metadata = {
  __typename?: 'OrderV2Metadata';
  asset?: Maybe<OrderV2AssetMeta>;
  /** NFT standards */
  schema?: Maybe<Scalars['String']['output']>;
};

/** pagination, required */
export type Pagination = {
  /** pass the returned `cursor` in */
  cursor?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
};

/** pagination info */
export type PagingInfo = {
  __typename?: 'PagingInfo';
  /** please pass in along with next request */
  cursor?: Maybe<Scalars['String']['output']>;
  /** stop requesting if `false` */
  has_next?: Maybe<Scalars['Boolean']['output']>;
  /** total records hits */
  total?: Maybe<Scalars['Int']['output']>;
};

/** filter by order prices */
export type PriceRangeFilter = {
  currency?: InputMaybe<Scalars['String']['input']>;
  max?: InputMaybe<Scalars['Float']['input']>;
  min?: InputMaybe<Scalars['Float']['input']>;
};

/** user received offer list with pagination */
export type RcvdOfferListV2 = {
  __typename?: 'RcvdOfferListV2';
  items?: Maybe<Array<Maybe<RcvdOfferV2>>>;
  pagination?: Maybe<PagingInfo>;
};

/** user received offer model */
export type RcvdOfferV2 = {
  __typename?: 'RcvdOfferV2';
  bestBidOrder?: Maybe<OrderV2>;
  /** collection detail */
  collection?: Maybe<Collection>;
  /** Collection */
  contractAddress?: Maybe<Scalars['String']['output']>;
  /** OfferCount */
  offerCount?: Maybe<Scalars['Int']['output']>;
  /** simplified NFT */
  token?: Maybe<TokenBase>;
  /** TokenId */
  tokenId?: Maybe<Scalars['String']['output']>;
};


/** user received offer model */
export type RcvdOfferV2CollectionArgs = {
  address?: InputMaybe<Scalars['String']['input']>;
  chain?: InputMaybe<Scalars['String']['input']>;
};

/** Root Query */
export type RootQuery = {
  __typename?: 'RootQuery';
  /** NFT detail */
  asset?: Maybe<Token>;
  /** search NFT */
  assets?: Maybe<TokenList>;
  /** user following asset list */
  assets_following?: Maybe<TokenList>;
  /** collection detail */
  collection?: Maybe<Collection>;
  /** collection trading trend */
  collection_trade_trend?: Maybe<CollectionTradeTrend>;
  /** collection list */
  collections?: Maybe<CollectionList>;
  /** event list */
  events?: Maybe<EventList>;
  /** NFT's valid ask/bid orders */
  nft_valid_orders?: Maybe<OrderListV2>;
  /** Get user's notifications */
  notices?: Maybe<NoticeList>;
  /** v3 order list */
  order_list?: Maybe<OrderListV3>;
  /** search collection traits */
  search_collection_traits?: Maybe<CollectionTraitsStat>;
  /** UI supported filters */
  ui_filters?: Maybe<UiFilters>;
  /** user info */
  user?: Maybe<User>;
  /** user received offers */
  user_rcvd_offer_list?: Maybe<UserRcvdOfferListV3>;
  /** user received offers */
  user_rcvd_offers?: Maybe<RcvdOfferListV2>;
  /** user sent offers for other NFTs */
  user_sent_offers?: Maybe<OrderListV2>;
  /** get user */
  users?: Maybe<UserList>;
};


/** Root Query */
export type RootQueryAssetArgs = {
  chain?: InputMaybe<Scalars['String']['input']>;
  collection?: InputMaybe<Scalars['String']['input']>;
  token_id?: InputMaybe<Scalars['String']['input']>;
};


/** Root Query */
export type RootQueryAssetsArgs = {
  attributes?: InputMaybe<Array<InputMaybe<AttributesFilter>>>;
  categories?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  chain?: InputMaybe<Scalars['String']['input']>;
  collection_types?: InputMaybe<Array<InputMaybe<AssetListCollectionTypes>>>;
  collections?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  creators?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  currencies?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  is_recommend?: InputMaybe<Scalars['Boolean']['input']>;
  owners?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  pagination?: InputMaybe<Pagination>;
  price?: InputMaybe<PriceRangeFilter>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<AssetSortBy>;
  statuses?: InputMaybe<Array<InputMaybe<AssetStatus>>>;
  user_account?: InputMaybe<Scalars['String']['input']>;
};


/** Root Query */
export type RootQueryAssets_FollowingArgs = {
  chain?: InputMaybe<Scalars['String']['input']>;
  pagination?: InputMaybe<Pagination>;
  user?: InputMaybe<Scalars['String']['input']>;
};


/** Root Query */
export type RootQueryCollectionArgs = {
  address?: InputMaybe<Scalars['String']['input']>;
  chain?: InputMaybe<Scalars['String']['input']>;
};


/** Root Query */
export type RootQueryCollection_Trade_TrendArgs = {
  chain?: InputMaybe<Scalars['String']['input']>;
  collection?: InputMaybe<Scalars['String']['input']>;
  days?: InputMaybe<CollectionTradeTrendFilterDays>;
};


/** Root Query */
export type RootQueryCollectionsArgs = {
  asset_creators?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  asset_owners?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  categories?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  chain?: InputMaybe<Scalars['String']['input']>;
  collection_types?: InputMaybe<Array<InputMaybe<CollectionListCollectionTypes>>>;
  event_involved?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  has_listing_asset?: InputMaybe<Scalars['Boolean']['input']>;
  is_rank_disabled?: InputMaybe<Scalars['Boolean']['input']>;
  is_recommend?: InputMaybe<Scalars['Boolean']['input']>;
  is_verified?: InputMaybe<Scalars['Boolean']['input']>;
  owners?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  pagination?: InputMaybe<Pagination>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<CollectionSortBy>;
  sort_asc?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Root Query */
export type RootQueryEventsArgs = {
  chain?: InputMaybe<Scalars['String']['input']>;
  collections?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  currencies?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  event_types?: InputMaybe<Array<InputMaybe<EventType>>>;
  pagination?: InputMaybe<Pagination>;
  token_id?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<Scalars['String']['input']>;
};


/** Root Query */
export type RootQueryNft_Valid_OrdersArgs = {
  chain?: InputMaybe<Scalars['String']['input']>;
  collection?: InputMaybe<Scalars['String']['input']>;
  need_ask?: InputMaybe<Scalars['Boolean']['input']>;
  pagination?: InputMaybe<Pagination>;
  token_id?: InputMaybe<Scalars['String']['input']>;
};


/** Root Query */
export type RootQueryNoticesArgs = {
  category?: InputMaybe<Scalars['String']['input']>;
  language?: InputMaybe<Scalars['String']['input']>;
  pagination?: InputMaybe<Pagination>;
  signature?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<Scalars['String']['input']>;
};


/** Root Query */
export type RootQueryOrder_ListArgs = {
  asset_key?: InputMaybe<Scalars['String']['input']>;
  maker?: InputMaybe<Scalars['String']['input']>;
  order_side?: InputMaybe<Scalars['Int']['input']>;
  pagination?: InputMaybe<Pagination>;
};


/** Root Query */
export type RootQuerySearch_Collection_TraitsArgs = {
  address?: InputMaybe<Scalars['String']['input']>;
  attr?: InputMaybe<Scalars['String']['input']>;
  keyword?: InputMaybe<Scalars['String']['input']>;
};


/** Root Query */
export type RootQueryUi_FiltersArgs = {
  chain?: InputMaybe<Scalars['String']['input']>;
};


/** Root Query */
export type RootQueryUserArgs = {
  address?: InputMaybe<Scalars['String']['input']>;
  chain?: InputMaybe<Scalars['String']['input']>;
};


/** Root Query */
export type RootQueryUser_Rcvd_Offer_ListArgs = {
  pagination?: InputMaybe<Pagination>;
  user?: InputMaybe<Scalars['String']['input']>;
};


/** Root Query */
export type RootQueryUser_Rcvd_OffersArgs = {
  chain?: InputMaybe<Scalars['String']['input']>;
  pagination?: InputMaybe<Pagination>;
  user?: InputMaybe<Scalars['String']['input']>;
};


/** Root Query */
export type RootQueryUser_Sent_OffersArgs = {
  chain?: InputMaybe<Scalars['String']['input']>;
  pagination?: InputMaybe<Pagination>;
  user?: InputMaybe<Scalars['String']['input']>;
};


/** Root Query */
export type RootQueryUsersArgs = {
  chain?: InputMaybe<Scalars['String']['input']>;
  pagination?: InputMaybe<Pagination>;
  search?: InputMaybe<Scalars['String']['input']>;
};

/** NFT detail */
export type Token = {
  __typename?: 'Token';
  animation_original_url?: Maybe<Scalars['String']['output']>;
  animation_url?: Maybe<Scalars['String']['output']>;
  /** best best ask orders of NFT */
  asks_v2?: Maybe<Array<Maybe<NftBestAsk>>>;
  /** best ask orders of Asset */
  asks_v3?: Maybe<Array<Maybe<OrderItemV3>>>;
  attributes?: Maybe<Array<Maybe<TokenAttribute>>>;
  /** best bid orders of the token */
  bids_v2?: Maybe<Array<Maybe<NftBestBid>>>;
  /** best bid orders of Asset */
  bids_v3?: Maybe<Array<Maybe<OrderItemV3>>>;
  /** collection detail */
  collection?: Maybe<Collection>;
  contract_address?: Maybe<Scalars['String']['output']>;
  creators?: Maybe<Array<Maybe<User>>>;
  description?: Maybe<Scalars['String']['output']>;
  external_url?: Maybe<Scalars['String']['output']>;
  flag?: Maybe<Scalars['String']['output']>;
  image_original_url?: Maybe<Scalars['String']['output']>;
  image_url?: Maybe<Scalars['String']['output']>;
  /** open mystery box param */
  mystery_box?: Maybe<LaunchpadAsset>;
  name?: Maybe<Scalars['String']['output']>;
  /** owner balances */
  owners?: Maybe<Array<Maybe<NftOwnerBalance>>>;
  /** last sales of NFT */
  sales_v2?: Maybe<Array<Maybe<NftLastSale>>>;
  /** last sales of NFT */
  sales_v3?: Maybe<Array<Maybe<LastSaleItemV3>>>;
  token_id?: Maybe<Scalars['String']['output']>;
  token_type?: Maybe<Scalars['String']['output']>;
  /** metadata uri */
  token_uri?: Maybe<Scalars['String']['output']>;
  /** TradeVersion trading via v2 or v3 */
  trade_version?: Maybe<Scalars['String']['output']>;
};


/** NFT detail */
export type TokenCollectionArgs = {
  address?: InputMaybe<Scalars['String']['input']>;
  chain?: InputMaybe<Scalars['String']['input']>;
};

/** token attribute */
export type TokenAttribute = {
  __typename?: 'TokenAttribute';
  display_type?: Maybe<Scalars['String']['output']>;
  trait_type?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Scalars['String']['output']>;
};

/** simplified NFT model */
export type TokenBase = {
  __typename?: 'TokenBase';
  animation_original_url?: Maybe<Scalars['String']['output']>;
  animation_url?: Maybe<Scalars['String']['output']>;
  attributes?: Maybe<Array<Maybe<TokenAttribute>>>;
  /** collection detail */
  collection?: Maybe<Collection>;
  contract_address?: Maybe<Scalars['String']['output']>;
  creators?: Maybe<Array<Maybe<User>>>;
  description?: Maybe<Scalars['String']['output']>;
  external_url?: Maybe<Scalars['String']['output']>;
  flag?: Maybe<Scalars['String']['output']>;
  image_original_url?: Maybe<Scalars['String']['output']>;
  image_url?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  token_id?: Maybe<Scalars['String']['output']>;
  token_type?: Maybe<Scalars['String']['output']>;
  /** metadata uri */
  token_uri?: Maybe<Scalars['String']['output']>;
};


/** simplified NFT model */
export type TokenBaseCollectionArgs = {
  address?: InputMaybe<Scalars['String']['input']>;
  chain?: InputMaybe<Scalars['String']['input']>;
};

/** NFT list with pagination */
export type TokenList = {
  __typename?: 'TokenList';
  items?: Maybe<Array<Maybe<Token>>>;
  pagination?: Maybe<PagingInfo>;
};

/** UI supported filters */
export type UiFilters = {
  __typename?: 'UIFilters';
  explore_currencies?: Maybe<Array<Maybe<Currency>>>;
};


/** UI supported filters */
export type UiFiltersExplore_CurrenciesArgs = {
  chain?: InputMaybe<Scalars['String']['input']>;
};

/** user model */
export type User = {
  __typename?: 'User';
  address?: Maybe<Scalars['String']['output']>;
  profile?: Maybe<UserProfile>;
};

/** user list */
export type UserList = {
  __typename?: 'UserList';
  items?: Maybe<Array<Maybe<User>>>;
  pagination?: Maybe<PagingInfo>;
};

/** user profile */
export type UserProfile = {
  __typename?: 'UserProfile';
  account_address?: Maybe<Scalars['String']['output']>;
  bio?: Maybe<Scalars['String']['output']>;
  discord_link?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  external_link?: Maybe<Scalars['String']['output']>;
  facebook_link?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  instagram_link?: Maybe<Scalars['String']['output']>;
  is_verified?: Maybe<Scalars['Int']['output']>;
  medium_link?: Maybe<Scalars['String']['output']>;
  profile_cover_url?: Maybe<Scalars['String']['output']>;
  profile_image_url?: Maybe<Scalars['String']['output']>;
  telegram_link?: Maybe<Scalars['String']['output']>;
  twitter_link?: Maybe<Scalars['String']['output']>;
  user_name?: Maybe<Scalars['String']['output']>;
  weibo_link?: Maybe<Scalars['String']['output']>;
};

/** user received offer detail */
export type UserRcvdOfferItemV3 = {
  __typename?: 'UserRcvdOfferItemV3';
  /** simplified NFT */
  asset?: Maybe<TokenBase>;
  best_offer?: Maybe<OrderItemV3>;
  /** collection detail */
  collection?: Maybe<Collection>;
  /** Contract address */
  contract_address?: Maybe<Scalars['String']['output']>;
  /** Token id */
  token_id?: Maybe<Scalars['String']['output']>;
  /** Total offers received in this collection */
  total_offer?: Maybe<Scalars['Int']['output']>;
};


/** user received offer detail */
export type UserRcvdOfferItemV3CollectionArgs = {
  address?: InputMaybe<Scalars['String']['input']>;
  chain?: InputMaybe<Scalars['String']['input']>;
};

/** user received offer list with pagination */
export type UserRcvdOfferListV3 = {
  __typename?: 'UserRcvdOfferListV3';
  items?: Maybe<Array<Maybe<UserRcvdOfferItemV3>>>;
  pagination?: Maybe<PagingInfo>;
};

/** collection types */
export enum AssetListCollectionTypes {
  MysteryBox = 'MYSTERY_BOX',
  Normal = 'NORMAL'
}

/** collection types */
export enum CollectionListCollectionTypes {
  MysteryBox = 'MYSTERY_BOX',
  Normal = 'NORMAL'
}

/** open mystery box param */
export type LaunchpadAsset = {
  __typename?: 'launchpadAsset';
  flag_can_open?: Maybe<Scalars['Boolean']['output']>;
  launchpad_id?: Maybe<Scalars['String']['output']>;
  proxy_id?: Maybe<Scalars['String']['output']>;
  slot_idx?: Maybe<Scalars['String']['output']>;
};

export type GetAssetDetailQueryVariables = Exact<{
  token_id?: InputMaybe<Scalars['String']['input']>;
  collection?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetAssetDetailQuery = { __typename?: 'RootQuery', asset?: { __typename?: 'Token', owners?: Array<{ __typename?: 'NFTOwnerBalance', owner_address?: string | null } | null> | null } | null };

export type GetAssetsQueryVariables = Exact<{
  pagination?: InputMaybe<Pagination>;
  sort?: InputMaybe<AssetSortBy>;
  price?: InputMaybe<PriceRangeFilter>;
  statuses?: InputMaybe<Array<InputMaybe<AssetStatus>> | InputMaybe<AssetStatus>>;
  collections?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>> | InputMaybe<Scalars['String']['input']>>;
  user_account?: InputMaybe<Scalars['String']['input']>;
  owners?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>> | InputMaybe<Scalars['String']['input']>>;
  creators?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>> | InputMaybe<Scalars['String']['input']>>;
  attributes?: InputMaybe<Array<InputMaybe<AttributesFilter>> | InputMaybe<AttributesFilter>>;
  search?: InputMaybe<Scalars['String']['input']>;
  categories?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>> | InputMaybe<Scalars['String']['input']>>;
  currencies?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>> | InputMaybe<Scalars['String']['input']>>;
  is_recommend?: InputMaybe<Scalars['Boolean']['input']>;
  collection_types?: InputMaybe<Array<InputMaybe<AssetListCollectionTypes>> | InputMaybe<AssetListCollectionTypes>>;
}>;


export type GetAssetsQuery = { __typename?: 'RootQuery', assets?: { __typename?: 'TokenList', items?: Array<{ __typename: 'Token', token_id?: string | null, contract_address?: string | null, image_url?: string | null, animation_url?: string | null, name?: string | null, token_type?: string | null, token_uri?: string | null, trade_version?: string | null, description?: string | null, external_url?: string | null, attributes?: Array<{ __typename?: 'TokenAttribute', display_type?: string | null, trait_type?: string | null, value?: string | null } | null> | null, collection?: { __typename: 'Collection', royalty?: number | null, royalty_address?: string | null, name?: string | null, is_verified?: number | null, contract_address?: string | null, image_url?: string | null, banner_image_url?: string | null, description?: string | null, discord_link?: string | null, twitter_link?: string | null, website_link?: string | null, external_url?: string | null, stat?: { __typename: 'CollectionStat', assets_total?: number | null, owners_total?: number | null, floor_price?: number | null, volume_total?: number | null } | null, payment_tokens?: Array<{ __typename: 'Currency', address?: string | null, decimal?: number | null, icon?: string | null, symbol?: string | null } | null> | null } | null, asks_v2?: Array<{ __typename: 'NFTBestAsk', bestAskCreatedDate?: number | null, bestAskExpirationDate?: number | null, bestAskListingDate?: number | null, bestAskOrderQuantity?: number | null, bestAskOrderString?: string | null, bestAskOrderType?: number | null, bestAskPrice?: number | null, bestAskPriceBase?: number | null, bestAskPriceCNY?: number | null, bestAskPriceUSD?: number | null, bestAskSaleKind?: number | null, bestAskToken?: string | null, bestAskTokenId?: number | null, chain?: string | null, chainId?: string | null, contractAddress?: string | null, currency?: { __typename?: 'Currency', address?: string | null, decimal?: number | null, icon?: string | null, symbol?: string | null } | null } | null> | null, bids_v2?: Array<{ __typename: 'NFTBestBid', bestBidCreatedDate?: number | null, bestBidListingDate?: number | null, bestBidOrderQuantity?: number | null, bestBidOrderString?: string | null, bestBidPrice?: number | null, bestBidPriceBase?: number | null, bestBidPriceCNY?: number | null, bestBidPriceUSD?: number | null, bestBidToken?: string | null, bestBidTokenId?: number | null, chain?: string | null, chainId?: string | null, contractAddress?: string | null, currency?: { __typename?: 'Currency', address?: string | null, decimal?: number | null, icon?: string | null, symbol?: string | null } | null } | null> | null, sales_v2?: Array<{ __typename: 'NFTLastSale', lastSalePrice?: string | null, lastSaleQuantity?: string | null, currency?: { __typename?: 'Currency', address?: string | null, decimal?: number | null, icon?: string | null, symbol?: string | null } | null } | null> | null, asks_v3?: Array<{ __typename: 'OrderItemV3', start_time?: number | null, asset_type?: number | null, asset_contract?: string | null, asset_quantity?: string | null, asset_token_id?: string | null, pay_token?: string | null, is_private?: boolean | null, english_auction_reserve_price?: string | null, pay_price?: string | null, pay_price_in_usd?: number | null, end_time?: number | null, close_time?: number | null, order_kind?: number | null, exchange_contract?: string | null, maker?: string | null, taker?: string | null, order_hash?: string | null, pay_currency?: { __typename?: 'Currency', address?: string | null, decimal?: number | null, icon?: string | null, symbol?: string | null } | null, taker_user?: { __typename?: 'User', profile?: { __typename?: 'UserProfile', account_address?: string | null, user_name?: string | null, profile_image_url?: string | null } | null } | null, maker_user?: { __typename?: 'User', profile?: { __typename?: 'UserProfile', account_address?: string | null, user_name?: string | null, profile_image_url?: string | null } | null } | null } | null> | null, bids_v3?: Array<{ __typename: 'OrderItemV3', pay_price?: string | null, pay_currency?: { __typename: 'Currency', address?: string | null, decimal?: number | null, icon?: string | null, symbol?: string | null } | null } | null> | null, sales_v3?: Array<{ __typename: 'LastSaleItemV3', last_sale_price?: string | null, currency?: { __typename: 'Currency', address?: string | null, decimal?: number | null, icon?: string | null, symbol?: string | null } | null } | null> | null, owners?: Array<{ __typename: 'NFTOwnerBalance', owner?: { __typename: 'User', profile?: { __typename?: 'UserProfile', account_address?: string | null, user_name?: string | null, profile_image_url?: string | null } | null } | null } | null> | null } | null> | null, pagination?: { __typename?: 'PagingInfo', total?: number | null, cursor?: string | null, has_next?: boolean | null } | null } | null };

export type AssetsFieldsFragment = { __typename: 'Token', token_id?: string | null, contract_address?: string | null, image_url?: string | null, animation_url?: string | null, name?: string | null, token_type?: string | null, token_uri?: string | null, trade_version?: string | null, description?: string | null, external_url?: string | null, attributes?: Array<{ __typename?: 'TokenAttribute', display_type?: string | null, trait_type?: string | null, value?: string | null } | null> | null, collection?: { __typename: 'Collection', royalty?: number | null, royalty_address?: string | null, name?: string | null, is_verified?: number | null, contract_address?: string | null, image_url?: string | null, banner_image_url?: string | null, description?: string | null, discord_link?: string | null, twitter_link?: string | null, website_link?: string | null, external_url?: string | null, stat?: { __typename: 'CollectionStat', assets_total?: number | null, owners_total?: number | null, floor_price?: number | null, volume_total?: number | null } | null, payment_tokens?: Array<{ __typename: 'Currency', address?: string | null, decimal?: number | null, icon?: string | null, symbol?: string | null } | null> | null } | null, asks_v2?: Array<{ __typename: 'NFTBestAsk', bestAskCreatedDate?: number | null, bestAskExpirationDate?: number | null, bestAskListingDate?: number | null, bestAskOrderQuantity?: number | null, bestAskOrderString?: string | null, bestAskOrderType?: number | null, bestAskPrice?: number | null, bestAskPriceBase?: number | null, bestAskPriceCNY?: number | null, bestAskPriceUSD?: number | null, bestAskSaleKind?: number | null, bestAskToken?: string | null, bestAskTokenId?: number | null, chain?: string | null, chainId?: string | null, contractAddress?: string | null, currency?: { __typename?: 'Currency', address?: string | null, decimal?: number | null, icon?: string | null, symbol?: string | null } | null } | null> | null, bids_v2?: Array<{ __typename: 'NFTBestBid', bestBidCreatedDate?: number | null, bestBidListingDate?: number | null, bestBidOrderQuantity?: number | null, bestBidOrderString?: string | null, bestBidPrice?: number | null, bestBidPriceBase?: number | null, bestBidPriceCNY?: number | null, bestBidPriceUSD?: number | null, bestBidToken?: string | null, bestBidTokenId?: number | null, chain?: string | null, chainId?: string | null, contractAddress?: string | null, currency?: { __typename?: 'Currency', address?: string | null, decimal?: number | null, icon?: string | null, symbol?: string | null } | null } | null> | null, sales_v2?: Array<{ __typename: 'NFTLastSale', lastSalePrice?: string | null, lastSaleQuantity?: string | null, currency?: { __typename?: 'Currency', address?: string | null, decimal?: number | null, icon?: string | null, symbol?: string | null } | null } | null> | null, asks_v3?: Array<{ __typename: 'OrderItemV3', start_time?: number | null, asset_type?: number | null, asset_contract?: string | null, asset_quantity?: string | null, asset_token_id?: string | null, pay_token?: string | null, is_private?: boolean | null, english_auction_reserve_price?: string | null, pay_price?: string | null, pay_price_in_usd?: number | null, end_time?: number | null, close_time?: number | null, order_kind?: number | null, exchange_contract?: string | null, maker?: string | null, taker?: string | null, order_hash?: string | null, pay_currency?: { __typename?: 'Currency', address?: string | null, decimal?: number | null, icon?: string | null, symbol?: string | null } | null, taker_user?: { __typename?: 'User', profile?: { __typename?: 'UserProfile', account_address?: string | null, user_name?: string | null, profile_image_url?: string | null } | null } | null, maker_user?: { __typename?: 'User', profile?: { __typename?: 'UserProfile', account_address?: string | null, user_name?: string | null, profile_image_url?: string | null } | null } | null } | null> | null, bids_v3?: Array<{ __typename: 'OrderItemV3', pay_price?: string | null, pay_currency?: { __typename: 'Currency', address?: string | null, decimal?: number | null, icon?: string | null, symbol?: string | null } | null } | null> | null, sales_v3?: Array<{ __typename: 'LastSaleItemV3', last_sale_price?: string | null, currency?: { __typename: 'Currency', address?: string | null, decimal?: number | null, icon?: string | null, symbol?: string | null } | null } | null> | null, owners?: Array<{ __typename: 'NFTOwnerBalance', owner?: { __typename: 'User', profile?: { __typename?: 'UserProfile', account_address?: string | null, user_name?: string | null, profile_image_url?: string | null } | null } | null } | null> | null };

export type PaginationFieldsFragment = { __typename?: 'PagingInfo', cursor?: string | null, has_next?: boolean | null };

export type AsksFieldsFragment = { __typename?: 'NFTBestAsk', bestAskCreatedDate?: number | null, bestAskExpirationDate?: number | null, bestAskListingDate?: number | null, bestAskOrderQuantity?: number | null, bestAskOrderString?: string | null, bestAskOrderType?: number | null, bestAskPrice?: number | null, bestAskPriceBase?: number | null, bestAskPriceCNY?: number | null, bestAskPriceUSD?: number | null, bestAskSaleKind?: number | null, bestAskToken?: string | null, bestAskTokenId?: number | null, chain?: string | null, chainId?: string | null, contractAddress?: string | null, currency?: { __typename?: 'Currency', address?: string | null, decimal?: number | null, icon?: string | null, symbol?: string | null } | null };

export type BidsFieldsFragment = { __typename?: 'NFTBestBid', bestBidCreatedDate?: number | null, bestBidListingDate?: number | null, bestBidOrderQuantity?: number | null, bestBidOrderString?: string | null, bestBidPrice?: number | null, bestBidPriceBase?: number | null, bestBidPriceCNY?: number | null, bestBidPriceUSD?: number | null, bestBidToken?: string | null, bestBidTokenId?: number | null, chain?: string | null, chainId?: string | null, contractAddress?: string | null, currency?: { __typename?: 'Currency', address?: string | null, decimal?: number | null, icon?: string | null, symbol?: string | null } | null };

export type SalesFieldsFragment = { __typename?: 'NFTLastSale', lastSalePrice?: string | null, lastSaleQuantity?: string | null, currency?: { __typename?: 'Currency', address?: string | null, decimal?: number | null, icon?: string | null, symbol?: string | null } | null };

export type ListOrderFieldsV3Fragment = { __typename?: 'OrderItemV3', pay_price?: string | null, pay_price_in_usd?: number | null, end_time?: number | null, close_time?: number | null, order_kind?: number | null, exchange_contract?: string | null, maker?: string | null, taker?: string | null, order_hash?: string | null, pay_currency?: { __typename?: 'Currency', address?: string | null, decimal?: number | null, icon?: string | null, symbol?: string | null } | null, taker_user?: { __typename?: 'User', profile?: { __typename?: 'UserProfile', account_address?: string | null, user_name?: string | null, profile_image_url?: string | null } | null } | null, maker_user?: { __typename?: 'User', profile?: { __typename?: 'UserProfile', account_address?: string | null, user_name?: string | null, profile_image_url?: string | null } | null } | null };

export type OrderItemFieldsV3Fragment = { __typename?: 'OrderItemV3', start_time?: number | null, asset_type?: number | null, asset_contract?: string | null, asset_quantity?: string | null, asset_token_id?: string | null, pay_token?: string | null, is_private?: boolean | null, english_auction_reserve_price?: string | null, pay_price?: string | null, pay_price_in_usd?: number | null, end_time?: number | null, close_time?: number | null, order_kind?: number | null, exchange_contract?: string | null, maker?: string | null, taker?: string | null, order_hash?: string | null, pay_currency?: { __typename?: 'Currency', address?: string | null, decimal?: number | null, icon?: string | null, symbol?: string | null } | null, taker_user?: { __typename?: 'User', profile?: { __typename?: 'UserProfile', account_address?: string | null, user_name?: string | null, profile_image_url?: string | null } | null } | null, maker_user?: { __typename?: 'User', profile?: { __typename?: 'UserProfile', account_address?: string | null, user_name?: string | null, profile_image_url?: string | null } | null } | null };

export type GetCollectionsQueryVariables = Exact<{
  pagination?: InputMaybe<Pagination>;
  sort?: InputMaybe<CollectionSortBy>;
  search?: InputMaybe<Scalars['String']['input']>;
  owners?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>> | InputMaybe<Scalars['String']['input']>>;
  asset_owners?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>> | InputMaybe<Scalars['String']['input']>>;
  asset_creators?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>> | InputMaybe<Scalars['String']['input']>>;
  event_involved?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>> | InputMaybe<Scalars['String']['input']>>;
  collection_types?: InputMaybe<Array<InputMaybe<CollectionListCollectionTypes>> | InputMaybe<CollectionListCollectionTypes>>;
}>;


export type GetCollectionsQuery = { __typename?: 'RootQuery', collections?: { __typename?: 'CollectionList', items?: Array<{ __typename?: 'Collection', name?: string | null, image_url?: string | null, contract_address?: string | null, is_verified?: number | null, owner_address?: string | null, object_count?: number | null, description?: string | null, discord_link?: string | null, twitter_link?: string | null, website_link?: string | null, external_url?: string | null } | null> | null, pagination?: { __typename?: 'PagingInfo', total?: number | null, cursor?: string | null, has_next?: boolean | null } | null } | null };


export const AsksFieldsFragmentDoc = `
    fragment asksFields on NFTBestAsk {
  bestAskCreatedDate
  bestAskExpirationDate
  bestAskListingDate
  bestAskOrderQuantity
  bestAskOrderString
  bestAskOrderType
  bestAskPrice
  bestAskPriceBase
  bestAskPriceCNY
  bestAskPriceUSD
  bestAskSaleKind
  bestAskToken
  bestAskTokenId
  chain
  chainId
  contractAddress
  currency {
    address
    decimal
    icon
    symbol
  }
}
    `;
export const BidsFieldsFragmentDoc = `
    fragment bidsFields on NFTBestBid {
  bestBidCreatedDate
  bestBidListingDate
  bestBidOrderQuantity
  bestBidOrderString
  bestBidPrice
  bestBidPriceBase
  bestBidPriceCNY
  bestBidPriceUSD
  bestBidToken
  bestBidTokenId
  chain
  chainId
  contractAddress
  currency {
    address
    decimal
    icon
    symbol
  }
}
    `;
export const SalesFieldsFragmentDoc = `
    fragment salesFields on NFTLastSale {
  currency {
    address
    decimal
    icon
    symbol
  }
  lastSalePrice
  lastSaleQuantity
}
    `;
export const ListOrderFieldsV3FragmentDoc = `
    fragment listOrderFieldsV3 on OrderItemV3 {
  pay_price
  pay_price_in_usd
  end_time
  close_time
  order_kind
  exchange_contract
  pay_currency {
    address
    decimal
    icon
    symbol
  }
  maker
  taker
  taker_user {
    profile {
      account_address
      user_name
      profile_image_url
    }
  }
  order_hash
  maker_user {
    profile {
      account_address
      user_name
      profile_image_url
    }
  }
}
    `;
export const OrderItemFieldsV3FragmentDoc = `
    fragment orderItemFieldsV3 on OrderItemV3 {
  ...listOrderFieldsV3
  start_time
  asset_type
  asset_contract
  asset_quantity
  asset_token_id
  pay_token
  is_private
  english_auction_reserve_price
}
    ${ListOrderFieldsV3FragmentDoc}`;
export const AssetsFieldsFragmentDoc = `
    fragment assetsFields on Token {
  token_id
  contract_address
  image_url
  animation_url
  name
  token_type
  token_uri
  trade_version
  description
  external_url
  attributes {
    display_type
    trait_type
    value
  }
  collection {
    royalty
    royalty_address
    name
    is_verified
    contract_address
    image_url
    banner_image_url
    description
    discord_link
    twitter_link
    website_link
    external_url
    stat {
      assets_total
      owners_total
      floor_price
      volume_total
      __typename
    }
    payment_tokens {
      address
      decimal
      icon
      symbol
      __typename
    }
    __typename
  }
  asks_v2 {
    ...asksFields
    __typename
  }
  bids_v2 {
    ...bidsFields
    __typename
  }
  sales_v2 {
    ...salesFields
    __typename
  }
  asks_v3 {
    ...orderItemFieldsV3
    __typename
  }
  bids_v3 {
    pay_price
    pay_currency {
      address
      decimal
      icon
      symbol
      __typename
    }
    __typename
  }
  sales_v3 {
    last_sale_price
    currency {
      address
      decimal
      icon
      symbol
      __typename
    }
    __typename
  }
  owners {
    owner {
      profile {
        account_address
        user_name
        profile_image_url
      }
      __typename
    }
    __typename
  }
  __typename
}
    ${AsksFieldsFragmentDoc}
${BidsFieldsFragmentDoc}
${SalesFieldsFragmentDoc}
${OrderItemFieldsV3FragmentDoc}`;
export const PaginationFieldsFragmentDoc = `
    fragment paginationFields on PagingInfo {
  cursor
  has_next
}
    `;
export const GetAssetDetailDocument = `
    query GetAssetDetail($token_id: String, $collection: String) {
  asset(token_id: $token_id, collection: $collection) {
    owners {
      owner_address
    }
  }
}
    `;

export const useGetAssetDetailQuery = <
      TData = GetAssetDetailQuery,
      TError = unknown
    >(
      variables?: GetAssetDetailQueryVariables,
      options?: UseQueryOptions<GetAssetDetailQuery, TError, TData>
    ) => {
    
    return useQuery<GetAssetDetailQuery, TError, TData>(
      variables === undefined ? ['GetAssetDetail'] : ['GetAssetDetail', variables],
      fetcher<GetAssetDetailQuery, GetAssetDetailQueryVariables>(GetAssetDetailDocument, variables),
      options
    )};

export const useInfiniteGetAssetDetailQuery = <
      TData = GetAssetDetailQuery,
      TError = unknown
    >(
      variables?: GetAssetDetailQueryVariables,
      options?: UseInfiniteQueryOptions<GetAssetDetailQuery, TError, TData>
    ) => {
    
    return useInfiniteQuery<GetAssetDetailQuery, TError, TData>(
      variables === undefined ? ['GetAssetDetail.infinite'] : ['GetAssetDetail.infinite', variables],
      (metaData) => fetcher<GetAssetDetailQuery, GetAssetDetailQueryVariables>(GetAssetDetailDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

export const GetAssetsDocument = `
    query getAssets($pagination: Pagination, $sort: AssetSortBy, $price: PriceRangeFilter, $statuses: [AssetStatus], $collections: [String], $user_account: String, $owners: [String], $creators: [String], $attributes: [AttributesFilter], $search: String, $categories: [String], $currencies: [String], $is_recommend: Boolean, $collection_types: [assetListCollectionTypes]) {
  assets(
    sort: $sort
    pagination: $pagination
    price: $price
    statuses: $statuses
    collections: $collections
    user_account: $user_account
    owners: $owners
    creators: $creators
    attributes: $attributes
    search: $search
    categories: $categories
    currencies: $currencies
    is_recommend: $is_recommend
    collection_types: $collection_types
  ) {
    items {
      ...assetsFields
    }
    pagination {
      ...paginationFields
      total
    }
  }
}
    ${AssetsFieldsFragmentDoc}
${PaginationFieldsFragmentDoc}`;

export const useGetAssetsQuery = <
      TData = GetAssetsQuery,
      TError = unknown
    >(
      variables?: GetAssetsQueryVariables,
      options?: UseQueryOptions<GetAssetsQuery, TError, TData>
    ) => {
    
    return useQuery<GetAssetsQuery, TError, TData>(
      variables === undefined ? ['getAssets'] : ['getAssets', variables],
      fetcher<GetAssetsQuery, GetAssetsQueryVariables>(GetAssetsDocument, variables),
      options
    )};

export const useInfiniteGetAssetsQuery = <
      TData = GetAssetsQuery,
      TError = unknown
    >(
      variables?: GetAssetsQueryVariables,
      options?: UseInfiniteQueryOptions<GetAssetsQuery, TError, TData>
    ) => {
    
    return useInfiniteQuery<GetAssetsQuery, TError, TData>(
      variables === undefined ? ['getAssets.infinite'] : ['getAssets.infinite', variables],
      (metaData) => fetcher<GetAssetsQuery, GetAssetsQueryVariables>(GetAssetsDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

export const GetCollectionsDocument = `
    query getCollections($pagination: Pagination, $sort: CollectionSortBy, $search: String, $owners: [String], $asset_owners: [String], $asset_creators: [String], $event_involved: [String], $collection_types: [collectionListCollectionTypes]) {
  collections(
    pagination: $pagination
    sort: $sort
    search: $search
    owners: $owners
    asset_owners: $asset_owners
    asset_creators: $asset_creators
    event_involved: $event_involved
    collection_types: $collection_types
  ) {
    items {
      name
      image_url
      contract_address
      is_verified
      owner_address
      object_count
      description
      discord_link
      twitter_link
      website_link
      external_url
    }
    pagination {
      total
      cursor
      has_next
    }
  }
}
    `;

export const useGetCollectionsQuery = <
      TData = GetCollectionsQuery,
      TError = unknown
    >(
      variables?: GetCollectionsQueryVariables,
      options?: UseQueryOptions<GetCollectionsQuery, TError, TData>
    ) => {
    
    return useQuery<GetCollectionsQuery, TError, TData>(
      variables === undefined ? ['getCollections'] : ['getCollections', variables],
      fetcher<GetCollectionsQuery, GetCollectionsQueryVariables>(GetCollectionsDocument, variables),
      options
    )};

export const useInfiniteGetCollectionsQuery = <
      TData = GetCollectionsQuery,
      TError = unknown
    >(
      variables?: GetCollectionsQueryVariables,
      options?: UseInfiniteQueryOptions<GetCollectionsQuery, TError, TData>
    ) => {
    
    return useInfiniteQuery<GetCollectionsQuery, TError, TData>(
      variables === undefined ? ['getCollections.infinite'] : ['getCollections.infinite', variables],
      (metaData) => fetcher<GetCollectionsQuery, GetCollectionsQueryVariables>(GetCollectionsDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};
