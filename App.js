import { SafeAreaView, StatusBar } from "react-native";
import Bracket from "./components/Bracket";

export default function App() {
  return (
    <SafeAreaView style={{ flex:1 }}>
      <StatusBar barStyle="light-content" />
      <Bracket />
    </SafeAreaView>
  );
}