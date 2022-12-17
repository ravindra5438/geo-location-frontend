import * as React from "react";
import { Modal, Portal, Text, Provider } from "react-native-paper";
import { View } from "react-native";

export default Modal1 = ({ showModel, setShowModel, children }) => {
  const hideModal = () => setShowModel(false);
  const containerStyle = {
    backgroundColor: "white",
    width: "50%",
    marginHorizontal: "25%",
    padding: 8,
    borderRadius: 8,
  };

  return (
    <Provider>
      <Portal>
        <Modal
          visible={showModel}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}
        >
          {children}
        </Modal>
      </Portal>
    </Provider>
  );
};
