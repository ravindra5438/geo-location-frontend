import { Portal,Modal,Provider} from "react-native-paper";

export default Portal = ({children,visible,style}) => {
    return (
        <Provider>
        <Portal>
            <Modal visible={visible} contentContainerStyle={style}>
                {children}
            </Modal>
        </Portal>
        </Provider>
    )
}