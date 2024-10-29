import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  Button,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
  ActivityIndicator,
} from "react-native";
import { Colors } from "../../../constants/Colors";
import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  serverTimestamp,
  query,
  orderBy,
  doc,
  getDoc,
  where,
  getDocs,
} from "firebase/firestore";
import { auth } from "../../../firebaseConfig";

const db = getFirestore();

export default function GroupChatScreen() {
  const navigation = useNavigation();
  const [userName, setUserName] = useState("Loading");
  const [townshipChats, setTownshipChats] = useState([]);
  const [selectedTownship, setSelectedTownship] = useState("");
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(true);

  // go back
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Group Chats",
      headerLeft: () => (
        <Button title="Back" onPress={() => navigation.goBack()} />
      ),
    });
  }, [navigation]);

  // Fetch user data and set userName
  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const userRef = doc(db, "Users", user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const userData = userSnap.data();
          setUserName(userData.name || "Loading");
          fetchUserTownships(userData.name);
          console.log('fetch ser : ',userData.name);     
        }
      }
    };
    fetchUserData();
  }, []);
  const fetchUserTownships = async (userName) => {
    console.log('Fetching townships for user:', userName); // Log the username
  
    try {
      const markersQuery = query(
        collection(db, "Markers"),
        where("pinnedBy", "==", userName)
      );
  
      // Fetch documents with getDocs, not getDoc
      const querySnapshot = await getDocs(markersQuery);
      if (querySnapshot.empty) {
        console.log("No matching documents found.");
      } else {
        const townships = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          console.log("Document data:", data); // Log data to verify it contains expected fields
  
          // Existing logic to add townships if the field is found
          if (data.township && !townships.includes(data.township)) {
            townships.push(data.township);
          }
        });
  
        console.log("Final list of townships:", townships); // Log the final list
        setTownshipChats(townships);
        if (townships.length > 0) setSelectedTownship(townships[0]);
      }
    } catch (error) {
      console.error("Error fetching townships:", error);
    }
  };
  

  // Fetch and listen to messages in real-time from selected township group
  useEffect(() => {
    if (selectedTownship) {
      const messagesRef = collection(
        db,
        `townshipChats/${selectedTownship}/messages`
      );
      const messagesQuery = query(messagesRef, orderBy("timestamp", "asc"));

      const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
        const loadedMessages = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMessages(loadedMessages);
      });

      return unsubscribe;
    }
  }, [selectedTownship]);

  const handleSend = async () => {
    const text = inputText;
    setInputText("");
    if (text.trim() && selectedTownship) {
      try {
        await addDoc(
          collection(db, `townshipChats/${selectedTownship}/messages`),
          {
            message: text,
            sentBy: userName,
            timestamp: serverTimestamp(),
          }
        );
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  const renderItem = ({ item }) => (
    <View
      style={[
        styles.messageWrapper,
        item.sentBy === userName ? styles.userWrapper : styles.otherWrapper,
      ]}
    >
      {item.sentBy !== userName && (
        <Image
          source={{ uri: item.profileImage || "https://placehold.co/400" }}
          style={styles.profileImage}
        />
      )}
      <View
        style={{
          flexDirection: "column",
          alignItems: item.sentBy === userName ? "flex-end" : "flex-start",
          width: "100%",
        }}
      >
        {item.sentBy !== userName && (
          <Text style={styles.senderName}>{item.sentBy}</Text>
        )}
        <View
          style={[
            styles.messageContainer,
            item.sentBy === userName ? styles.userMessage : styles.otherMessage,
          ]}
        >
          <Text style={styles.messageText}>{item.message}</Text>
          <Text style={styles.messageTime}>
            {item.timestamp?.toDate().toLocaleTimeString() || ""}
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={80}
    >
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      ) : (
        <>
          <FlatList
            data={townshipChats}
            horizontal
            renderItem={({ item }) => (
              <Button
                title={item}
                onPress={() => setSelectedTownship(item)}
                color={item === selectedTownship ? Colors.primary : "gray"}
              />
            )}
            keyExtractor={(item) => item}
            contentContainerStyle={styles.chatTabsContainer}
          />
          <FlatList
            data={messages}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.chatContainer}
          />
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={inputText}
              onChangeText={setInputText}
              placeholder={`Type a message to ${selectedTownship}`}
            />
            <Button title="Send" onPress={handleSend} color={Colors.primary} />
          </View>
        </>
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  messageWrapper: {
    flexDirection: "row",
    padding: 10,
  },
  userWrapper: {
    justifyContent: "flex-end",
  },
  otherWrapper: {
    justifyContent: "flex-start",
  },
  messageContainer: {
    maxWidth: "70%",
    borderRadius: 10,
    padding: 10,
  },
  userMessage: {
    backgroundColor: "#DCF8C6",
    alignSelf: "flex-end",
  },
  otherMessage: {
    backgroundColor: "#ECECEC",
    alignSelf: "flex-start",
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
    fontWeight: "500",
    marginBottom: 5,
  },
  messageContent: {
    maxWidth: "100%",
  },
  messageText: {
    fontSize: 16,
  },
  messageTime: {
    fontSize: 12,
    color: "gray",
    marginTop: 5,
  },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#ECECEC",
    paddingBottom: 30,
    paddingHorizontal: 15,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ECECEC",
    borderRadius: 20,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  chatContainer: {
    paddingBottom: 10,
  },
});
