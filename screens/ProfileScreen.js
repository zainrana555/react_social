import React from 'react'
import { View, Text, StyleSheet, Button, Image } from 'react-native'
import Fire from "../Fire"

export default class ProfileScreen extends React.Component {
  state = {
    user: {}
  };

  unsubscribe = null;

  componentDidMount() {
    const user = this.props.uid || Fire.shared.uid

    this.unsubscribe = Fire.shared.firestore
      .collection("users")
      .doc(user)
      .onSnapshot(doc => {
        this.setState({ user: doc.data() });
      });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ marginTop: 64, alignItems: "center" }}>
          <View style={styles.avatarContainer}>
            <Image style={styles.avatar} source={this.state.user.avatar ? { uri: this.state.user.avatar } : require('../assets/tempAvatar.jpg')} />
          </View>

          <Text style={styles.name}>{this.state.user.name}</Text>
        </View>
        <View style={styles.statsContainer}>
          <View style={styles.stat}>
            <Text style={styles.statAmount}>21</Text>
            <Text style={styles.statTitle}>Posts</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statAmount}>223</Text>
            <Text style={styles.statTitle}>Followers</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statAmount}>112</Text>
            <Text style={styles.statTitle}>Following</Text>
          </View>
        </View>
        <View style={{ marginHorizontal: 120 }}>
          <Button onPress={() => { Fire.shared.signOut() }} title="Log out" />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  avatarContainer: {
    shadowColor: "#151734",
    shadowRadius: 15,
    shadowOpacity: 0.4
  },
  avatar: {
    width: 136,
    height: 136,
    borderRadius: 68
  },
  name: {
    marginTop: 24,
    fontSize: 16,
    fontWeight: "bold"
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 32
  },
  stat: {
    alignItems: "center",
    flex: 1
  },
  statAmount: {
    color: "#4F5660",
    fontSize: 18,
    fontWeight: "300"
  },
  statTitle: {
    color: "#C3C5CD",
    fontSize: 12,
    fontWeight: "500",
    marginTop: 4
  }
});