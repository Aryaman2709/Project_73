import * as React from 'react';
import {View, Text, TextInput, StyleSheet, TouchableOpacity, KeyboardAvoidingView, ToastAndroid} from 'react-native';
import { Header } from 'react-native-elements';
import db from '../config'
import firebase from 'firebase'

export default class WriteStoryScreen extends React.Component{

    constructor(){
        super()
        this.state={
            title:'',
            author:'',
            story :''
        }
    }

    submitStory = async()=>{
        db.collection('story-hub').add({
            'title' : this.state.title,
            'author': this.state.author,
            'story':this.state.story
        })
       // alert("Your story has been submitted")
       
       var transactionMessage = "Your story has been submitted"
       ToastAndroid.show( transactionMessage, ToastAndroid.SHORT );

        this.setState({
            title:'',
            author:'',
            story :''
        })

    }

    render(){
        return(
            <KeyboardAvoidingView>
            <View>
                <Header
                      backgroundColor={'red'}
                      centerComponent={{
                      text: 'Story Hub',
                      style: { color: 'black', fontSize: 25, fontWeight:'bold' },
                      }}
                />
                <View>
                    <TextInput style = {styles.inputBox} onChangeText={text => this.setState({title:text})} placeholder='Story Title' value = {this.state.title} ></TextInput>
                    <TextInput style={styles.inputBox} onChangeText={text => this.setState({author:text})} placeholder='Author' value={this.state.author}></TextInput>
                    <TextInput style={styles.inputBox2} onChangeText={text => this.setState({story:text})} placeholder='Write your story' value={this.state.story} multiline={true}></TextInput>
                </View>
                <TouchableOpacity style = {styles.submitButton} onPress={this.submitStory}><Text style={styles.buttonText}>Submit</Text></TouchableOpacity>

            </View>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    inputBox:{
        marginTop: 25,
    width: '80%',
    alignSelf: 'center',
    height: 40,
    borderWidth: 3,
    outline: 'none',
    },
    inputBox2:{
 marginTop: 25,
    width: '80%',
    alignSelf: 'center',
    height: 125,
    borderWidth: 3,
    outline: 'none',
    },
    submitButton:{
        justifyContent: 'center',
        alignSelf: 'center',
        borderWidth: 2,
        borderRadius: 15,
        marginTop: 30,
        marginBottom:50,
        width: 200,
        height: 50,
        backgroundColor: 'yellow'
    },
     buttonText:{
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold',
    fontSize:20
  }
})



