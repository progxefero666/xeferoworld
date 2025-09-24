//

import React, { useState, useEffect } from 'react';

import { createRoot } from "react-dom/client";
import ReactJsonPretty from 'react-json-pretty';
import '@/style/monikai.css';


interface PopupIfViewJson {
    jsonobj: string;
    onClose: () => void;
    isOpen: boolean;
}

export const PopupViewJson = ({ jsonobj, onClose, isOpen }: PopupIfViewJson) => {


    const modalClass: string = "";//AppUI.getModalCompWidthClass()
    const btniconClass: string = "h-8 w-8"; //AppIcons.getIconSizeClass();

    return (
        <dialog open={isOpen} className={modalClass}>

            <div className="modal-box w-full">
                <div className="w-full">
                    <ReactJsonPretty data={jsonobj}
                        className="text-sm font-mono" />
                </div>

                {/* Botones */}
                <div className="modal-action flex justify-center mt-4">
                    <form method="dialog">

                        <button className="btn btn-primary mr-2"
                            onClick={(e) => { e.preventDefault(); onClose(); }} >
                            OK
                
                        </button>

                    </form>
                </div>

            </div>
        </dialog>
    );
};

// control popup function
export const showUiPopupViewJson = (jsonobj: string): Promise<void> => {

    return new Promise((resolve) => {

        // create modal root para React 18+
        const modalRoot = document.createElement("div");
        document.body.appendChild(modalRoot);
        const root = createRoot(modalRoot);

        // ModalWrapper 
        const ModalWrapper = () => {
            const [isOpen, setIsOpen] = useState(true);
            const handleClose = () => { setIsOpen(false); resolve(); };

            // clear modal
            useEffect(() => {
                if (!isOpen) {
                    setTimeout(() => {
                        root.unmount();
                        document.body.removeChild(modalRoot);
                    }, 0);
                }
            }, [isOpen]);

            return (
                <PopupViewJson jsonobj={jsonobj}
                    onClose={() => { handleClose(); }}
                    isOpen={isOpen} />
            );
        };
        // Render modal
        root.render(<ModalWrapper />);

    });

};//end showUiPopupViewJson