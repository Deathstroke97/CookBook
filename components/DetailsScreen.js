import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Separator,
  Image,
  TouchableOpacity,
  Share,
} from 'react-native';

import { createStackNavigator } from 'react-navigation';

class DetailsScreen extends React.Component {
  onShare() {
    const details = this.props.navigation.state.params.addInfo;
    Share.share({
      message:
        details.title +
        '\n' +
        details.description +
        '\nIngridients:\n' +
        details.ingredients +
        '\nInstructions:\n' +
        details.instructions +
        '\n',
    });
  }

  render() {
    const data = this.props.navigation.state.params.addInfo;
    console.log(data);
    return (
      <View>
        <Text>{data.title}</Text>
        <Text>{data.description}</Text>
        {data.instructions.map((item, index) => {
          return <Text key={index}>{item}</Text>;
        })}
        <View>
          {data.image !== null && (
            <Image
              style={{ width: 100, height: 100 }}
              source={{
                uri: data.image.url,
              }}
            />
          )}
        </View>

        <View style={{ borderBottomColor: 'black', borderBottomWidth: 1 }} />
        {data.ingredients.map((item, index) => {
          return <Text>{item}</Text>;
        })}
        <View>
          <TouchableOpacity
            onPress={() => {
              this.onShare();
            }}>
            <Image
              source={{
                uri:
                  'https://www.shareicon.net/data/2015/07/27/75731_share_256x256.png',
              }}
              style={{ width: 30, height: 30 }}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
export default DetailsScreen;
