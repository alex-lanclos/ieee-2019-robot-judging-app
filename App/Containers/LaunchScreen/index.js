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
import BottomPillButton from "../../Components/BottomPillButton";

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

  _renderTextLabelAndValue = (label, value) => {
    return (
      <View
        style={{
          paddingVertical: scale(2)
        }}>
        <Text
          numberOfLines={1}
          style={{
            color: Colors.snow
          }}>
          <Text style={styles.textLabel}>{label}: </Text>
          <Text numberOfLines={1} style={styles.textValue}>
            {value}
          </Text>
        </Text>
      </View>
    );
  };

  render() {
    let data = [
      {
        title: "Round 1",
        teams: [
          {
            round: 1,
            teamName: "Cool Team",
            teamId: 0,
            blocksPickedUp: 2,
            blocksPlacedInMotherShip: 2,
            blocksInCorrectSlot: 2,
            perfectRun: true,
            timeToCompletionMinutes: 5,
            timeToCompletionSeconds: 30,
            timeToCompletionMilliseconds: 0,
            obstaclesHit: 0,
            totalScore: 175
          },
          {
            round: 1,
            teamName: "Awesome Team That Has the Longest Name In Existence",
            teamId: 1,
            blocksPickedUp: 2,
            blocksPlacedInMotherShip: 2,
            blocksInCorrectSlot: 2,
            perfectRun: true,
            timeToCompletionMinutes: 5,
            timeToCompletionSeconds: 30,
            timeToCompletionMilliseconds: 0,
            obstaclesHit: 0,
            totalScore: 175
          }
        ]
      },
      {
        title: "Round 2",
        teams: [
          {
            round: 2,
            teamName: "Cool Team",
            teamId: 0,
            blocksPickedUp: 2,
            blocksPlacedInMotherShip: 2,
            blocksInCorrectSlot: 2,
            perfectRun: false,
            timeToCompletionMinutes: 5,
            timeToCompletionSeconds: 30,
            timeToCompletionMilliseconds: 0,
            obstaclesHit: 0,
            totalScore: 100
          }
        ]
      },
      {
        title: "Round 3",
        teams: [
          {
            round: 3,
            teamName: "Cool Team",
            teamId: 0,
            blocksPickedUp: 2,
            blocksPlacedInMotherShip: 2,
            blocksInCorrectSlot: 2,
            perfectRun: true,
            timeToCompletionMinutes: 5,
            timeToCompletionSeconds: 30,
            timeToCompletionMilliseconds: 0,
            obstaclesHit: 3,
            totalScore: 85
          }
        ]
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
          initialPage={0}>
          {data.map(round => {
            if (!round || round.teams.length == 0) {
              return;
            }
            return (
              <View tabLabel={round.title} key={round.title}>
                <FlatList
                  contentContainerStyle={{
                    paddingBottom: scale(100)
                  }}
                  data={round.teams}
                  extraData={this.state}
                  keyExtractor={item => item.title}
                  renderItem={({ item }) => (
                    <View>
                      <TouchableOpacity
                        style={{
                          height: scale(80),
                          justifyContent: "center"
                        }}
                        onPress={() => {
                          this.props.navigation.navigate("JudgingScreen", {
                            teamRound: item
                          });
                        }}>
                        <View
                          style={{
                            marginHorizontal: scale(16),
                            flexDirection: "row"
                          }}>
                          <View
                            style={{
                              flex: 1
                            }}>
                            {this._renderTextLabelAndValue("Id", item.teamId)}

                            {this._renderTextLabelAndValue(
                              "Name",
                              item.teamName
                            )}
                          </View>

                          <Text
                            style={{
                              paddingLeft: scale(5),
                              color: Colors.snow,
                              justifyContent: "center",
                              alignSelf: "center"
                            }}>
                            <Text style={styles.textLabel}>Total Score: </Text>
                            <Text style={styles.textValue}>
                              {item.totalScore}
                            </Text>
                          </Text>
                        </View>
                      </TouchableOpacity>
                      <View
                        style={{
                          width: "100%",
                          backgroundColor: Colors.snow,
                          height: scale(1)
                        }}
                      />
                    </View>
                  )}
                />
              </View>
            );
          })}
        </ScrollableTabView>
        <BottomPillButton
          onPress={() => {
            this.props.navigation.navigate("JudgingScreen");
          }}
          title="Judge New Team"
        />
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
