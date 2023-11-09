import colors from '@utils/colors';
import React, {useState} from 'react';
import MaterialComIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  StyleSheet,
  Modal,
  Pressable,
  View,
  Text,
  ScrollView,
} from 'react-native';

interface Props<T> {
  data: T[];
  visible?: boolean;
  title?: string;
  renderItem(item: T): JSX.Element;
  onSelect(item: T, index: number): void;
  onRequestClose?(): void;
}

const CategorySelector = <T extends any>({
  data,
  visible = false,
  title,
  renderItem,
  onSelect,
  onRequestClose,
}: Props<T>) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleSelect = (item: T, index: number) => {
    setSelectedIndex(index);
    onSelect(item, index);
    onRequestClose && onRequestClose();
  };

  return (
    <Modal onRequestClose={onRequestClose} visible={visible} transparent>
      <View style={styles.modelContainer}>
        <Pressable onPress={onRequestClose} style={styles.backDrop} />
        <View style={styles.modal}>
          <Text style={styles.title}>{title}</Text>
          <ScrollView>
            {data.map((item, index) => {
              return (
                <Pressable
                  onPress={() => handleSelect(item, index)}
                  key={index}
                  style={styles.selecterContainer}>
                  {selectedIndex === index ? (
                    <MaterialComIcon
                      name="radiobox-marked"
                      color={colors.SECONDARY}
                    />
                  ) : (
                    <MaterialComIcon
                      name="radiobox-blank"
                      color={colors.SECONDARY}
                    />
                  )}
                  {renderItem(item)}
                </Pressable>
              );
            })}
          </ScrollView>
        </View>
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
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.PRIMARY,
    paddingVertical: 10,
  },
  selecterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default CategorySelector;
