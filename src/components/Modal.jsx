import PropTypes from "prop-types";
import { Dialog } from "@headlessui/react";

const Modal = ({ isOpen, onClose, title, children, size }) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div className={`modal-dialog ${size} bg-white p-4 rounded shadow-lg`}>
        {/* Título del Modal */}
        <Dialog.Title className="modal-header">
          <h5 className="modal-title">{title}</h5>
          <button
            type="button"
            className="btn-close"
            onClick={onClose}
          ></button>
        </Dialog.Title>

        {/* Contenido del Modal */}
        <div className="modal-body">{children}</div>

        {/* Footer con botón de cierre */}
        <div className="modal-footer">
          <button className="btn btn-danger" onClick={onClose}>
            Cerrar
          </button>
        </div>
      </div>
    </Dialog>
  );
};

// ✅ Definir los tipos de propiedades
Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired, // Si el modal está abierto o no
  onClose: PropTypes.func.isRequired, // Función para cerrar el modal
  title: PropTypes.string.isRequired, // Título del modal
  children: PropTypes.node.isRequired, // Contenido del modal
  size: PropTypes.oneOf(["modal-sm", "modal-md", "modal-lg", "modal-xl"]), // Tamaño del modal
};

// ✅ Valores por defecto
Modal.defaultProps = {
  size: "modal-md", // Modal mediano por defecto
};

export default Modal;
