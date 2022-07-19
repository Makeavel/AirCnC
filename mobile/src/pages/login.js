import React , {useState , useEffect } from  'react';
import {View, AsyncStorage , Image , Text , TextInput , TouchableOpacity , StyleSheet } from 'react-native';
import api from '../services/api';

import logo from '../assets/logo.png';

export default function login( { navigation} ){
    const [email,setEmail] = useState('');
    const [techs,setTechs] = useState('');

    useEffect(() => {
        AsyncStorage.getItem('user').then(user => {
            if(user) {
                //navigation.navigate('list');  // ******************** manda para prox pg
            }
        })
    } , []); 

    async function handleSubmit(){
        const response = await api.post('/sessions', {
            email
        })

        const {_id } = response.data;
        
        await AsyncStorage.setItem('user',_id);
        await AsyncStorage.setItem('techs', techs);

        navigation.navigate('list'); // manda para próxima pg, no caso pagina lista
    }

    return (
        <View style={styles.container}>
            <Image source={logo} />
            
            <View style={styles.form}>
                <Text style={styles.label}>Seu E-mail *</Text>
                <TextInput
                    style={styles.input}
                    placeholder= "Seu e-mail"
                    placeholderTextColor= '#999'
                    keyboardType='email-address' // bota o @ no teclado
                    autoCapitalize='none'   // não deixa 1º letra sair maiuscula
                    autoCorrect={false}  // não ativa o corretor automático
                    value={email}
                    onChangeText={text => setEmail(text)}
               /> 

                <Text style={styles.label}>Tecnologias *</Text>
                <TextInput
                    style={styles.input}
                    placeholder= 'Tecnologias de interesse'
                    placeholderTextColor = '#999'
                    autoCapitalize= 'words' // mostra o 1 como maiusculo
                    autoCorrect = {false}  // não ativa corretor automatico
                    value={techs}
                    onChangeText={text => setTechs(text)}
                />

                <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                    <Text style={styles.buttonText}>Encontrar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    form: {
        alignSelf: 'stretch',
        paddingHorizontal: 30,
        marginBottom: 8,

    },


    label: {
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 8,
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

    buttonText: {
        color: '#fff',
        fontWeight: 'bold', // fonte negrito
        fontSize: 16,
    },
});
