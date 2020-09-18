import React from "react";
import { View, Text } from "react-native";
import { Picker } from "@react-native-community/picker";

import SearchableDropdown from "react-native-searchable-dropdown";

export const Selector = (props) => {
  return (
    <SearchableDropdown
      onTextChange={(text) => console.log(text)}
      onItemSelect={(item) => props.setSelectedValue(item)}
      containerStyle={{ padding: 5 }}
      textInputStyle={{
        borderWidth: 1,
        borderColor: "#ccc",
        backgroundColor: "#FAF7F6",
      }}
      itemStyle={{
        marginTop: 2,
        backgroundColor: "#FAF9F8",
        borderColor: "#bbb",
        borderWidth: 1,
      }}
      itemTextStyle={{
        color: "#222",
      }}
      itemsContainerStyle={{
        maxHeight: "60%",
      }}
      items={props.values}
      placeholder="Type the Poke's name"
      underlineColorAndroid="transparent"
    />
    // <Picker
    //   selectedValue={props.selectedValue.name}
    //   onValueChange={(newValue, index) =>
    //     props.setSelectedValue(props.values[index])
    //   }
    //   style={{ height: 50, width: 150 }}
    // >
    //   {props.values.map((item) => {
    //     return (
    //       <Picker.Item key={item.name} value={item.name} label={item.name} />
    //     );
    //   })}
    // </Picker>
  );
};
