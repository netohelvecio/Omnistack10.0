import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const DevAvatar = styled.Image`
  width: 48px;
  height: 48px;
  border-radius: 4px;
  border-width: 4px;
  border-color: #7159c1;
`;

export const Container = styled.View`
  width: 260px;
`;

export const Name = styled.Text`
  font-weight: bold;
  font-size: 16px;
  color: #333;
`;

export const Bio = styled.Text`
  color: #666;
  margin-top: 3px;
`;

export const Techs = styled.Text`
  margin-top: 3px;
  color: #aaa;
`;

export const Form = styled.View`
  position: absolute;
  bottom: 20;
  left: 20;
  right: 20;
  z-index: 5;
  flex-direction: row;
`;

export const Input = styled.TextInput.attrs({
  placeholderTextColor: '#999',
})`
  flex: 1;
  height: 50px;
  background: #fff;
  color: #333;
  border-radius: 25px;
  padding: 0 20px;
  font-size: 16px;
  shadow-color: #000;
  shadow-offset: {width: 4, height: 4};
  shadow-opacity: 0.2;
  elevation: 1;
`;

export const SubmitButton = styled(RectButton)`
  width: 50px;
  height: 50px;
  background: #7159c1;
  border-radius: 25px;
  justify-content: center;
  align-items: center;
  margin-left: 15px;
`;
