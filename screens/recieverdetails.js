import { StyleSheet, Text, View,TouchableOpacity, TextInput ,Alert, ScrollView,KeyboardAvoidingView,Modal,Image} from 'react-native';
import React ,{Component} from 'react';
import firebase from 'firebase';
import db from '../config';
import { Card } from 'react-native-elements';
import MyHeader from '../components/header';
export default class RecieverDetails extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            userID: firebase.auth().currentUser.email,
            recieverId :this.props.navigation.getParam('details')["user_id"],
            requestId  :this.props.navigation.getParam('details')["request_id"],
            itemName   :this.props.navigation.getParam('details')["item_name"],
            reason_for_requesting :this.props.navigation.getParam('details')["reason_To_Request"],
            RecieverName: '',
            RecieverContact: '',
            RecieverAdress: '',
            RecieverRequestDocID: '',
            userName: '',
            docId:'',
        }
    }
    generateNotification=()=>{
        
        var message=this.state.userID+'has shown interest in bartering';
        db.collection('all_notification').add({
            'item_name':this.state.itemName,
            'date':firebase.firestore.FieldValue.serverTimestamp(),
            'donor_id':this.state.userID,
            'message':message,
            'notifaction_status':'unread',
            'request_id':this.state.requestId,
            'recieverID':this.state.recieverId
        }
        )
        console.log(message);   

    }  
    getRecieverDetails() {
        db.collection("users").where("email_id", "==", this.state.recieverId).get()
            .then(
                snapshot => {
                    snapshot.forEach((doc) => {
                        this.setState({
                            RecieverName: doc.data().first_name,
                            RecieverAdress: doc.data().address,
                            RecieverContact: doc.data().mobile_num,
                        })
                    })
                }
            )

        db.collection("requesteditems").where("request_id", "==", this.state.requestId).get()
            .then(
                snapshot => {
                    snapshot.forEach(doc => {
                        this.setState({
                            RecieverRequestDocID: doc.id
                        })
                    }
                    )
                }
            )
    }
    componentDidMount() {
        this.getRecieverDetails();
       
    }

    updateStatus = () => {
        db.collection("all_barters").add({
            item_name: this.state.itemName,
            doc_id:this.state.docId,
            request_id: this.state.requestId,
            requested_by: this.state.RecieverName,
            donor_id: this.state.userID,
            request_status: 'User Interested',
        })
    }



    render(){
        return(
            <View>
                  <MyHeader title="Personal Information" navigation ={this.props.navigation}/>
              <View>
                    <Card
                        title={"ItemInformation"}
                        titleStyle={{ fontSize: 20, }}
                    >
                        <Card>
                            <Text style={{ fontWeight: 'bold' }}>itemName: {this.state.itemName}</Text>
                        </Card>
                      
                        <Card>
                            <Text style={{ fontWeight: 'bold' }}>ReasonToRequest: {this.state.reason_for_requesting}</Text>
                        </Card>
                    </Card>
                </View>
                <View>
                    <Card
                        title={"RecieverInformation"}
                        titleStyle={{ fontSize: 20, }}
                    >
                        <Card>
                            <Text style={{ fontWeight: 'bold' }}>RecieverName: {this.state.RecieverName}</Text>
                        </Card>
                        <Card>
                            <Text style={{ fontWeight: 'bold' }}>RecieverAdress: {this.state.RecieverAdress}</Text>
                        </Card>
                        <Card>
                            <Text style={{ fontWeight: 'bold' }}>RecieverContact: {this.state.RecieverContact}</Text>
                        </Card>
                    </Card>

                </View>
                <View style={styles.buttonContainer} >
                    {
                        this.state.recieverId !== this.state.userID ?(
                            <TouchableOpacity onPress={() => {
                                this.updateStatus();
                                this.props.navigation.navigate("MyBarters");
                                this.generateNotification();
                               

                            }} style={styles.button} >
                                <Text>Barter</Text>
                            </TouchableOpacity>
                        )
                            : (null)
                    }
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: { flex: 1, },
    buttonContainer: { flex: 0.3, justifyContent: 'center', alignItems: 'center' },
    button: { width: 200, height: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 10, backgroundColor: 'orange', shadowColor: "#000", shadowOffset: { width: 0, height: 8 }, elevation: 16, shadowOpacity: 0.44, shadowRadius: 10.32, elevation: 16, }
})