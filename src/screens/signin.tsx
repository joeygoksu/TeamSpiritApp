import { useNavigation } from '@react-navigation/native';
import { Layout, Text, Icon, Input } from '@ui-kitten/components';
import { Auth } from 'aws-amplify';
import * as React from 'react';
import { View, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { logger } from '../helpers/logger';
import { randomstring } from '../helpers/randomString';
import { currentFont, Theme } from '../theme';

interface SignInProps {}

export const SignInScreen: React.FunctionComponent<SignInProps> = () => {
  const [email, setemail] = React.useState('');
  const navigation = useNavigation();

  const EmailIcon = (props) => <Icon {...props} name="email-outline" />;

  const SignIn = async (inputs: { email: string }) => {
    const user_email = inputs.email.trim().toLowerCase();
    logger.log('👀 LOGGING ~ user_email', user_email);

    const params = {
      username: user_email,
      password: randomstring(16),
      attributes: {
        name: '',
      },
    };

    try {
      await Auth.signUp(params);
      const user = await Auth.signIn(user_email);
      logger.log('👀 LOGGING ~ user', user);

      navigation.navigate('Confirmation', {
        inputs,
        user: user,
      });
    } catch (error: any) {
      if (error.code === 'UsernameExistsException') {
        const user = await Auth.signIn(user_email);

        navigation.navigate('Confirmation', {
          inputs,
          user: user,
        });
      }
    }
  };

  return (
    <Layout style={styles.mainContainer} key="1">
      <KeyboardAvoidingView style={styles.layout} behavior="padding" key="1">
        <View style={styles.content}>
          <Text style={styles.text} category="h1">
            Sign In
          </Text>
          <Text style={styles.text} category="p2">
            We will send you an email to get you authenticated
          </Text>
        </View>

        <View style={styles.content}>
          <Input
            value={email}
            label="Email"
            placeholder="Enter your email"
            accessoryLeft={EmailIcon}
            onChangeText={(nextValue) => setemail(nextValue)}
          />
        </View>

        <TouchableOpacity
          style={styles.getStartedButton}
          disabled={email.length < 1}
          onPress={() => SignIn({ email })}
        >
          <Text style={styles.getStartedText}>Sign in</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  layout: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginHorizontal: 30,
  },
  text: {
    marginVertical: 5,
    fontFamily: currentFont(),
  },
  content: {
    alignItems: 'flex-start',
    marginVertical: 7,
  },
  getStartedButton: {
    width: 320,
    height: 60,
    backgroundColor: Theme.colors.mustard,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15,
    // SHADOW
    shadowColor: Theme.Shadow.shadowColor,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 1,
    shadowRadius: 0,

    elevation: 9,
  },
  getStartedText: {
    margin: 2,
    fontFamily: currentFont(),
    color: Theme.colors.white,
    fontSize: 24,
    fontWeight: 'bold',
  },
});
