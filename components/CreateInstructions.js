import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { TextInput } from 'react-native-paper';
import { ListItem } from 'react-native-elements';

export default class CreateInstructions extends React.Component {
  constructor() {
    super();
    this.state = {
      title: '',
      instructions: [],
    };
  }

  handleButton = () => {
    this.state.title &&
      this.setState(prevState => ({
        instructions: [...prevState.instructions, this.state.title],
        title: '',
      }));
    this.props.onAdded(this.state.instructions);
  };

  render() {
    return (
      <View>
        <View style={styles.container}>
          <TextInput
            style={styles.textInputStyle}
            label="instructions"
            value={this.state.title}
            onChangeText={title => this.setState({ title })}
          />
          <TouchableOpacity onPress={this.handleButton} style={styles.btnAdd}>
            <Text style={styles.addText}>Add</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={this.state.instructions}
          renderItem={({ item }) => <Text style={styles.items}>{item}</Text>}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  btnAdd: {
    marginTop: 20,
    backgroundColor: '#3C54B8',
    width: 100,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addText: {
    fontSize: 18,
    color: 'white',
  },
  textInputStyle: {
    width: 200,
    marginLeft: 8,
    marginRight: 8,
  },
  items: {
    marginLeft: 8,
    fontSize: 15,
  },
});
