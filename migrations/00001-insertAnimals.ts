import type { Sql } from 'postgres';

const animals = [
  {
    id: 1,
    firstName: 'Dennis',
    type: 'goat',
    accessory: 'expired library card',
    birthDate: new Date('2015-04-09'),
  },
  {
    id: 2,
    firstName: 'Monica',
    type: 'owl',
    accessory: 'laser pointer',
    birthDate: new Date('2018-11-02'),
  },
  {
    id: 3,
    firstName: 'Trevor',
    type: 'iguana',
    accessory: 'plastic fork collection',
    birthDate: new Date('2020-08-17'),
  },
  {
    id: 4,
    firstName: 'Sharon',
    type: 'seal',
    accessory: 'mysterious key labeled "DO NOT"',
    birthDate: new Date('2016-01-26'),
  },
  {
    id: 5,
    firstName: 'Paul',
    type: 'pigeon',
    accessory: 'tiny briefcase full of bread receipts',
    birthDate: new Date('2019-07-13'),
  },
];

export async function up(sql: Sql) {
  // // Hardcoded SQL query
  // await sql`
  //   INSERT INTO
  //     animals (
  //       first_name,
  //       type,
  //       accessory,
  //       birth_date
  //     )
  //   VALUES
  //     (
  //       'Dennis',
  //       'goat',
  //       'expired library card',
  //       '2015-04-09'
  //     ),
  //     (
  //       'Monica',
  //       'owl',
  //       'laser pointer',
  //       '2018-11-02'
  //     ),
  //     (
  //       'Trevor',
  //       'iguana',
  //       'plastic fork collection',
  //       '2020-08-17'
  //     ),
  //     (
  //       'Sharon',
  //       'seal',
  //       'mysterious key labeled "DO NOT"',
  //       '2016-01-26'
  //     ),
  //     (
  //       'Paul',
  //       'pigeon',
  //       'tiny briefcase full of bread receipts',
  //       '2019-07-13'
  //     );
  // `;

  // // DO NOT USE: SafeQL doesn't support sql() helper
  // await sql`
  //   INSERT INTO
  //     animals ${sql(animals, 'firstName', 'type', 'accessory', 'birthDate')}
  // `;

  for (const animal of animals) {
    await sql`
      INSERT INTO
        animals (
          first_name,
          type,
          accessory,
          birth_date
        )
      VALUES
        (
          ${animal.firstName},
          ${animal.type},
          ${animal.accessory},
          ${animal.birthDate}
        )
    `;
  }
}

export async function down(sql: Sql) {
  for (const animal of animals) {
    await sql`
      DELETE FROM animals
      WHERE
        id = ${animal.id}
    `;
  }
}
