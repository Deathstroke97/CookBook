import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { TextInput } from 'react-native-paper';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { ImagePicker, Permissions } from 'expo';
import CreateIngredients from './CreateIngredients';
import CreateInstructions from './CreateInstructions';

const FILE_UPLOAD_URL =
  'https://api.graph.cool/file/v1/cjj6oj8xp80cw01000uyxz2zj';

const CREATE_RECIPE = gql`
  mutation addRecipe(
    $description: String!,
    $ingredients: [String!]!,
    $instructions: [String!]!,
    $title: String!,
    $imageId : ID
    
  ){
    createRecipe(
      description: $description,
      ingredients: $ingredients,
      instructions: $instructions,
      title: $title,
      imageId: $imageId,
    ){
      description
      ingredients
      instructions
      title
      id
    }
  }
`;

export default class CreateRecipeScreen extends React.Component {
  state = {
    title: '',
    description: '',
    ingredients: [],
    instructions: [],
    chosenPhoto: null,
  };

  handleButtonIngredients = items => {
    this.setState({ ingredients: items });
  };

  handleButtonInstructions = items => {
    this.setState({ instructions: items });
  };

  handleUploadButtonPress = async () => {
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    const photo = await ImagePicker.launchImageLibraryAsync();
    this.setState({ chosenPhoto: photo });
  };

  handleCreateRecipe = async createRecipe => {
    if (true) {
      console.log('decription: ', this.state.description);
      console.log('ingredients:', this.state.ingredients);
      console.log('instructions: ', this.state.instructions);
      console.log('title: ', this.state.title);

      let formatData = new FormData();
      formatData.append('data', {
        uri: this.state.chosenPhoto.uri,
        name: 'image.png',
        type: 'multipart/form-data',
      });

      try {
        const res = await fetch(FILE_UPLOAD_URL, {
          method: 'POST',
          body: formatData,
        });

        const resJson = await res.json();

        console.log('START RESJSON ', resJson, 'END RESJSON');

        const result = await createRecipe({
          variables: {
            description: this.state.description,
            ingredients: this.state.ingredients,
            instructions: this.state.instructions,
            title: this.state.title,
            imageId: resJson.id,
          },
        });

        this.props.navigation.goBack();
        console.log('result', result);
      } catch (err) {
        console.log(err);
      }
    } else {
      Alert.alert(
        'Error',
        'Fill all fields',
        [
          {
            text: 'OK',
            onPress: () => console.log('OK Pressed'),
          },
        ],
        { cancelable: false }
      );
    }
  };

  render() {
    return (
      <ScrollView>
        <KeyboardAvoidingView>
          <View>
            {!!this.state.chosenPhoto && (
              <Image
                style={{ width: 100, height: 100 }}
                source={{
                  uri: this.state.chosenPhoto.uri,
                }}
              />
            )}
          </View>

          <TouchableOpacity
            style={styles.addButton}
            onPress={this.handleUploadButtonPress}>
            <Text>Select a Photo2</Text>
          </TouchableOpacity>

          <TextInput
            style={styles.inputContainerStyle}
            label="Title"
            value={this.state.title}
            onChangeText={title => this.setState({ title })}
          />
          <TextInput
            style={styles.inputContainerStyle}
            label="Description"
            value={this.state.description}
            onChangeText={description => this.setState({ description })}
          />
          <CreateIngredients onAdded={this.handleButtonIngredients} />
          <CreateInstructions onAdded={this.handleButtonInstructions} />

          <Mutation mutation={CREATE_RECIPE}>
            {(createRecipe, { data, loading, error }) => (
              <View style={styles.container}>
                <TouchableOpacity
                  disabled={loading}
                  onPress={() => this.handleCreateRecipe(createRecipe)}
                  style={{ alignItems: 'center' }}>
                  {loading ? (
                    <ActivityIndicator />
                  ) : (
                    <Text style={styles.addButton}>Submit</Text>
                  )}
                </TouchableOpacity>
              </View>
            )}
          </Mutation>
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginEnd: 20,
  },
  textStyle: {
    fontSize: 25,
    fontStyle: 'italic',
  },
  inputContainerStyle: {
    marginLeft: 8,
    marginRight: 8,
  },
  btnAdd: {
    backgroundColor: '#3C54B8',
    alignItems: 'center',
    width: 330,
    height: 50,
    borderRadius: 5,
    justifyContent: 'center',
  },
  addButton: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
  },
  inContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  btnSave: {
    marginTop: 20,
    backgroundColor: '#3C54B8',
    width: 200,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addText: {
    fontSize: 18,
    color: 'white',
  },
};
