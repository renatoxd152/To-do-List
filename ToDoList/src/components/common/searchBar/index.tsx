import { SearchBar } from '@rneui/themed';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

interface SearchBarComponentProps {
  onChangeText: (text: string) => void;
}

export const SwitchComponent: React.FunctionComponent<SearchBarComponentProps> = ({ onChangeText }) => {
  const [search, setSearch] = useState("");

  const updateSearch = (search: string) => {
    setSearch(search);
    onChangeText(search);
  };

  return (
    <View style={styles.view}>
      <SearchBar
        placeholder="Procure sua tarefa ..."
        onChangeText={updateSearch}
        value={search}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    margin: 10,
  },
});