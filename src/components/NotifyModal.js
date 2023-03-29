import { View } from "react-native";
import { Button, IconButton, Text, TextInput } from "react-native-paper"
import Moddal from "./Moddal"
import { useTheme } from "react-native-paper";
import useAxios from "../services";
import Alert from "./alert";
import { useState } from "react";

const NotifyModal = ({showNotifyModal,setShowNotifyModal,courseId}) => {

    const theme = useTheme();
    const axiosInstance = useAxios()
    const [isLoading,setIsLoading] = useState(false);
    let notification = {title:"",message:"",courseId:""}

    const pushNotificationHandler = async () => {
        setIsLoading(true)
        await axiosInstance.
        post("/message",notification).then(res =>
            {
                Alert("success","success",res.data.message)}
            )
            .catch(err => 
                console.log(err)
            )
        setIsLoading(false)
        setShowNotifyModal(false)
    }


    return(
        <Moddal style={{width:'80%',padding:16,backgroundColor:theme.colors.primary}} showModel={showNotifyModal} setShowModel={setShowNotifyModal}>
            <View>
                <IconButton icon="close" iconColor={theme.colors.primaryContainer} style={{position:'absolute',right:-16,top:-16}} onPress={() => setShowNotifyModal(false)}/>
                <Text style={{alignSelf:'center',color:theme.colors.primaryContainer,letterSpacing:4}} variant="titleLarge">NOTIFY</Text>
                <TextInput onChangeText={text => notification = {...notification,title:text,courseId:courseId} } mode="flat" activeUnderlineColor="rgb(255,150,100)" label="Title" style={{backgroundColor:theme.colors.primaryContainer,marginVertical:16}} />
                <TextInput onChangeText={text => notification = {...notification,message:text,courseId:courseId} } mode="flat" activeUnderlineColor="rgb(255,150,100)" multiline={true} numberOfLines={5} label="Message" style={{backgroundColor:theme.colors.primaryContainer}}/>
                <Button
                    mode="contained"
                    disabled={isLoading}
                    loading={isLoading}
                    labelStyle={{color:theme.colors.primary,letterSpacing:2}}
                    contentStyle={{backgroundColor:"rgb(0,255,170)"}}
                    style={{borderRadius:4,marginTop:16}}
                    onPress={() => pushNotificationHandler()}
                > Notify
                </Button>
            </View>
        </Moddal>
    )
}

export default NotifyModal;