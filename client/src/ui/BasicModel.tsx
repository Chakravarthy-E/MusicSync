import colors from '@utils/colors';
import React, {FC, ReactNode} from 'react';
import {View, StyleSheet, Modal, Pressable} from 'react-native';

interface Props {
  visible?: boolean;
  onRequestClose?(): void;
  children: ReactNode;
}

const BasicModel: FC<Props> = ({visible, onRequestClose, children}) => {
  return (
    <Modal onRequestClose={onRequestClose} visible={visible} transparent>
      <View style={styles.modelContainer}>
        <Pressable onPress={onRequestClose} style={styles.backDrop} />
        <View style={styles.modal}>{children}</View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {},
  backDrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.INACTIVE_CONSTRAST,
    zIndex: -1,
  },
  modelContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparet',
  },
  modal: {
    width: '90%',
    maxHeight: '50%',
    borderRadius: 10,
    padding: 10,
    backgroundColor: colors.CONSTRAST,
    zIndex: 1,
  },
});

export default BasicModel;
