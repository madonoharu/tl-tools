import { useCallback, useMemo, useState } from "react";

import ModalBase, { ModalProps } from "../components/Modal";

export const useModal = (initialOpen = false) => {
  const [isOpen, setIsOpen] = useState(initialOpen);

  const { show, hide } = useMemo(() => {
    const show = () => {
      setIsOpen(true);
    };

    const hide = () => {
      setIsOpen(false);
    };

    return { show, hide };
  }, []);

  const Modal: React.FC<ModalProps> = useCallback(
    (props) => <ModalBase open={isOpen} onClose={hide} {...props} />,
    [isOpen, hide]
  );

  return Object.assign(Modal, {
    isOpen,
    show,
    hide,
  });
};
