
import { Picker } from "@react-native-picker/picker";
import React, { useMemo, useState } from "react";
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type Team = string;

const createTeams = (n: number) =>
  Array.from({ length: n }, (_, i) => `Team ${i + 1}`);

export default function HomeScreen() {
  const [teamCount, setTeamCount] = useState(8);
  const allTeams = useMemo(() => createTeams(teamCount), [teamCount]);

  const [slots, setSlots] = useState<string[]>(Array(8).fill(""));
  const [r1, setR1] = useState<string[]>(Array(4).fill(""));
  const [r2, setR2] = useState<string[]>(Array(2).fill(""));
  const [finalWinner, setFinalWinner] = useState("");
  const [runnerUp, setRunnerUp] = useState("");
  const [semiLosers, setSemiLosers] = useState<string[]>(Array(2).fill(""));
  const [thirdPlace, setThirdPlace] = useState("");

  const [modalVisible, setModalVisible] = useState(false);
  const [modalTeams, setModalTeams] = useState<string[]>([]);
  const [modalRound, setModalRound] = useState("");
  const [modalIndex, setModalIndex] = useState(0);

  const rounds = Math.log2(teamCount);
  const firstRoundMatches = teamCount / 2;

  const selectedTeams = slots.filter(Boolean);

  const resetTournament = (n: number) => {
    setTeamCount(n);
    setSlots(Array(n).fill(""));
    setR1(Array(n / 2).fill(""));
    setR2(Array(n / 4).fill(""));
    setFinalWinner("");
    setRunnerUp("");
    setSemiLosers(Array(2).fill(""));
    setThirdPlace("");
  };

  const updateSlot = (index: number, value: string) => {
    const copy = [...slots];
    copy[index] = value;
    setSlots(copy);
  };

  const openWinnerModal = (
    teams: string[],
    round: string,
    index: number
  ) => {
    setModalTeams(teams.filter(Boolean));
    setModalRound(round);
    setModalIndex(index);
    setModalVisible(true);
  };

  const selectWinner = (winner: string) => {
    setModalVisible(false);

    if (modalRound === "r1") {
      const arr = [...r1];
      arr[modalIndex] = winner;
      setR1(arr);
    }

    if (modalRound === "r2") {
      const arr = [...r2];
      arr[modalIndex] = winner;
      setR2(arr);

      const loser =
        modalTeams.find((t) => t !== winner) || "";
      const copy = [...semiLosers];
      copy[modalIndex] = loser;
      setSemiLosers(copy);
    }

    if (modalRound === "final") {
      setFinalWinner(winner);
      setRunnerUp(
        modalTeams.find((t) => t !== winner) || ""
      );
    }

    if (modalRound === "third") {
      setThirdPlace(winner);
    }
  };

  const MatchCard = ({
    team1,
    team2,
    winner,
    onChoose,
  }: any) => {
    const loser =
      winner && team1 === winner ? team2 : team1;

    return (
      <View style={styles.match}>
        <View
          style={[
            styles.team,
            winner === team1 && styles.win,
            loser === team1 && winner && styles.lose,
          ]}
        >
          <Text>{team1 || "TBD"}</Text>
        </View>

        <View
          style={[
            styles.team,
            winner === team2 && styles.win,
            loser === team2 && winner && styles.lose,
          ]}
        >
          <Text>{team2 || "TBD"}</Text>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={onChoose}
        >
          <Text style={{ color: "#fff" }}>
            Select Winner
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.main}>
      <Text style={styles.header}>
        🏆 Dynamic Tournament Bracket
      </Text>

      {/* Team Count */}
      <Picker
        selectedValue={teamCount}
        style={styles.countPicker}
        onValueChange={(v) => resetTournament(v)}
      >
        <Picker.Item label="8 Teams" value={8} />
        <Picker.Item label="16 Teams" value={16} />
        <Picker.Item label="32 Teams" value={32} />
      </Picker>

      <ScrollView horizontal>
        {/* LEVEL 0 */}
        <View style={styles.column}>
          <Text style={styles.heading}>LEVEL 0</Text>

          {Array.from({ length: teamCount }).map((_, i) => {
            const current = slots[i];

            const available = allTeams.filter(
              (t) =>
                !selectedTeams.includes(t) ||
                t === current
            );

            return (
              <Picker
                key={i}
                selectedValue={current}
                style={styles.dropdown}
                onValueChange={(v) =>
                  updateSlot(i, v)
                }
              >
                <Picker.Item
                  label={`Select Team ${i + 1}`}
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
          })}
        </View>

        {/* ROUND 1 */}
        <View style={styles.column}>
          <Text style={styles.heading}>ROUND 1</Text>

          {Array.from({
            length: firstRoundMatches,
          }).map((_, i) => (
            <MatchCard
              key={i}
              team1={slots[i * 2]}
              team2={slots[i * 2 + 1]}
              winner={r1[i]}
              onChoose={() =>
                openWinnerModal(
                  [slots[i * 2], slots[i * 2 + 1]],
                  "r1",
                  i
                )
              }
            />
          ))}
        </View>

        {/* SEMI */}
        <View style={styles.column}>
          <Text style={styles.heading}>SEMI</Text>

          {Array.from({
            length: r1.length / 2,
          }).map((_, i) => (
            <MatchCard
              key={i}
              team1={r1[i * 2]}
              team2={r1[i * 2 + 1]}
              winner={r2[i]}
              onChoose={() =>
                openWinnerModal(
                  [r1[i * 2], r1[i * 2 + 1]],
                  "r2",
                  i
                )
              }
            />
          ))}
        </View>

        {/* FINAL */}
        <View style={styles.column}>
          <Text style={styles.heading}>FINAL</Text>

          <MatchCard
            team1={r2[0]}
            team2={r2[1]}
            winner={finalWinner}
            onChoose={() =>
              openWinnerModal(
                [r2[0], r2[1]],
                "final",
                0
              )
            }
          />

          <View style={styles.result}>
            <Text>🥇 Winner: {finalWinner}</Text>
            <Text>🥈 Runner-up: {runnerUp}</Text>
          </View>
        </View>

        {/* THIRD PLACE */}
        <View style={styles.column}>
          <Text style={styles.heading}>
            3rd Place Match
          </Text>

          <MatchCard
            team1={semiLosers[0]}
            team2={semiLosers[1]}
            winner={thirdPlace}
            onChoose={() =>
              openWinnerModal(
                [semiLosers[0], semiLosers[1]],
                "third",
                0
              )
            }
          />

          <View style={styles.result}>
            <Text>🥉 2nd Runner-up: {thirdPlace}</Text>
          </View>
        </View>
      </ScrollView>

      {/* WINNER POPUP */}
      <Modal visible={modalVisible} transparent>
        <View style={styles.modalWrap}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>
              Select Winner
            </Text>

            {modalTeams.map((team) => (
              <TouchableOpacity
                key={team}
                style={styles.modalBtn}
                onPress={() => selectWinner(team)}
              >
                <Text>{team}</Text>
              </TouchableOpacity>
            ))}

            <TouchableOpacity
              onPress={() =>
                setModalVisible(false)
              }
            >
              <Text style={{ marginTop: 10 }}>
                Close
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  main: { flex: 1, backgroundColor: "#081226", paddingTop: 20 },
  header: {
    color: "#fff",
    fontSize: 24,
    textAlign: "center",
    fontWeight: "bold",
  },
  countPicker: {
    backgroundColor: "#fff",
    margin: 12,
    borderRadius: 10,
  },
  column: { width: 290, marginHorizontal: 12 },
  heading: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
    marginBottom: 12,
    fontWeight: "bold",
  },
  dropdown: {
    backgroundColor: "#fff",
    marginBottom: 10,
  },
  match: {
    backgroundColor: "#1e293b",
    padding: 10,
    borderRadius: 12,
    marginBottom: 16,
  },
  team: {
    backgroundColor: "#e2e8f0",
    padding: 10,
    borderRadius: 10,
    marginBottom: 6,
  },
  win: { backgroundColor: "#22c55e" },
  lose: { backgroundColor: "#ef4444" },
  button: {
    backgroundColor: "#2563eb",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 5,
  },
  result: {
    backgroundColor: "#facc15",
    padding: 14,
    borderRadius: 12,
    marginTop: 12,
  },
  modalWrap: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,.55)",
  },
  modal: {
    backgroundColor: "#fff",
    width: 280,
    padding: 20,
    borderRadius: 12,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 14,
    textAlign: "center",
  },
  modalBtn: {
    padding: 12,
    backgroundColor: "#e2e8f0",
    borderRadius: 10,
    marginBottom: 8,
  },
});