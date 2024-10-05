import React, { useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Alert,
  SafeAreaView,
} from "react-native";
import {
  List,
  Switch,
  Button,
  Divider,
  Text,
  useTheme,
  Avatar,
  RadioButton,
  Dialog,
  Portal,
  TextInput,
} from "react-native-paper";

type DialogNames = "privacy" | "password" | "language";

type DialogState = {
  [key in DialogNames]: boolean;
};

const SettingsPage = () => {
  const theme = useTheme();
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState("English");
  const [accountPrivacy, setAccountPrivacy] = useState("public");
  const [dialogState, setDialogState] = useState({
    privacy: false,
    password: false,
    language: false,
  });
  const [newPassword, setNewPassword] = useState("");

  const handleSignOut = () => {
    Alert.alert("Sign Out", "Are you sure you want to sign out?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Sign Out",
        onPress: () => console.log("User signed out"),
        style: "destructive",
      },
    ]);
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete your account? This action cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => console.log("Account deleted"),
          style: "destructive",
        },
      ]
    );
  };

  const toggleDialog = (dialogName: DialogNames) => {
    setDialogState((prev) => ({ ...prev, [dialogName]: !prev[dialogName] }));
  };

  const PrivacyDialog = () => (
    <Dialog
      visible={dialogState.privacy}
      onDismiss={() => toggleDialog("privacy")}
    >
      <Dialog.Title>Account Privacy</Dialog.Title>
      <Dialog.Content>
        <RadioButton.Group
          onValueChange={(value) => setAccountPrivacy(value)}
          value={accountPrivacy}
        >
          <RadioButton.Item label="Public" value="public" />
          <RadioButton.Item label="Private" value="private" />
        </RadioButton.Group>
      </Dialog.Content>
      <Dialog.Actions>
        <Button onPress={() => toggleDialog("privacy")}>Done</Button>
      </Dialog.Actions>
    </Dialog>
  );

  const PasswordDialog = () => (
    <Dialog
      visible={dialogState.password}
      onDismiss={() => toggleDialog("password")}
    >
      <Dialog.Title>Change Password</Dialog.Title>
      <Dialog.Content>
        <TextInput
          label="New Password"
          value={newPassword}
          onChangeText={setNewPassword}
          secureTextEntry
        />
      </Dialog.Content>
      <Dialog.Actions>
        <Button onPress={() => toggleDialog("password")}>Cancel</Button>
        <Button
          onPress={() => {
            console.log("Password changed to:", newPassword);
            setNewPassword("");
            toggleDialog("password");
          }}
        >
          Change
        </Button>
      </Dialog.Actions>
    </Dialog>
  );

  const LanguageDialog = () => (
    <Dialog
      visible={dialogState.language}
      onDismiss={() => toggleDialog("language")}
    >
      <Dialog.Title>Select Language</Dialog.Title>
      <Dialog.Content>
        <RadioButton.Group
          onValueChange={(value) => setLanguage(value)}
          value={language}
        >
          <RadioButton.Item label="English" value="English" />
          <RadioButton.Item label="Spanish" value="Spanish" />
          <RadioButton.Item label="French" value="French" />
        </RadioButton.Group>
      </Dialog.Content>
      <Dialog.Actions>
        <Button onPress={() => toggleDialog("language")}>Done</Button>
      </Dialog.Actions>
    </Dialog>
  );

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <ScrollView style={styles.scrollView}>
        <List.Section>
          <List.Subheader>Account</List.Subheader>
          <List.Item
            title="John Doe"
            description="john.doe@example.com"
            left={() => (
              <Avatar.Image
                size={40}
                source={{ uri: "https://example.com/profile.jpg" }}
              />
            )}
          />
          <List.Item
            title="Change Password"
            left={() => <List.Icon icon="lock" />}
            onPress={() => toggleDialog("password")}
          />
          <List.Item
            title="Privacy"
            description={accountPrivacy}
            left={() => <List.Icon icon="shield-account" />}
            onPress={() => toggleDialog("privacy")}
          />
        </List.Section>

        <Divider />

        <List.Section>
          <List.Subheader>Preferences</List.Subheader>
          <List.Item
            title="Notifications"
            left={() => <List.Icon icon="bell" />}
            right={() => (
              <Switch value={notifications} onValueChange={setNotifications} />
            )}
          />
          <List.Item
            title="Language"
            description={language}
            left={() => <List.Icon icon="translate" />}
            onPress={() => toggleDialog("language")}
          />
        </List.Section>

        <Divider />

        <List.Section>
          <List.Subheader>Support</List.Subheader>
          <List.Item
            title="Help Center"
            left={() => <List.Icon icon="help-circle" />}
            onPress={() => console.log("Open Help Center")}
          />
          <List.Item
            title="Report a Problem"
            left={() => <List.Icon icon="alert-circle" />}
            onPress={() => console.log("Open Problem Reporting")}
          />
        </List.Section>

        <Divider />

        <List.Section>
          <List.Subheader>About</List.Subheader>
          <List.Item
            title="Terms of Service"
            left={() => <List.Icon icon="file-document" />}
            onPress={() => console.log("Open Terms of Service")}
          />
          <List.Item
            title="Privacy Policy"
            left={() => <List.Icon icon="shield-check" />}
            onPress={() => console.log("Open Privacy Policy")}
          />
          <List.Item
            title="App Version"
            description="1.0.0"
            left={() => <List.Icon icon="information" />}
          />
        </List.Section>

        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            icon="logout"
            onPress={handleSignOut}
            style={styles.signOutButton}
          >
            Sign Out
          </Button>
          <Button
            mode="outlined"
            icon="delete"
            onPress={handleDeleteAccount}
            style={styles.deleteButton}
          >
            Delete Account
          </Button>
        </View>
      </ScrollView>

      <Portal>
        <PrivacyDialog />
        <PasswordDialog />
        <LanguageDialog />
      </Portal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    paddingHorizontal: 20,
  },
  buttonContainer: {
    padding: 16,
  },
  signOutButton: {
    marginBottom: 8,
  },
  deleteButton: {
    borderColor: "red",
  },
});

export default SettingsPage;
