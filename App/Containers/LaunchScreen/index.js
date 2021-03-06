import React, { Component } from "react";
import {
  ScrollView,
  Text,
  Image,
  View,
  FlatList,
  TouchableOpacity,
  TextInput
} from "react-native";
import { connect } from "react-redux";
import ScrollableTabView, {
  ScrollableTabBar
} from "react-native-scrollable-tab-view";
import RNModal from "react-native-modal";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel
} from "react-native-simple-radio-button";
import { Images, Colors } from "../../Themes";
import BottomPillButton from "../../Components/BottomPillButton";

// Styles
import styles from "./styles";
import { scale } from "../../Lib/Scaling";
import { calculateTotalScore } from "../../Lib/CalculateTotal";
import PillButton from "../../Components/PillButton";

import RoundActions from "../../Redux/RoundRedux";

let radio_props = [
  { label: "round 1", value: 1 },
  { label: "round 2", value: 2 },
  { label: "round 3", value: 3 }
];

class LaunchScreen extends Component {
  static navigationOptions = () => {
    return {
      headerTitle: `Home`,
      backTitle: null
    };
  };

  constructor(props) {
    super(props);

    this.state = {
      newTeamModalVisible: false,
      navigating: false,
      teamName: "",
      teamId: "",
      newRound: 1
    };
  }

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

  radioOnPress = () => {};

  render() {
    let { roundOne, roundTwo, roundThree } = this.props;

    let data = [
      {
        title: "Round 1",
        teams: roundOne
      },
      {
        title: "Round 2",
        teams: roundTwo
      },
      {
        title: "Round 3",
        teams: roundThree
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
                            {this._renderTextLabelAndValue("Id", item.id)}

                            {this._renderTextLabelAndValue("Name", item.name)}
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
                              {calculateTotalScore(
                                item.blocksPickedUp,
                                item.blocksPlacedInMotherShip,
                                item.blocksInCorrectSlot,
                                item.perfectRun,
                                item.obstaclesHit
                              )}
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
            // this.props.navigation.navigate("JudgingScreen");
            this.setState({
              newTeamModalVisible: true,
              name: "",
              id: "",
              newRound: 1,
              navigating: false
            });
          }}
          title="Judge New Team"
        />

        <RNModal
          isVisible={this.state.newTeamModalVisible}
          onBackdropPress={() =>
            this.setState({
              newTeamModalVisible: false,
              name: "",
              id: "",
              newRound: 1,
              navigating: false
            })
          }
          onModalHide={() => {
            if (this.state.navigating) {
              let round = "";
              switch (this.state.newRound) {
                case 1:
                  round = "roundOne";
                  break;
                case 2:
                  round = "roundTwo";
                  break;
                case 3:
                  round = "roundThree";
                  break;
              }

              let team = {
                round: this.state.newRound,
                name: this.state.teamName,
                id: this.state.teamId,
                blocksPickedUp: 0,
                blocksPlacedInMotherShip: 0,
                blocksInCorrectSlot: 0,
                perfectRun: false,
                obstaclesHit: 0
              };

              this.props.addTeam(team, round);
              this.props.navigation.navigate("JudgingScreen", {
                teamRound: team,
                editable: true
              });
            }
          }}>
          <View
            style={{
              width: "100%",
              height: scale(350),
              marginBottom: scale(100),
              backgroundColor: Colors.black,
              paddingHorizontal: scale(16),
              borderRadius: 20
            }}>
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                paddingTop: scale(15),
                justifyContent: "center",
                alignItems: "center"
              }}>
              <Text
                textAlign="Center"
                style={{
                  color: Colors.snow,
                  fontSize: scale(18),
                  fontWeight: "500",
                  flex: 1
                }}>
                {"Name: "}
              </Text>

              <TextInput
                style={{
                  color: Colors.snow,
                  fontSize: scale(16),
                  fontWeight: "500",
                  borderBottomWidth: scale(1),
                  padding: scale(5),
                  borderColor: Colors.snow,
                  width: scale(50),
                  height: scale(40),
                  marginHorizontal: scale(8),
                  flex: 3
                }}
                textAlign={"left"}
                editable={this.state.editable}
                keyboardShouldPersistTaps="always"
                placeholder="Team Name"
                placeholderTextColor={Colors.ricePaper}
                keyboardType="default"
                defaultValue={this.state.teamName}
                value={this.state.teamName}
                underlineColorAndroid="transparent"
                onChangeText={text => {
                  this.setState({
                    teamName: text
                  });
                }}
              />
            </View>

            <View
              style={{
                flexDirection: "row",
                width: "100%",
                paddingTop: scale(15),
                justifyContent: "center",
                alignItems: "center"
              }}>
              <Text
                textAlign="Center"
                style={{
                  color: Colors.snow,
                  fontSize: scale(18),
                  fontWeight: "500",
                  flex: 1
                }}>
                {"Id: "}
              </Text>

              <TextInput
                style={{
                  color: Colors.snow,
                  fontSize: scale(16),
                  fontWeight: "500",
                  borderBottomWidth: scale(1),
                  padding: scale(5),
                  borderColor: Colors.snow,
                  width: scale(50),
                  height: scale(40),
                  marginHorizontal: scale(8),
                  flex: 3
                }}
                textAlign={"left"}
                maxLength={2}
                editable={this.state.editable}
                keyboardShouldPersistTaps="always"
                placeholder="Team Id"
                placeholderTextColor={Colors.ricePaper}
                keyboardType="numeric"
                defaultValue={this.state.teamId}
                value={this.state.teamId}
                underlineColorAndroid="transparent"
                onChangeText={text => {
                  this.setState({
                    teamId: text.replace(/[^0-9]/g, "")
                  });
                }}
              />
            </View>

            <RadioForm
              radio_props={radio_props}
              initial={0}
              formHorizontal={false}
              labelHorizontal={true}
              buttonColor={Colors.snow}
              selectedButtonColor={Colors.vermillion}
              selectedLabelColor={Colors.snow}
              labelColor={Colors.snow}
              animation={true}
              style={{ marginTop: scale(40) }}
              onPress={value => {
                this.setState({ newRound: value });
              }}
            />

            <View style={{ flex: 1 }} />

            <View style={{ height: scale(50), marginBottom: scale(16) }}>
              <PillButton
                enabled={
                  this.state.teamName.length > 0 && this.state.teamId.length > 0
                }
                onPress={() => {
                  this.setState({
                    newTeamModalVisible: false,
                    navigating: true
                  });
                }}
                title="Start Judging"
              />
            </View>
          </View>
        </RNModal>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    roundOne: state.rounds.roundOne,
    roundTwo: state.rounds.roundTwo,
    roundThree: state.rounds.roundThree
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addTeam: (team, round) => dispatch(RoundActions.addTeam(team, round))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LaunchScreen);
