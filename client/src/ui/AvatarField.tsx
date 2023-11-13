import colors from '@utils/colors';
import React, {FC} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import EnrypoIcon from 'react-native-vector-icons/Entypo';

interface Props {
  source: string | undefined;
}

const avatarSize = 70;
const AvatarField: FC<Props> = ({source}) => {
  return (
    <View>
      {source ? (
        <Image source={{uri: source}} style={styles.avatarImg} />
      ) : (
        <View style={styles.avatarImg}>
          <EnrypoIcon name="mic" size={30} color={colors.PRIMARY} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  avatarImg: {
    width: avatarSize,
    height: avatarSize,
    borderRadius: avatarSize / 2,
    backgroundColor: colors.SECONDARY,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: colors.CONSTRAST,
  },
});

export default AvatarField;
