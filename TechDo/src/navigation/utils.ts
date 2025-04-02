import React from 'react';
import {CommonActions, NavigationContainerRef} from '@react-navigation/native';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends Record<string, object | undefined> {}
  }
}

type RootParamList = ReactNavigation.RootParamList;

let navigatorRef: NavigationContainerRef<RootParamList> | null = null;

export function setTopLevelNavigator(
  ref: NavigationContainerRef<RootParamList> | null,
): void {
  navigatorRef = ref;
}

export function navigateTo(page: string): void {
  if (navigatorRef) {
    navigatorRef.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: page}],
      }),
    );
  }
}

export const navigationRef =
  React.createRef<NavigationContainerRef<RootParamList>>();

export function navigate<RouteName extends keyof RootParamList>(
  name: RouteName,
  params?: Partial<RootParamList[RouteName]>,
): void {
  if (navigationRef.current) {
    navigationRef.current.navigate(name as string, params);
  }
}
