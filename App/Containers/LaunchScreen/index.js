import React, { Component } from "react";
import {
  ScrollView,
  Text,
  Image,
  View,
  FlatList,
  TouchableOpacity
} from "react-native";
import { connect } from "react-redux";
import ScrollableTabView, {
  ScrollableTabBar
} from "react-native-scrollable-tab-view";
import { Images, Colors } from "../../Themes";

// Styles
import styles from "./styles";
import { scale } from "../../Lib/Scaling";

class LaunchScreen extends Component {
  static navigationOptions = () => {
    return {
      headerTitle: `Home`,
      backTitle: null
    };
  };

  render() {
    let data = [
      {
        title: "Round 1",
        teams: [0, 1, 2, 3]
      },
      {
        title: "Round 2",
        teams: [0, 1, 2, 3]
      },
      {
        title: "Round 3",
        teams: [0, 1, 2, 3]
      }
    ];

    return (
      <View style={styles.mainContainer}>
        <ScrollableTabView
          tabBarUnderlineStyle={{
            backgroundColor: Colors.snow,
            height: scale(3)
          }}
          tabBarBackgroundColor={Colors.vermillion}
          tabBarActiveTextColor={Colors.snow}
          tabBarInactiveTextColor={Colors.hint}
          tabBarTextStyle={{
            fontSize: scale(14)
          }}
          tabBarActiveTextStyle={{
            fontSize: scale(16)
          }}
          renderTabBar={() => (
            <ScrollableTabBar style={styles.tabBarContainer} />
          )}
          initialPage={0}
        >
          {data.map(round => {
            if (!round || round.teams.length == 0) {
              return;
            }
            return (
              <FlatList
                contentContainerStyle={{
                  paddingBottom: scale(100),
                }}
                tabLabel={round.title}
                key={round.title}
                data={round.teams}
                extraData={this.state}
                keyExtractor={item => item.title}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => {
                      this.props.navigation.navigate("JudgingScreen", {
                        teamNumber: item
                      });
                    }}
                  >
                    <Text>{item}</Text>
                  </TouchableOpacity>
                )}
              />
            );
          })}
        </ScrollableTabView>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LaunchScreen);
