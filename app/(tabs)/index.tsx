import React, { useState } from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

const teams = [
  "⚔️ The Swords",
  "👑 The Kings",
  "🦁 The Lions",
  "🐯 The Tigers",
  "🐺 The Wolves",
  "🔥 The Titans",
  "⚡ The Warriors",
  "🦅 The Eagles",
  "🐉 The Dragons",
  "🥷 The Ninjas",
  "🐂 The Bulls",
  "🐆 The Panthers",
  "👻 The Ghosts",
  "🛡️ The Vikings",
  "🦈 The Sharks",
  "🐎 The Riders",
];

export default function HomeScreen() {
  const [left1, setLeft1] = useState<string[]>([]);
  const [right1, setRight1] = useState<string[]>([]);
  const [left2, setLeft2] = useState<string[]>([]);
  const [right2, setRight2] = useState<string[]>([]);
  const [finalists, setFinalists] = useState<string[]>([]);
  const [champion, setChampion] = useState("");

  const setWinner = (
    arr: string[],
    setter: any,
    index: number,
    team: string
  ) => {
    const copy = [...arr];
    copy[index] = team;
    setter(copy);
  };

  const Match = ({
    a,
    b,
    winner,
    onPick,
  }: any) => (
    <View style={styles.match}>
      <TouchableOpacity
        activeOpacity={0.8}
        style={[
          styles.card,
          winner === a && styles.win,
          winner && winner !== a && styles.lose,
        ]}
        onPress={() => onPick(a)}
      >
        <Text style={styles.cardText}>{a || "TBD"}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.8}
        style={[
          styles.card,
          winner === b && styles.win,
          winner && winner !== b && styles.lose,
        ]}
        onPress={() => onPick(b)}
      >
        <Text style={styles.cardText}>{b || "TBD"}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.main}>
      <Text style={styles.header}>🏆 KYBANS TOURNAMENT</Text>
      <Text style={styles.sub}>
        Recruiter Winning Premium Frontend
      </Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {/* LEFT ROUND */}
        <View style={styles.col}>
          <Text style={styles.title}>ROUND 1</Text>

          {Array.from({ length: 4 }).map((_, i) => (
            <Match
              key={i}
              a={teams[i * 2]}
              b={teams[i * 2 + 1]}
              winner={left1[i]}
              onPick={(team: string) =>
                setWinner(left1, setLeft1, i, team)
              }
            />
          ))}
        </View>

        {/* LEFT SEMI */}
        <View style={styles.col}>
          <Text style={styles.title}>SEMI</Text>

          <View style={{ marginTop: 80 }}>
            <Match
              a={left1[0]}
              b={left1[1]}
              winner={left2[0]}
              onPick={(team: string) =>
                setWinner(left2, setLeft2, 0, team)
              }
            />
          </View>

          <View style={{ marginTop: 120 }}>
            <Match
              a={left1[2]}
              b={left1[3]}
              winner={left2[1]}
              onPick={(team: string) =>
                setWinner(left2, setLeft2, 1, team)
              }
            />
          </View>
        </View>

        {/* LEFT FINALIST */}
        <View style={styles.col}>
          <Text style={styles.title}>FINALIST</Text>

          <View style={{ marginTop: 220 }}>
            <Match
              a={left2[0]}
              b={left2[1]}
              winner={finalists[0]}
              onPick={(team: string) =>
                setWinner(finalists, setFinalists, 0, team)
              }
            />
          </View>
        </View>

        {/* FINAL */}
        <View style={styles.col}>
          <Text style={styles.finalTitle}>🏆 FINAL</Text>

          <View style={{ marginTop: 220 }}>
            <Match
              a={finalists[0]}
              b={finalists[1]}
              winner={champion}
              onPick={(team: string) => setChampion(team)}
            />
          </View>

          <View style={styles.championBox}>
            <Text style={styles.championText}>
              {champion || "Champion"}
            </Text>
          </View>
        </View>

        {/* RIGHT FINALIST */}
        <View style={styles.col}>
          <Text style={styles.title}>FINALIST</Text>

          <View style={{ marginTop: 220 }}>
            <Match
              a={right2[0]}
              b={right2[1]}
              winner={finalists[1]}
              onPick={(team: string) =>
                setWinner(finalists, setFinalists, 1, team)
              }
            />
          </View>
        </View>

        {/* RIGHT SEMI */}
        <View style={styles.col}>
          <Text style={styles.title}>SEMI</Text>

          <View style={{ marginTop: 80 }}>
            <Match
              a={right1[0]}
              b={right1[1]}
              winner={right2[0]}
              onPick={(team: string) =>
                setWinner(right2, setRight2, 0, team)
              }
            />
          </View>

          <View style={{ marginTop: 120 }}>
            <Match
              a={right1[2]}
              b={right1[3]}
              winner={right2[1]}
              onPick={(team: string) =>
                setWinner(right2, setRight2, 1, team)
              }
            />
          </View>
        </View>

        {/* RIGHT ROUND */}
        <View style={styles.col}>
          <Text style={styles.title}>ROUND 1</Text>

          {Array.from({ length: 4 }).map((_, i) => (
            <Match
              key={i}
              a={teams[8 + i * 2]}
              b={teams[8 + i * 2 + 1]}
              winner={right1[i]}
              onPick={(team: string) =>
                setWinner(right1, setRight1, i, team)
              }
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "#031226",
    paddingTop: 20,
  },

  header: {
    textAlign: "center",
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
  },

  sub: {
    textAlign: "center",
    color: "#94a3b8",
    marginBottom: 20,
    marginTop: 5,
  },

  col: {
    marginHorizontal: 16,
  },

  title: {
    color: "#cbd5e1",
    fontSize: 18,
    textAlign: "center",
    marginBottom: 18,
    fontWeight: "bold",
  },

  finalTitle: {
    color: "#facc15",
    fontSize: 22,
    textAlign: "center",
    marginBottom: 18,
    fontWeight: "bold",
  },

  match: {
    marginBottom: 22,
  },

  card: {
    width: 230,
    padding: 13,
    backgroundColor: "#f1f5f9",
    borderRadius: 14,
    marginVertical: 5,
    shadowColor: "#000",
    shadowOpacity: 0.18,
    shadowRadius: 6,
  },

  cardText: {
    fontSize: 15,
    fontWeight: "600",
  },

  win: {
    backgroundColor: "#22c55e",
  },

  lose: {
    backgroundColor: "#ef4444",
  },

  championBox: {
    backgroundColor: "#facc15",
    padding: 18,
    borderRadius: 14,
    marginTop: 28,
    alignItems: "center",
  },

  championText: {
    fontWeight: "bold",
    fontSize: 20,
  },
});