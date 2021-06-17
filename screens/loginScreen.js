import { StyleSheet, Text, View,TouchableOpacity, TextInput ,Alert, ScrollView,KeyboardAvoidingView,Modal,Image} from 'react-native';
import React ,{Component} from 'react';
import db from '../config';
 import firebase from 'firebase'
 
export default class Signup extends React.Component{
constructor(){
   super();
   this.state={
   emailId:'',
   password:'',
   isModalVisible:false,
   firstName:'',
   lastName:'',
   mobileNum:"",
   confirmPassword:'',
   address:"",

               }
   }

   signUp=(email,password,confirmPassword)=>
   {
   if(password!==confirmPassword){
   return alert("Your password does not match")
   }
   else{
   firebase.auth().createUserWithEmailAndPassword(email, password)
   .then(()=>
   {

     db.collection("users").add(
       {
          'first_name':this.state.firstName,
          'last_name':this.state.lastName ,
           'mobile_num':this.state.mobileNum,
           'address':this.state.address,
           'email_id':this.state.emailId,
           'Is_Item_Request_Active':false  
       })
       return alert("User Added Successfully",
       "",
       [
           {text:'OK',onPress:()=>this.setState({isModalVisible:false})}
       ]
       )
   })
   .catch((error)=>
   {
       var errorCode = error.code;
       var errorMessage = error.message;
       return alert(errorMessage)
       
   }
   )
 
  

}
}

displayModal=()=>{
console.log(this.state.isModalVisible)
  return(
      <Modal
      animationType="slide"
      transparent={false}
      visible={this.state.isModalVisible}
      >
    <View style={styles.modalContainer}>
    
        <ScrollView style={{width:'80%'}}>
          <KeyboardAvoidingView style={{alignItems:"center",justifyContent:"center"}}>
     
            <Text style={styles.modalTitle}>Registration Form</Text>
           
          
                     <TextInput
              style={styles.formTextInput}
           placeholder="first_name"
           maxLength={8}
           onChangeText={(text)=>{this.setState({firstName:text})}}
           />
            <TextInput
              style={styles.formTextInput}
           placeholder="last_name"
           maxLength={8}
           onChangeText={(text)=>{this.setState({lastName:text})}}
           />
            <TextInput
              style={styles.formTextInput}
           placeholder="email_address"
          keyboardType={'email-address'}
           onChangeText={(text)=>{this.setState({emailId:text})}}
           />
            <TextInput
              style={styles.formTextInput}
           placeholder="mobile"
           maxLength={10}
           onChangeText={(text)=>{this.setState({mobileNum:text})}}
           />
            <TextInput
              style={styles.formTextInput}
           placeholder="address"
          multiline={true}
           onChangeText={(text)=>{this.setState({address:text})}}
           />
            <TextInput
              style={styles.formTextInput}
           placeholder="Password"
           secureTextEntry={true}
           onChangeText={(text)=>{this.setState({password:text})}}
           />
            <TextInput
              style={styles.formTextInput}
           placeholder="Confirm_Password"
           secureTextEntry={true}
           onChangeText={(text)=>{this.setState({confirmPassword:text})}}
           />
           <TouchableOpacity style={styles.registerButton}

           onPress={()=>{
             
             this.signUp(this.state.emailId,this.state.password,this.state.confirmPassword)}}
           
           ><Text >Submit</Text></TouchableOpacity>
           <TouchableOpacity style={styles.cancelButton}
           onPress={()=>{this.setState({isModalVisible:false})}}
           ><Text>cancelButton</Text></TouchableOpacity>
           </KeyboardAvoidingView>
            </ScrollView>
            </View>
            </Modal>
  )
}

signIn=async(email,password)=>
{
firebase.auth().signInWithEmailAndPassword(email,password)
.then(()=>
   {
   this.props.navigation.navigate("requestItems")
   }
)
   .catch((error)=>
{
   var errorCode = error.code;
   var errorMessage = error.message;
   return alert(errorMessage)
       }
)
}

render(){
return(

<View style={{flex:8}}>
  <Text style={{fontSize:30,alignSelf:"center",marginTop:40,color:'black'}}>Barter-System</Text>
<View style={{justifyContent:"center",alignItems:"center"}}>
{this.displayModal()}
</View>
<KeyboardAvoidingView>
<View >

</View>


<TextInput
placeholder="abc@example.com"
placeholderTextColor="black"
keyboardType="email-address"
onChangeText={(text)=>this.setState({emailId:text})}
style={styles.textInput}
/>

<TextInput
style={styles.textInput2}
secureTextEntry={true}
placeholder="Password"
placeholderTextColor="black"
onChangeText={(text)=>this.setState({password:text})}
/>

<TouchableOpacity
onPress={()=>{this.signIn(this.state.emailId,this.state.password)}}
style={styles.button}
><Text
style={styles.text}
>Sign in                                                          </Text></TouchableOpacity>
<TouchableOpacity 
onPress={()=>this.setState({isModalVisible:true})}
style={{width:120,height:40,marginLeft:230,marginTop:20}}
><Text style={{ fontWeight:"bold", color:"#000000",fontSize:10,marginLeft:40}}>                               NeedAccount?</Text></TouchableOpacity>
</KeyboardAvoidingView>
</View>
   )
   
}

    

}


const styles=StyleSheet.create({
    textInput:{
   width:330,
  backgroundColor:"#84BAF4",
  height:70,
 marginLeft:20,
  marginTop:150

    },
    textInput2:{
       width:330,
       backgroundColor:"#84BAF4",
       height:70,
      marginLeft:20,
       marginTop:20
    },
    header:{
     backgroundColor:"#84BAF4",
     height:70,
     marginTop:-20,
     marginLeft:60
    },
    button:{
        backgroundColor:"#427783",
        width:180,
        height:40,
        marginLeft:90,
        marginTop:20,
        borderBottomLeftRadius:40,
        borderBottomRightRadius:40,
        borderTopRightRadius:40,
        borderTopLeftRadius:40,
    },
    text:{
        marginTop:10,
        fontWeight:"bold",
        color:"#ffffff",
        fontSize:15,
        marginLeft:60
    },
    headerText:{
        alignSelf:"center",
        fontWeight:"bold",
        fontSize:40,
        color:"#aa33bb",
        marginTop:-20
    },
    modalTitle :{
       justifyContent:'center',
       alignSelf:'center',
       fontSize:30,
       color:'#ff5722',
       margin:50
     },
     modalContainer:{
       flex:1,
       borderRadius:20,
       justifyContent:'center',
       alignItems:'center',
       backgroundColor:"#ffff",
       marginRight:30,
       marginLeft : 30,
       marginTop:80,
       marginBottom:80,
     },
     formTextInput:{
       width:"75%",
       height:35,
       alignSelf:'center',
       borderColor:'#ffab91',
       borderRadius:10,
       borderWidth:1,
       marginTop:20,
       padding:10
     },
     registerButton:{
       width:200,
       height:40,
       alignItems:'center',
       justifyContent:'center',
       borderWidth:1,
       borderRadius:10,
       marginTop:30
     },
     cancelButton:{
       width:200,
       height:30,
       justifyContent:'center',
       alignItems:'center',
       marginTop:5,
     }

})