import { View, TouchableOpacity, Text, StyleSheet, GestureResponderEvent } from "react-native"
import { buttonColour, buttonDefaultTextSize, defaultFontFamily, textColour } from "../zenpi-configurations"

interface ZenpiButtonProps {
  zenpiButtonText: string,
  stopFunction: ((event: GestureResponderEvent) => void)
}

export const ZenpiButton: React.FC<ZenpiButtonProps> = ({zenpiButtonText, stopFunction}) => {
    return (
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={stopFunction}>
            <Text style={styles.buttonText}>{zenpiButtonText}</Text>
          </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
  buttonText: {
    color: textColour,
    fontSize: buttonDefaultTextSize,
    fontFamily: defaultFontFamily,
    textAlign: 'center',
  },
  button: {
    paddingVertical: 0,
    backgroundColor: buttonColour,
    borderRadius: 8,
    width: 300,
    borderWidth: 1,

  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8
  },
})