import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  title: { fontSize: 35 },
  text: { fontSize: 20 },
  container: {
    display: "flex",
    width: "100%",
    height: "100%",
    paddingLeft: 3,
    paddingRight: 5,
    marginTop: 3,
  },
  column: {
    flexDirection: "column",
    width: "100%",
    height: "auto",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    height: "auto",
    justifyContent: "space-between",
  },
  textThemeDark: {
    color: "white",
  },
  mainContainer: {
    alignItems: "center",
    height: "100%",
    marginTop: 0,
    marginBottom: 0,
  },
  chosenExpDisplay: {
    marginTop: 10,
    marginBottom: 10,
  },
  calcButton: {
    marginTop: 20,
    marginBottom: 10,
    width: "100%",
  },
  numInput: {
    borderColor: "white",
    borderWidth: 2,
    width: "20%",
    color: "white",
    textAlign: "center",
    borderRadius: 5,
  },
  levelInput: { borderColor: "red" },
  numInputContainer: { marginTop: 5, marginBottom: 5 },
});

export default styles;
