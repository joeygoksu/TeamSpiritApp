/* eslint multiline-ternary: ["off"] */
import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Auth } from 'aws-amplify';
import React, { useEffect } from 'react';
import RNBootSplash from 'react-native-bootsplash';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import { logger } from './helpers/logger';
import {
  OnboardingScreen,
  Onboarding2Screen,
  HomeScreen,
  AboutScreen,
  GetStartedScreen,
} from './screens';

import { ConfirmationScreen } from './screens/confirmation';
import { HistoryScreen } from './screens/history';
import { SignInScreen } from './screens/signin';
import { TeamJoinScreen } from './screens/team';
import { logoutUser } from './store/actions';
import { iSuperOnboard } from './store/reducers';

const { Navigator, Screen } = createStackNavigator();

const Navigation = () => {
  const dispatch = useDispatch();

  const { loggedIn, hasOnboarded, hasTeam } = useSelector(
    (state: {
      auth: {
        loggedIn: boolean;
      };
      onboard: {
        hasOnboarded: boolean;
      };
      team: {
        hasTeam: boolean;
      };
    }) => ({
      loggedIn: state.auth.loggedIn,
      hasOnboarded: state.onboard.hasOnboarded,
      hasTeam: state.team.hasTeam,
    }),
    shallowEqual,
  );

  useEffect(() => {
    const init = async () => {
      try {
        await Auth.currentAuthenticatedUser({
          bypassCache: true,
        });
        RNBootSplash.show({ fade: true });
      } catch (error) {
        dispatch(logoutUser());
      }
    };

    init().finally(async () => {
      await RNBootSplash.hide({ fade: true });
      logger.log('Bootsplash has been hidden successfully');
    });
  }, []);

  const MainNavigator = () => (
    <Navigator headerMode="none">
      <Screen name="Home" component={HomeScreen} />
      <Screen name="About" component={AboutScreen} />
      <Screen name="History" component={HistoryScreen} />
    </Navigator>
  );

  const AuthNavigator = () => (
    <Navigator headerMode="none">
      <Screen name="Signin" component={SignInScreen} />
      <Screen name="Confirmation" component={ConfirmationScreen} />
    </Navigator>
  );

  const TeamNavigator = () => (
    <Navigator headerMode="none">
      <Screen name="TeamJoin" component={TeamJoinScreen} />
    </Navigator>
  );

  const forFade = ({ current }) => ({
    cardStyle: {
      opacity: current.progress,
    },
  });

  const OnboardingNavigator = () => (
    <Navigator
      headerMode="none"
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: forFade,
      }}
    >
      <Screen name="Onboarding" component={OnboardingScreen} />
      <Screen name="Onboarding2" component={Onboarding2Screen} />
      <Screen name="GetStarted" component={GetStartedScreen} />
    </Navigator>
  );

  return (
    <NavigationContainer>
      {hasOnboarded ? (
        hasTeam ? (
          loggedIn ? (
            <MainNavigator />
          ) : (
            <AuthNavigator />
          )
        ) : (
          <TeamNavigator />
        )
      ) : (
        <OnboardingNavigator />
      )}
    </NavigationContainer>
  );
};

export default Navigation;
