import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface GameTimerProps {
  initialMinutes?: number;
  initialSeconds?: number;
  onTimeUp?: () => void;
}

export default function GameTimer({ initialMinutes = 0, initialSeconds = 30, onTimeUp }: GameTimerProps) {
  const [minutes, setMinutes] = useState(initialMinutes);
  const [seconds, setSeconds] = useState(initialSeconds);
  const [milliseconds, setMilliseconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    if (isRunning) {
      interval = setInterval(() => {
        setMilliseconds((prev) => {
          if (prev === 0) {
            if (seconds === 0) {
              if (minutes === 0) {
                setIsRunning(false);
                onTimeUp?.();
                return 0;
              }
              setMinutes((m) => m - 1);
              setSeconds(59);
              return 99;
            }
            setSeconds((s) => s - 1);
            return 99;
          }
          return prev - 1;
        });
      }, 10);
    }

    return () => clearInterval(interval);
  }, [isRunning, minutes, seconds, onTimeUp]);

  const handleStart = () => {
    if (minutes > 0 || seconds > 0) {
      setIsRunning(!isRunning);
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    setMinutes(initialMinutes);
    setSeconds(initialSeconds);
    setMilliseconds(0);
  };

  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(seconds).padStart(2, "0");
  const formattedMilliseconds = String(milliseconds).padStart(2, "0");

  return (
    <View style={styles.container}>
      <View style={styles.timerDisplay}>
        <Text style={styles.timeText}>
          {formattedMinutes}:{formattedSeconds}:{formattedMilliseconds}
        </Text>
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={[styles.button, isRunning && styles.buttonActive]} onPress={handleStart}>
          <Text style={styles.buttonText}>{isRunning ? "Pause" : "Start"}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginVertical: 20,
  },
  timerDisplay: {
    width: 320,
    height: 90,
    borderRadius: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
    elevation: 5,
    shadowColor: "#a75f4a",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    borderWidth: 3,
    borderColor: "#a75f4a",
  },
  timeText: {
    fontSize: 44,
    fontWeight: "bold",
    color: "#a75f4a",
    fontFamily: "Courier New",
  },
  buttonsContainer: {
    flexDirection: "row",
    gap: 10,
    width: 320,
  },
  button: {
    backgroundColor: "#517c96",
    paddingHorizontal: 0,
    paddingVertical: 12,
    flex: 1,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
    shadowColor: "#a75f4a",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
  },
  buttonActive: {
    backgroundColor: "#a75f4a",
  },
  resetButton: {
    backgroundColor: "#349aae",
    paddingHorizontal: 0,
    paddingVertical: 12,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    elevation: 3,
    shadowColor: "#a75f4a",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ffffff",
  },
});
