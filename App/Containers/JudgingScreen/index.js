import React, { Component } from "react";
import { ScrollView, Text, Image, View, TextInput } from "react-native";
import { Images, Colors } from "../../Themes";
import { scale } from "../../Lib/Scaling";

// Styles
import styles from "./styles";

export default class JudgingScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const {
      params = {
        teamRound: {}
      }
    } = navigation.state;

    return {
      headerTitle:
        "Team " + params.teamRound.teamId + "-" + params.teamRound.teamName,
      backTitle: null
    };
  };

  constructor(props) {
    super(props);

    let teamRound = this.props.navigation.getParam(`teamRound`, {});

    // let object = {
    //   round: 1,
    //   teamName: "Cool Team",
    //   teamId: 0,
    //   blocksPickedUp: 2,
    //   blocksPlacedInMotherShip: 2,
    //   blocksInCorrectSlot: 2,
    //   perfectRun: true,
    //   timeToCompletionMinutes: 5,
    //   timeToCompletionSeconds: 30,
    //   timeToCompletionMilliseconds: 0,
    //   obstaclesHit: 0,
    //   totalScore: 175
    // };

    const {
      round,
      blocksPickedUp,
      blocksPlacedInMotherShip,
      blocksInCorrectSlot,
      perfectRun,
      timeToCompletionMinutes,
      timeToCompletionSeconds,
      timeToCompletionMilliseconds,
      obstaclesHit,
      totalScore
    } = teamRound;

    this.state = {
      round,
      blocksPickedUp,
      blocksPlacedInMotherShip,
      blocksInCorrectSlot,
      perfectRun,
      timeToCompletionMinutes,
      timeToCompletionSeconds,
      timeToCompletionMilliseconds,
      obstaclesHit,
      totalScore
    };
  }

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

  _renderRow(label, value) {
    console.tron.log("blocksPickedUp", this.state.blocksPickedUp);

    return (
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
          {label}
        </Text>

        <TextInput
          style={{
            color: Colors.snow,
            fontSize: scale(16),
            fontWeight: "500",
            borderWidth: scale(1),
            padding: scale(5),
            borderColor: Colors.snow,
            borderRadius: 5,
            width: scale(100)
          }}
          textAlign={"center"}
          maxLength={1}
          enabled={true}
          keyboardShouldPersistTaps="always"
          placeholder="# of Blocks"
          placeholderTextColor={Colors.ricePaper}
          keyboardType="numeric"
          defaultValue={this.state[value]}
          value={this.state[value]}
          underlineColorAndroid="transparent"
          onChangeText={text => {
            this.setState({
              [value]: text.replace(this.getNumberOfBlocksRegex(), ``)
            });
          }}
        />
      </View>
    );
  }

  render() {
    const {
      round,
      blocksPickedUp,
      blocksPlacedInMotherShip,
      blocksInCorrectSlot,
      perfectRun,
      timeToCompletionMinutes,
      timeToCompletionSeconds,
      timeToCompletionMilliseconds,
      obstaclesHit,
      totalScore
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
          {this._renderRow("The Number of Blocks\nPicked Up", "blocksPickedUp")}
          {this._renderRow("The Number of Blocks\nPicked Up", "blocksPickedUp")}
          {this._renderRow("The Number of Blocks\nPicked Up", "blocksPickedUp")}
          {this._renderRow("The Number of Blocks\nPicked Up", "blocksPickedUp")}
          {/* <View
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
              The Number of Blocks{"\n"}Picked Up
            </Text>

            <TextInput
              style={{
                color: Colors.snow,
                fontSize: scale(16),
                fontWeight: "500",
                borderWidth: scale(1),
                padding: scale(5),
                borderColor: Colors.snow,
                borderRadius: 5,
                width: scale(100)
              }}
              textAlign={"center"}
              maxLength={1}
              enabled={true}
              keyboardShouldPersistTaps="always"
              placeholder="# of Blocks"
              placeholderTextColor={Colors.ricePaper}
              keyboardType="numeric"
              value={this.state.blocksPickedUp}
              underlineColorAndroid="transparent"
              onChangeText={text => {
                this.setState({
                  blocksPickedUp: text.replace(
                    this.getNumberOfBlocksRegex(),
                    ``
                  )
                });
              }}
            />
          </View> */}
        </ScrollView>
      </View>
    );
  }
}
