// import { Tabs } from "expo-router";
// import React from "react";

// import { TabBarIcon } from "@/components/navigation/TabBarIcon";
// import { Colors } from "@/constants/Colors";
// import { useColorScheme } from "@/hooks/useColorScheme";

// export default function TabLayout() {
//   const colorScheme = useColorScheme();

//   return (
//     <Tabs
//       screenOptions={{
//         tabBarActiveTintColor: "#63519f",
//         headerShown: false,
//       }}
//     >
//       <Tabs.Screen
//         name="index"
//         options={{
//           title: "Home",
//           tabBarIcon: ({ color, focused }) => (
//             <TabBarIcon
//               name={focused ? "home" : "home-outline"}
//               color={color}
//             />
//           ),
//         }}
//       />
//       <Tabs.Screen
//         name="search"
//         options={{
//           title: "Search",
//           tabBarIcon: ({ color, focused }) => (
//             <TabBarIcon
//               name={focused ? "search-outline" : "search"}
//               color={color}
//             />
//           ),
//         }}
//       />
//       <Tabs.Screen
//         name="addpost"
//         options={{
//           title: "Add",
//           tabBarIcon: ({ color, focused }) => (
//             <TabBarIcon name={focused ? "add-outline" : "add"} color={color} />
//           ),
//         }}
//       />
//       <Tabs.Screen
//         name="profile"
//         options={{
//           title: "Profile",
//           tabBarIcon: ({ color, focused }) => (
//             <TabBarIcon
//               name={focused ? "person" : "person-outline"}
//               color={color}
//             />
//           ),
//         }}
//       />
//       <Tabs.Screen
//         name="settings"
//         options={{
//           title: "Settings",
//           tabBarIcon: ({ color, focused }) => (
//             <TabBarIcon
//               name={focused ? "settings" : "settings-outline"}
//               color={color}
//             />
//           ),
//         }}
//       />
//     </Tabs>
//   );
// }

import { Tabs } from "expo-router";
import React from "react";
import { useTheme } from "react-native-paper";
import { Platform } from "react-native";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const theme = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.onSurfaceVariant,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.outlineVariant,
          elevation: 8,
          shadowColor: theme.dark ? "transparent" : "#000",
          shadowOpacity: 0.1,
          shadowRadius: 4,
          shadowOffset: { width: 0, height: -2 },
          height: Platform.OS === "ios" ? 90 : 65,
          paddingBottom: Platform.OS === "ios" ? 30 : 10,
          paddingTop: 5,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "500",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "home" : "home-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "search" : "search-outline"} // Fixed the reversed logic
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="addpost"
        options={{
          title: "Add",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "add-circle" : "add-circle-outline"} // Changed to a better icon
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "person" : "person-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "settings" : "settings-outline"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
