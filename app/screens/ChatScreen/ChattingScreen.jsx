import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Button, FlatList, Image, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, View, ActivityIndicator } from 'react-native';
import { Colors } from '../../../constants/Colors';
import { getFirestore, collection, addDoc, onSnapshot, serverTimestamp, query, orderBy, doc, getDoc, getDocs } from 'firebase/firestore';
import { auth } from '../../../firebaseConfig';

const db = getFirestore();
const messagesRef = collection(db, 'globalChats');

export default function ChattingScreen() {
  const navigation = useNavigation();
  const [userName, setUserName] = useState('Loading');
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(true);
  const [showLoadingIndicator, setShowLoadingIndicator] = useState(false); 

  // Fetch user data from Firestore
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const userRef = doc(db, "Users", user.uid);
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) {
            const userData = userSnap.data();
            setUserName(userData.name || 'Loading');
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, []);

  // screen title
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Global Chats',
      headerLeft: () => (
        <Button title="Back" onPress={() => navigation.goBack()} />
      ),
    });
  }, [navigation]);

  // Fetch and listen to messages in real-time from Firestore
  useEffect(() => {
    const messagesQuery = query(messagesRef, orderBy('timestamp', 'asc'));

    const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
      const loadedMessages = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(loadedMessages);
      setShowLoadingIndicator(true); 
      setTimeout(() => {
        setLoading(false); 
        setShowLoadingIndicator(false); 
      }, 3500);
    });

    return unsubscribe; 
  }, []);

  // store msg in firestore
  const handleSend = async () => {
    const text = inputText;
    setInputText('');
    if (text.trim()) {
      try {
        await addDoc(messagesRef, {
          message: text,
          sentBy: userName,
          timestamp: serverTimestamp(),
        });
        setInputText('');
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  const renderItem = ({ item }) => (
    <View style={[styles.messageWrapper, item.sentBy === userName ? styles.userWrapper : styles.otherWrapper]}>
      {item.sentBy !== userName && (
        <Image source={{ uri: item.profileImage || 'https://placehold.co/400' }} style={styles.profileImage} />
      )}
      <View style={{ flexDirection: 'column', alignItems: item.sentBy === userName ? 'flex-end' : 'flex-start', width: '100%' }}>
        {item.sentBy !== userName && (
          <Text style={styles.senderName}>{item.sentBy}</Text>
        )}
        <View style={[styles.messageContainer, item.sentBy === userName ? styles.userMessage : styles.otherMessage]}>
          <View style={styles.messageContent}>
            <Text style={styles.messageText}>{item.message}</Text>
            <Text style={styles.messageTime}>{item.timestamp?.toDate().toLocaleTimeString() || ''}</Text>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={80}
    >
      
      {loading ? ( 
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      ) :  (
        <FlatList
          data={messages}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.chatContainer}
        />
      )}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Type a message"
          onFocus={() => setLoading(false)}
        />
        <Button
          title="Send"
          onPress={handleSend}
          color={Colors.primary}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageWrapper: {
    flexDirection: 'row',
    padding: 10,
  },
  userWrapper: {
    justifyContent: 'flex-end',
  },
  otherWrapper: {
    justifyContent: 'flex-start',
  },
  messageContainer: {
    maxWidth: '70%',  
    borderRadius: 10,
    padding: 10,
  },
  userMessage: {
    backgroundColor: '#DCF8C6',
    alignSelf: 'flex-end',
  },
  otherMessage: {
    backgroundColor: '#ECECEC',
    alignSelf: 'flex-start',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    borderColor: Colors.primary,
    borderWidth: 2,
  },
  senderName: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 5,
  },
  messageContent: {
    maxWidth: '100%',
  },
  messageText: {
    fontSize: 16,
  },
  messageTime: {
    fontSize: 12,
    color: 'gray',
    marginTop: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ECECEC',
    paddingBottom: 30, 
    paddingHorizontal: 15, 
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ECECEC',
    borderRadius: 20,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  chatContainer: {
    paddingBottom: 10, 
  },
});
