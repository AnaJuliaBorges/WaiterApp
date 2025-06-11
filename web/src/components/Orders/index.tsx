import { orders } from "../../mocks/orders";
import { OrdersBoard } from "../OrdersBoard";
import { Container } from "./styles";

export function Orders () {
  const waitingOrders = orders.filter((order) => order.status === 'WAITING')
  const inProductionOrders = orders.filter((order) => order.status === 'IN_PRODUCTION')
  const doneOrders = orders.filter((order) => order.status === 'DONE')

  return (
    <Container>
      <OrdersBoard
        title="Fila de espera"
        icon={"🕑"}
        orders={waitingOrders}
      />

      <OrdersBoard
        title="Em preparação"
        icon={"👩🏽‍🍳"}
        orders={inProductionOrders}
      />

      <OrdersBoard
        title="Pronto!"
        icon={"✅"}
        orders={doneOrders}
      />
    </Container>
  )
}
