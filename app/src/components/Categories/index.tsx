import { FlatList } from "react-native";
import { Text } from "../Text";
import { CategoryContainer, Icon } from "./styles";
import { useState } from "react";
import { Category } from "../../types/category";

interface CategoriesProps {
  categories: Category[];
  onSelectCategory: (categoryId: string) => Promise<void>;
}

export function Categories({categories, onSelectCategory} : CategoriesProps) {
  const [selectedCategory, setSelectedCategory] = useState('');

  function handleSelectCategory(categoryId: string) {
    const category = selectedCategory === categoryId? '' : categoryId;

    onSelectCategory(category);
    setSelectedCategory(category);
  }

  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={categories}
      contentContainerStyle={{ paddingRight: 24 }}
      keyExtractor={(category) => category._id}
      renderItem={({ item: category }) => {
        const isSelected = selectedCategory === category._id

        return (
          <CategoryContainer onPress={() => handleSelectCategory(category._id)}>
          <Icon>
            <Text opacity={isSelected ? 1 : 0.5}>{category.icon}</Text>
          </Icon>

          <Text size={14} weight="600" opacity={isSelected ? 1 : 0.5}>{category.name}</Text>
        </CategoryContainer>
        )
      }}
    />
  );
}
