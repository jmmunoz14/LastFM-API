import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { CreateLocalStyle } from '../assets/styles';

const win = Dimensions.get('window');


export default class Intro extends Component {

    render() {
        return (
            <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
                <TouchableOpacity style={[styles.buttonContainer, { marginBottom: 15 }]} onPress={() => this.props.navigation.navigate("ListsArtist")}>
                    <Text style={styles.buttonText}>
                        ¡Top artistas!
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.buttonContainer, { marginBottom: 15, }]} onPress={() => this.props.navigation.navigate("ListsSongs")}>
                    <Text style={styles.buttonText}>
                        ¡Top canciones!
                    </Text>
                </TouchableOpacity>

            </ScrollView>
        )
    }
}


const styles = CreateLocalStyle({

});
