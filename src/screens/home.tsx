/* eslint-disable react-native/no-color-literals, react-native/no-inline-styles, multiline-ternary */

import { useNavigation } from '@react-navigation/native';
import { Layout, Text } from '@ui-kitten/components';
import { Analytics, API, Auth, graphqlOperation } from 'aws-amplify';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  View,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';

import Cry from '../assets/expressions/cry.svg';
import Happy from '../assets/expressions/happy.svg';
import Neutral from '../assets/expressions/neutral.svg';
import TeamSpirit from '../assets/team-spirit.svg';
import { createBoard, createScore } from '../graphql/mutations';
import { getBoard, getTeam, listBoards, listScores } from '../graphql/queries';
import { onCreateScore } from '../graphql/subscriptions';
import { boardChecker } from '../helpers/boardChecker';
import { logger } from '../helpers/logger';
import { averageScore, scoringEngine } from '../helpers/scoring';
import { Theme } from '../theme';

type HomeProps = {
  navigation: any;
};

export const HomeScreen: React.FC<HomeProps> = () => {
  const dispatch = useDispatch();
  const [timeline, setTimeline] = useState(1);
  // const [permissions, setPermissions] = useState({});
  const [teamData, setteamData] = useState({});
  const [boardId, setboardId] = useState('');
  const [date, setdate] = useState('');
  const [isAvailable, setisAvailable] = useState(true);

  const [allScores, setallScores] = useState({});

  const [scoreAverage, setscoreAverage] = useState(0);

  const { teamCode } = useSelector((state: { team: { teamCode: string } }) => ({
    teamCode: state.team.teamCode,
  }));

  const navigation = useNavigation();
  // useEffect(() => {
  //   subscribeUsers();
  // }, []);

  // const subscribeUsers = async () => {
  //   await API.graphql(graphqlOperation(onCreateScore)).subscribe({
  //     next: (scoreData) => console.log(scoreData),
  //     error: (err) => console.log(err),
  //   });
  // };

  useEffect(() => {
    Analytics.record({ name: 'homeOpened' });

    const checkAuth = async () => {
      const session = await Auth.currentSession();
      // logger.log('👀 LOGGING ~ session', session);

      const resp = await API.graphql(
        graphqlOperation(getTeam, {
          id: teamCode,
        }),
      );

      // GET TEAM DATA
      if (resp && resp.data && resp.data.getTeam) {
        setteamData(resp.data.getTeam);
      }

      // logger.log('👀 LOGGING ~ resp', resp);

      // SET DATETIME
      const dateTime = moment().format('MMMM Do YYYY');
      setdate(dateTime);

      // LIST BOARD
      const respBoard = await API.graphql(graphqlOperation(listBoards));
      // logger.log('👀 LOGGING ~ respBoard', respBoard);
      // CHECK BOARD IS EXIST OR NOT
      if (boardChecker(respBoard, teamData.id)[0]) {
        // GET SINGLE BOARD
        const getTheBoard = await API.graphql(
          graphqlOperation(getBoard, {
            id: boardChecker(respBoard, teamData.id)[1],
          }),
        );
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        setboardId(boardChecker(respBoard, teamData.id)[1]!);
        // logger.log('👀 LOGGING ~ getTheBoard', getTheBoard);
      } else {
        // CREATE BOARD
        const createBoardResp = await API.graphql(
          graphqlOperation(createBoard, {
            input: {
              name: dateTime,
              boardTeamId: resp.data.getTeam.id,
            },
          }),
        );
        setboardId(createBoardResp.data.createBoard.id);
        // logger.log('👀 LOGGING ~ createBoardResp', createBoardResp);
      }

      // GET SCORE
      const listScoresResp = await API.graphql(graphqlOperation(listScores));
      // logger.log('👀 LOGGING ~ listScoresResp', listScoresResp);
      const resultScore = averageScore(listScoresResp.data.listScores.items);
      setscoreAverage(Number(resultScore));
    };

    checkAuth();
  }, []);

  const handlePressScore = async (score: number, scoreBoardId: string) => {
    const createScoreResp = await API.graphql(
      graphqlOperation(createScore, {
        input: {
          user_id: 'me@yusufgoksu.com',
          score: score,
          scoreBoardId: scoreBoardId,
        },
      }),
    );
    // logger.log('👀 LOGGING ~ handlePressScore', createScoreResp);

    // GET SCORE
    const listScoresResp = await API.graphql(graphqlOperation(listScores));
    setallScores(listScoresResp.data.listScores.items);
    // logger.log('👀 LOGGING ~ listScoresResp', listScoresResp);
    const resultScore = averageScore(listScoresResp.data.listScores.items);
    setscoreAverage(Number(resultScore));
  };

  return (
    <Layout style={{ flex: 1 }}>
      <SafeAreaView>
        {/* <CustomTopNavigation /> */}

        <View style={{ height: 80 }}>
          <ScrollView
            style={styles.contentContainer}
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            <TouchableOpacity
              style={timeline === 1 ? styles.activeCard : styles.passiveCard}
              onPress={() => setTimeline(1)}
            >
              <Text category="s2">Today</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={timeline === 2 ? styles.activeCard : styles.passiveCard}
              onPress={() => {
                setTimeline(2);
                navigation.navigate('History', {
                  title: 'Today',
                  data: allScores,
                });
              }}
              disabled
            >
              <Text category="s2">Yesterday</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={timeline === 3 ? styles.activeCard : styles.passiveCard}
              onPress={() => {
                setTimeline(3);
                navigation.navigate('History');
              }}
              disabled
            >
              <Text category="s2">Last Week</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={timeline === 4 ? styles.activeCard : styles.passiveCard}
              onPress={() => {
                setTimeline(4);
                navigation.navigate('History');
              }}
              disabled
            >
              <Text category="s2">Last Month</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={timeline === 5 ? styles.activeCard : styles.passiveCard}
              onPress={() => {
                setTimeline(5);
                navigation.navigate('History', {
                  title: 'All Time',
                  data: allScores,
                });
              }}
            >
              <Text category="s2">All Time</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </SafeAreaView>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginVertical: 5,
        }}
      >
        <TeamSpirit height={hp('13%')} />
      </View>

      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginVertical: 5,
        }}
      >
        <Text category="s1">Team Name: {teamData.name}</Text>
        <Text category="s2">{date}</Text>
      </View>

      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginVertical: 5,
        }}
      >
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',

            backgroundColor: scoreAverage > 49 ? '#7BED9F' : Theme.colors.tomato,
            width: 300,
            height: 300,
            borderRadius: 300,

            borderWidth: 5,
          }}
        >
          <Text
            category="h1"
            style={{
              fontSize: 120,
              color: 'white',
              textShadowColor: 'black',
              textShadowOffset: {
                height: 6,
                width: 5,
              },
              textShadowRadius: 0,
            }}
          >
            {scoreAverage}
          </Text>
          <Text
            category="h5"
            style={{
              color: 'black',
            }}
          >
            {scoringEngine(scoreAverage)}
          </Text>
        </View>
      </View>

      <View
        style={{
          marginHorizontal: 10,

          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}
      >
        {isAvailable ? (
          <TouchableOpacity
            style={{ ...styles.simpleCard, backgroundColor: Theme.colors.white }}
            disabled
          >
            <Text category="h5">Voting Available</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{ ...styles.simpleCard, backgroundColor: Theme.colors.tomato }}
            disabled
          >
            <Text category="h5">Voting Not Available</Text>
          </TouchableOpacity>
        )}
      </View>

      <View
        style={{
          marginHorizontal: 10,
          marginVertical: 10,

          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}
      >
        <TouchableOpacity
          style={[styles.voteCard, { backgroundColor: '#FF4E4E' }]}
          disabled={!isAvailable}
          onPress={() => handlePressScore(10, boardId)}
        >
          <Cry height={hp('5%')} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.voteCard, { backgroundColor: '#E2FCFF' }]}
          disabled={!isAvailable}
          onPress={() => handlePressScore(50, boardId)}
        >
          <Neutral height={hp('5%')} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.voteCard, { backgroundColor: '#00FF85' }]}
          disabled={!isAvailable}
          onPress={() => handlePressScore(95, boardId)}
        >
          <Happy height={hp('5%')} />
        </TouchableOpacity>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingVertical: 5,
    marginHorizontal: 10,
  },
  activeCard: {
    backgroundColor: '#7BED9F',

    width: wp('20%'),
    height: hp('5%'),

    marginHorizontal: 5,
    borderRadius: 6,

    borderColor: '#000000',
    borderWidth: 3,

    padding: 5,
    marginVertical: 10,

    // SHADOW
    shadowColor: '#000000',
    shadowOffset: {
      width: 2,
      height: 3,
    },
    shadowOpacity: 1,
    shadowRadius: 0,

    elevation: 9,

    // Inside Position
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  passiveCard: {
    backgroundColor: 'white',

    width: wp('20%'),
    height: hp('5%'),

    marginHorizontal: 5,
    borderRadius: 6,

    borderColor: '#000000',
    borderWidth: 3,

    padding: 5,
    marginVertical: 10,

    // SHADOW
    shadowColor: '#000000',
    shadowOffset: {
      width: 2,
      height: 3,
    },
    shadowOpacity: 1,
    shadowRadius: 0,

    elevation: 9,

    // Inside Position
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  simpleCard: {
    backgroundColor: 'white',
    width: wp('92%'),
    height: hp('10%'),
    borderRadius: 16,

    borderColor: '#000000',
    borderWidth: 3,

    padding: 5,
    marginVertical: 10,

    // SHADOW
    shadowColor: '#000000',
    shadowOffset: {
      width: 2,
      height: 3,
    },
    shadowOpacity: 1,
    shadowRadius: 0,

    elevation: 9,

    // Inside Position
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  voteCard: {
    backgroundColor: 'white',
    width: wp('29%'),
    height: hp('10%'),
    borderRadius: 16,

    borderColor: '#000000',
    borderWidth: 3,

    padding: 5,

    // SHADOW
    shadowColor: '#000000',
    shadowOffset: {
      width: 2,
      height: 3,
    },
    shadowOpacity: 1,
    shadowRadius: 0,

    elevation: 9,

    // Inside Position
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});
