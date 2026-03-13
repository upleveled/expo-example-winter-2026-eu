import { Link, useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { colors, fonts } from '@/constants/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 24,
  },
  introText: {
    color: colors.text,
    fontFamily: fonts.body,
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 8,
  },
  link: {
    marginVertical: 6,
    color: colors.text,
    fontFamily: fonts.body,
    fontSize: 15,
    backgroundColor: colors.cardBackground,
    paddingTop: 11,
    paddingBottom: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
    overflow: 'hidden',
    alignSelf: 'flex-start',
    lineHeight: 20,
  },
  usersHeading: {
    marginTop: 28,
    color: colors.text,
    fontFamily: fonts.heading,
    fontSize: 22,
  },
  list: {
    width: '100%',
    marginTop: 12,
  },
  item: {
    marginVertical: 4,
    paddingTop: 11,
    paddingBottom: 10,
    paddingHorizontal: 12,
    backgroundColor: colors.cardBackground,
    borderRadius: 10,
    justifyContent: 'center',
  },
  name: {
    color: colors.text,
    fontFamily: fonts.body,
    fontSize: 16,
    lineHeight: 20,
  },
});

type RandomUserApiResponseBody = {
  results: {
    login: {
      uuid: string;
    };
    name: {
      first: string;
      last: string;
    };
  }[];
};

type User = {
  id: string;
  name: string;
};

export default function HomeScreen() {
  // 1. Create a state variable for the users
  const [users, setUsers] = useState<User[]>([]);

  // 2. Run a function when the screen is focused
  useFocusEffect(
    useCallback(() => {
      async function fetchUsers() {
        // 3. Fetch data from the API
        const response = await fetch('https://randomuser.me/api/?results=5');
        const data: RandomUserApiResponseBody = await response.json();

        const newUsers: User[] = data.results.map((result) => ({
          id: result.login.uuid,
          name: `${result.name.first} ${result.name.last}`,
        }));

        console.log('Fetched users:', newUsers);

        // 4. Update the state with the new users
        setUsers(newUsers);
      }

      fetchUsers().catch((error) => {
        console.error('Error fetching users:', error);
      });
    }, []),
  );

  return (
    <View style={styles.container}>
      <Text style={styles.introText}>
        Edit app/index.tsx to edit this screen.
      </Text>

      <Link href="/about" style={styles.link}>
        About
      </Link>

      <Link href="/animals" style={styles.link}>
        Animals
      </Link>
      <Link href="/animals/1" style={styles.link}>
        Animal 1
      </Link>
      <Link href="/animals/2" style={styles.link}>
        Animal 2
      </Link>

      <Text style={styles.usersHeading}>Random Users</Text>
      <FlatList
        style={styles.list}
        data={users}
        renderItem={({ item }) => <UserItem name={item.name} />}
      />
    </View>
  );
}

function UserItem(props: { name: string }) {
  return (
    <View style={styles.item}>
      <Text style={styles.name}>{props.name}</Text>
    </View>
  );
}
