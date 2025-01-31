import React from "react";
import { KeyboardTypeOptions, StyleProp, TextInput, TextStyle, View, ViewStyle } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
interface InputProps
{
    label:string;
    placeHolder:string;
    styleIcon: StyleProp<TextStyle>;
    styleView:StyleProp<ViewStyle>;
    styleInput:StyleProp<TextStyle>;
    onChange:(value:string) =>void;
    keyboardType:KeyboardTypeOptions;
    nameIcon:string;
    colorIcon:string;
    sizeIcon:number;
}

export const Input: React.FC<InputProps> = (
    {
        styleIcon,
        styleView,
        styleInput,
        onChange,
        placeHolder,
        keyboardType,
        nameIcon,
        colorIcon,
        sizeIcon
    }
) =>
{
    return(
            <View style={styleView}>
              <Icon name={nameIcon} size={sizeIcon} color={colorIcon} style={styleIcon} />
              <TextInput
                style={styleInput}
                onChangeText={onChange}
                placeholder={placeHolder}
                keyboardType={keyboardType}
              />
            </View>
    )
}