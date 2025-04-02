export {default as Chat} from './svgs/chat.svg';
export {default as Bell} from './svgs/bell.svg';
export {default as BarIcon} from './svgs/bar.svg';
export {default as UserIcon} from './svgs/user.svg';
export {default as LogoutIcon} from './svgs/logout.svg';
export {default as UserActiveIcon} from './svgs/userActive.svg';
export {default as ChevronLeft} from './svgs/chevron-left.svg';

// ** PNGS
interface AppImages {
  logo: any;
  userPlaceHolder: any;
}

export const appImages: AppImages = {
  logo: require('./images/logo.png'),
  userPlaceHolder: require('./images/profilePlaceholderWhite.png'),
};

interface AppLottie {
  loading: any;
  dataNotFound: any;
}

export const appLottie: AppLottie = {
  loading: require('./lottie/loading-spinner.json'),
  dataNotFound: require('./lottie/no-data-found.json'),
};
