import CircleUi from '@ui/CircleUi';
import colors from '@utils/colors';
import React, {FC, ReactNode} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {Text} from 'react-native';

interface Props {
  children: ReactNode;
  heading: string;
  subHeading: string;
}

const AuthFormContainer: FC<Props> = ({children, heading, subHeading}) => {
  return (
    <View style={styles.container}>
      <CircleUi position="top-left" size={200} />
      <CircleUi position="top-right" size={100} />
      <CircleUi position="bottom-left" size={100} />
      <CircleUi position="bottom-right" size={200} />

      <View style={styles.headerContainer}>
        <Image source={require('../assets/logo.png')} />
        <Text style={styles.heading}>{heading}</Text>
        <Text style={styles.subHeading}>{subHeading}</Text>
      </View>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  headerContainer: {
    width: '100%',
    marginBottom: 20,
  },
  heading: {
    color: colors.SECONDARY,
    fontSize: 25,
    fontWeight: 'bold',
    paddingVertical: 5,
  },
  subHeading: {color: colors.SECONDARY, fontSize: 15, fontWeight: 'bold'},
});

export default AuthFormContainer;
