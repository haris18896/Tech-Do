import {Dimensions, PixelRatio, Platform} from 'react-native';

const scrWidth: number = Dimensions.get('window').width;
const scrHeight: number = Dimensions.get('window').height;

const widthPercentageToDP = (widthPercent: number | string): number => {
  const elemWidth = parseFloat(widthPercent.toString());
  if (scrWidth > 600) {
    return PixelRatio.roundToNearestPixel((scrWidth * elemWidth) / 150);
  } else {
    return PixelRatio.roundToNearestPixel((scrWidth * elemWidth) / 100);
  }
};

const heightPercentageToDP = (heightPercent: number | string): number => {
  const elemHeight = parseFloat(heightPercent.toString());
  if (scrWidth > 600) {
    return PixelRatio.roundToNearestPixel((scrHeight * elemHeight) / 150);
  } else {
    return PixelRatio.roundToNearestPixel((scrHeight * elemHeight) / 100);
  }
};

const platformOrientedCode = <T>(androidVal: T, iOSVal: T): T =>
  Platform.select<T>({android: androidVal, ios: iOSVal}) as T;

export {
  scrWidth,
  scrHeight,
  platformOrientedCode,
  widthPercentageToDP as WP,
  heightPercentageToDP as HP,
};
