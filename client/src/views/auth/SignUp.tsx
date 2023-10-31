import colors from '@utils/colors';
import React, {FC} from 'react';
import {View, SafeAreaView, TextInput, StyleSheet, Text} from 'react-native';

interface Props {}

const SignUp: FC<Props> = props => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          placeholder="John"
          placeholderTextColor={colors.INACTIVE_CONSTRAST}
          style={styles.input}
        />
        <Text style={styles.label}>Email</Text>
        <TextInput
          placeholder="john@gmail.com"
          placeholderTextColor={colors.INACTIVE_CONSTRAST}
          style={styles.input}
        />
        <Text style={styles.label}>Password</Text>
        <TextInput
          placeholder="**********"
          placeholderTextColor={colors.INACTIVE_CONSTRAST}
          style={styles.input}
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
  input: {
    borderWidth: 2,
    borderColor: colors.SECONDARY,
    height: 45,
    borderRadius: 25,
    color: colors.CONSTRAST,
    padding: 10,
  },
  label: {
    color: colors.CONSTRAST,
  },
  formContainer: {
    width: '100%',
    paddingHorizontal: 15,
  },
});

export default SignUp;
