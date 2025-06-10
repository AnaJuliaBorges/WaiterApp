import styled from "styled-components/native";
import { StatusBar } from 'react-native'
import { isAndroid } from "../utils/isAndroid";

export const Container = styled.SafeAreaView`
  margin-top: ${isAndroid ? StatusBar.currentHeight : 0}px;
  flex: 1;
  background-color: #fafafa;
`;

export const CategoriesContainer = styled.View`
  height: 73px;
  margin-top: 36px;
`;

export const MenuContainer = styled.View`
  flex: 1;
`;

export const Footer = styled.View`
  min-height: 110px;
  background-color: #fff;
`;

export const FooterContainer = styled.SafeAreaView`
  padding: 16px 24px;
`;

export const CenteredContainer = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
`;
