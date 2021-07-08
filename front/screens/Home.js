import React, { Component } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: 'username',
            password: 'password'
        }
    }

    render() {
        const { navigation } = this.props;
        return (
            <View style={styles.mainContainer}>
                <Image style={styles.logo} source={require('../assets/logo.png')}/>
                <View>
                    <View style={styles.formContainer}>
                        <Text>{this.state.username}</Text>
                    </View>
                    <View style={[styles.formContainer, styles.paddingBetweenForm]}>
                        <Text>{this.state.password}</Text>
                    </View>
                </View>
                <TouchableOpacity style= {styles.scannerButton} onPress={() => navigation.navigate("ImageSelector")}>
                    <View style={styles.vertCross}></View>
                    <View style={styles.horiCross}></View>
                    <Image style={styles.bottleIcon} source={require('../assets/plastic-bottle.png')}/>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex:1,
        display: "flex",
        justifyContent: 'space-between',
        alignItems: "center",
        backgroundColor: "white"
    },

    logo: {
        marginTop: 75,
        height: 200,
        width: 200
    },

    bottleIcon: {
        height: 120,
        width: 120
    },

    paddingBetweenForm: {
        marginTop: 20
    },

    scannerButton: {
        alignItems: "center",
        justifyContent: "center",
        borderStyle: "solid",
        borderWidth: 5,
        borderRadius: 5,
        borderColor: "black",
        marginBottom:75
    },

    vertCross: {
        position: "absolute",
        marginTop: -10,
        height: 160,
        width: 50,
        backgroundColor: "white"
    },

    horiCross: {
        position: "absolute",
        marginTop: 25,
        height: 50,
        width: 160,
        backgroundColor: "white"
    },

    formContainer: {
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 50,
        paddingRight: 50,
        backgroundColor: "lightgrey",
        borderRadius: 50
    }

});