import React, { useEffect, useState, useContext } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { format } from 'date-fns';
import { moodEntries } from '../data/moodData';
import { ThemeContext } from '../context/ThemeContext';

export default function MoodHistory({ refresh }) {
  const [entries, setEntries] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [selectedEmotion, setSelectedEmotion] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const [datePickerVisible, setDatePickerVisible] = useState(false);

  const { theme } = useContext(ThemeContext);

  const EMOTIONS = ['feliz', 'triste', 'enojado', 'relajado', 'neutral'];

  useEffect(() => {
    const updated = [...moodEntries];
    setEntries(updated);
    setFiltered(updated);
  }, [refresh]);

  useEffect(() => {
    filterEntries();
  }, [selectedEmotion, searchDate]);

  const filterEntries = () => {
    let temp = [...entries];

    if (selectedEmotion) {
      temp = temp.filter(e => e.emotion === selectedEmotion);
    }

    if (searchDate) {
      temp = temp.filter(e => {
        const d = format(new Date(e.date), 'dd/MM/yyyy');
        return d === searchDate;
      });
    }

    setFiltered(temp);
  };

  const getColor = (emotion) => {
    switch (emotion) {
      case 'feliz': return '#ffe066';
      case 'triste': return '#a2d2ff';
      case 'enojado': return '#ff6b6b';
      case 'relajado': return '#d0f4de';
      case 'neutral': return '#f0efeb';
      default: return '#fff';
    }
  };

  const renderItem = ({ item }) => (
    <View style={[styles.item, { backgroundColor: getColor(item.emotion) }]}>
      <Text style={[styles.date, { color: theme.textColor }]}>
        {format(new Date(item.date), 'dd/MM/yyyy')}
      </Text>
      <Text style={[styles.text, { color: theme.textColor }]}>
        {item.emotion.toUpperCase()}
      </Text>
      {item.description ? (
        <Text style={{ color: theme.textColor }}>{item.description}</Text>
      ) : null}
    </View>
  );

  return (
    <View style={{ backgroundColor: theme.backgroundColor, padding: 10 }}>
      <Text style={[styles.filterTitle, { color: theme.textColor }]}>
        🎯 Filtrar por emoción:
      </Text>
      <View style={styles.emotionFilter}>
        {EMOTIONS.map((e) => (
          <TouchableOpacity
            key={e}
            onPress={() => setSelectedEmotion(e === selectedEmotion ? '' : e)}
            style={[
              styles.emotionButton,
              { backgroundColor: selectedEmotion === e ? theme.accentColor : '#eee' },
            ]}
          >
            <Text style={{ color: theme.textColor }}>{e}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={[styles.filterTitle, { color: theme.textColor }]}>
        📅 Buscar por fecha:
      </Text>
      <TouchableOpacity
        onPress={() => setDatePickerVisible(true)}
        style={[styles.dateButton, { backgroundColor: theme.accentColor }]}
      >
        <Text style={{ color: theme.textColor }}>
          {searchDate ? searchDate : 'Seleccionar fecha'}
        </Text>
      </TouchableOpacity>

      <DateTimePickerModal
        isVisible={datePickerVisible}
        mode="date"
        onConfirm={(date) => {
          const formatted = format(date, 'dd/MM/yyyy');
          setSearchDate(formatted);
          setDatePickerVisible(false);
        }}
        onCancel={() => setDatePickerVisible(false)}
      />

      <FlatList
        data={filtered}
        keyExtractor={(_, i) => i.toString()}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 15,
    margin: 10,
    borderRadius: 10,
  },
  date: {
    fontSize: 12,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  filterTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 10,
  },
  emotionFilter: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  emotionButton: {
    padding: 8,
    margin: 4,
    borderRadius: 5,
  },
  dateButton: {
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
    alignItems: 'center',
  },
});
