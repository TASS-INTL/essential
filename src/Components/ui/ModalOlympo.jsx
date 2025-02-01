// import { motion } from 'framer-motion';
import { LoaderComponent } from "..";

export const ModalOlympo = ({ isOpen, onClose, higth = 50, width = 50, modalTitle, children }) => {
    if (!isOpen) return <></>;

    return (
        <div className="absolute flex items-center justify-center z-50 top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 ">
            {/* <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.2 }}
        className={`bg-white rounded-lg shadow-lg p-6 ${sizeClasses[size]}`}
      > */}
            <div className={`relative bg-white rounded-lg shadow-lg p-6 h-[${higth}%] w-[${width}%] `}>
                <div className="flex justify-center items-center border-b pb-2">
                    <h2 className="-bottom-6text-lg font-semibold">{modalTitle}</h2>
                    <button onClick={onClose} className="absolute px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 bottom-0 right-0 mb-2 mr-2">
                        Cerrar
                    </button>
                </div>
                <div className="mt-4">
                    {children}
                </div>
            </div>

        </div>
    );
};