import { useState } from "react";
import type { Order, StatusType } from "../../types/Order";
import { Board, OrdersContainer } from "./styles";
import { OrderModal } from "../OrderModal";
import { api } from "../../utils/api";
import { toast } from "react-toastify";

interface OrdersBoardProps {
  title: string;
  icon: string;
  orders: Order[];
  onCancelOrder: (orderId : string) => void;
  onChangeOrderStatus: (orderId: string, status: StatusType) => void;
  hideActionButtons?: boolean;
  textPrimaryActionButton?: string;
  iconPrimaryActionButton?: string;
}

export function OrdersBoard ({ title, orders, icon, onCancelOrder, onChangeOrderStatus, hideActionButtons, textPrimaryActionButton, iconPrimaryActionButton} : OrdersBoardProps ) {
  const [isOrderModalVisible, setIsOrderModalVisible] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<null | Order>(null)
  const [isLoading, setIsLoading] = useState(false);

  function handleOpenOrderModal (order: Order) {
    setIsOrderModalVisible(true);
    setSelectedOrder(order);
  }

  function handleCloseModal () {
    setIsOrderModalVisible(false);
    setSelectedOrder(null);
  }

  function handleChangeOrderStatus() {
    setIsLoading(true)

    const status = selectedOrder?.status ==='WAITING'
    ? 'IN_PRODUCTION'
    : 'DONE'

    api.patch(`/orders/${selectedOrder?._id}`, { status });

    toast.success(`O pedido
       da mesa ${selectedOrder?.table} teve o status alterado!`)
    onChangeOrderStatus(selectedOrder!._id, status)
    setIsOrderModalVisible(false)
    setIsLoading(false);
  }

  async function handleCancelOrder() {
    setIsLoading(true);
    api.delete(`/orders/${selectedOrder?._id}`);

    toast.success(`O pedido da mesa ${selectedOrder?.table} foi cancelado!`)
    onCancelOrder(selectedOrder!._id)
    setIsOrderModalVisible(false)
    setIsLoading(false);
  }

  return (
    <Board>
      <header>
        <span>
          {icon}
        </span>
        <strong>{title}</strong>
        <span>({orders.length})</span>
      </header>

      {orders.length > 0  && (
        <OrdersContainer>
          {orders.map((order) => (
            <button
              type="button"
              key={order._id}
              onClick={() => handleOpenOrderModal(order)}
            >
              <strong>Mesa {order.table}</strong>
              <span>{order.products.length} itens</span>
            </button>
          ))}
        </OrdersContainer>
      )}

      <OrderModal
        visible={isOrderModalVisible}
        order={selectedOrder}
        onClose={handleCloseModal}
        onCancelOrder={handleCancelOrder}
        isLoading={isLoading}
        hideActionButtons={hideActionButtons}
        textPrimaryActionButton={textPrimaryActionButton}
        iconPrimaryActionButton={iconPrimaryActionButton}
        onChangeOrderStatus={handleChangeOrderStatus}
      />
    </Board>
  )
}
