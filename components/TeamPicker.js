import { Picker } from "@react-native-picker/picker";

export default function TeamPicker({ selected, onChange, options }) {
  return (
    <Picker
      selectedValue={selected?.id}
      onValueChange={(itemValue) => {
        const team = options.find((t) => t.id === itemValue);
        onChange(team);
      }}
      style={{ backgroundColor: "#fff", marginBottom: 5 }}
    >
      <Picker.Item label="Select Team" value={null} />
      {options.map((team) => (
        <Picker.Item
          key={team.id}
          label={`${team.logo} ${team.name}`}
          value={team.id}
        />
      ))}
    </Picker>
  );
}