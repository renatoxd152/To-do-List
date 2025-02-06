import { SearchBar } from '@rneui/themed';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

interface SearchBarComponentProps {
  onChangeText: (text: string) => void;
}

export const SearchBarComponent: React.FunctionComponent<SearchBarComponentProps> = ({ onChangeText }) => {
  const [search, setSearch] = useState("");

  const updateSearch = (search: string) => {
    setSearch(search);
    onChangeText(search);
  };

  return (
    <View style={styles.container}>
      <SearchBar
        placeholder="Procure sua tarefa ..."
        onChangeText={updateSearch}
        value={search}
        containerStyle={styles.searchContainer}
        inputContainerStyle={styles.inputContainer}
        inputStyle={{color:"#000"}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginVertical: 8,
    width: '100%'
  },
  searchContainer: {
    width: "100%",
    backgroundColor: "transparent",
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  inputContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
  },
});
