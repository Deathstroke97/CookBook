import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  AsyncStorage,
  ActivityIndicator,
} from 'react-native';
import { TextInput } from 'react-native-paper';
import { Constants } from 'expo';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const LoginMutation = gql`
  mutation signin($email: String!, $password: String!){
    signinUser(email:{email:$email,password:$password}){
      token
      user{
        id
        email
      }
    }
  }
`;

export default class LoginScreen extends React.Component {
  state = {
    email: '',
    password: '',
  };

  render() {
    const {email, password} = this.state;
    const isEmpty = email && password;
    return (
      <Mutation mutation={LoginMutation}>
        {(signinUser, { data, loading, error }) => (
          <View style={styles.container}>
            <TextInput
              style={styles.inputContainerStyle}
              label="EMAIL my"
              value={this.state.email}
              onChangeText={email => this.setState({ email })}
            />
            <TextInput
              label="PASSWORD"
              style={styles.inputContainerStyle}
              value={this.state.password}
              onChangeText={password => this.setState({ password })}
            />
            <TouchableOpacity
              disabled={loading}
              style={styles.btnSave}
              onPress={() => {
                isEmpty
                  ? signinUser({
                      variables: {
                        email: this.state.email,
                        password: this.state.password,
                      },
                    })
                      .then(json => {
                        this.props.navigation.navigate('Recipes');
                      })
                      .catch((status, err) => {
                        alert('no such user');
                      })
                  : alert('fill all fields');
              }}>
              {loading ? (
                <ActivityIndicator />
              ) : (
                <Text style={styles.addT}>Login</Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnSave}>
              <Text
                style={styles.addT}
                onPress={() => {
                  this.props.navigation.navigate('Register');
                }}>
                {' '}
                Register{' '}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </Mutation>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  btnSave: {
    marginTop: 20,
    backgroundColor: '#3C54B8',
    width: 150,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainerStyle: {
    marginLeft: 8,
    marginRight: 8,
    width: 200,
  },
});
