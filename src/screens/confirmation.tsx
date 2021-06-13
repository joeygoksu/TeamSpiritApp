import { useNavigation } from '@react-navigation/native';
import { Layout, Text, Icon, Input } from '@ui-kitten/components';
import { CognitoUser } from 'amazon-cognito-identity-js';
import { Auth, graphqlOperation, API } from 'aws-amplify';
import * as React from 'react';
import { View, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { createTeam as createTeamGQL } from '../graphql/mutations';
import { logger } from '../helpers/logger';
import { changeAuth } from '../store/actions';

// import Qonversion from 'react-native-qonversion';
import { addTeam as addTeamAction } from '../store/actions/team';
import { currentFont, Theme } from '../theme';

interface ConfirmationProps {
  route: {
    params: {
      inputs: {
        email: string;
      };
      user: CognitoUser;
    };
  };
}

export const ConfirmationScreen: React.FC<ConfirmationProps> = ({
  route: {
    params: {
      inputs: { email },
      user,
    },
  },
}: ConfirmationProps) => {
  const { teamName } = useSelector(
    (state: {
      team: {
        teamName: string;
      };
    }) => ({
      teamName: state.team.teamName,
    }),
    shallowEqual,
  );

  const navigation = useNavigation();

  const dispatch = useDispatch();

  const [code, setcode] = React.useState('');

  const NumberIcon = (props) => <Icon {...props} name="message-square-outline" />;

  const Confirm = async (inputs: { email: string; code: string }) => {
    try {
      await Auth.sendCustomChallengeAnswer(user, inputs.code);

      try {
        await Auth.currentSession();

        const {
          data: { createTeam },
        } = await API.graphql(
          graphqlOperation(createTeamGQL, { input: { name: teamName } }),
        );

        //   CREATE A TEAM on Server
        dispatch(
          addTeamAction({
            hasTeam: true,
            teamName: teamName,
            teamCode: createTeam.id,
          }),
        );

        //   AUTH SUCCESSFULL
        dispatch(
          changeAuth({
            loggedIn: true,
          }),
        );
      } catch (error) {
        logger.log('👀 Confirmation: ', error);
      }
    } catch (error) {
      logger.log('⚠️ LOGGING: ', error);

      dispatch(
        changeAuth({
          loggedIn: false,
        }),
      );
    }
  };

  return (
    <Layout style={styles.mainContainer} key="1">
      <KeyboardAvoidingView style={styles.layout} behavior="padding" key="1">
        <View style={styles.content}>
          <Text style={styles.text} category="h1">
            Confirmation
          </Text>
          <Text style={styles.text} category="p1">
            We need you confirm your email to understand you are not a 🤖
          </Text>
        </View>

        <View style={{ ...styles.content, flexDirection: 'row' }}>
          <Input
            value={code}
            style={{ marginRight: 15 }}
            onChangeText={(nextValue) => setcode(nextValue)}
            autoFocus
            placeholder="Please check your email"
            accessoryLeft={NumberIcon}
          />
        </View>

        <TouchableOpacity
          style={styles.getStartedButton}
          disabled={email.length < 1}
          onPress={() => Confirm({ code, email })}
        >
          <Text style={styles.getStartedText}>Confirm</Text>
        </TouchableOpacity>

        <Text category="c1" style={styles.text}>
          Do you want to cancel?
          <Text
            category="c2"
            style={{ ...styles.text, color: Theme.colors.tomato }}
            onPress={() => navigation.goBack()}
          >
            Go Back
          </Text>
        </Text>
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
