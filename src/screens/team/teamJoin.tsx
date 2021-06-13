import { Layout, Text, Icon, Input } from '@ui-kitten/components';
import * as React from 'react';
import { View, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { useDispatch } from 'react-redux';
import { logger } from '../../helpers/logger';
import { addTeam } from '../../store/actions/team';
import { currentFont, Theme } from '../../theme';

interface TeamJoinProps {}

export const TeamJoinScreen = () => {
  const dispatch = useDispatch();

  const [teamName, setteamName] = React.useState('');

  const TeamIcon = (props) => <Icon {...props} name="people-outline" />;

  const JoinOrCreate = async (inputs: { teamName: string }) => {
    const team_name = inputs.teamName.trim();

    try {
      dispatch(
        addTeam({
          hasTeam: true,
          teamName: team_name,
        }),
      );
    } catch (error) {
      dispatch(
        addTeam({
          hasTeam: false,
        }),
      );
      logger.log('error add team up:', error);
      //   if (error.code === 'UserNotConfirmedException') {
      //     navigation.navigate('Confirmation', {
      //       inputs,
      //     });
      //   }
    }
  };

  return (
    <Layout style={styles.mainContainer} key="1">
      <KeyboardAvoidingView style={styles.layout} behavior="padding" key="1">
        <View style={styles.content}>
          <Text style={styles.text} category="h1">
            Team Name 🧙‍♂️
          </Text>
          <Text style={styles.text} category="p1">
            Create a team
          </Text>
        </View>

        <View style={styles.content}>
          <Input
            value={teamName}
            placeholder="Enter team name"
            accessoryLeft={TeamIcon}
            onChangeText={(nextValue) => setteamName(nextValue)}
          />
        </View>

        <TouchableOpacity
          style={styles.getStartedButton}
          disabled={teamName.length < 1}
          onPress={() => JoinOrCreate({ teamName })}
        >
          <Text style={styles.getStartedText}>JOIN</Text>
        </TouchableOpacity>

        <Text category="c1" style={styles.text}>
          or Do you have an invitation for a team?{' '}
          <Text category="c2" style={{ ...styles.text, color: Theme.colors.tomato }}>
            Go Here
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
    width: 360,
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
