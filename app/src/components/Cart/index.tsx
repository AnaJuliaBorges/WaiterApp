import { FlatList, Touchable, TouchableOpacity } from "react-native";
import { CartItem } from "../../types/Cartitem";
import { Actions, ItemContainer, ProductContainer, Image, QuantityContainer, ProductDetails, Summary, TotalContainer } from "./styles";
import { Text } from "../Text";
import { formatCurrency } from "../../utils/formatCurrency";
import { PlusCircle } from "../Icons/PlusCircle";
import { MinusCircle } from "../Icons/MinusCircle";
import { Button } from "../Button";
import { Product } from "../../types/Product";

interface CartProps {
  cartItems: CartItem[];
  onAdd: (product: Product) => void;
  onDecrement: (product: Product) => void;
}

export function Cart({cartItems, onAdd, onDecrement} : CartProps) {
  const isCartEmpty = cartItems.length === 0
  const total = cartItems.reduce((acc, cartItem) => {
    return acc + cartItem.quantity * cartItem.product.price;
  }, 0)

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
          onPress={() => alert('confirmar pedido')}
          disabled={isCartEmpty}
        >
          Confirmar pedido
        </Button>
      </Summary>
    </>
  )
}
