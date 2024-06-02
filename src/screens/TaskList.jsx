import React, { Component } from "react";
import { View, Text, ImageBackground, StyleSheet, SafeAreaView, FlatList, TouchableOpacity, Platform, Alert } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

import commonStyles from "../commonStyles";

import todayImage from '../../assets/imgs/today.jpg'
import moment from 'moment'
import 'moment/locale/pt-br'

import Task from "../components/Task";
import AddTask from "./AddTask";

export default class TaskList extends Component {

    state = {
        showDoneTasks: true,
        showAddTask: false,
        visibleTasks: [],
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

    componentDidMount = () => {
        this.filterTasks()
    }

    toggleFilter = () => {
        this.setState({ showDoneTasks: !this.state.showDoneTasks }, this.filterTasks)
    }

    filterTasks = () => {
        let visibleTasks = null
        if (this.state.showDoneTasks) {
            visibleTasks = [...this.state.tasks]
        } else {
            const pending = task => task.concluidaEm === null

            visibleTasks = this.state.tasks.filter(pending)
        }
        this.setState({ visibleTasks })
    }

    toggleTask = taskId => {
        const tasks = [...this.state.tasks]
        tasks.forEach(task => {
            if (task.id === taskId) {
                task.concluidaEm = task.concluidaEm ? null : new Date()
            }
        })

        this.setState({ tasks: tasks }, this.filterTasks)
    }

    addTask = newTask => {
        if (!newTask.desc || !newTask.desc.trim()) {
            Alert.alert('Dados inválidos', 'Descrição não informada')
            return
        }

        const tasks = [...this.state.tasks]
        tasks.push({
            id: Math.random(),
            descricao: newTask.desc,
            dataEstimada: newTask.date,
            concluidaEm: null,
        })

        this.setState({ tasks, showAddTask: false }, this.filterTasks)

    }

    render() {

        const today = moment().locale('pt-br').format('ddd, D [de] MMMM')

        return (
            <SafeAreaView style={style.container}>
                <AddTask
                    isVisible={this.state.showAddTask}
                    onCancel={() => this.setState({ showAddTask: false })}
                    onSave={this.addTask}
                />
                <ImageBackground source={todayImage} style={style.background}>
                    <View style={style.iconBar}>
                        <TouchableOpacity onPress={this.toggleFilter}>
                            <Icon name={this.state.showDoneTasks ? 'eye' : 'eye-slash'}
                                size={20} color={commonStyles.colors.secundary} />
                        </TouchableOpacity>
                    </View>
                    <View style={style.titleBar}>
                        <Text style={style.title}>Hoje</Text>
                        <Text style={style.subTitle}>{today}</Text>
                    </View>
                </ImageBackground>

                <View style={style.taskList}>
                    <FlatList
                        data={this.state.visibleTasks}
                        keyExtractor={item => `${item.id}`}
                        renderItem={({ item }) => <Task {...item} toggleTask={this.toggleTask} />}
                    />
                </View>
                <TouchableOpacity
                    style={style.addButton}
                    activeOpacity={0.7}
                    onPress={() => this.setState({ showAddTask: true })}>
                    <Icon name='plus' size={20} color={commonStyles.colors.secundary} />
                </TouchableOpacity>

            </SafeAreaView>
        )
    }
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
    },
    iconBar: {
        flexDirection: 'row',
        marginHorizontal: 20,
        justifyContent: 'flex-end',
        marginTop: Platform.OS === 'ios' ? 40 : 10
    },
    addButton: {
        position: 'absolute',
        right: 30,
        bottom: 30,
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: commonStyles.colors.today,
        justifyContent: 'center',
        alignItems: 'center',
    }
}
)