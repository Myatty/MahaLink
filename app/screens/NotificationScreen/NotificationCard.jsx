import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../../constants/Colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

function NotificationCard({ type, content, timestamp, sender, onDelete }) {
  return (
    <View style={styles.card}>

      {/* notification type  */}
      <Text style={styles.title}>
        {type === 'message' ? 'Message' : 'System'}
      </Text>

      {/* who send  */}
      {type === 'message' && sender && (
        <Text style={styles.sender}>From: {sender}</Text>
      )}

      {/* timestamp  */}
      <View style={styles.contentContainer}>
        <Text>{content}</Text>
        {timestamp && (
          <Text style={styles.timestamp}>
            {moment(timestamp).fromNow()}
          </Text>
        )}
      </View>

      {/* delete msg button  */}
      <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
        <Text style={{ color: Colors.LightRed, fontWeight: 'bold' }}>
          <FontAwesome name="trash" size={18} style={{ marginRight: 15 }} />  Remove
        </Text>
      </TouchableOpacity>
    </View>
  );
}

NotificationCard.propTypes = {
  type: PropTypes.oneOf(['message', 'system']).isRequired,
  content: PropTypes.string.isRequired,
  timestamp: PropTypes.string,
  sender: PropTypes.string,
  onDelete: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  card: {
    padding: 10,
    backgroundColor: Colors.white,
    borderRadius: 5,
    margin: 5,
    position: 'relative',
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sender: {
    fontStyle: 'italic',
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },
  timestamp: {
    fontSize: 10,
    color: '#888',
    marginTop: 10,
  },
  deleteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    paddingVertical: 4,
    paddingHorizontal: 10,
    // backgroundColor: Colors.LightRed,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 12,
  },
});

export default NotificationCard;