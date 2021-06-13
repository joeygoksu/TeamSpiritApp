import { Platform } from 'react-native';

export const currentFont = (): string => {
  let font = 'Montserrat-Regular';
  if (Platform.OS === 'ios') {
    font = 'Montserrat';
  }
  return font;
};

export const Color = {
  darkBlue: '#00072E',
  white: '#ffffff',
  mustard: '#FFBD12',
  tomato: '#F95A2C',
};

export const Theme = {
  colors: Color,
  Shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 11,
  },
  Position: {
    CenterInside: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
};
