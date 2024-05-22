import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Modal, TextInput, Alert, FlatList } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';

// Configuration des noms de mois et de jours pour le français
LocaleConfig.locales['fr'] = {
  monthNames: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
  monthNamesShort: ['Janv.', 'Févr.', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'],
  dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
  dayNamesShort: ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.'],
};
LocaleConfig.defaultLocale = 'fr';

const CalendarScreen = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [holidayTitle, setHolidayTitle] = useState('');
  const [eventTitle, setEventTitle] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [taskTitle, setTaskTitle] = useState('');
  const [tasks, setTasks] = useState({}); // État pour stocker les tâches ajoutées
  const [events, setEvents] = useState({}); // État pour stocker les événements ajoutés

  // Définition des jours fériés avec leurs titres et couleurs
  const markedDates = {
    '2024-01-01': { selected: true, marked: true, dotColor: '#FF5733', holidayTitle: "Jour de l'an" },
    '2024-03-20': { selected: true, marked: true, dotColor: '#FF5733', holidayTitle: "Fête de l'indépendance" },
    '2024-04-09': { selected: true, marked: true, dotColor: '#FF5733', holidayTitle: "Fête des Martyrs" },
    '2024-05-01': { selected: true, marked: true, dotColor: '#FF5733', holidayTitle: "Fête du Travail" },
    '2024-06-16': { selected: true, marked: true, dotColor: '#FF5733', holidayTitle: "Aïd El Idha" },
    '2024-06-17': { selected: true, marked: true, dotColor: '#FF5733', holidayTitle: "Aïd El Idha" },
    '2024-07-07': { selected: true, marked: true, dotColor: '#FF5733', holidayTitle: "Jour de l'an Hégirien 1442" },
    '2024-07-25': { selected: true, marked: true, dotColor: '#FF5733', holidayTitle: "Fête de la République" },
    '2024-08-13': { selected: true, marked: true, dotColor: '#FF5733', holidayTitle: "Fête de la Femme" },
    '2024-09-15': { selected: true, marked: true, dotColor: '#FF5733', holidayTitle: "Fête du Mouled" },
    '2024-10-15': { selected: true, marked: true, dotColor: '#FF5733', holidayTitle: "Fête de l'Evacuation" },
    '2024-12-17': { selected: true, marked: true, dotColor: '#FF5733', holidayTitle: "Fête de la Révolution" },
  };

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
    if (markedDates[day.dateString]) {
      setHolidayTitle(markedDates[day.dateString].holidayTitle);
      setModalVisible(true);
    } else {
      setHolidayTitle('');
      setModalVisible(true);
    }
  };

  const handleAddEvent = () => {
    if (eventTitle) {
      const newEvent = {
        title: eventTitle,
        description: eventDescription,
      };
      const updatedEvents = {
        ...events,
        [selectedDate]: newEvent,
      };
      setEvents(updatedEvents);
      Alert.alert('Événement ajouté !', `Titre: ${eventTitle}\nDescription: ${eventDescription}`);
      setEventTitle('');
      setEventDescription('');
      setModalVisible(false);
    } else {
      Alert.alert('Erreur', 'Veuillez saisir un titre pour l\'événement.');
    }
  };

  const handleAddTask = () => {
    if (taskTitle) {
      const newTask = {
        title: taskTitle,
      };
      const updatedTasks = {
        ...tasks,
        [selectedDate]: [...(tasks[selectedDate] || []), newTask],
      };
      setTasks(updatedTasks);
      Alert.alert('Tâche ajoutée !', `Tâche: ${taskTitle}`);
      setTaskTitle('');
    } else {
      Alert.alert('Erreur', 'Veuillez saisir une tâche.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calendrier</Text>
      <Calendar
        onDayPress={handleDayPress}
        style={styles.calendar}
        markedDates={{
          ...markedDates,
          ...events, // Afficher les événements ajoutés
          [selectedDate]: { selected: true, selectedColor: '#2E66E7' },
        }}
        theme={{
          textSectionTitleColor: '#2E66E7',
          selectedDayBackgroundColor: '#2E66E7',
          todayTextColor: '#2E66E7',
          arrowColor: '#2E66E7',
        }}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {holidayTitle ? (
              <Text style={styles.holidayTitle}>{holidayTitle}</Text>
            ) : (
              <>
                <TextInput
                  style={styles.input}
                  placeholder="Titre de l'événement"
                  value={eventTitle}
                  onChangeText={(text) => setEventTitle(text)}
                />
                <TextInput
                  style={[styles.input, { height: 100 }]}
                  placeholder="Description (optionnel)"
                  multiline
                  value={eventDescription}
                  onChangeText={(text) => setEventDescription(text)}
                />
                <TouchableOpacity style={styles.button} onPress={handleAddEvent}>
                  <Text style={styles.buttonText}>Ajouter un événement</Text>
                </TouchableOpacity>
                <TextInput
                  style={styles.input}
                  placeholder="Tâche à faire"
                  value={taskTitle}
                  onChangeText={(text) => setTaskTitle(text)}
                />
                <TouchableOpacity style={styles.button} onPress={handleAddTask}>
                  <Text style={styles.buttonText}>Ajouter une tâche</Text>
                </TouchableOpacity>
                {tasks[selectedDate] && (
                  <>
                    <Text style={styles.sectionTitle}>Tâches prévues pour aujourd'hui :</Text>
                    <FlatList
                      data={tasks[selectedDate]}
                      renderItem={({ item }) => (
                        <Text style={styles.taskItem}>{item.title}</Text>
                      )}
                      keyExtractor={(item, index) => index.toString()}
                      style={styles.taskList}
                    />
                  </>
                )}
              </>
            )}
            <TouchableOpacity style={styles.button} onPress={() => setModalVisible(false)}>
              <Text style={styles.buttonText}>Fermer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2E66E7',
  },
  calendar: {
    marginBottom: 20,
    width: '100%', // Utilisation de 100% de la largeur disponible
    aspectRatio: 1, // Ratio 1:1 pour une taille carrée
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent
: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  holidayTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#FF5733',
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#2E66E7',
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#2E66E7',
  },
  taskList: {
    maxHeight: 100,
    width: '100%',
  },
  taskItem: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default CalendarScreen;
