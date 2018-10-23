import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-client-preset';
import { createStackNavigator } from 'react-navigation';
import { ActivityIndicator, FlatList } from 'react-native';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import RecipesListScreen from './components/RecipesListScreen';
import DetailsScreen from './components/DetailsScreen';
import CreateRecipeScreen from './components/CreateRecipeScreen';
import RegisterScreen from './components/RegisterScreen';
import LoginScreen from './components/LoginScreen';

const httpLink = new HttpLink({
  uri: 'https://api.graph.cool/simple/v1/cjj6oj8xp80cw01000uyxz2zj',
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});



export default class App extends React.Component {


  render() {
    return (
      <ApolloProvider client={client}>
        <RootStack />
      </ApolloProvider>
      
    );
  }
}
  const RootStack = createStackNavigator(
  {
    Recipes: RecipesListScreen,
    Details: DetailsScreen,
    CreateRecipe: CreateRecipeScreen,
    Register: RegisterScreen,
    Login: LoginScreen,
  },
  {
    initialRouteName: 'Login',
  }
);



