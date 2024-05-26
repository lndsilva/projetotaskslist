import React from "react";
import { View, Text, StyleSheet } from "react-native";

import commonStyles from "../commonStyles";
import Icon from 'react-native-vector-icons/FontAwesome';

import moment from "moment";
import 'moment/locale/pt-br'

export default props => {

    const tarefaConcluidaNao = props.concluidaEm != null ?
        { textDecorationLine: 'line-through' } : {}
    
    const date = props.concluidaEm ? props.concluidaEm : props.dataEstimada
    
    const dateFormat = moment(date).locale('pt-br')
        .format('ddd, D [de] MMMM')

    return (
        <View style={style.container}>
            <View style={style.checkContainer}>
                {getCheckView(props.concluidaEm)}
            </View>
            <View>
                <Text style={[style.descricao, tarefaConcluidaNao]}>{props.descricao}</Text>
                <Text style={style.date}>{dateFormat}</Text>
            </View>
        </View>
    )
}

function getCheckView(concluidaEm) {
    if (concluidaEm != null) {
        return (
            <View style={style.dataEstimada}>
                <Icon name='check' size={20} color='#FFF' />
            </View>
        )
    } else {
        return (
            <View style={style.pendente}>

            </View>
        )
    }
}

const style = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderColor: '#2c2c2c',
        borderBottomWidth: 1,
        alignItems: 'center',
        paddingVertical: 10,
    },
    checkContainer: {
        width: '20%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    pendente: {
        height: 25,
        width: 25,
        borderRadius: 13,
        borderWidth: 1,
        borderColor: '#555',
    },
    dataEstimada: {
        height: 25,
        width: 25,
        borderRadius: 13,
        borderWidth: 1,
        backgroundColor: '#4D7031',
        alignItems: 'center',
        justifyContent: 'center',
    },
    descricao: {

        color: commonStyles.colors.mainText,
        fontSize: 15,
    },
    date: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.subText,
        fontSize: 12,

    }
})