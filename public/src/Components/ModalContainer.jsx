import React from "react";
import { useStore } from "../Hooks/Store";

import CheckOutModal from "../Components/CheckOutModal";
import LogInModal from "../Components/LogInModal";
import EditCardModal from "../Components/EditCardModal";

const modals = {
  CheckOutModal: CheckOutModal,
  LogInModal: LogInModal,
  EditCardModal: EditCardModal,
};

export function ModalContainer() {
  const modal = useStore((store) => store.modal);
  const Modal = modals[modal];

  if (!Modal) return null;

  return <Modal />;
}
