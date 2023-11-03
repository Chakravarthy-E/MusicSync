import colors from '@utils/colors';
import React, {FC} from 'react';
import Icon from 'react-native-vector-icons/Entypo';

interface Props {
  privateIcon: boolean;
}

const PasswordVisibilityIcon: FC<Props> = ({privateIcon}) => {
  return privateIcon ? (
    <Icon name="eye" color={colors.ERROR} size={18} />
  ) : (
    <Icon name="eye-with-line" color={colors.ERROR} size={18} />
  );
};

export default PasswordVisibilityIcon;
