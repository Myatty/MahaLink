import { Tabs } from "expo-router";
import { Image, Text, View } from "react-native"; 
import { icons } from "../../constants";
import { Colors } from '../../constants/Colors';

const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', gap: 2, height: 48 }}>
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        style={{ width: 24, height: 24 }}
      />
      <Text
        style={{
          color,
          fontSize: 11,
          lineHeight: 13,
          fontFamily: focused ? "Poppins-SemiBold" : "Poppins-Regular",
          marginTop: 2,
          maxWidth: 48,
          textAlign: 'center',
        }}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {name}
      </Text>
    </View>
  );
};
const TabLayout = () => {
  return (

    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primaryGreen,
        headerShown: false,
        tabBarInactiveTintColor: Colors.Swan,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: Colors.tailwind.updatedBg,
          height: 75,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.home}
              color={color}
              name="Home"
              focused={focused}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="map"
        options={{
          title: "Map",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.map}
              color={color}
              name="Map"
              focused={focused}
            />
          ),
        }}
      />


      <Tabs.Screen
        name="chat"
        options={{
          title: "Chat",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.chat}
              color={color}
              name="Chat"
              focused={focused}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.profile_circle}
              color={color}
              name="Profile"
              focused={focused}
            />
          ),
        }}
      />

    </Tabs>

  );
};

export default TabLayout;
