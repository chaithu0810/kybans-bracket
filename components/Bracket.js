import { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { teams } from "../data/teams";
import MatchCard from "./MatchCard";

export default function Bracket() {
  const [round1] = useState([
    [teams[0], teams[1]],
    [teams[2], teams[3]],
    [teams[4], teams[5]],
    [teams[6], teams[7]],
    [teams[8], teams[9]],
    [teams[10], teams[11]],
    [teams[12], teams[13]],
    [teams[14], teams[15]],
  ]);

  const [qf, setQf] = useState([]);
  const [sf, setSf] = useState([]);
  const [fn, setFn] = useState([]);
  const [champion, setChampion] = useState(null);

  const nextRound = (list) => {
    let arr = [];
    for (let i = 0; i < list.length; i += 2)
      arr.push([list[i], list[i + 1]]);
    return arr;
  };

  return (
    <ScrollView horizontal style={{ padding: 20, backgroundColor:"#0f172a" }}>
      
      {/* ROUND 1 */}
      <View style={{ marginRight: 30 }}>
        <Text style={{ color:"#fff" }}>ROUND 1</Text>
        {round1.map((m, i) => (
          <MatchCard
            key={i}
            team1={m[0]}
            team2={m[1]}
            winner={qf[i]}
            onSelect={(team) => {
              let arr = [...qf];
              arr[i] = team;
              setQf(arr);
            }}
          />
        ))}
      </View>

      {/* QUARTER */}
      <View style={{ marginRight: 30 }}>
        <Text style={{ color:"#fff" }}>QUARTER</Text>
        {nextRound(qf).map((m, i) => (
          <MatchCard
            key={i}
            team1={m[0]}
            team2={m[1]}
            winner={sf[i]}
            onSelect={(team) => {
              let arr = [...sf];
              arr[i] = team;
              setSf(arr);
            }}
          />
        ))}
      </View>

      {/* SEMI */}
      <View style={{ marginRight: 30 }}>
        <Text style={{ color:"#fff" }}>SEMI</Text>
        {nextRound(sf).map((m, i) => (
          <MatchCard
            key={i}
            team1={m[0]}
            team2={m[1]}
            winner={fn[i]}
            onSelect={(team) => {
              let arr = [...fn];
              arr[i] = team;
              setFn(arr);
            }}
          />
        ))}
      </View>

      {/* FINAL */}
      <View style={{ marginRight: 30 }}>
        <Text style={{ color:"#fff" }}>FINAL</Text>
        {nextRound(fn).map((m, i) => (
          <MatchCard
            key={i}
            team1={m[0]}
            team2={m[1]}
            winner={champion}
            onSelect={(team) => setChampion(team)}
          />
        ))}

        <Text style={{
          color:"gold",
          fontSize:22,
          marginTop:20
        }}>
          🏆 {champion?.name || "Champion"}
        </Text>
      </View>

    </ScrollView>
  );
}