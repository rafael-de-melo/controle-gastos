import type { ReactNode } from 'react';
import './baseModal.css';

interface ModalProps {
  aberto: boolean;
  titulo: string;
  onFechar: () => void;
  children: ReactNode;
}

export function BaseModal({ aberto, titulo, onFechar, children }: ModalProps) {
  if (!aberto) return null;

  return (
    <div className="modal-overlay" onClick={onFechar}>
      <div
        className="modal-content"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="modal-header">
          <h3>{titulo}</h3>
          <button type="button" className="icon-button" onClick={onFechar}>
            x
          </button>
        </div>

        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}