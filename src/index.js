import React, {useEffect, useState} from 'react';
import { SafeAreaView, Text, StyleSheet, StatusBar, FlatList, TouchableOpacity } from 'react-native'
import api from './services/api'


export default function App() {

    const [books, setBooks] = useState([]);

    useEffect( () => {
        api.get('books').then(response => {
            console.log(response.data)
            setBooks(response.data)
        });
    }, []);

    async function handleAddBook() {
        const response = await api.post('books', {
            name: `Novo Book ${Date.now()}`,
            author: 'João Calvino'
        });

        const book = response.data

        setBooks([...books, book])
    }


    return (
        <>
            <StatusBar barStyle='light-content' />

{/* SafeAreaView ocupa somente a área visível da tela */}
            <SafeAreaView style={styles.container}>
                <FlatList 
                    data={books}
                    keyExtractor={book => book.id}
                    renderItem={({ item: book }) => (
                        <Text style={styles.book}>{book.name}</Text>
                    )}
                />

                <TouchableOpacity 
                    activeOpacity={0.6} 
                    style={styles.button} 
                    onPress={handleAddBook}
                >
                    <Text style={styles.buttonText}>Adicionar Projeto</Text>
                </TouchableOpacity>
            </SafeAreaView>

        </>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#7159c1',
        flex: 1,
    },
    book: {
        color: '#fff',
        fontSize: 20,
        
    },
    button: {
        backgroundColor: '#fff',
        margin: 20,
        height: 50,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: 16,
    }
});