import React, {FC} from 'react';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import * as yup from 'yup';
import {View, StyleSheet} from 'react-native';
import AuthInputField from '@components/form/AuthInputField';
import Form from '@components/form';
import SubmitBtn from '@components/form/SubmitBtn';
import AppLink from '@ui/AppLink';
import AuthFormContainer from '@components/AuthFormContainer';
import {AuthStackParamList} from 'src/@types/navigation';

const forgettenPasswordSchema = yup.object({
  email: yup
    .string()
    .trim('Name is missing')
    .email('Invalid email')
    .required('Email is required'),
});

interface Props {}

const initialValues = {
  email: '',
};

const ForgettenPassword: FC<Props> = props => {
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();

  return (
    <Form
      onSubmit={values => {
        console.log(values);
      }}
      initialValues={initialValues}
      validationSchema={forgettenPasswordSchema}>
      <AuthFormContainer
        heading="Forget Password !"
        subHeading="Opps, did you forget your password? Dont worry, we'll help you get back in.">
        <View style={styles.formContainer}>
          <AuthInputField
            name="email"
            placeholder="john@email.com"
            label="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            containerStyle={styles.marginBottom}
          />
          <SubmitBtn title="Send link" />

          <View style={styles.linkContainer}>
            <AppLink
              title="Sign in"
              onPress={() => {
                navigation.navigate('SignIn');
              }}
            />
            <AppLink
              title="Sign up"
              onPress={() => {
                navigation.navigate('SignUp');
              }}
            />
          </View>
        </View>
      </AuthFormContainer>
    </Form>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    width: '100%',
  },
  marginBottom: {
    marginBottom: 20,
  },
  linkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});

export default ForgettenPassword;
