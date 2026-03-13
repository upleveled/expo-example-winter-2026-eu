import type { Sql } from 'postgres';
import z from 'zod';

export const animalSchema = z.object({
  animal: z.object({
    firstName: z.string().max(30),
    type: z.string().max(30),
    accessory: z.string().max(45).nullable(),
    birthDate: z.coerce.date(),
  }),
});

export type Animal = {
  id: number;
  firstName: string;
  type: string;
  accessory: string | null;
  birthDate: Date;
};

export async function up(sql: Sql) {
  // console.log('Creating animals table');
  await sql`
    CREATE TABLE animals (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      first_name varchar(30) NOT NULL,
      type varchar(30) NOT NULL,
      accessory varchar(45),
      birth_date date NOT NULL
    )
  `;
}

export async function down(sql: Sql) {
  // console.log('Dropping animals table');
  await sql`DROP TABLE animals`;
}
