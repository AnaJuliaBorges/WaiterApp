import type { Order, StatusType } from "../../types/Order";
import { ModalBody, Overlay, StatusContainer, OrderDetails, Total, Actions } from "./styles";
import closeIcon from '../../assets/images/close-icon.svg';
import { formatCurrency } from "../../utils/formatCurrency";
import { useEffect } from "react";

interface OrderModalProps {
  visible: boolean;
  order: Order | null;
  onClose: () => void;
  onCancelOrder: () => Promise<void>;
  onChangeOrderStatus: () => void;
  isLoading: boolean;
  hideActionButtons?: boolean;
  textPrimaryActionButton?: string;
  iconPrimaryActionButton?: string;
}

const defaultProps : Partial<OrderModalProps> = {
  hideActionButtons: false,
};

export function OrderModal ({
  visible,
  order,
  onClose,
  onCancelOrder,
  onChangeOrderStatus,
  isLoading,
  hideActionButtons,
  textPrimaryActionButton,
  iconPrimaryActionButton
} : OrderModalProps) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if(event.key === 'Escape') onClose();
    }

    document.addEventListener('keydown', (handleKeyDown));

    return () => {
      document.removeEventListener('keydown', (handleKeyDown));
    };
  }, [onClose]);

  if(!visible || !order) {
    return null
  }

  const total = order.products.reduce((total, { product, quantity }) => {
    return total + quantity * product.price;
  }, 0)


  function getDetailsStatus(status: StatusType) {
    const options = {
      WAITING: {
        name: 'Fila de espera',
        icon: '🕑'
      },
      IN_PRODUCTION: {
        name: 'Em produção',
        icon: '👩🏽‍🍳'
      },
      DONE: {
        name: 'Pronto!',
        icon: '✅'
      }
    };

    return options[status];
  }

  return (
    <Overlay>
      <ModalBody>
        <header>
          <strong>Mesa {order.table}</strong>
          <button type="button" onClick={onClose}>
            <img src={closeIcon} alt="ícone de fechar" />
          </button>
        </header>

        <StatusContainer>
          <small>Status do pedido</small>
          <div>
            <span>{getDetailsStatus(order.status).icon}</span>
            <strong>{getDetailsStatus(order.status).name}</strong>
          </div>
        </StatusContainer>

        <OrderDetails>
          <strong>Itens</strong>
          <div className="order-items">
            {order.products.map(({ _id, product, quantity }) =>(
            <div className="item" key={ _id}>
              <img
                src={`http://localhost:3001/uploads/${product.imagePath}`}
                alt={product.name}
                width="56"
                height="28.51"
              />

              <span className="quantity">{quantity}x</span>

              <div className="product-details">
                <strong>{product.name}</strong>
                <span>{formatCurrency(product.price)}</span>
              </div>

            </div>
          ))}
          </div>

          <Total>
            <span>Total</span>
            <strong>{formatCurrency(total)}</strong>
          </Total>
        </OrderDetails>

        {!hideActionButtons && (
          <Actions>
            <button
              type="button"
              className="primary"
              disabled={isLoading}
              onClick={onChangeOrderStatus}
            >
                <span>{iconPrimaryActionButton}</span>
                <strong>{textPrimaryActionButton}</strong>
            </button>

            <button
              type="button"
              className="secondary"
              onClick={onCancelOrder}
              disabled={isLoading}
            >
              <span>Cancelar pedido</span>
            </button>
          </Actions>
        )}
      </ModalBody>
    </Overlay>
  )
}

OrderModal.defaultProps = defaultProps;

