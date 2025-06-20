import { FlatList, TouchableOpacity } from "react-native";
import { Actions, ItemContainer, ProductContainer, Image, QuantityContainer, ProductDetails, Summary, TotalContainer } from "./styles";
import { Text } from "../Text";
import { formatCurrency } from "../../utils/formatCurrency";
import { PlusCircle } from "../Icons/PlusCircle";
import { MinusCircle } from "../Icons/MinusCircle";
import { Button } from "../Button";
import { Product } from "../../types/Product";
import { CartItem } from "../../types/CartItem";
import { OrderConfirmedModal } from "../OrderConfirmedModal";
import { useState } from "react";
import { api } from "../../utils/api";

interface CartProps {
  cartItems: CartItem[];
  onAdd: (product: Product) => void;
  onDecrement: (product: Product) => void;
  onConfirmOrder: () => void;
  selectedTable: string;
}

export function Cart({cartItems, onAdd, onDecrement, onConfirmOrder, selectedTable} : CartProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [isOrderConfirmedModal, setIsOrderConfirmedModal] = useState(false);

  const isCartEmpty = cartItems.length === 0
  const total = cartItems.reduce((acc, cartItem) => {
    return acc + cartItem.quantity * cartItem.product.price;
  }, 0)

  async function handleConfirmOrder () {
    setIsLoading(true)
    await api.post('/orders', {
      table: selectedTable,
      products: cartItems.map((cartItem) => ({
        product: cartItem.product._id,
        quantity: cartItem.quantity
      }))
    })

    setIsLoading(false)
    setIsOrderConfirmedModal(true)
  }

  function handleOk() {
    onConfirmOrder();
    setIsOrderConfirmedModal(false)
  }

  return (
    <>
      { !isCartEmpty && (
        <FlatList
          data={cartItems}
          keyExtractor={cartItem => cartItem.product._id}
          showsVerticalScrollIndicator={false}
          style={{ marginBottom: 20, maxHeight: 140 }}
          renderItem={({ item: cartItem }) => (
            <ItemContainer>
              <ProductContainer>
                <Image
                  source={{ uri: `http://192.168.1.71:3001/uploads/${cartItem.product.imagePath}`}}
                />

                <QuantityContainer>
                  <Text size={14} color="#666">
                    {cartItem.quantity}x
                  </Text>
                </QuantityContainer>

                <ProductDetails>
                  <Text size={14} weight="600">{cartItem.product.name}</Text>
                  <Text size={14} color="#666">{formatCurrency(cartItem.product.price)}</Text>
                </ProductDetails>
              </ProductContainer>

              <Actions>
                <TouchableOpacity onPress={() => onAdd(cartItem.product)}>
                  <PlusCircle />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => onDecrement(cartItem.product)}>
                  <MinusCircle />
                </TouchableOpacity>
              </Actions>
            </ItemContainer>
          )}
        />
      )}

      <Summary>
        <TotalContainer>
          { !isCartEmpty ? (
            <>
              <Text color="#666">Total</Text>
              <Text size={20} weight="600">{formatCurrency(total)}</Text>
            </>
          ) : (
            <Text color="#999">Seu carrinho está vazio</Text>
          )}
        </TotalContainer>

        <Button
          onPress={handleConfirmOrder}
          disabled={isCartEmpty}
          loading={isLoading}
        >
          Confirmar pedido
        </Button>
      </Summary>

      <OrderConfirmedModal
        visible={isOrderConfirmedModal}
        onOk={handleOk}
      />
    </>
  )
}
