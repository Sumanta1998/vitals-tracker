import { useRef } from "react";
import { X } from "lucide-react";

export const Modal = ({ isOpen, onClose, title, children, footer }) => {
  const modalRef = useRef(null);

  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  return (
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50"
    >
      <div
        ref={modalRef}
        className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()} // Prevent click inside modal from bubbling up
      >
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="p-6">{children}</div>
        {footer && (
          <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};
