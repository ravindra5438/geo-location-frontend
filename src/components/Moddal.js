import * as React from "react";
import { Modal, Portal } from "react-native-paper";

export default Moddal = ({ showModel, setShowModel, children,style }) => {
  const hideModal = () => setShowModel(false);
  const containerStyle = {
    backgroundColor: "white",
    width: "50%",
    padding: 8,
    borderRadius: 8,
    alignSelf:'center',
  };

  return (
    <Portal>
      <Modal
        visible={showModel}
        onDismiss={hideModal}
        contentContainerStyle={[containerStyle,style]}
      >
        {children}
      </Modal>
    </Portal>
  );
};
