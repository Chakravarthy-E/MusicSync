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
import BasicModel from '@ui/BasicModel';

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
    <BasicModel visible={visible} onRequestClose={onRequestClose}>
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
    </BasicModel>
  );
};

const styles = StyleSheet.create({
  container: {},
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
