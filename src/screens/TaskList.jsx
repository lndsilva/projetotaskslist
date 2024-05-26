import React from "react";
import { View, Text, ImageBackground, StyleSheet, SafeAreaView, FlatList } from "react-native";

import commonStyles from "../commonStyles";

import todayImage from '../../assets/imgs/today.jpg'
import moment from 'moment'
import 'moment/locale/pt-br'

import Task from "../components/Task";

export default props => {

    state = {
        tasks: [{
            id: Math.random(),
            descricao: 'Comprar livro de React Native',
            dataEstimada: new Date(),
            concluidaEm: new Date(),
        },
        {
            id: Math.random(),
            descricao: 'Ler livro de React Native',
            dataEstimada: new Date(),
            concluidaEm: null,
        },
        ]
    }

    const today = moment().locale('pt-br').format('ddd, D [de] MMMM')

    return (
        <SafeAreaView style={style.container}>
            <ImageBackground source={todayImage} style={style.background}>
                <View style={style.titleBar}>
                    <Text style={style.title}>Hoje</Text>
                    <Text style={style.subTitle}>{today}</Text>
                </View>
            </ImageBackground>

            <View style={style.taskList}>
                <FlatList
                    data={this.state.tasks}
                    keyExtractor={item => `${item.id}`}
                    renderItem={({ item }) => <Task {...item} />}
                />
            </View>

        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        flex: 3,
    },
    taskList: {
        flex: 7,
    },
    titleBar: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    title: {
        fontFamily: commonStyles.fontFamily,
        fontSize: 50,
        color: commonStyles.colors.secundary,
        marginLeft: 20,
        marginBottom: 20,
    },
    subTitle: {
        fontFamily: commonStyles.fontFamily,
        fontSize: 20,
        color: commonStyles.colors.secundary,
        marginLeft: 20,
        marginBottom: 20,
    }
}
)