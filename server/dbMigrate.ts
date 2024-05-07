/* eslint-disable no-console */
import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import { migrate } from 'drizzle-orm/libsql/migrator';

async function main() {
    console.log('Migration started');

    const client = createClient({
        url: "file:dev.db",
    });

    const db = drizzle(client);

    await migrate(db, { migrationsFolder: './drizzle' });

    console.log('Migration completed');

    process.exit(0);
}

main().catch((error) => {
    console.error('Migration failed');
    console.log(error);
    process.exit(1);
});