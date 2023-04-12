import { View, Text,Dimensions } from 'react-native'
import React from 'react'
import { IconButton, TextInput } from 'react-native-paper'
import { useTheme } from 'react-native-paper'
import { useState } from 'react'

const deviceWidth = Dimensions.get('window').width;

const SearchBar = ({setQueryString}) => {

    const theme = useTheme();
    const [searchField,setSearchField] = useState(false);

    

  return (
    <View style={{flexDirection:"row",alignItems:'center'}}>
        {searchField && <TextInput 
            autoFocus={true} 
            activeUnderlineColor={theme.colors.primaryContainer} 
            textColor={theme.colors.primaryContainer} 
            label="query" 
            style={{backgroundColor:'transparent'}} 
            onChangeText={text => setQueryString(text)}
            contentStyle={{width:deviceWidth*.6}}
        />
        }
      <IconButton icon={searchField?"close":"magnify"} iconColor={theme.colors.primaryContainer} onPress={() => setSearchField(searchField => !searchField)}/>
    </View>
  )
}

export default SearchBar