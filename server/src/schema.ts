import { sql } from 'drizzle-orm';
import {integer, sqliteTable, text, unique} from 'drizzle-orm/sqlite-core';

export const nftPositionSchema = sqliteTable('nft_position', {
    id: integer('id').primaryKey({autoIncrement: true}),
    positionIndex: integer('position_index').notNull(),
    userAddress: text('user_address').notNull(),
    nftContract: text('nft_contract').notNull(),
    tokenId: text('token_id').notNull(),
    imageUrl: text('image_url').notNull(),
    imageName: text('image_name').notNull(),
    type: text('type').notNull(),
    color: text('color'),
    createdAt: integer('created_at', { mode: 'timestamp' }).default(
        sql`(strftime('%s', 'now'))`,
    ),
    updatedAt: integer('updated_at', { mode: 'timestamp' }).default(
        sql`(strftime('%s', 'now'))`,
    ),
}, (t) => ({
    unq: unique().on(t.userAddress, t.positionIndex),
}));