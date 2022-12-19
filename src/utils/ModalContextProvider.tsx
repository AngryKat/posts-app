import { Modal, ModalProps } from "antd";
import { createContext, ReactNode, useContext, useState } from "react";

interface ModalsContextType {
    openModal: (content: ReactNode, props?: ModalProps) => void,
    closeModal: () => void,
};

const ModalsContext = createContext<ModalsContextType>({
    openModal: () => {},
    closeModal: () => {},
});

export const ModalsContextProvider = ({ children }: { children: ReactNode }) => {
    const [content, setContent] = useState<ReactNode>();
    const [isOpen, setIsOpen] = useState(false);
    const [modalProps, setModalProps] = useState({});

    const openModal = (content: ReactNode, props?: ModalProps) => {
        setIsOpen(true);
        setContent(content);
        setModalProps(props || {});
    }
   
    const closeModal = () => {
        setContent(null);
        setIsOpen(false);
        setModalProps({})
    }

    return (
        <ModalsContext.Provider value={{ openModal, closeModal }}>
            <Modal open={isOpen} onCancel={closeModal} {...modalProps}>{content}</Modal>
            {children}
        </ModalsContext.Provider>
    )
};

export const useModalsContext = () => useContext(ModalsContext) || {};