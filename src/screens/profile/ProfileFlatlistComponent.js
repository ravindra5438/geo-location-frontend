/*use strict*/ 
import Icon from "react-native-vector-icons/FontAwesome";
import { View } from "react-native";
import { IconButton, Text, TextInput, useTheme } from "react-native-paper";
import { useState,useEffect } from "react";
import useAxios from "../../services";
import Alert from "../../components/alert"

export default ProfileFlatlistComponent = ({ text, icon ,editable,setEdited,edited}) => {
  const theme = useTheme();
  const [editMode,setEditMode] = useState(false);
  const [name,setName] = useState(text);
  const axiosInstance = useAxios();

  useEffect(() => { setName(text);console.log(text)}, [text] )


  const editNameHandler = async () => {
    try {
      await axiosInstance.put("/user",{name:name}).then(res => {
        setEdited(!edited);
        setEditMode(false)
        Alert("success", "success", res?.data?.message);
      }).catch(err => console.log(err))
  } catch (error) {
      console.log(error)
  }
  }


  return (
    <View style={{ flexDirection: "row", height: 70, alignItems: "center" }}>
      <View
        style={{
          marginHorizontal: 16,
          width: 40,
          height: 40,
          borderRadius: 4,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: theme.colors.primary,
        }}
      >
        <Icon name={icon} size={20} color={theme.colors.primaryContainer} />
      </View>
      <View style={{}}>
        {editMode?
        <View flexDirection="row" alignItems="center">
          <TextInput style={{backgroundColor:"transparent",width:"60%"}} mode="flat" value={name} onChangeText={text => setName(text)}/>
          <IconButton style={{backgroundColor:theme.colors.primary}} icon="check" size={20} iconColor={theme.colors.primaryContainer} onPress={() => editNameHandler()}/>
          <IconButton style={{backgroundColor:theme.colors.primary}} icon="close" size={20} iconColor={theme.colors.primaryContainer} onPress={() => {setName(text);setEditMode(false)}}/>
        </View>
          :
          <View flexDirection="row" alignItems="center">
            <Text variant="bodyLarge" style={{ color: theme.colors.primary }}>{text}</Text>
            {editable &&
              <IconButton icon="pen" size={20} iconColor={theme.colors.primary} onPress={() => setEditMode(true)}/>
            }
        </View>}
      </View>
    </View>
  );
};
