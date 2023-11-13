import {FC} from 'react';
import AppHeader from '@components/AppHeader';
import AvatarField from '@ui/AvatarField';
import colors from '@utils/colors';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {View, StyleSheet, Text, Pressable, TextInput} from 'react-native';
import AppButton from '@ui/AppButton';
import {getClient} from 'src/api/client';
import catchAsyncError from 'src/api/catchError';
import {useDispatch} from 'react-redux';
import {upldateNotification} from 'src/store/notification';
import {Keys, removeFromAsyncStorage} from '@utils/asyncStorage';
import {
  updateProfile,
  updateLoggedInState,
  updateBusyState,
} from 'src/store/auth';

interface Props {}

const ProfileSettings: FC<Props> = props => {
  const dispatch = useDispatch();

  const handleLogout = async (fromAll?: boolean) => {
    dispatch(updateBusyState(true));
    const endpoint = '/auth/log-out?fromAll=' + (fromAll ? 'yes' : '');
    try {
      const client = await getClient();
      await client.post(endpoint);

      await removeFromAsyncStorage(Keys.AUTH_TOKEN);

      dispatch(updateProfile(null));
      dispatch(updateLoggedInState(false));
    } catch (error) {
      const errorMessage = catchAsyncError(error);
      dispatch(upldateNotification({message: errorMessage, type: 'error'}));
    }
    dispatch(updateBusyState(false));
  };
  return (
    <View style={styles.container}>
      <AppHeader title="Settings" />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Profile Settings</Text>
      </View>

      <View style={styles.settingOptionsContainer}>
        <View style={styles.avatarContainer}>
          <AvatarField />
          <Pressable style={styles.paddingLeft}>
            <Text style={styles.linkText}>Update Profile Image</Text>
          </Pressable>
        </View>
        <TextInput style={styles.nameInput} value={'Ram'} />
        <View style={styles.emailContainer}>
          <Text style={styles.email}>ram@gmail.com</Text>
          <MaterialIcon name="verified" size={15} color={colors.SECONDARY} />
        </View>
      </View>

      <View style={styles.titleContainer}>
        <Text style={styles.title}>Logout</Text>
      </View>
      <View style={styles.settingOptionsContainer}>
        <Pressable onPress={() => handleLogout(true)} style={styles.logoutbtn}>
          <AntDesign name="logout" size={20} color={colors.CONTRAST} />
          <Text style={styles.logOutBtnTitle}>Logout From All</Text>
        </Pressable>
        <Pressable onPress={() => handleLogout()} style={styles.logoutbtn}>
          <AntDesign name="logout" size={20} color={colors.CONTRAST} />
          <Text style={styles.logOutBtnTitle}>Logout</Text>
        </Pressable>
      </View>
      <View style={styles.marginTop}>
        <AppButton title="Update" borderRadius={7} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  titleContainer: {
    borderBottomWidth: 0.5,
    borderBottomColor: colors.SECONDARY,
    paddingBottom: 5,
    marginTop: 15,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    color: colors.SECONDARY,
  },
  settingOptionsContainer: {
    marginTop: 15,
    paddingLeft: 15,
  },
  avatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  linkText: {
    color: colors.SECONDARY,
    fontStyle: 'italic',
  },
  paddingLeft: {
    paddingLeft: 15,
  },
  nameInput: {
    color: colors.CONTRAST,
    fontWeight: 'bold',
    fontSize: 18,
    borderWidth: 0.5,
    borderColor: colors.CONTRAST,
    borderRadius: 7,
    marginTop: 14,
    padding: 10,
  },
  emailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  email: {
    color: colors.CONTRAST,
    marginLeft: 10,
    fontSize: 15,
    marginRight: 5,
  },
  logoutbtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  logOutBtnTitle: {
    color: colors.CONTRAST,
    fontSize: 18,
    marginLeft: 10,
  },
  marginTop: {
    marginTop: 15,
  },
});

export default ProfileSettings;
