// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace HunterZHunterTypes {
  export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BigDecimal: any;
  BigInt: any;
  Bytes: any;
};

export type BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type Block_height = {
  hash?: InputMaybe<Scalars['Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type HuntAdded = {
  id: Scalars['Bytes'];
  huntId: Scalars['String'];
  name: Scalars['String'];
  prize: Scalars['BigInt'];
  endTime: Scalars['BigInt'];
  target: Scalars['String'];
  blockNumber: Scalars['BigInt'];
  blockTimestamp: Scalars['BigInt'];
  transactionHash: Scalars['Bytes'];
};

export type HuntAdded_filter = {
  id?: InputMaybe<Scalars['Bytes']>;
  id_not?: InputMaybe<Scalars['Bytes']>;
  id_gt?: InputMaybe<Scalars['Bytes']>;
  id_lt?: InputMaybe<Scalars['Bytes']>;
  id_gte?: InputMaybe<Scalars['Bytes']>;
  id_lte?: InputMaybe<Scalars['Bytes']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_contains?: InputMaybe<Scalars['Bytes']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']>;
  huntId?: InputMaybe<Scalars['String']>;
  huntId_not?: InputMaybe<Scalars['String']>;
  huntId_gt?: InputMaybe<Scalars['String']>;
  huntId_lt?: InputMaybe<Scalars['String']>;
  huntId_gte?: InputMaybe<Scalars['String']>;
  huntId_lte?: InputMaybe<Scalars['String']>;
  huntId_in?: InputMaybe<Array<Scalars['String']>>;
  huntId_not_in?: InputMaybe<Array<Scalars['String']>>;
  huntId_contains?: InputMaybe<Scalars['String']>;
  huntId_contains_nocase?: InputMaybe<Scalars['String']>;
  huntId_not_contains?: InputMaybe<Scalars['String']>;
  huntId_not_contains_nocase?: InputMaybe<Scalars['String']>;
  huntId_starts_with?: InputMaybe<Scalars['String']>;
  huntId_starts_with_nocase?: InputMaybe<Scalars['String']>;
  huntId_not_starts_with?: InputMaybe<Scalars['String']>;
  huntId_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  huntId_ends_with?: InputMaybe<Scalars['String']>;
  huntId_ends_with_nocase?: InputMaybe<Scalars['String']>;
  huntId_not_ends_with?: InputMaybe<Scalars['String']>;
  huntId_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  name_not?: InputMaybe<Scalars['String']>;
  name_gt?: InputMaybe<Scalars['String']>;
  name_lt?: InputMaybe<Scalars['String']>;
  name_gte?: InputMaybe<Scalars['String']>;
  name_lte?: InputMaybe<Scalars['String']>;
  name_in?: InputMaybe<Array<Scalars['String']>>;
  name_not_in?: InputMaybe<Array<Scalars['String']>>;
  name_contains?: InputMaybe<Scalars['String']>;
  name_contains_nocase?: InputMaybe<Scalars['String']>;
  name_not_contains?: InputMaybe<Scalars['String']>;
  name_not_contains_nocase?: InputMaybe<Scalars['String']>;
  name_starts_with?: InputMaybe<Scalars['String']>;
  name_starts_with_nocase?: InputMaybe<Scalars['String']>;
  name_not_starts_with?: InputMaybe<Scalars['String']>;
  name_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  name_ends_with?: InputMaybe<Scalars['String']>;
  name_ends_with_nocase?: InputMaybe<Scalars['String']>;
  name_not_ends_with?: InputMaybe<Scalars['String']>;
  name_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  prize?: InputMaybe<Scalars['BigInt']>;
  prize_not?: InputMaybe<Scalars['BigInt']>;
  prize_gt?: InputMaybe<Scalars['BigInt']>;
  prize_lt?: InputMaybe<Scalars['BigInt']>;
  prize_gte?: InputMaybe<Scalars['BigInt']>;
  prize_lte?: InputMaybe<Scalars['BigInt']>;
  prize_in?: InputMaybe<Array<Scalars['BigInt']>>;
  prize_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  endTime?: InputMaybe<Scalars['BigInt']>;
  endTime_not?: InputMaybe<Scalars['BigInt']>;
  endTime_gt?: InputMaybe<Scalars['BigInt']>;
  endTime_lt?: InputMaybe<Scalars['BigInt']>;
  endTime_gte?: InputMaybe<Scalars['BigInt']>;
  endTime_lte?: InputMaybe<Scalars['BigInt']>;
  endTime_in?: InputMaybe<Array<Scalars['BigInt']>>;
  endTime_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  target?: InputMaybe<Scalars['String']>;
  target_not?: InputMaybe<Scalars['String']>;
  target_gt?: InputMaybe<Scalars['String']>;
  target_lt?: InputMaybe<Scalars['String']>;
  target_gte?: InputMaybe<Scalars['String']>;
  target_lte?: InputMaybe<Scalars['String']>;
  target_in?: InputMaybe<Array<Scalars['String']>>;
  target_not_in?: InputMaybe<Array<Scalars['String']>>;
  target_contains?: InputMaybe<Scalars['String']>;
  target_contains_nocase?: InputMaybe<Scalars['String']>;
  target_not_contains?: InputMaybe<Scalars['String']>;
  target_not_contains_nocase?: InputMaybe<Scalars['String']>;
  target_starts_with?: InputMaybe<Scalars['String']>;
  target_starts_with_nocase?: InputMaybe<Scalars['String']>;
  target_not_starts_with?: InputMaybe<Scalars['String']>;
  target_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  target_ends_with?: InputMaybe<Scalars['String']>;
  target_ends_with_nocase?: InputMaybe<Scalars['String']>;
  target_not_ends_with?: InputMaybe<Scalars['String']>;
  target_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<HuntAdded_filter>>>;
  or?: InputMaybe<Array<InputMaybe<HuntAdded_filter>>>;
};

export type HuntAdded_orderBy =
  | 'id'
  | 'huntId'
  | 'name'
  | 'prize'
  | 'endTime'
  | 'target'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

/** Defines the order direction, either ascending or descending */
export type OrderDirection =
  | 'asc'
  | 'desc';

export type PrizeWon = {
  id: Scalars['Bytes'];
  huntId: Scalars['String'];
  winner: Scalars['Bytes'];
  prize: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
  blockTimestamp: Scalars['BigInt'];
  transactionHash: Scalars['Bytes'];
};

export type PrizeWon_filter = {
  id?: InputMaybe<Scalars['Bytes']>;
  id_not?: InputMaybe<Scalars['Bytes']>;
  id_gt?: InputMaybe<Scalars['Bytes']>;
  id_lt?: InputMaybe<Scalars['Bytes']>;
  id_gte?: InputMaybe<Scalars['Bytes']>;
  id_lte?: InputMaybe<Scalars['Bytes']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_contains?: InputMaybe<Scalars['Bytes']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']>;
  huntId?: InputMaybe<Scalars['String']>;
  huntId_not?: InputMaybe<Scalars['String']>;
  huntId_gt?: InputMaybe<Scalars['String']>;
  huntId_lt?: InputMaybe<Scalars['String']>;
  huntId_gte?: InputMaybe<Scalars['String']>;
  huntId_lte?: InputMaybe<Scalars['String']>;
  huntId_in?: InputMaybe<Array<Scalars['String']>>;
  huntId_not_in?: InputMaybe<Array<Scalars['String']>>;
  huntId_contains?: InputMaybe<Scalars['String']>;
  huntId_contains_nocase?: InputMaybe<Scalars['String']>;
  huntId_not_contains?: InputMaybe<Scalars['String']>;
  huntId_not_contains_nocase?: InputMaybe<Scalars['String']>;
  huntId_starts_with?: InputMaybe<Scalars['String']>;
  huntId_starts_with_nocase?: InputMaybe<Scalars['String']>;
  huntId_not_starts_with?: InputMaybe<Scalars['String']>;
  huntId_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  huntId_ends_with?: InputMaybe<Scalars['String']>;
  huntId_ends_with_nocase?: InputMaybe<Scalars['String']>;
  huntId_not_ends_with?: InputMaybe<Scalars['String']>;
  huntId_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  winner?: InputMaybe<Scalars['Bytes']>;
  winner_not?: InputMaybe<Scalars['Bytes']>;
  winner_gt?: InputMaybe<Scalars['Bytes']>;
  winner_lt?: InputMaybe<Scalars['Bytes']>;
  winner_gte?: InputMaybe<Scalars['Bytes']>;
  winner_lte?: InputMaybe<Scalars['Bytes']>;
  winner_in?: InputMaybe<Array<Scalars['Bytes']>>;
  winner_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  winner_contains?: InputMaybe<Scalars['Bytes']>;
  winner_not_contains?: InputMaybe<Scalars['Bytes']>;
  prize?: InputMaybe<Scalars['BigInt']>;
  prize_not?: InputMaybe<Scalars['BigInt']>;
  prize_gt?: InputMaybe<Scalars['BigInt']>;
  prize_lt?: InputMaybe<Scalars['BigInt']>;
  prize_gte?: InputMaybe<Scalars['BigInt']>;
  prize_lte?: InputMaybe<Scalars['BigInt']>;
  prize_in?: InputMaybe<Array<Scalars['BigInt']>>;
  prize_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<PrizeWon_filter>>>;
  or?: InputMaybe<Array<InputMaybe<PrizeWon_filter>>>;
};

export type PrizeWon_orderBy =
  | 'id'
  | 'huntId'
  | 'winner'
  | 'prize'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type Query = {
  huntAdded?: Maybe<HuntAdded>;
  huntAddeds: Array<HuntAdded>;
  prizeWon?: Maybe<PrizeWon>;
  prizeWons: Array<PrizeWon>;
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
};


export type QueryhuntAddedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryhuntAddedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<HuntAdded_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<HuntAdded_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryprizeWonArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryprizeWonsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<PrizeWon_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<PrizeWon_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Query_metaArgs = {
  block?: InputMaybe<Block_height>;
};

export type Subscription = {
  huntAdded?: Maybe<HuntAdded>;
  huntAddeds: Array<HuntAdded>;
  prizeWon?: Maybe<PrizeWon>;
  prizeWons: Array<PrizeWon>;
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
};


export type SubscriptionhuntAddedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionhuntAddedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<HuntAdded_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<HuntAdded_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionprizeWonArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionprizeWonsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<PrizeWon_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<PrizeWon_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscription_metaArgs = {
  block?: InputMaybe<Block_height>;
};

export type _Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>;
};

