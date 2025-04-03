declare module 'react-native-vector-icons/MaterialCommunityIcons' {
  import { Component } from 'react';
  import { ImageSourcePropType, TextProps } from 'react-native';

  interface IconProps extends TextProps {
    size?: number;
    name: string;
    color?: string;
  }

  export default class Icon extends Component<IconProps> {
    static getImageSource(
      name: string,
      size?: number,
      color?: string
    ): Promise<ImageSourcePropType>;
  }
}
