
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
  const [r1, setR1] = useState(Array(8).fill(""));
  const [r2, setR2] = useState(Array(4).fill(""));
  const [r3, setR3] = useState(Array(2).fill(""));
  const [champion, setChampion] = useState("");

  const updateTeam = (index: number, value: string) => {
    const arr = [...teams];
    arr[index] = value;
    setTeams(arr);
  };

  const chooseWinner = (
    state: string[],
    setter: any,
    index: number,
    team: string
  ) => {
    const arr = [...state];
    arr[index] = team;
    setter(arr);
  };

  const TeamPicker = ({ index }: { index: number }) => (
    <Picker
      selectedValue={teams[index]}
      style={styles.dropdown}
      onValueChange={(val) => updateTeam(index, val)}
    >
      <Picker.Item label={`Select Team ${index + 1}`} value="" />
      {teamOptions.map((team, i) => (
        <Picker.Item key={i} label={team} value={team} />
      ))}
    </Picker>
  );

  const MatchCard = ({
    team1,
    team2,
    winner,
    onPick,
  }: any) => (
    <View style={styles.match}>
      <TouchableOpacity
        style={[
          styles.team,
          winner === team1 && styles.win,
          winner && winner !== team1 && styles.lose,
        ]}
        onPress={() => team1 && onPick(team1)}
      >
        <Text>{team1 || "TBD"}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.team,
          winner === team2 && styles.win,
          winner && winner !== team2 && styles.lose,
        ]}
        onPress={() => team2 && onPick(team2)}
      >
        <Text>{team2 || "TBD"}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView horizontal style={styles.container}>
      {/* ROUND 1 */}
      <View style={styles.column}>
        <Text style={styles.heading}>ROUND 1</Text>

        {Array.from({ length: 8 }).map((_, i) => (
          <View key={i}>
            <TeamPicker index={i * 2} />
            <TeamPicker index={i * 2 + 1} />

            <MatchCard
              team1={teams[i * 2]}
              team2={teams[i * 2 + 1]}
              winner={r1[i]}
              onPick={(team: string) =>
                chooseWinner(r1, setR1, i, team)
              }
            />
          </View>
        ))}
      </View>

      {/* QUARTER */}
      <View style={styles.column}>
        <Text style={styles.heading}>QUARTER</Text>

        {Array.from({ length: 4 }).map((_, i) => (
          <MatchCard
            key={i}
            team1={r1[i * 2]}
            team2={r1[i * 2 + 1]}
            winner={r2[i]}
            onPick={(team: string) =>
              chooseWinner(r2, setR2, i, team)
            }
          />
        ))}
      </View>

      {/* SEMI */}
      <View style={styles.column}>
        <Text style={styles.heading}>SEMI</Text>

        {Array.from({ length: 2 }).map((_, i) => (
          <MatchCard
            key={i}
            team1={r2[i * 2]}
            team2={r2[i * 2 + 1]}
            winner={r3[i]}
            onPick={(team: string) =>
              chooseWinner(r3, setR3, i, team)
            }
          />
        ))}
      </View>

      {/* FINAL */}
      <View style={styles.column}>
        <Text style={styles.heading}>FINAL</Text>

        <MatchCard
          team1={r3[0]}
          team2={r3[1]}
          winner={champion}
          onPick={(team: string) => setChampion(team)}
        />

        <View style={styles.champion}>
          <Text style={styles.championText}>
            🏆 {champion || "Champion"}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#071226",
    padding: 20,
  },

  column: {
    width: 280,
    marginRight: 30,
  },

  heading: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },

  dropdown: {
    backgroundColor: "#fff",
    marginBottom: 6,
    borderRadius: 8,
  },

  match: {
    backgroundColor: "#1e293b",
    padding: 10,
    borderRadius: 12,
    marginBottom: 20,
  },

  team: {
    backgroundColor: "#e2e8f0",
    padding: 12,
    borderRadius: 10,
    marginVertical: 5,
  },

  win: {
    backgroundColor: "#22c55e",
  },

  lose: {
    backgroundColor: "#ef4444",
  },

  champion: {
    backgroundColor: "#facc15",
    padding: 18,
    borderRadius: 12,
    marginTop: 20,
    alignItems: "center",
  },

  championText: {
    fontWeight: "bold",
    fontSize: 18,
  },
});