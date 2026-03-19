import { cache } from 'react';
import type { Session } from '../migrations/00003-createTableSessions';
import type { Note } from '../migrations/00004-createTableNotes';
import { sql } from './connect';

export const getNotes = cache(async (sessionToken: Session['token']) => {
  const notes = await sql<Note[]>`
    SELECT
      notes.*
    FROM
      notes
      INNER JOIN sessions ON (
        sessions.token = ${sessionToken}
        AND sessions.user_id = notes.user_id
        AND sessions.expiry_timestamp > now()
      )
    ORDER BY
      notes.id DESC
  `;

  return notes;
});

export const getNote = cache(
  async (sessionToken: Session['token'], noteId: Note['id']) => {
    const [note] = await sql<Note[]>`
      SELECT
        notes.*
      FROM
        notes
        INNER JOIN sessions ON (
          sessions.token = ${sessionToken}
          AND sessions.user_id = notes.user_id
          AND sessions.expiry_timestamp > now()
        )
      WHERE
        notes.id = ${noteId}
    `;

    return note;
  },
);

export const selectNoteExists = cache(
  async (sessionToken: Session['token'], noteId: Note['id']) => {
    const [record] = await sql<{ exists: boolean }[]>`
      SELECT
        EXISTS (
          SELECT
            TRUE
          FROM
            notes
          WHERE
            notes.id = ${noteId}
            AND EXISTS (
              SELECT
                1
              FROM
                sessions
              WHERE
                sessions.token = ${sessionToken}
                AND sessions.expiry_timestamp > now()
            )
        )
    `;

    return Boolean(record?.exists);
  },
);

export const createNote = cache(
  async (
    sessionToken: Session['token'],
    newNote: Omit<Note, 'id' | 'userId'>,
  ) => {
    const [note] = await sql<Note[]>`
      INSERT INTO
        notes (user_id, title, text_content) (
          SELECT
            sessions.user_id,
            ${newNote.title},
            ${newNote.textContent}
          FROM
            sessions
          WHERE
            sessions.token = ${sessionToken}
            AND sessions.expiry_timestamp > now()
        )
      RETURNING
        notes.*
    `;

    return note;
  },
);
