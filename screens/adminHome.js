import { Button, Pressable, StyleSheet, Text, View , Image, TextInput } from 'react-native'
import React , {useEffect, useState}from 'react'
import {AsyncStorage} from 'react-native';
import axios from "axios";
import { useIsFocused } from "@react-navigation/native"; 

export default function App({ route , navigation }) {
  const focus = useIsFocused(); 
  const name = route.params.data;
  const uName = name;
  const [Ptask , setPtask] = useState(JSON.parse(route.params.Pdata));
  const loginScreen = ()=>{navigation.navigate("Login")}
  const [UserData , setUserData] = useState(JSON.parse(route.params.Udata));
  const [projectArray , setProjectArray] = useState([]);
  const [pendingProjs, setPendingProjs] = useState([]);
  const [completedProjs, setCompletedProjs] = useState([]);
 

const baseUrl = "http://localhost:3000";
  useEffect(() => {
    if(focus == true){
    getProjectMainList();
    getPendingProject();
    completedProjects();
    }
}, [focus]);


const getProjectMainList = () => {
      
  axios.get(`${baseUrl}/mainprojects`)
  .then(function(response) {
    // alert(JSON.stringify(response.data));
    
    setProjectArray(response.data);
    // console.log(projectArr);

  })
  .catch(error => {
    alert(error);
  });
}



const getPendingProject = () => {
  var a = [];
     projectArray.forEach((element) => {
            // alert(data[0]._id);
        //console.log(element.assignedMember);
       if(element.isComplete == false){
            a.push(element);
            // console.log(a);
       }
      
       setPendingProjs(a);
      //  console.log(pendingProjs);
      //  alert(pendingProjs[0].projectName);
   
  });
}




const completedProjects = () =>{
  var a = [];
   projectArray.forEach((element) => {
           // alert(data[0]._id);
       //console.log(element.assignedMember);
      if(element.isComplete == true){
           a.push(element);
           // console.log(a);
      }

     
      setCompletedProjs(a);
  
 });
}





  const navigateToProectList = () =>{
    //getPendingProject();
    navigation.navigate("adminProjectList" , {a:JSON.stringify(uName) ,  PData: JSON.stringify(Ptask) , projectData: JSON.stringify(projectArray), pendingProjs: JSON.stringify(pendingProjs)})
  }


  const logOut = async() => {
    try {
        await AsyncStorage.removeItem('username');
        console.log("Logout Done");
        loginScreen();
        return true;
    }
    catch(exception) {
      console.log("Error");
        return false;
    }
}

  return (
      <View style = {styles.container}>
        
        <Text style={styles.textname}>Hello {name}!!</Text>
      
        
        <View style={styles.item}>
              
              <Image style={styles.imagestyle} source = {require('../assets/adduser.gif')} />
              <Pressable onPress={()=>navigation.navigate("AddUser")}>
              <Text style={styles.itemname}>ADDUSER</Text>
              </Pressable>
               
        </View>

        <View style={styles.item}>
              
              <Image style={styles.imagestyle} source = {require('../assets/addproject.gif')} />
              <Pressable onPress={()=>navigation.navigate("addNewProject" , {PData: JSON.stringify(projectArray)})}>
              <Text style={styles.itemname}>ADDPROJECT</Text>
              </Pressable>
               
        </View>



        <View style={styles.item}>
              
              <Image style={styles.imagestyle} source = {require('../assets/addtask.gif')} />
              <Pressable onPress={()=>navigation.navigate("AddProject", {UData: JSON.stringify(UserData), projectData: JSON.stringify(projectArray)})}>
              <Text style={styles.itemname}>ADDTASK</Text>
              </Pressable>
               
        </View>
      
        <View style={styles.item}>
              
              <Image style={styles.imagestyle} source = {require('../assets/viewallproject.gif')} />
              <Pressable onPress={()=>navigateToProectList()}>
              <Text style={styles.itemname}>VIEWPROJECT</Text>
              </Pressable>
               
        </View>
        <View style={styles.item}>
              
              <Image style={styles.imagestyle} source = {require('../assets/viewusers.gif')} />
              <Pressable onPress={()=>navigation.navigate("userList" , {alluser: JSON.stringify(UserData)})}>
              <Text style={styles.itemname}>VIEWUSERS</Text>
              </Pressable>
               
        </View>


        <View style={styles.item}>
              
              <Image style={styles.imagestyle} source = {require('../assets/complete.gif')} />
              <Pressable onPress={()=>navigation.navigate("completedProjects" , {completedProjects: JSON.stringify(completedProjs), projectData: JSON.stringify(projectArray)})}>
              <Text style={styles.itemname}>COMPLETEDPROJECTS</Text>
              </Pressable>
               
        </View>

        <View style={styles.item}>
              
              <Image style={styles.imagestyle} source = {require('../assets/logout.gif')} />
              <Pressable onPress= {()=>logOut()}>
              <Text style={styles.itemname}>LOGOUT</Text>
              </Pressable>
               
        </View>
        
       
       
    

       
      {/* <Button title="Add Project"
      onPress={()=>navigation.navigate("AddProject")}/>
      <Button title="Add User"
      onPress={()=>navigation.navigate("AddUser")}/>
      <Button title="View Projects"
        onPress={()=>navigation.navigate("adminProjectList" , {a:JSON.stringify(uName) ,  PData: JSON.stringify(Ptask)})}/>
      <Button title="View Users"
      onPress={()=>navigation.navigate("userList" , {alluser: JSON.stringify(UserData)})}/> */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {  
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:50,
    marginBottom:200,
    
    },
    item: {
      flex: 1,
      flexDirection:'row',
      alignItems: 'center',
      
      width:280,
      maxHeight:80,
      padding:10,
      
      borderWidth:1,
      borderRadius:5,
      marginBottom:20,
    },
    avatarContainer:{
      backgroundColor: '#D9D9D9',
      borderRadius: 100,
      
      justifyContent:'center',
      alignItems:'center',
      
    },
    avatar:{
      height: 55,
      width: 55,
    },
    itemname:{
      fontSize:16,
      color:'black',
  },
  imagestyle:{
    width:40,
    height:40,
    borderRadius:60,
    borderColor:'black',
    borderWidth:1,
    marginRight:20,
  },
  textname:{
    fontSize:25,
    marginBottom:25,
  },
})