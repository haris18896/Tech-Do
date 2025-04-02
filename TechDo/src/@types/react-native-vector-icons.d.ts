declare module 'react-native-vector-icons/MaterialCommunityIcons' {
  import { Component } from 'react';
  import { ImageSourcePropType, TextProps } from 'react-native';

  interface IconProps extends TextProps {
    /**
     * Size of the icon, can also be passed as fontSize in the style object.
     */
    size?: number;

    /**
     * Name of the icon to show
     */
    name: string;

    /**
     * Color of the icon
     */
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