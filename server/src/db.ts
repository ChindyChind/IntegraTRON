import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import { migrate } from 'drizzle-orm/libsql/migrator';
import * as schema from "./schema"

const client = createClient({
    url: "file:dev.db",
});

export const db = drizzle(client, {schema});

// Disable migrate function if using Edge runtime and use `npm run db:migrate` instead.
// Only run migrate in development. Otherwise, migrate will also be run during the build which can cause errors.
// Migrate during the build can cause errors due to the locked database when multiple migrations are running at the same time.
if (process.env.NODE_ENV === 'development') {
    // @ts-ignore
    await migrate(db, { migrationsFolder: './migrations' });
}