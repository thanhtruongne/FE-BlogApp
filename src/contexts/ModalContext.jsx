import { createContext, useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ModalLogin from '../Pages/Authencated/components/ModalLogin';



const ModalContext = createContext();

export const useModalLoginProvider = () => useContext(ModalContext);

export const ModalLoginProvider = ({ children }) => {
    const [openModalContext, setModalContext] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    return (
        <ModalContext.Provider value={{ openModalContext, setModalContext, dispatch, navigate }}>
            {children}
            {openModalContext && (
                <ModalLogin
                    isOpen={openModalContext}
                    setOpenModal={setModalContext}
                    dispatch={dispatch}
                    navigate={navigate}
                />
            )}
        </ModalContext.Provider>
    );
};