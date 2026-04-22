import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const teamOptions = [
  "The Swords",
  "The Kings",
  "The Wolves",
  "The Titans",
  "The Dragons",
  "The Ninjas",
  "The Ghosts",
  "The Vikings",
  "The Lions",
  "The Tigers",
  "The Warriors",
  "The Eagles",
  "The Bulls",
  "The Panthers",
  "The Sharks",
  "The Riders",
];

export default function HomeScreen() {
  const [teams, setTeams] = useState(Array(16).fill(""));

  const [r1Left, setR1Left] = useState(Array(4).fill(""));
  const [r1Right, setR1Right] = useState(Array(4).fill(""));

  const [r2Left, setR2Left] = useState(Array(2).fill(""));
  const [r2Right, setR2Right] = useState(Array(2).fill(""));

  const [semi, setSemi] = useState(Array(2).fill(""));
  const [winner, setWinner] = useState("");

  const selectedTeams = teams.filter(Boolean);

  const updateTeam = (index, value) => {
    const arr = [...teams];
    arr[index] = value;
    setTeams(arr);
  };

  const chooseWinner = (
    team,
    type,
    index
  ) => {
    if (!team) return;

    if (type === "r1Left") {
      const arr = [...r1Left];
      arr[index] = team;
      setR1Left(arr);
    }

    if (type === "r1Right") {
      const arr = [...r1Right];
      arr[index] = team;
      setR1Right(arr);
    }

    if (type === "r2Left") {
      const arr = [...r2Left];
      arr[index] = team;
      setR2Left(arr);
    }

    if (type === "r2Right") {
      const arr = [...r2Right];
      arr[index] = team;
      setR2Right(arr);
    }

    if (type === "semi") {
      const arr = [...semi];
      arr[index] = team;
      setSemi(arr);
    }

    if (type === "final") {
      setWinner(team);
    }
  };

  const TeamPicker = ({ index }) => {
    const current = teams[index];

    const available = teamOptions.filter(
      (t) =>
        !selectedTeams.includes(t) ||
        t === current
    );

    return (
      <Picker
        selectedValue={current}
        style={styles.dropdown}
        onValueChange={(v) =>
          updateTeam(index, v)
        }
      >
        <Picker.Item
          label="Select team"
          value=""
        />

        {available.map((team) => (
          <Picker.Item
            key={team}
            label={team}
            value={team}
          />
        ))}
      </Picker>
    );
  };

  const MatchCard = ({
    team1,
    team2,
    selected,
    onWin1,
    onWin2,
  }) => {
    return (
      <View style={styles.match}>
        <TouchableOpacity
          style={[
            styles.team,
            selected ===
              team1 &&
              styles.win,
            selected &&
              selected !==
                team1 &&
              styles.lose,
          ]}
          onPress={onWin1}
        >
          <Text>
            {team1 ||
              "TBD"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.team,
            selected ===
              team2 &&
              styles.win,
            selected &&
              selected !==
                team2 &&
              styles.lose,
          ]}
          onPress={onWin2}
        >
          <Text>
            {team2 ||
              "TBD"}
          </Text>
        </TouchableOpacity>

        <View style={styles.line} />
      </View>
    );
  };

  return (
    <View style={styles.main}>
      <Text style={styles.header}>
        🏆 Tournament Bracket
      </Text>

      <ScrollView horizontal>
        {/* LEFT ROUND 1 */}
        <View style={styles.column}>
          <Text style={styles.heading}>
            ROUND 1
          </Text>

          {Array.from({
            length: 8,
          }).map((_, i) => (
            <TeamPicker
              key={i}
              index={i}
            />
          ))}

          {Array.from({
            length: 4,
          }).map((_, i) => (
            <MatchCard
              key={i}
              team1={
                teams[i * 2]
              }
              team2={
                teams[
                  i * 2 + 1
                ]
              }
              selected={
                r1Left[i]
              }
              onWin1={() =>
                chooseWinner(
                  teams[
                    i *
                      2
                  ],
                  "r1Left",
                  i
                )
              }
              onWin2={() =>
                chooseWinner(
                  teams[
                    i *
                      2 +
                      1
                  ],
                  "r1Left",
                  i
                )
              }
            />
          ))}
        </View>

        {/* ROUND 2 */}
        <View style={styles.column}>
          <Text style={styles.heading}>
            ROUND 2
          </Text>

          {Array.from({
            length: 2,
          }).map((_, i) => (
            <MatchCard
              key={i}
              team1={
                r1Left[
                  i * 2
                ]
              }
              team2={
                r1Left[
                  i *
                    2 +
                    1
                ]
              }
              selected={
                r2Left[i]
              }
              onWin1={() =>
                chooseWinner(
                  r1Left[
                    i *
                      2
                  ],
                  "r2Left",
                  i
                )
              }
              onWin2={() =>
                chooseWinner(
                  r1Left[
                    i *
                      2 +
                      1
                  ],
                  "r2Left",
                  i
                )
              }
            />
          ))}
        </View>

        {/* LEFT SEMI */}
        <View style={styles.column}>
          <Text style={styles.heading}>
            SEMI FINAL
          </Text>

          <MatchCard
            team1={
              r2Left[0]
            }
            team2={
              r2Left[1]
            }
            selected={
              semi[0]
            }
            onWin1={() =>
              chooseWinner(
                r2Left[0],
                "semi",
                0
              )
            }
            onWin2={() =>
              chooseWinner(
                r2Left[1],
                "semi",
                0
              )
            }
          />
        </View>

        {/* FINAL */}
        <View style={styles.column}>
          <Text style={styles.heading}>
            GRAND FINAL
          </Text>

          <MatchCard
            team1={semi[0]}
            team2={semi[1]}
            selected={winner}
            onWin1={() =>
              chooseWinner(
                semi[0],
                "final",
                0
              )
            }
            onWin2={() =>
              chooseWinner(
                semi[1],
                "final",
                0
              )
            }
          />

          <View style={styles.result}>
            <Text>
              🏆 Winner:{" "}
              {winner ||
                "TBD"}
            </Text>
          </View>
        </View>

        {/* RIGHT SEMI */}
        <View style={styles.column}>
          <Text style={styles.heading}>
            SEMI FINAL
          </Text>

          <MatchCard
            team1={
              r2Right[0]
            }
            team2={
              r2Right[1]
            }
            selected={
              semi[1]
            }
            onWin1={() =>
              chooseWinner(
                r2Right[0],
                "semi",
                1
              )
            }
            onWin2={() =>
              chooseWinner(
                r2Right[1],
                "semi",
                1
              )
            }
          />
        </View>

        {/* RIGHT ROUND 2 */}
        <View style={styles.column}>
          <Text style={styles.heading}>
            ROUND 2
          </Text>

          {Array.from({
            length: 2,
          }).map((_, i) => (
            <MatchCard
              key={i}
              team1={
                r1Right[
                  i * 2
                ]
              }
              team2={
                r1Right[
                  i *
                    2 +
                    1
                ]
              }
              selected={
                r2Right[i]
              }
              onWin1={() =>
                chooseWinner(
                  r1Right[
                    i *
                      2
                  ],
                  "r2Right",
                  i
                )
              }
              onWin2={() =>
                chooseWinner(
                  r1Right[
                    i *
                      2 +
                      1
                  ],
                  "r2Right",
                  i
                )
              }
            />
          ))}
        </View>

        {/* RIGHT ROUND 1 */}
        <View style={styles.column}>
          <Text style={styles.heading}>
            ROUND 1
          </Text>

          {Array.from({
            length: 8,
          }).map((_, i) => (
            <TeamPicker
              key={
                i +
                8
              }
              index={
                i +
                8
              }
            />
          ))}

          {Array.from({
            length: 4,
          }).map((_, i) => (
            <MatchCard
              key={i}
              team1={
                teams[
                  8 +
                    i *
                      2
                ]
              }
              team2={
                teams[
                  8 +
                    i *
                      2 +
                    1
                ]
              }
              selected={
                r1Right[i]
              }
              onWin1={() =>
                chooseWinner(
                  teams[
                    8 +
                      i *
                        2
                  ],
                  "r1Right",
                  i
                )
              }
              onWin2={() =>
                chooseWinner(
                  teams[
                    8 +
                      i *
                        2 +
                      1
                  ],
                  "r1Right",
                  i
                )
              }
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles =
  StyleSheet.create({
    main: {
      flex: 1,
      backgroundColor:
        "#04122c",
      paddingTop: 20,
    },

    header: {
      color: "#fff",
      fontSize: 24,
      textAlign:
        "center",
      fontWeight:
        "bold",
      marginBottom: 15,
    },

    column: {
      width: 260,
      marginHorizontal: 8,
    },

    heading: {
      color: "#fff",
      fontSize: 18,
      textAlign:
        "center",
      fontWeight:
        "bold",
      marginBottom: 10,
    },

    dropdown: {
      backgroundColor:
        "#fff",
      marginBottom: 6,
      borderRadius: 8,
      height: 38,
    },

    match: {
      backgroundColor:
        "#1e293b",
      padding: 8,
      borderRadius: 12,
      marginBottom: 14,
    },

    team: {
      backgroundColor:
        "#e2e8f0",
      padding: 10,
      borderRadius: 10,
      marginBottom: 6,
    },

    win: {
      backgroundColor:
        "#22c55e",
    },

    lose: {
      backgroundColor:
        "#ef4444",
    },

    line: {
      height: 2,
      backgroundColor:
        "#64748b",
      marginTop: 8,
      borderRadius: 2,
    },

    result: {
      backgroundColor:
        "#facc15",
      padding: 14,
      borderRadius: 10,
      marginTop: 10,
    },
  });