import React, { Component } from "react";
import {
  ScrollView,
  Text,
  Image,
  View,
  TextInput,
  Switch,
  TouchableOpacity
} from "react-native";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Images, Colors } from "../../Themes";
import { scale } from "../../Lib/Scaling";
import { calculateTotalScore } from "../../Lib/CalculateTotal";
import BottomPillButton from "../../Components/BottomPillButton";

import RoundActions from "../../Redux/RoundRedux";

// Styles
import styles from "./styles";
import { format } from "url";

class JudgingScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const {
      params = {
        teamRound: {}
      }
    } = navigation.state;

    return {
      headerTitle: "Team " + params.teamRound.id + "-" + params.teamRound.name,
      backTitle: null,
      headerRight: (
        <View style={{ flexDirection: `row`, paddingRight: scale(16) }}>
          <TouchableOpacity
            style={{
              height: scale(24),
              width: scale(24),
              marginLeft: scale(10),
              fontSize: scale(20),
              alignItems: `center`,
              justifyContent: `center`
            }}
            onPress={() => {
              params.setEditable();
            }}>
            <Icon name="pencil" size={scale(20)} color={Colors.black} />
          </TouchableOpacity>
        </View>
      )
    };
  };

  constructor(props) {
    super(props);

    let teamRound = this.props.navigation.getParam(`teamRound`, {});
    let editable = this.props.navigation.getParam(`editable`, false);

    const {
      round,
      id,
      name,
      blocksPickedUp,
      blocksPlacedInMotherShip,
      blocksInCorrectSlot,
      perfectRun,
      obstaclesHit
    } = teamRound;

    this.state = {
      round,
      id,
      name,
      blocksPickedUp,
      blocksPlacedInMotherShip,
      blocksInCorrectSlot,
      perfectRun,
      obstaclesHit,
      editable
    };
  }

  componentDidMount() {
    this.props.navigation.setParams({ setEditable: this._setEditable });
  }

  _setEditable = () => {
    this.setState({
      editable: true
    });
  };

  getNumberOfBlocksRegex() {
    const { round } = this.state;

    switch (round) {
      case 1:
        return /[^0-2]/g;
      case 2:
        return /[^0-4]/g;
      case 3:
        return /[^0-6]/g;
    }
  }

  limitNumberOfObstacles(text) {
    const { round, obstaclesHit } = this.state;
    let newText = obstaclesHit;
    let tempText = text.replace(/[^0-9]/g, ``);

    switch (round) {
      case 1:
        newText = tempText <= 5 ? tempText : newText;
        break;
      case 2:
        newText = tempText <= 10 ? tempText : newText;
        break;
      case 3:
        newText = tempText <= 15 ? tempText : newText;
        break;
    }

    return newText;
  }

  modifyQuantity(shouldIncrement, value, isBlock) {
    const { round, editable } = this.state;

    if (editable) {
      let oldValue = this.state[value];
      let newValue = oldValue;

      if (shouldIncrement) {
        if (!isBlock || oldValue < round * 2) {
          newValue = Number(newValue) + 1;
        }
      } else {
        if (oldValue > 0) {
          newValue = Number(newValue) - 1;
        }
      }

      this.setState({
        [value]: isBlock
          ? newValue
          : this.limitNumberOfObstacles(String(newValue))
      });
    }
  }

  _renderRow(label, value) {
    return (
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
          {label}
        </Text>

        <TouchableOpacity
          style={{ marginLeft: `auto` }}
          onPress={() => {
            this.modifyQuantity(false, value, true);
          }}>
          <Icon name="minus" size={scale(25)} color={Colors.vermillion} />
        </TouchableOpacity>

        <TextInput
          style={{
            color: Colors.snow,
            fontSize: scale(16),
            fontWeight: "500",
            borderWidth: scale(1),
            padding: scale(5),
            borderColor: Colors.snow,
            borderRadius: 5,
            width: scale(50),
            height: scale(40),
            marginHorizontal: scale(8)
          }}
          textAlign={"center"}
          maxLength={1}
          editable={this.state.editable}
          keyboardShouldPersistTaps="always"
          placeholder="0"
          placeholderTextColor={Colors.ricePaper}
          keyboardType="numeric"
          defaultValue={String(this.state[value])}
          value={String(this.state[value])}
          underlineColorAndroid="transparent"
          onChangeText={text => {
            this.setState({
              [value]: text.replace(this.getNumberOfBlocksRegex(), ``)
            });
          }}
        />

        <TouchableOpacity
          onPress={() => {
            this.modifyQuantity(true, value, true);
          }}>
          <Icon name="plus" size={scale(25)} color={Colors.vermillion} />
        </TouchableOpacity>
      </View>
    );
  }

  calculateAndUpdate = () => {
    let {
      round,
      id,
      name,
      blocksPickedUp,
      blocksPlacedInMotherShip,
      blocksInCorrectSlot,
      perfectRun,
      obstaclesHit,
      editable
    } = this.state;

    if (editable) {
      let formattedRound = "";
      switch (round) {
        case 1:
          formattedRound = "roundOne";
          break;
        case 2:
          formattedRound = "roundTwo";
          break;
        case 3:
          formattedRound = "roundThree";
          break;
      }

      let team = {
        round,
        name,
        id,
        blocksPickedUp,
        blocksPlacedInMotherShip,
        blocksInCorrectSlot,
        perfectRun,
        obstaclesHit
      };
      this.props.updateTeam(team, formattedRound);
    }

    return calculateTotalScore(
      blocksPickedUp,
      blocksPlacedInMotherShip,
      blocksInCorrectSlot,
      perfectRun,
      obstaclesHit
    );
  };

  render() {
    const {
      round,
      blocksPickedUp,
      blocksPlacedInMotherShip,
      blocksInCorrectSlot,
      perfectRun,
      obstaclesHit
    } = this.state;

    return (
      <View style={styles.mainContainer}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={{
            justifyContent: "center",
            alignItems: "center",
            paddingTop: scale(20),
            marginHorizontal: scale(16)
          }}>
          <Text
            numberOfLines={1}
            style={{
              color: Colors.snow,
              fontSize: scale(28),
              fontWeight: "500"
            }}>
            Round {round}
          </Text>
          {this._renderRow("The Number of Blocks\nPicked Up", "blocksPickedUp")}
          {this._renderRow(
            "The Number of Blocks\nPlaced in Mothership",
            "blocksPlacedInMotherShip"
          )}
          {this._renderRow(
            "The Number of Blocks\nPlaced in Correct Slot",
            "blocksInCorrectSlot"
          )}

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
              {"The Number of Obstacles\nHit"}
            </Text>

            <TouchableOpacity
              style={{ marginLeft: `auto` }}
              onPress={() => {
                this.modifyQuantity(false, "obstaclesHit", false);
              }}>
              <Icon name="minus" size={scale(25)} color={Colors.vermillion} />
            </TouchableOpacity>

            <TextInput
              style={{
                color: Colors.snow,
                fontSize: scale(16),
                fontWeight: "500",
                borderWidth: scale(1),
                padding: scale(5),
                borderColor: Colors.snow,
                borderRadius: 5,
                width: scale(50),
                height: scale(40),
                marginHorizontal: scale(8)
              }}
              textAlign={"center"}
              maxLength={2}
              editable={this.state.editable}
              keyboardShouldPersistTaps="always"
              placeholder="0"
              placeholderTextColor={Colors.ricePaper}
              keyboardType="numeric"
              defaultValue={String(this.state.obstaclesHit)}
              value={String(this.state.obstaclesHit)}
              underlineColorAndroid="transparent"
              onChangeText={text => {
                this.setState({
                  obstaclesHit: this.limitNumberOfObstacles(text)
                });
              }}
            />

            <TouchableOpacity
              onPress={() => {
                this.modifyQuantity(true, "obstaclesHit", false);
              }}>
              <Icon name="plus" size={scale(25)} color={Colors.vermillion} />
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: "row",
              width: "100%",
              paddingTop: scale(15)
            }}>
            <Text
              textAlign="Center"
              style={{
                color: Colors.snow,
                fontSize: scale(18),
                fontWeight: "500",
                flex: 1
              }}>
              Perfect Run
            </Text>

            <Switch
              disabled={!this.state.editable}
              value={perfectRun}
              onValueChange={value => {
                this.setState({
                  perfectRun: value
                });
              }}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              width: "100%",
              paddingTop: scale(100)
            }}>
            <Text
              textAlign="Center"
              style={{
                color: Colors.snow,
                fontSize: scale(18),
                fontWeight: "500",
                flex: 1
              }}>
              Total Score:
            </Text>

            <Text
              textAlign="Center"
              style={{
                color: Colors.snow,
                fontSize: scale(18),
                fontWeight: "700"
              }}>
              {this.calculateAndUpdate()}
            </Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    updateTeam: (team, round) => dispatch(RoundActions.updateTeam(team, round))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(JudgingScreen);
