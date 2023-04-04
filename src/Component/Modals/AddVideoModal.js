import React from "react";
import ModalForm from "./ModalForm";

function Modal({ closeModal }) {
  return (
    <div>
      <div className="flex items-center justify-center h-full w-full bg-gray-900 bg-opacity-50 fixed top-0 left-0 z-50 overflow-scroll">
        <div className="bg-white rounded-lg p-6 w-[600px]">
          <h2 className="text-3xl font-bold text-gray-900 my-2 text-center">Add Video</h2>
        
          <ModalForm closeModal={closeModal}></ModalForm>
        </div>
      </div>
    </div>
  );
}

export default Modal;
