import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, Image, ActivityIndicator } from 'react-native';
import client from '../api/client';
const baseUrl = 'http://192.168.0.100:8000/storage/contacts/';

export default class FetchContact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            isLoading: true,
            isError: false
        };
    }

    // Mount User Method
    componentDidMount() {
        this.getContact()
    }

    //   Get Api Users
    getContact = async () => {
        try {
            const response = await client.get(`contact_tes`)
            this.setState({ isError: false, isLoading: false, data: response.data })
        } catch (error) {
            console.log(error);
            this.setState({ isLoading: false, isError: true })
        }
    }



    render() {
        //  If load data
        if (this.state.isLoading) {
            return (
                <View
                    style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}
                >
                    <ActivityIndicator size='large' color='red' />
                </View>
            )
        }
        // If data not fetch
        else if (this.state.isError) {
            return (
                <View
                    style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}
                >
                    <Text>Terjadi Error Saat Memuat Data</Text>
                </View>
            )
        }
        // If data finish load
        return (
            <FlatList
                data={this.state.data}
                renderItem={({ item }) =>
                    <View style={styles.viewList}>
                        <View>
                            <Image source={{ uri: `${baseUrl}{item.foto}` }} style={styles.Image} />
                        </View>
                        <View>
                            <Text style={styles.textItemNama}> {item.nama}</Text>
                            <Text style={styles.textItemHp}> {item.no_hp}</Text>
                            <Text style={styles.textItemAlamat}> {item.alamat}</Text>

                        </View>
                    </View>
                }
                keyExtractor={({ id }, index) => index}
            />
        );
    }
}

const styles = StyleSheet.create({
    viewList: {
        height: 100,
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#DDD',
        alignItems: 'center'
    },
    Image: {
        width: 88,
        height: 80,
        borderRadius: 40
    },
    textItemNama: {
        fontWeight: 'bold',
        textTransform: 'capitalize',
        marginLeft: 20,
        fontSize: 16
    },
    textItemHp: {
        fontWeight: 'bold',
        marginLeft: 20,
        fontSize: 13,
        marginTop: 10,
        color: 'blue'
    },
    textItemAlamat: {
        fontWeight: 'bold',
        marginLeft: 20,
        fontSize: 13,
        marginTop: 10,
        color: 'black'
    },
})