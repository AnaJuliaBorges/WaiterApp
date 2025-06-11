import { FlatList } from "react-native";
import { Text } from "../Text";
import { ProductContainer, ProductImage, ProductDetails, Separator, AddToCartButton } from "./styles";
import { formatCurrency } from "../../utils/formatCurrency";
import { PlusCircle } from "../Icons/PlusCircle";
import { ProductModal } from "../ProductModal";
import { useState } from "react";
import { Product } from "../../types/Product";

interface MenuProps {
  onAddToCart: (product: Product) => void
  products: Product[];
}

export function Menu({onAddToCart, products} : MenuProps) {
  const [isProductModalVisible, setIsProductModalVisible] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<null | Product>(null)

  function handleProductDetails(product: Product) {
    setIsProductModalVisible(true)
    setSelectedProduct(product)
  }

  return (
    <>
      <FlatList
        data={products}
        style={{ marginTop: 32 }}
        contentContainerStyle={{ paddingHorizontal: 24 }}
        ItemSeparatorComponent={Separator}
        keyExtractor={(product) => product._id}
        renderItem={({ item: product }) => (
          <ProductContainer onPress={() => handleProductDetails(product)}>
            <ProductImage
              source={{ uri: `http://192.168.1.71:3001/uploads/${product.imagePath}` }}
            />

            <ProductDetails>
              <Text weight="600">{product.name}</Text>
              <Text size={14} color="#666">{product.description}</Text>
              <Text size={14} weight="600">{formatCurrency(product.price)}</Text>
            </ProductDetails>

            <AddToCartButton onPress={() => onAddToCart(product)}>
              <PlusCircle />
            </AddToCartButton>
          </ProductContainer>
        )}
      />

      <ProductModal
        visible={isProductModalVisible}
        onClose={() => setIsProductModalVisible(false)}
        product={selectedProduct}
        onAddToCart={onAddToCart}
      />
    </>


  );
}
