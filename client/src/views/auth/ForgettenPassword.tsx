import React, {FC} from 'react';
import * as yup from 'yup';
import {View, StyleSheet} from 'react-native';
import AuthInputField from '@components/form/AuthInputField';
import Form from '@components/form';
import SubmitBtn from '@components/form/SubmitBtn';
import AppLink from '@ui/AppLink';
import AuthFormContainer from '@components/AuthFormContainer';

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
            <AppLink title="Sign in" />
            <AppLink title="Sign up" />
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
