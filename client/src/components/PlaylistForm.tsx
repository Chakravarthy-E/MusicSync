import BasicModel from '@ui/BasicModel';
import colors from '@utils/colors';
import React, {FC, useState} from 'react';
import {View, StyleSheet, TextInput, Pressable, Text} from 'react-native';
import MaterialComIcon from 'react-native-vector-icons/MaterialCommunityIcons';

export interface PlayListInfo {
  title: string;
  private: boolean;
}

interface Props {
  visible: boolean;
  onRequestClose(): void;
  onSubmit(value: PlayListInfo): void;
}

const PlaylistForm: FC<Props> = ({onRequestClose, visible, onSubmit}) => {
  const [playlistInfo, setplaylistInfo] = useState({
    title: '',
    private: false,
  });

  const handleSubmit = () => {
    onSubmit(playlistInfo);
    handleClose();
  };
  const handleClose = () => {
    setplaylistInfo({title: '', private: false});
    onRequestClose();
  };
  return (
    <BasicModel visible={visible} onRequestClose={handleClose}>
      <View>
        <Text style={styles.title}>Create New Playlist</Text>
        <TextInput
          placeholder="Title"
          style={styles.input}
          onChangeText={text => {
            setplaylistInfo({...playlistInfo, title: text});
          }}
          value={playlistInfo.title}
        />

        <Pressable
          onPress={() => {
            setplaylistInfo({...playlistInfo, private: !playlistInfo.private});
          }}
          style={styles.privateSelector}>
          {playlistInfo.private ? (
            <MaterialComIcon name="radiobox-marked" color={colors.PRIMARY} />
          ) : (
            <MaterialComIcon name="radiobox-blank" color={colors.PRIMARY} />
          )}
          <Text style={styles.privateLabel}>Private</Text>
        </Pressable>
        <Pressable style={styles.submitBtn} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Create</Text>
        </Pressable>
      </View>
    </BasicModel>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    color: colors.PRIMARY,
    fontWeight: '700',
  },
  input: {
    height: 45,
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: colors.PRIMARY,
    color: colors.PRIMARY,
  },
  privateSelector: {
    height: 45,
    alignItems: 'center',
    flexDirection: 'row',
  },
  privateLabel: {
    color: colors.PRIMARY,
    marginLeft: 5,
  },
  submitBtn: {
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    borderColor: colors.PRIMARY,
    borderRadius: 7,
    backgroundColor: colors.SECONDARY,
  },
  buttonText: {
    color: colors.CONSTRAST,
    fontSize: 16,
  },
});

export default PlaylistForm;
