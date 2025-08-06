import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
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
} from "react-native";
import { Colors } from "../../../constants/Colors";
import {
  collection,
  addDoc,
  onSnapshot,
  serverTimestamp,
  query,
  orderBy,
  doc,
  getDoc,
} from "firebase/firestore";
import { auth, db } from "../../../firebaseConfig";

export default function GroupChatScreen() {
  const { townshipName } = useLocalSearchParams();
  const router = useRouter();

  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const userRef = doc(db, "Users", user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setUserName(userSnap.data().name || "Loading");
        }
      }
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    if (!townshipName) return;
    const messagesRef = collection(db, "townshipChats", townshipName, "Messages");
    const q = query(messagesRef, orderBy("timestamp", "asc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })));
    });

    return () => unsubscribe();
  }, [townshipName]);

  const handleSend = async () => {
    if (inputText.trim()) {
      const messagesRef = collection(db, "townshipChats", townshipName, "Messages");
      await addDoc(messagesRef, {
        text: inputText,
        sender: auth.currentUser?.uid,
        senderName: userName || "You",
        timestamp: serverTimestamp(),
        profileImage: "https://placehold.co/400",
      });
      setInputText("");
    }
  };

  const renderItem = ({ item }) => (
    <View
      style={[
        styles.messageWrapper,
        item.sender === auth.currentUser?.uid ? styles.userWrapper : styles.otherWrapper,
      ]}
    >
      {item.sender !== auth.currentUser?.uid && (
        <Image source={{ uri: item.profileImage || "https://placehold.co/400" }} style={styles.profileImage} />
      )}
      <View style={{
        flexDirection: "column",
        alignItems: item.sender === auth.currentUser?.uid ? "flex-end" : "flex-start",
        width: "100%",
      }}>
        {item.sender !== auth.currentUser?.uid && (
          <Text style={styles.senderName}>{item.senderName}</Text>
        )}
        <View
          style={[
            styles.messageContainer,
            item.sender === auth.currentUser?.uid ? styles.userMessage : styles.otherMessage,
          ]}
        >
          <View style={styles.messageContent}>
            <Text style={styles.messageText}>{item.text}</Text>
            <Text style={styles.messageTime}>{item.timestamp?.toDate().toLocaleTimeString() || ""}</Text>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
    >
      <FlatList data={messages} renderItem={renderItem} keyExtractor={(item) => item.id} />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Type a message"
        />
        <Button title="Send" onPress={handleSend} color={Colors.primary} />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
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
    maxWidth: "75%",
    borderRadius: 15,
    padding: 12,
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
    borderWidth: 1.5,
  },
  senderName: {
    fontSize: 12,
    fontWeight: "600",
    color: "gray",
    marginBottom: 4,
    alignSelf: "flex-start",
  },
  messageContent: {
    maxWidth: "100%",
  },
  messageText: {
    fontSize: 16,
    color: "#333",
  },
  messageTime: {
    fontSize: 10,
    color: "gray",
    marginTop: 5,
  },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#ECECEC",
    paddingBottom: 20,
    paddingHorizontal: 15,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ECECEC",
    borderRadius: 20,
    paddingHorizontal: 15,
    fontSize: 16,
  },
});
