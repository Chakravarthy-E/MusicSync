import AuthInputField from '@components/AuthInputField';
import colors from '@utils/colors';
import React, {FC, useState} from 'react';
import {View, SafeAreaView, StyleSheet, Button} from 'react-native';

interface Props {}

const SignUp: FC<Props> = props => {
  const [userInfo, setuserInfo] = useState({
    name: '',
    email: '',
    password: '',
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formContainer}>
        <AuthInputField
          placeholder="John Doe"
          label="Name"
          containerStyle={styles.marginBottom}
          onChange={text => {
            setuserInfo({...userInfo, name: text});
          }}
        />
        <AuthInputField
          placeholder="john@gmail.com"
          label="Email"
          keyboardType="email-address"
          containerStyle={styles.marginBottom}
          onChange={text => {
            setuserInfo({...userInfo, email: text});
          }}
        />
        <AuthInputField
          placeholder="*********"
          label="Password"
          autoCapitalize="none"
          secureTextEntry
          containerStyle={styles.marginBottom}
          onChange={text => {
            setuserInfo({...userInfo, password: text});
          }}
        />
        <Button
          title="Sing up"
          onPress={() => {
            console.log(userInfo);
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formContainer: {
    width: '100%',
    paddingHorizontal: 15,
  },
  marginBottom: {
    marginBottom: 20,
  },
});

export default SignUp;
