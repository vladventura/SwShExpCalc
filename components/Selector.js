import React from 'react';
import {View, Text, Picker} from 'react-native';

export const Selector = (props) => {
    return (
        <Picker
            selectedValue={props.selectedValue.name}
            onValueChange={(newValue, index) => props.setSelectedValue(props.values[index])}
            style={{height: 50, width: 150}}
        >
            {props.values.map((item) => {
                return <Picker.Item value={item.name} label={item.name} />
            })}

        </Picker>
    );
}