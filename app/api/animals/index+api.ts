import {
  createAnimalInsecure,
  getAnimalsInsecure,
} from '../../../database/animals';
import { ExpoApiResponse } from '../../../ExpoApiResponse';
import {
  type Animal,
  animalSchema,
} from '../../../migrations/00000-createTableAnimals';

export type AnimalsResponseBodyGet = {
  animals: Animal[];
};

export async function GET(
  request: Request,
): Promise<ExpoApiResponse<AnimalsResponseBodyGet>> {
  // 1. Simple way to read cookies
  const cookie = request.headers.get('cookie');
  console.log('cookie:', cookie);

  const animals = await getAnimalsInsecure();

  return ExpoApiResponse.json(
    {
      animals: animals,
    },
    {
      headers: {
        // 2. Simple way to set cookies
        'Set-Cookie': 'test=123; Path=/',
      },
    },
  );
}

export type AnimalsResponseBodyPost =
  | {
      animal: Animal;
    }
  | {
      error: string;
    };

export async function POST(
  request: Request,
): Promise<ExpoApiResponse<AnimalsResponseBodyPost>> {
  const requestBody = await request.json();
  const result = animalSchema.safeParse(requestBody);

  if (!result.success) {
    return ExpoApiResponse.json(
      {
        error: 'Pass an object with an animal property',
      },
      {
        status: 400,
      },
    );
  }

  const animal = await createAnimalInsecure(result.data.animal);

  if (!animal) {
    return ExpoApiResponse.json(
      {
        error: 'Error creating animal',
      },
      {
        status: 500,
      },
    );
  }

  return ExpoApiResponse.json(
    { animal: animal },
    {
      status: 201,
    },
  );
}
