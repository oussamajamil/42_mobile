import { View, Text } from "react-native";
import React from "react";
import { Calendar } from "react-native-calendars";
interface CalendarProps {
  onDayPress: (day: any) => void;
  defaultDate?: string;
  selectedDate?: string;
  markedDates?: any;
}
const CalendarComponent = ({
  onDayPress,
  defaultDate,
  selectedDate,
  markedDates,
}: CalendarProps) => {
  return (
    <Calendar
      onDayPress={(day: any) => {
        onDayPress(day);
      }}
      markedDates={{
        ...markedDates,
        [selectedDate || defaultDate || ""]: {
          selected: true,
          selectedColor: "#2E3A59",
        },
      }}
      theme={{
        calendarBackground: "#ffffff",
        textSectionTitleColor: "#b6c1cd",
        selectedDayBackgroundColor: "#2E3A59",
        selectedDayTextColor: "#ffffff",
        todayTextColor: "#00adf5",
        dayTextColor: "#2d4150",
        textDisabledColor: "#d9e1e8",
        dotColor: "#00adf5",
        selectedDotColor: "#ffffff",
        arrowColor: "orange",
        monthTextColor: "blue",
        textDayFontFamily: "monospace",
        textMonthFontFamily: "monospace",
        textDayHeaderFontFamily: "monospace",
        textMonthFontWeight: "bold",
        textDayFontSize: 16,
        textMonthFontSize: 16,
        textDayHeaderFontSize: 16,
      }}
    />
  );
};

export default CalendarComponent;
