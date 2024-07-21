import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
export enum userStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}
const client = new ApolloClient({
  uri: "http://localhost:8080/graphql",
  cache: new InMemoryCache(),
});
export const getData = async () => {
  const { data } = await client.query({
    query: gql`
      query {
        getAllUsers {
          userId
          username
          email
          connectionStatus
          profilePicture
          role
          userStatus
          providerId
        }
      }
    `,
  });

  return data;
};

export const changeStatus = async (userId: number, userStatus: userStatus) => {
  const { data } = await client.mutate({
    mutation: gql`
      mutation ChangeUserStatus($userId: Int, $userStatus: UserStatus) {
        changeAcStatusById(userId: $userId, userStatus: $userStatus) {
          userId
          userStatus
        }
      }
    `,
    variables: {
      userId,
      userStatus,
    },
  });

  return data;
};
