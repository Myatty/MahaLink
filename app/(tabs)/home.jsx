
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/Colors";
import HomScreenHeader from "../screens/HomeScreen/HomeScreenHeader";
import HomeScreenOrganizationList from "../screens/HomeScreen/HomeScreenOrganizationList";
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { auth, db } from "../../firebaseConfig";
import HomeScreenRecord from "../screens/HomeScreen/HomeScreenRecord";
export default function Home() {
  const router = useRouter();
  const [organizationNames, setOrganizationNames] = useState([]);
  const [userName, setUserName] = useState("Loading");

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
            setUserName(userData.name || "Loading");
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, []);

  // fetch all usernames in firestore
  useEffect(() => {
    const fetchOrganizationNames = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Users"));
        const names = querySnapshot.docs.map(
          (doc) => doc.data().name || "Unknown"
        );
        setOrganizationNames(names);
      } catch (error) {
        console.error("Error fetching organization names:", error);
      }
    };
    fetchOrganizationNames();
  }, []);


  return (
    <View style={styles.container}>
      <HomScreenHeader name={userName} />

      <ScrollView>
        <HomeScreenRecord />


        <View style={styles.sectionHeader}>
          <Text style={styles.headerText}>Connect with others</Text>
          <Text
            style={styles.viewAllText}
            onPress={() => router.push("/screens/OrgScreen/OrgListScreen")}
          >
            View all
          </Text>
        </View>

        <View style={{ paddingHorizontal: 15 }}>
          {organizationNames.map(
            (name, index) =>
              name !== userName && (
                <HomeScreenOrganizationList
                  key={index}
                  name={name}
                  teamNumber={5}
                />
              )
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    marginTop: 30,
  },
  sectionHeader: {
    padding: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  headerText: {
    color: Colors.Swan,
    fontWeight: "500",
    fontSize: 18,
  },
  viewAllText: {
    color: Colors.Blue,
    fontWeight: "500",
    textDecorationLine: "underline",
  },
});
