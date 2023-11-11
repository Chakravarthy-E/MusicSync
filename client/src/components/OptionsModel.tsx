import BasicModel from '@ui/BasicModel';
import React, {FC} from 'react';
import {View, StyleSheet} from 'react-native';

interface Props<T> {
  visible: boolean;
  onRequestClose(): void;
  options: T[];
  renderItem(item: T): JSX.Element;
}

const OptionsModel = <T extends any>({
  visible,
  onRequestClose,
  options,
  renderItem,
}: Props<T>) => {
  return (
    <BasicModel visible={visible} onRequestClose={onRequestClose}>
      {options.map((item, index) => {
        return <View key={index}>{renderItem(item)}</View>;
      })}
    </BasicModel>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default OptionsModel;
