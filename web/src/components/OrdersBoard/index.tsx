import { useState } from "react";
import type { Order } from "../../types/Order";
import { Board, OrdersContainer } from "./styles";
import { OrderModal } from "../OrderModal";

interface OrdersBoardProps {
  title: string,
  icon: string,
  orders: Order[],
}

export function OrdersBoard ({ title, orders, icon } : OrdersBoardProps ) {
  const [isOpenOrderModalVisible, setIsOpenOrderModalVisible] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<null | Order>(null)

  function handleOpenOrderModal (order: Order) {
    setIsOpenOrderModalVisible(true)
    setSelectedOrder(order)
  }

  function handleCloseModal () {
    setIsOpenOrderModalVisible(false)
    setSelectedOrder(null)
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
        visible={isOpenOrderModalVisible}
        order={selectedOrder}
        onClose={handleCloseModal}
      />
    </Board>
  )
}
