import { useContext, useState } from 'react';
import { StyleSheet, View ,Image,Dimensions} from 'react-native';
import { Button,TextInput,Card ,Text} from 'react-native-paper';
import AuthContext from '../../store/auth-context';


const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;


export default Register = ({navigation}) => {

    const authCtx = useContext(AuthContext);
    console.log("teken in Reg",authCtx.token);

    const [Teacher,setTeacher] = useState(false);

    return(
        <View style={{width:deviceWidth,height:deviceHeight}}>
            <View style={styles.container}>
                <View style={{alignItems:'center'}}>
                        <Image
                            style={{width:120,height:120}}
                            source={require('../../assets/gkvlogo.png')}
                        />
                </View>
                    <View style={{alignItems:'center',flexDirection:'row',justifyContent:'space-between'}}>
                        <Button 
                            mode={Teacher?'elevated':'contained'}
                            onPress={() => {setTeacher(false)}}
                            >
                                Student
                            </Button>
                        <Button 
                            mode={Teacher?'contained':'elevated'}
                            onPress={() => {setTeacher(true)}}
                            >
                                Teacher
                            </Button>
                    </View>
                    <TextInput
                        label="Name"
                        onChangeText={text =>{}}
                        mode="outlined"
                        style={styles.textInput}
                    />
                    <TextInput
                        label="Email"
                        onChangeText={text =>{}}
                        mode="outlined"
                        style={styles.textInput}
                    />
                    <TextInput
                        label="Password"
                        onChangeText={text =>{}}
                        mode="outlined"
                        style={styles.textInput}
                    />
                    {!Teacher?
                        <TextInput
                            label="Enrollment No"
                            onChangeText={text =>{}}
                            mode="outlined"
                            style={styles.textInput}
                        />:null
                    }
                    <Button mode="contained" style={styles.button}>Register</Button>
                    <Button style={styles.button} onPress={() => navigation.navigate('Login')}>
                        <Text variant="titleSmall">Back to</Text> Login
                    </Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      padding: 24,
      flex:1,
      justifyContent:'center',
    },
    textInput:{
        height:40,
        marginVertical:8,
    },
    button:{
        borderRadius:8,
        marginTop:8,
    }
})