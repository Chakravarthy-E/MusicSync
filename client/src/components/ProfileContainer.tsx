import React, {FC} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {UserProfile} from 'src/store/auth';
import AvatarField from '@ui/AvatarField';
import colors from '@utils/colors';
import MaterialComIcon from 'react-native-vector-icons/MaterialIcons';

interface Props {
  profile?: UserProfile | null;
}

const ProfileContainer: FC<Props> = ({profile}) => {
  if (!profile) return null;
  return (
    <View style={styles.container}>
      <AvatarField source={profile.avatar} />
      <View style={styles.profileInfo}>
        <Text style={styles.profileName}>{profile.name}</Text>
        <View style={styles.flexRow}>
          <Text style={styles.email}>{profile.email}</Text>
          <MaterialComIcon name="verified" size={15} color={colors.SECONDARY} />
        </View>
        <View style={styles.flexRow}>
          <Text style={styles.profileActionLink}>
            {profile.followers} Followes
          </Text>
          <Text style={styles.profileActionLink}>
            {profile.followings} Followings
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileName: {
    color: colors.CONSTRAST,
    fontSize: 18,
    fontWeight: '700',
  },
  email: {
    color: colors.CONSTRAST,
    marginRight: 5,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileInfo: {
    paddingHorizontal: 10,
  },
  profileActionLink: {
    backgroundColor: colors.SECONDARY,
    color: colors.PRIMARY,
    paddingHorizontal: 4,
    paddingVertical: 2,
    margin: 5,
  },
});

export default ProfileContainer;
