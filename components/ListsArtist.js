import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Dimensions, ActivityIndicator, Linking, FlatList, SafeAreaView } from 'react-native';
import { CreateLocalStyle } from '../assets/styles';
import Modal from 'react-native-modal';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const APIKEY = "829751643419a7128b7ada50de590067"

const win = Dimensions.get('window');

//ratio de la imagen en tamaño xl
const ratio = win.width / 300;

//Componente que maneja el renderizado del top de artistas en una lista.

export default class ListsArtist extends Component {

    state = {
        artists: [],
        selectedArtist: null,
        visibleModal: false,
        loading: true,
        location: null,
        page: 1,
    }

    componentDidMount() {
        this.fetchIp();
    }

    // manejo para abrir urls
    handleClick = (url) => {
        Linking.canOpenURL(url).then(supported => {
            if (supported) {
                Linking.openURL(url);
            } else {
                console.log("Don't know how to open URI: " + url);
            }
        });
    };

    // fetch a los datos de la api de LASTFM

    apiCall = async (country) => {
        let resp = await fetch('http://ws.audioscrobbler.com/2.0/?method=geo.gettopartists&country=' + country + '&api_key=' + APIKEY + '&format=json&limit=10&page=' + this.state.page);
        let respJson = await resp.json();
        this.setState({ artists: this.state.artists.concat(respJson.topartists.artist), loading: false })
    }

    // Se obtienen los datos de localización de usuario por medio de IP.

    fetchIp() {
        fetch('http://ip-api.com/json')
            .then(response => response.json())
            .then(data =>
                this.setState({ location: data.country }, () => this.apiCall(this.state.location))
            )
    }


    // Metodo que dicta el componente a renderizar para cada uno de los artistas.
    renderRow = ({ item }) => {
        return (
            <TouchableOpacity style={{ borderBottomColor: "#414141", borderBottomWidth: 1, }} onPress={() => this.setState({ visibleModal: true, selectedArtist: item })}>

                <View style={{ flexDirection: "row", paddingStart: win.width * 0.02, marginStart: win.width * 0.05, paddingBottom: 10, paddingTop: 10, alignItems: "center" }}>
                    <Image style={{ width: 50, height: 50, borderRadius: 25, marginEnd: win.width * 0.05 }} source={{ uri: item.image[0]["#text"] }} />
                    <View>
                        <Text style={styles.listTitle}>{item.name}</Text>
                        <Text style={styles.listSubtitle}>Oyentes: {item.listeners}</Text>
                    </View>

                </View>

            </TouchableOpacity>
        )
    }

    //metodo que pide un nuevo fetch de mas artistas.
    handleLoad = ({ }) => {
        this.setState({ page: this.state.page + 1 }, () => this.apiCall(this.state.location));
    }

    renderFooter = () => {
        return (
            <View style={styles.loader} >
                <ActivityIndicator size="large" color="#ec625f" />
            </View>
        )
    }

    render() {
        
        if (this.state.loading) {
            return (
                <ScrollView contentContainerStyle={[styles.container, {
                    justifyContent: "center",
                    flex: 1
                }]}>

                    <ActivityIndicator size="large" color="#ec625f" />
                </ScrollView>
            )
        }
        return (
            <SafeAreaView style={[styles.container]} >

                <Text style={[styles.mainTitle]}>
                    Los artistas mas esuchados en {this.state.location}
                </Text>
                <FlatList
                    style={{ marginStart: 15, marginEnd: 15 }}
                    data={this.state.artists}
                    renderItem={this.renderRow}
                    keyExtractor={(item, index) => index.toString()}
                    onEndReached={this.handleLoad}
                    onEndReachedThreshold={0.3}
                    ListFooterComponent={this.renderFooter}
                />


                <Modal
                    isVisible={this.state.visibleModal}
                    animationIn="zoomIn"
                    animationOut="zoomOut"
                    style={{
                        alignSelf: "center", alignItems: "center", justifyContent: "center"
                    }}
                    supportedOrientations={['portrait', 'landscape']}
                >
                    <ScrollView style={styles.modal}>
                        <MaterialCommunityIcons name="close" size={24} color="#ec625f" style={{ alignSelf: "flex-end" }} onPress={() => this.setState({ visibleModal: false })} />
                        {this.state.selectedArtist &&
                            <View style={{ justifyContent: "center", alignItems: "center" }}>
                                <Image style={{ width: win.width * 0.5, height: 300 * ratio * 0.5, borderRadius: 160 }} source={{ uri: this.state.selectedArtist.image[4]["#text"] }} />
                                <Text style={[styles.modalTitle, { marginTop: 10 }]}>{this.state.selectedArtist.name}</Text>
                                <Text style={[styles.modalSubtitle, { marginTop: 10 }]}>Oyentes: {this.state.selectedArtist.listeners}</Text>
                                <TouchableOpacity onPress={() => this.handleClick(this.state.selectedArtist.url)}>
                                    <Text style={[styles.link, { marginTop: 10, marginBottom: 30 }]}>Ver detalles de artista</Text>
                                </TouchableOpacity>

                            </View>
                        }


                    </ScrollView>
                </Modal>



            </SafeAreaView>
        );
    }
}

const styles = CreateLocalStyle({
    loader: {
        marginTop: 10,
        marginBottom: 10,
        alignItems: "center"
    }
});