/** The type for the top-level _meta field */
export type _Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: _Block_;
  /** The deployment ID */
  deployment: Scalars['String'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean'];
};

export type _SubgraphErrorPolicy_ =
  /** Data will be returned even if the subgraph has indexing errors */
  | 'allow'
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  | 'deny';

  export type QuerySdk = {
      /** null **/
  huntAdded: InContextSdkMethod<Query['huntAdded'], QueryhuntAddedArgs, MeshContext>,
  /** null **/
  huntAddeds: InContextSdkMethod<Query['huntAddeds'], QueryhuntAddedsArgs, MeshContext>,
  /** null **/
  prizeWon: InContextSdkMethod<Query['prizeWon'], QueryprizeWonArgs, MeshContext>,
  /** null **/
  prizeWons: InContextSdkMethod<Query['prizeWons'], QueryprizeWonsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  _meta: InContextSdkMethod<Query['_meta'], Query_metaArgs, MeshContext>
  };

  export type MutationSdk = {
    
  };

  export type SubscriptionSdk = {
      /** null **/
  huntAdded: InContextSdkMethod<Subscription['huntAdded'], SubscriptionhuntAddedArgs, MeshContext>,
  /** null **/
  huntAddeds: InContextSdkMethod<Subscription['huntAddeds'], SubscriptionhuntAddedsArgs, MeshContext>,
  /** null **/
  prizeWon: InContextSdkMethod<Subscription['prizeWon'], SubscriptionprizeWonArgs, MeshContext>,
  /** null **/
  prizeWons: InContextSdkMethod<Subscription['prizeWons'], SubscriptionprizeWonsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  _meta: InContextSdkMethod<Subscription['_meta'], Subscription_metaArgs, MeshContext>
  };

  export type Context = {
      ["hunter-z-hunter"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
