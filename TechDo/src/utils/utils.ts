import {Platform} from 'react-native';

// ** Third Party Packages
import Toast from 'react-native-toast-message';

// ** Custom Packages
import {theme as AppTheme} from '../@core/infrustructure/theme';

export const isTablet = AppTheme?.scrWidth > 500;

// Type guard to check if an object is empty
export const isObjEmpty = (obj: Record<string, any>): boolean =>
  Object.keys(obj).length === 0;

// Define toast options interface
interface ToastOptions {
  title?: string;
  message?: string | any;
  type?: 'success' | 'error' | 'info' | 'warning';
}

// Show a toast message
export const showToast = ({
  title = 'Title',
  message = 'Message',
  type = 'success',
}: ToastOptions): void => {
  Toast.show({
    type: type,
    text1: title,
    text2: message,
    topOffset: Platform.OS === 'ios' ? AppTheme.WP(15) : AppTheme.WP(10),
    // @ts-ignore - React Native Toast Message does support customText
    customText: {
      text1: {
        fontSize: AppTheme.WP(5),
        fontFamily: AppTheme.fonts.semiBold,
        fontWeight: AppTheme.fontWeights.semiBold,
      },
      text2: {
        fontSize: AppTheme.WP(3.5),
        fontFamily: AppTheme.fonts?.medium,
        fontWeight: AppTheme.fontWeights.medium,
      },
    },
  });
};

export const lightenColor = (hex: string, percent: number): string => {
  // Convert hex to RGB
  let r = parseInt(hex.slice(1, 3), 16);
  let g = parseInt(hex.slice(3, 5), 16);
  let b = parseInt(hex.slice(5, 7), 16);

  // Lighten each color channel
  r = Math.min(255, Math.floor(r + (255 - r) * percent));
  g = Math.min(255, Math.floor(g + (255 - g) * percent));
  b = Math.min(255, Math.floor(b + (255 - b) * percent));

  // Convert back to hex
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
};
