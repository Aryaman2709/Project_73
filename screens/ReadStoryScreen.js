import * as React from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, FlatList} from 'react-native';
import { Header, SearchBar } from 'react-native-elements';
import db from '../config'

export default class ReadStoryScreen extends React.Component{

    constructor(props){
        super(props)
        this.state={
          search:'',
          allStories:[]
        }
    }

    returnState=()=>{
      this.setState({
      search:'',
      allStories:[]
    })
    }

    retrieveStories = async()=>{
   const query = await db.collection('story-hub').get()
    query.docs.map((doc)=>{
      this.setState({
        allStories:[...this.state.allStories,doc.data()]
      })
    })
  }

  searchFilter= async(text)=>{
    if(this.state.search){
    const story = await db.collection('story-hub').where('title', '==', text).get()
      story.docs.map((doc)=>{
        this.setState({
          allStories:[...this.state.allStories,doc.data()]
        })
      })
    }else if(!this.state.search){
      this.retrieveStories()
    }
  }

    render(){
        return(
            <View style={styles.container}>
                 <Header
                      backgroundColor={'red'}
                      centerComponent={{
                      text: 'Bed Time Stories',
                      style: { color: 'black', fontSize: 23, fontWeight:'bold' },
                      }}
                />
              <View style={styles.searchBar}><TextInput style={styles.bar} placeholder='Enter Story Name' onChangeText={(text)=>{this.setState({search : text})}}></TextInput>
          <TouchableOpacity style={styles.searchButton} onPress={()=>{this.searchFilter(this.state.search)}}><Text>Search</Text></TouchableOpacity>
          <TouchableOpacity style={styles.searchButton} onPress={()=>{this.returnState()}}><Text>Reset</Text></TouchableOpacity>
          </View>
            <ScrollView>
            {this.state.allStories.map((story,index)=>{
              return(
                <View key={index} style={{borderBottomWidth:2}}>
                <Text>{'Story Title :'+story.title}</Text>
                <Text>{'Author :'+story.author}</Text>
                <Text>{'Story :'+story.story}</Text>
                </View>
              )
            })}
            </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    marginTop:20
  },
  searchBar:{
    flexDirection:'row',
    height:40,
    width:'auto',
    borderWidth: 0.5,
    alignItems:"center",
    backgroundColor:'#50C878'
  },
  bar:{
    borderWidth:2,
    height:30,
    width:250,
    paddingLeft:10
  },
  searchButton:{
    borderWidth:1,
    height:30,
    width:50,
    alignItems:"center",
    justifyContent:"center",
    backgroundColor:'gold'
  }
})
