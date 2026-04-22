// FILE: app/(tabs)/index.tsx
// FULL CODE
// ROUND 1 = Button + Dropdown Team Selector
// Left + Right Bracket
// Winner popup selection
// Green winner / Red loser
// Auto progression to final

import React, { useState } from "react";
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const teamOptions = [
  "The Swords",
  "The Kings",
  "The Lions",
  "The Tigers",
  "The Wolves",
  "The Titans",
  "The Warriors",
  "The Eagles",
  "The Dragons",
  "The Ninjas",
  "The Bulls",
  "The Panthers",
  "The Ghosts",
  "The Vikings",
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

  const [modalVisible, setModalVisible] = useState(false);
  const [modalTeams, setModalTeams] = useState([]);
  const [roundType, setRoundType] = useState("");
  const [roundIndex, setRoundIndex] = useState(0);

  const selectedTeams = teams.filter(Boolean);

  const updateTeam = (index, value) => {
    const arr = [...teams];
    arr[index] = value;
    setTeams(arr);
  };

  const openModal = (list, type, index) => {
    setModalTeams(list.filter(Boolean));
    setRoundType(type);
    setRoundIndex(index);
    setModalVisible(true);
  };

  const chooseWinner = (team) => {
    setModalVisible(false);

    if (roundType === "r1Left") {
      const arr = [...r1Left];
      arr[roundIndex] = team;
      setR1Left(arr);
    }

    if (roundType === "r1Right") {
      const arr = [...r1Right];
      arr[roundIndex] = team;
      setR1Right(arr);
    }

    if (roundType === "r2Left") {
      const arr = [...r2Left];
      arr[roundIndex] = team;
      setR2Left(arr);
    }

    if (roundType === "r2Right") {
      const arr = [...r2Right];
      arr[roundIndex] = team;
      setR2Right(arr);
    }

    if (roundType === "semi") {
      const arr = [...semi];
      arr[roundIndex] = team;
      setSemi(arr);
    }

    if (roundType === "final") {
      setWinner(team);
    }
  };

  const TeamDropdown = ({ index }) => {
    const current = teams[index];
    const [open, setOpen] = useState(false);

    const available = teamOptions.filter(
      (t) =>
        !selectedTeams.includes(t) ||
        t === current
    );

    return (
      <View style={{ marginBottom: 10 }}>
        <TouchableOpacity
          style={styles.selectBtn}
          onPress={() => setOpen(!open)}
        >
          <Text style={styles.selectText}>
            {current ||
              `Select Team ${index + 1}`}
          </Text>
        </TouchableOpacity>

        {open && (
          <View style={styles.dropdownBox}>
            <ScrollView
              style={{ maxHeight: 180 }}
            >
              <View style={styles.grid}>
                {available.map((team) => (
                  <TouchableOpacity
                    key={team}
                    style={
                      styles.teamBtn
                    }
                    onPress={() => {
                      updateTeam(
                        index,
                        team
                      );
                      setOpen(
                        false
                      );
                    }}
                  >
                    <Text>
                      {team}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>
        )}
      </View>
    );
  };

  const MatchCard = ({
    team1,
    team2,
    selected,
    onPress,
  }) => {
    const loser =
      selected &&
      selected === team1
        ? team2
        : team1;

    return (
      <View style={styles.match}>
        <View
          style={[
            styles.team,
            selected ===
              team1 &&
              styles.win,
            loser ===
              team1 &&
              selected &&
              styles.lose,
          ]}
        >
          <Text>
            {team1 ||
              "TBD"}
          </Text>
        </View>

        <View
          style={[
            styles.team,
            selected ===
              team2 &&
              styles.win,
            loser ===
              team2 &&
              selected &&
              styles.lose,
          ]}
        >
          <Text>
            {team2 ||
              "TBD"}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={onPress}
        >
          <Text
            style={{
              color: "#fff",
            }}
          >
            Select Winner
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.main}>
      <Text style={styles.header}>
        🏆 Tournament Bracket
      </Text>

      <ScrollView horizontal>
        {/* LEFT ROUND */}
        <View style={styles.column}>
          <Text style={styles.heading}>
            ROUND 1
          </Text>

          {Array.from({
            length: 8,
          }).map((_, i) => (
            <TeamDropdown
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
              onPress={() =>
                openModal(
                  [
                    teams[
                      i *
                        2
                    ],
                    teams[
                      i *
                        2 +
                        1
                    ],
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
              onPress={() =>
                openModal(
                  [
                    r1Left[
                      i *
                        2
                    ],
                    r1Left[
                      i *
                        2 +
                        1
                    ],
                  ],
                  "r2Left",
                  i
                )
              }
            />
          ))}
        </View>

        {/* SEMI */}
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
            onPress={() =>
              openModal(
                [
                  r2Left[0],
                  r2Left[1],
                ],
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
            onPress={() =>
              openModal(
                [
                  semi[0],
                  semi[1],
                ],
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

        {/* SEMI */}
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
            onPress={() =>
              openModal(
                [
                  r2Right[0],
                  r2Right[1],
                ],
                "semi",
                1
              )
            }
          />
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
              onPress={() =>
                openModal(
                  [
                    r1Right[
                      i *
                        2
                    ],
                    r1Right[
                      i *
                        2 +
                        1
                    ],
                  ],
                  "r2Right",
                  i
                )
              }
            />
          ))}
        </View>

        {/* RIGHT ROUND */}
        <View style={styles.column}>
          <Text style={styles.heading}>
            ROUND 1
          </Text>

          {Array.from({
            length: 8,
          }).map((_, i) => (
            <TeamDropdown
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
              onPress={() =>
                openModal(
                  [
                    teams[
                      8 +
                        i *
                          2
                    ],
                    teams[
                      8 +
                        i *
                          2 +
                        1
                    ],
                  ],
                  "r1Right",
                  i
                )
              }
            />
          ))}
        </View>
      </ScrollView>

      {/* Winner Modal */}
      <Modal visible={modalVisible} transparent>
        <View style={styles.modalWrap}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>
              Select Winner
            </Text>

            {modalTeams.map(
              (team) => (
                <TouchableOpacity
                  key={team}
                  style={
                    styles.modalBtn
                  }
                  onPress={() =>
                    chooseWinner(
                      team
                    )
                  }
                >
                  <Text>
                    {team}
                  </Text>
                </TouchableOpacity>
              )
            )}

            <TouchableOpacity
              onPress={() =>
                setModalVisible(
                  false
                )
              }
            >
              <Text
                style={{
                  textAlign:
                    "center",
                  marginTop: 10,
                }}
              >
                Close
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles =
  StyleSheet.create({
    main: {
      flex: 1,
      backgroundColor:
        "#071226",
      paddingTop: 20,
    },
    header: {
      color: "#fff",
      fontSize: 24,
      textAlign: "center",
      fontWeight:
        "bold",
      marginBottom: 20,
    },
    column: {
      width: 300,
      marginHorizontal: 10,
    },
    heading: {
      color: "#fff",
      fontSize: 18,
      textAlign: "center",
      fontWeight:
        "bold",
      marginBottom: 12,
    },
    selectBtn: {
      backgroundColor:
        "#2563eb",
      padding: 12,
      borderRadius: 10,
    },
    selectText: {
      color: "#fff",
      textAlign:
        "center",
      fontWeight:
        "bold",
    },
    dropdownBox: {
      backgroundColor:
        "#fff",
      borderRadius: 10,
      padding: 10,
      marginTop: 5,
    },
    grid: {
      flexDirection:
        "row",
      flexWrap:
        "wrap",
      gap: 8,
    },
    teamBtn: {
      backgroundColor:
        "#e2e8f0",
      padding: 10,
      borderRadius: 8,
      margin: 4,
    },
    match: {
      backgroundColor:
        "#1e293b",
      padding: 10,
      borderRadius: 12,
      marginBottom: 15,
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
    button: {
      backgroundColor:
        "#2563eb",
      padding: 10,
      borderRadius: 10,
      alignItems:
        "center",
    },
    result: {
      backgroundColor:
        "#facc15",
      padding: 15,
      borderRadius: 12,
      marginTop: 10,
    },
    modalWrap: {
      flex: 1,
      justifyContent:
        "center",
      alignItems:
        "center",
      backgroundColor:
        "rgba(0,0,0,.6)",
    },
    modal: {
      backgroundColor:
        "#fff",
      width: 280,
      padding: 20,
      borderRadius: 12,
    },
    modalTitle: {
      fontSize: 18,
      fontWeight:
        "bold",
      textAlign:
        "center",
      marginBottom: 12,
    },
    modalBtn: {
      backgroundColor:
        "#e2e8f0",
      padding: 12,
      borderRadius: 10,
      marginBottom: 8,
    },
  });