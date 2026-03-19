import { cache } from 'react';
import type { Session } from '../migrations/00003-createTableSessions';
import { sql } from './connect';

export const getValidSession = cache(async (sessionToken: Session['token']) => {
  const [session] = await sql<Session[]>`
    SELECT
      sessions.*
    FROM
      sessions
    WHERE
      sessions.token = ${sessionToken}
      AND sessions.expiry_timestamp > now()
  `;

  return session;
});

export const deleteSession = cache(async (sessionToken: Session['token']) => {
  const [session] = await sql<Session[]>`
    DELETE FROM sessions
    WHERE
      token = ${sessionToken}
    RETURNING
      sessions.*
  `;

  return session;
});

export const createSessionInsecure = cache(
  async (token: string, userId: number) => {
    const [session] = await sql<Session[]>`
      INSERT INTO
        sessions (token, user_id)
      VALUES
        (
          ${token},
          ${userId}
        )
      RETURNING
        sessions.*
    `;

    await sql`
      DELETE FROM sessions
      WHERE
        sessions.expiry_timestamp < now()
    `;

    return session;
  },
);
