import { useEffect, useRef } from "react";

import { createPortal } from "react-dom";

export default function Modal({ open, children, onClose }) {
  const dialog = useRef();

  useEffect(() => {
    if (open) {
      dialog.current.showModal();
    } else {
      dialog.current.close();
    }
  }, [open]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target === dialog.current) {
        dialog.current.close();
        onClose?.();
      }
    };

    const dialogEl = dialog.current;
    dialogEl?.addEventListener("click", handleClickOutside);

    return () => {
      dialogEl?.removeEventListener("click", handleClickOutside);
    };
  }, [onClose]);

  return createPortal(
    <dialog
      className="m-auto md:min-w-xl rounded-xl p-6 shadow-lg backdrop:bg-black/50"
      ref={dialog}
      onClose={onClose}
    >
      {children}
    </dialog>,
    document.getElementById("modal")
  );
}
