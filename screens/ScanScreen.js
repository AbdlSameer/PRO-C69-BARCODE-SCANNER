import React from 'react';
import { Text, View, TouchableOpacity, Image, Stylesheet } from 'react-native';
import * as Permissions from 'expo-permissions';
import {BarCodeScanner} from 'expo-barcode-scanner';

export default class ScanScreen extends React.Component{
    constructor(){
        super();
        this.sstate = {
            hasCameraPermissions: null,
            scanned: false,
            scannedData: '',
            buttonState: "normal",
        }
    }

    getCameraPermission=async()=>{
        const {status}=await Permissions.askAsync(Permissions.CAMERA)
        this.setState({
            hasCameraPermissions: status=="granted",
            scanned: false,
            buttonState: "clicked"
        })
    }

    handleBarCodeScanned=async({type,data})=>{
        this.setState({
            scanned: true,
            scannedData: data,
            buttonState: "normal",
        })
    }

    render(){
        const hasCameraPermissions = this.state.hasCameraPermissions;
        const scanned = this.state.scanned;
        const buttonState = this.state.buttonState

      if(buttonState==="clicked" && hasCameraPermissions){ 
            return(
                <BarCodeScanner
                onBarCodeScanned = {scanned ? undefined: this.handleBarCodeScanned}
                style = {Stylesheet.absoluteFillObject}
                />
            )
      } 
      else if(buttonState==="normal"){
           return(
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>{hasCameraPermissions===true?this.state.scannedData: "Request Camera Permission"}</Text>
            <TouchableOpacity 
            style = {styles.scanButton}
            onPress={this.getCameraPermission}
            title = "Bar Code Scanner"
            >           
            <Text style = {styles.buttonText}>Scan QR Code</Text>
            </TouchableOpacity>
            </View>
               );
        }
       
        

    }
}

const styles = Stylesheet.create({
    buttonText: {fontSize: 20}, 
    scanButton: {backgroundColor: "#2196F3", margin: 10, padding: 10}
})
