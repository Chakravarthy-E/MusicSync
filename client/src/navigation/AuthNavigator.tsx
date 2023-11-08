import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';
import ForgettenPassword from '@views/auth/ForgettenPassword';
import SignIn from '@views/auth/SignIn';
import SignUp from '@views/auth/SignUp';
import Verification from '@views/auth/Verification';
import {getAuthState} from 'src/store/auth';
import {AuthStackParamList} from 'src/@types/navigation';

const Stack = createNativeStackNavigator<AuthStackParamList>();
const AuthNavigator = () => {
  const authState = useSelector(getAuthState);
  console.log(authState);

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="ForgettenPassword" component={ForgettenPassword} />
      <Stack.Screen name="Verification" component={Verification} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
