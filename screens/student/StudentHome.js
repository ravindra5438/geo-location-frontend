import { useState } from "react";
import { View ,StyleSheet,Dimensions} from "react-native"
import { Button, Modal, Portal,Divider,Text,TextInput} from "react-native-paper"

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

export default StudentHome = () => {

    const [portalVisibility,setPortalVisibility] = useState(false);

    return(
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                <Button style={styles.button} mode='contained' onPress={() => setPortalVisibility(true)}>Join Course</Button>
                <Button style={styles.button} mode='elevated'>class</Button>
            </View>
                <Portal>
                    <Modal visible={portalVisibility} onDismiss={() => setPortalVisibility(false)} contentContainerStyle={styles.portalContainer}>
                        <View style={{alignItems:'center'}}>
                            <Text variant="titleLarge" style={{color:'purple'}}>Join Course</Text>
                        </View>
                        <Divider bold={true} style={styles.divider}/>
                        <TextInput 
                            style={{width:'100%'}}
                            mode='outlined' 
                            label="Course Code"
                            onChangeText={text => {}}
                        />
                        <Button style={styles.button} mode='contained'>Join</Button>
                    </Modal>
                </Portal>
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