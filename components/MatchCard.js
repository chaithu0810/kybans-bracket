import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function MatchCard({
  team1,
  team2,
  winner,
  onSelect,
}) {
  return (
    <View style={styles.box}>
      <TouchableOpacity
        style={[
          styles.team,
          winner?.id === team1?.id && styles.win,
          winner && winner?.id !== team1?.id && styles.lose,
        ]}
        onPress={() => onSelect(team1)}
      >
        <Text>{team1?.logo} {team1?.name || "Select Team"}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.team,
          winner?.id === team2?.id && styles.win,
          winner && winner?.id !== team2?.id && styles.lose,
        ]}
        onPress={() => onSelect(team2)}
      >
        <Text>{team2?.logo} {team2?.name || "Select Team"}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: "#1e293b",
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
  team: {
    padding: 10,
    backgroundColor: "#e2e8f0",
    marginVertical: 5,
    borderRadius: 8,
  },
  win: {
    backgroundColor: "#22c55e",
  },
  lose: {
    backgroundColor: "#ef4444",
  },
});