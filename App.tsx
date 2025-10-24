import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tres en Linea</Text>

      <View style={styles.board}>

        <View style={styles.row}>
          <Pressable style={styles.button}><Text style={styles.title}>1</Text></Pressable>
          <Pressable style={styles.button}><Text style={styles.title}>2</Text></Pressable>
          <Pressable style={styles.button}><Text style={styles.title}>3</Text></Pressable>
        </View>

        <View style={styles.row}>
          <Pressable style={styles.button}><Text style={styles.title}>4</Text></Pressable>
          <Pressable style={styles.button}><Text style={styles.title}>5</Text></Pressable>
          <Pressable style={styles.button}><Text style={styles.title}>6</Text></Pressable>
        </View>

        <View style={styles.row}>
          <Pressable style={styles.button}><Text style={styles.title}>7</Text></Pressable>
          <Pressable style={styles.button}><Text style={styles.title}>8</Text></Pressable>
          <Pressable style={styles.button}><Text style={styles.title}>9</Text></Pressable>
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },

  row: {
    flexDirection: "row",
    justifyContent: "center"
  },

  board: {
    width: 375,
    height: 375,
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#333",
    justifyContent: "center",
    alignItems: "center",
  },

  button: {
    width: 125,
    height: 125,
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#333",
  }
});
