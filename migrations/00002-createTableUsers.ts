import type { Sql } from 'postgres';
import z from 'zod';

export const userSchemaRegister = z.object({
  user: z.object({
    username: z
      .string()
      .min(3, 'Username must be minimum 3 characters')
      .max(80, 'Username must be maximum 80 characters')
      .trim(),
    password: z.string().min(8, 'Password must be minimum 8 characters'),
  }),
});

export const userSchemaLogin = z.object({
  user: z.object({
    username: z.string(),
    password: z.string(),
  }),
});

export type User = {
  id: number;
  username: string;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE users (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      username varchar(80) NOT NULL UNIQUE,
      password_hash varchar(120) NOT NULL
    )
  `;
}

export async function down(sql: Sql) {
  await sql`DROP TABLE users`;
}
