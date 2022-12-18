import * as React from "react";
import { Modal, Portal } from "react-native-paper";

export default Moddal = ({ showModel, setShowModel, children }) => {
  const hideModal = () => setShowModel(false);
  const containerStyle = {
    backgroundColor: "white",
    width: "50%",
    marginHorizontal: "25%",
    padding: 8,
    borderRadius: 8,
  };

  return (
    <Portal>
      <Modal
        visible={showModel}
        onDismiss={hideModal}
        contentContainerStyle={containerStyle}
      >
        {children}
      </Modal>
    </Portal>
  );
};
