import React  ,  {useState} from 'react';
import { SafeAreaView, Alert , StyleSheet, TextInput , TouchableOpacity , AsyncStorage, Text } from 'react-native';

import api from '../services/api';

export default function book({ navigation }) {
    const id = navigation.getParam('id');
    const [date, setDate] = useState('');

  async function handleSubmit(){
      const user_id = await AsyncStorage.getItem('user');
       
      await api.post(`/spots/${id}/bookings`, {
          date
      }, {
          headers: { user_id }
      })

      Alert.alert('Solicitação enviada.');

      navigation.navigate('list');
    }  

   function handleCancel(){
       navigation.navigate('list');
   } 

    return (
        <SafeAreaView style={ styles.container}>
            <Text style={styles.label}>Data de Interesse *</Text>
            <TextInput
                style={styles.input}
                placeholder="Qual data você quer reservar?"
                placeholderTextColor='#999'
                autoCapitalize='words'   // não deixa 1º letra sair maiuscula
                autoCorrect={false}  // não ativa o corretor automático
                value={date}
                onChangeText={setDate}
            />

            <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                <Text style={styles.buttonText}>Solicitar Reserva</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleCancel} style={[styles.button , styles.cancelButton]}>
                <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({

    container: {
        margin: 42,
    },

    label: {
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 8,
        marginTop: 30,
    },

    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#444',
        height: 44,
        marginBottom: 20,
        borderRadius: 2
    },

    button: {
        height: 42,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2, //borda arredondada
    },

    cancelButton: {
        backgroundColor: '#ccc',  
        marginTop: 10,
    },

    buttonText: {
        color: '#fff',
        fontWeight: 'bold', // fonte negrito
        fontSize: 16,
    },

});