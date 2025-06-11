import { useEffect, useState } from "react";
import { OrdersBoard } from "../OrdersBoard";
import { Container } from "./styles";
import { type Order } from "../../types/Order";
import { api } from "../../utils/api";

export function Orders () {
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    api.get('/orders').then(({data}) => {
      setOrders(data);
      console.log(data)
    })
  }, [])


  const waitingOrders = orders.filter((order) => order.status === 'WAITING')
  const inProductionOrders = orders.filter((order) => order.status === 'IN_PRODUCTION')
  const doneOrders = orders.filter((order) => order.status === 'DONE')

  function hanleCancelOrder(orderId : string) {
    setOrders((prevState) => prevState.filter(order => order._id !== orderId))
  }

  function handleOrderStatusChange(orderId : string, status: Order['status']) {
  setOrders((prevState) => prevState.map((order) => (
    order._id === orderId ? { ...order, status} : order
  )))
  }

  return (
    <Container>
      <OrdersBoard
        title="Fila de espera"
        icon={"🕑"}
        orders={waitingOrders}
        onCancelOrder={hanleCancelOrder}
        textPrimaryActionButton="Iniciar produção"
        iconPrimaryActionButton="👩🏽‍🍳"
        onChangeOrderStatus={handleOrderStatusChange}
      />

      <OrdersBoard
        title="Em preparação"
        icon={"👩🏽‍🍳"}
        orders={inProductionOrders}
        onCancelOrder={hanleCancelOrder}
        textPrimaryActionButton="Finalizar produção"
        iconPrimaryActionButton="✅"
        onChangeOrderStatus={handleOrderStatusChange}
      />

      <OrdersBoard
        title="Pronto!"
        icon={"✅"}
        orders={doneOrders}
        onCancelOrder={hanleCancelOrder}
        hideActionButtons
        onChangeOrderStatus={handleOrderStatusChange}
      />
    </Container>
  )
}
