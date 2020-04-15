import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, TextInput, Button, Header, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import firebase from '../components/firebase';

export default function Search(props) {
    navigationOptions = { title: 'Search', };

    const [easyPlants, setEasyPlants] = React.useState([]);
    const [foodPlants, setFoodPlants] = React.useState([]);
    const [lowWaterPlants, setlowWaterPlants] = React.useState([]);
    const { navigate } = props.navigation;
    const [searchedPlant, setSearchedPlant] = React.useState('');

    React.useEffect(() => {
        firebase.database().ref('kasvit/').on('value', snapshot => {
          const plants = Object.values(snapshot.val());
          const easyPlants = plants.filter(plant => plant.hoito === 'Helppo')
          const foodPlants = plants.filter(plant => plant.tyyppi === 'Ruokakasvi')
          const lowWaterPlants = plants.filter(plant => plant.vesitarve === 'Niukka')
        
          setEasyPlants(easyPlants);
          setFoodPlants(foodPlants);
          setlowWaterPlants(lowWaterPlants);
    
        });
    }, []);

    const search = () => {
        Alert.alert('Tää ei viel tee mitää :/')
    }

    return (
        <View style={styles.container}>
            <View style={[styles.searchbarcontainer]}>
            <Text style={[styles.header]}>Haku</Text>
            <View style={[styles.searchbar]}>
                <TouchableOpacity onPress={search} >
                    <Ionicons name="ios-search" size={20} style={[styles.icon]} />
                </TouchableOpacity>
                <TextInput
                    style={[styles.textinput]}
                    clearButtonMode={"always"}
                    placeholder={'Hae kasveja'}
                    onChangeText={searchedPlant => setSearchedPlant(searchedPlant)}
                    value={searchedPlant}>
                </TextInput>
            </View>
        </View>
            <ScrollView style={[styles.topborder]} >
                <View style={styles.category}>
                    <Text style={styles.text}>Helppohoitoiset kasvit</Text>
                    <FlatList
                        horizontal={true}
                        contentContainerStyle={{ alignSelf: 'flex-start' }}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        marginLeft={15}
                        data={easyPlants}
                        renderItem={({ item }) =>
                            <TouchableOpacity
                                onPress={() => navigate('NewPlant')}
                                title="NewPlant"
                                style={[styles.border]}
                            >
                                <Text style={[styles.plantheader]}>{item.laji}</Text>
                                <Image style={[styles.plantimage]} source={require('../assets/kaktus.png')} />

                            </TouchableOpacity>

                        }
                    />
                </View>
                <View style={styles.category}>
                    <Text style={styles.text}>Ruoka kasvit</Text>
                    <FlatList
                        horizontal={true}
                        contentContainerStyle={{ alignSelf: 'flex-start' }}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        marginLeft={15}
                        data={foodPlants}
                        renderItem={({ item }) =>
                            <TouchableOpacity
                                onPress={() => navigate('NewPlant')}
                                title="NewPlant"
                                style={[styles.border]}
                            >
                                <Text style={[styles.plantheader]}>{item.laji}</Text>
                                <Image style={[styles.plantimage]} source={require('../assets/flowerpot.png')} />

                            </TouchableOpacity>

                        }
                    />
                </View>
                <View style={styles.category}>
                    <Text style={styles.text}>Kuivuutta kestävät kasvit</Text>
                    <FlatList
                        horizontal={true}
                        contentContainerStyle={{ alignSelf: 'flex-start' }}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        marginLeft={15}
                        data={lowWaterPlants}
                        renderItem={({ item }) =>
                            <TouchableOpacity
                                onPress={() => navigate('NewPlant')}
                                title="NewPlant"
                                style={[styles.border]}
                            >
                                <Text style={[styles.plantheader]}>{item.laji}</Text>
                                <Image style={[styles.plantimage]} source={require('../assets/aloevera.jpeg')} />

                            </TouchableOpacity>
                        }
                    />
                </View>
            </ScrollView>

        </View>
    );



};

Search.navigationOptions = ({ navigate }) => ({ title: 'Search' });

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FCFCFC',
        
    },
    topborder: {
        borderTopColor: '#DEDDDD', 
        borderTopWidth: 1,
        
    },
    category: {
        flex: 2,
        marginTop: 25
    },
    plantheader: { 
        textAlign: 'center', 
        fontSize: 16, 
        marginTop: 10, 
        fontWeight: "bold" 
    },
    plantimage: { 
        width: 150, 
        height: 150 
    },
    text: {
        fontSize: 14,
        fontWeight: "bold",
        marginLeft: 10,
        marginBottom: 15,
    },
    border: {
        borderWidth: 2,
        borderColor: "#0000000D",
        borderRadius: 2,
        marginRight: 3,
        marginLeft: 3,
    },
    searchbarcontainer: {
        backgroundColor: '#FCFCFC',
        marginTop: 28,
        alignSelf: 'center',
        
    },
    header: {
        textAlign: 'center',
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 15
    },
    searchbar: {
        flexDirection: 'row',
        marginTop: 10,
        backgroundColor: '#F0F0F0',
        borderRadius: 6,
        width: '95%',
        height: 40,
        marginBottom: 15

    },
    textinput: {
        width: '80%',
        marginLeft: 10

    },
    icon: {
        color: 'grey',
        marginLeft: 10,
        marginTop: 10
    }
});