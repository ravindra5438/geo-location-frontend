import React from 'react';
import { View ,StyleSheet,Dimensions} from "react-native"
import { Button, Text,Portal,Modal, TextInput, Divider} from "react-native-paper";
//import Portal from '../../components/Portal';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

export default TeacherHome = () => {

    const [portalVisibility,setPortalVisibility] = React.useState(true);

    return(
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                <Button style={styles.button} mode='contained' onPress={() => setPortalVisibility(true)}>Create class</Button>
                <Button style={styles.button} mode='elevated'>class</Button>
                <Portal>
                    <Modal visible={portalVisibility} onDismiss={() => setPortalVisibility(false)}contentContainerStyle={styles.portalContainer}>
                        <View style={{alignItems:'center'}}>
                            <Text variant="titleLarge" style={{color:'purple'}}>Create Course</Text>
                        </View>
                        <Divider bold={true} style={styles.divider}/>
                        <TextInput 
                            style={{width:'100%'}}
                            mode='outlined' 
                            label="Course Name"
                            onChangeText={text => {}}
                        />
                        <Button style={styles.button} mode='contained'>Create</Button>
                    </Modal>
                </Portal>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    buttonContainer:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    container:{
        height:deviceHeight,
    },
    button:{
        width:200,
        marginVertical:8,
        borderRadius:8,
    },
    portalContainer:{
        backgroundColor: 'white',
        alignItems:'center',
        marginHorizontal:16,
        paddingHorizontal:16,
        paddingVertical:8,
        borderRadius:8,
    },
    divider:{
        marginVertical:8,
        width:'100%',
        height:2,
    }
})