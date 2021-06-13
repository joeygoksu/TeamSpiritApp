import { Layout, Text, ListItem, List } from '@ui-kitten/components';
import moment from 'moment';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import { CustomTopNavigation } from '../components/topNavigation';
import { Theme } from '../theme';

interface HistoryProps {}

export const HistoryScreen: React.FC = (props) => {
  console.log('👀 LOGGING ~ file: history.tsx ~ line 14 ~ props', props);
  const renderItem = ({ item, index }) => (
    <ListItem
      title={`${index + 1} - ${moment(item.createdAt).format('MMMM Do YYYY')} - Score:  ${
        item.score
      } `}
    />
  );

  return (
    <Layout style={styles.container} key="1">
      <CustomTopNavigation title={props.route.params.title} />
      <List
        style={styles.listContainer}
        data={props.route.params.data}
        renderItem={renderItem}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, marginTop: 50, backgroundColor: Theme.colors.white },
  listContainer: {
    maxHeight: 1000,
  },
});
