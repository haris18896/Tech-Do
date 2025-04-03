import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export {auth, firestore};

export const db = firestore();

export default {auth, firestore};
