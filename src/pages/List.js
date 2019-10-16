import React, { useState, useEffect } from 'react';
import { 
    SafeAreaView, AsyncStorage, Text, Image, StyleSheet, TouchableOpacity, ScrollView 
} from 'react-native';


import SpotList from '../components/SpotList';

import logo from '../assets/logo.png';

export default function List({ navigation }){
    const [ techs, setTechs] = useState([]);

    useEffect(() => {
        AsyncStorage.getItem('techs').then(storageTechs => {
            const techsArray = storageTechs.split(',').map(tech => tech.trim());

            setTechs(techsArray);
        })
    }, []);

    logout = async() => {
        AsyncStorage.clear();
        navigation.navigate('Login');
    }

    return (
    <SafeAreaView style={styles.container}>
        <Image style={styles.logo} source={logo} />
        <ScrollView>
            {techs.map(tech => <SpotList key={tech} tech={tech} />)}
        </ScrollView>
    <TouchableOpacity style={styles.logoutButton} onPress={logout}>
    <Text style={styles.textButton}>SAIR</Text>
    </TouchableOpacity>
    </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    
    logo: {
        height: 32,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginTop: 15
    },

    logoutButton:{
        height: 45,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
        marginTop: 15,
        marginBottom: 15,
    },

    textButton: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold'
    }

});