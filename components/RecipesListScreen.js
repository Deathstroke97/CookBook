import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import React from 'react';
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  ScrollView,
} from 'apollo-client-preset';

const GET_ALL_RECIPES = gql`
{
  allRecipes {
    id
    title
    description
    instructions
    ingredients
    image {
      id
      url
    }
  }
}
`;

class RecipesListScreen extends React.Component {
  
  keyExtractor = item => item.id;

  renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() =>
        this.props.navigation.navigate('Details', {
          addInfo: item,
        })
      }>
      <Text style={{ fontWeight: 'bold' }}>{item.title}</Text>
      <Text>{item.description}</Text>
      <View style={{ padding: 10 }} />
    </TouchableOpacity>
  );

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ marginTop: 30, flex: 1 }}>
          <Query query={GET_ALL_RECIPES}>
            {({ loading, data, error, refetch }) => {
              console.log('data: ', data);

              if (loading) {
                return <ActivityIndicator />;
              }

              return (
                <FlatList
                  keyExtractor={this.keyExtractor}
                  data={data ? data.allRecipes : []}
                  renderItem={this.renderItem}
                  refreshing={data.networkStatus === 4}
                  onRefresh={() => refetch()}
                />
              );
            }}
          </Query>
        </View>

        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('CreateRecipe')}
          style={styles.addButton}>
          <Text>Create Recipe</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  addButton: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
  },
});

export default RecipesListScreen;
