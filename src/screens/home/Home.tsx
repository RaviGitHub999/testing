import { View, Text, Modal, TouchableOpacity, Image,FlatList, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomInput from '../../components/CustomInput'
import { useSelector, useDispatch } from 'react-redux'
import type { AppDispatch, RootState } from '../../redux/store'
import { handleFieldsEmpty, handleonChangeText } from '../../redux/studentsSlice'
import { styles } from './style'
import { person } from '../../assets'
import axios from 'axios';
import { launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Feather from 'react-native-vector-icons/Feather';
const Home = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const[studetails,setStuDetails]=useState([])
  const [image,setImage]=useState("")
   const {name,email,rollno,gender,Studentclass,mobileNo}=useSelector((state:RootState)=>state.studen.value)
   const dispatch:AppDispatch=useDispatch()
   useEffect(() => {
   try{
    axios.get("http://10.0.2.2:4000/get").then((response) => {
      setStuDetails(response.data);
    });
   }
   catch (error) {
    console.error('Error:', error);
  }
  }, []);
  const addStudentDetails = async () => {
    const newData = {  
    name: name,
    email: email,
    mobileNo:mobileNo,
    rollNo:rollno,
    Studentclass: Studentclass,
     image:image,
     gender:gender,
  };
    try { 
      const response = await axios.post("http://10.0.2.2:4000/add", { details:newData });
      dispatch( handleFieldsEmpty())
      setImage('')
      setModalVisible(false)
      const todosResponse = await axios.get('http://10.0.2.2:4000/get');
      setStuDetails(todosResponse.data);
    
    } catch (error) {
      console.error('Error:', error);
    }
    
  };
  
  const launchCamara=async()=>{
    const options:any={
      mediaType:"photo",
      saveToPhotos:true
    }
    const result = await launchCamera(options,(response:any)=>{
// console.log("========>response",response?.assets[0]?.uri)
setImage(response?.assets[0]?.uri)
    });
  }
  const launchGallaryLibrary=async()=>{
    const options:any={
      mediaType:"photo",
      saveToPhotos:true
    }
    const result = await launchImageLibrary(options,(response:any)=>{
      if (response.didCancel) {
        console.log("upload image cancelled")
      }else if(response.errorCode){
        console.log("error while opening gallery")
      }else{
        setImage(response?.assets[0]?.uri)
      }
      // console.log("upload gallary",response.assets[0].uri)
// setImage(response?.assets[0]?.uri)
    });
  }
  const handleRender=({item}:any)=>
  {
    return(
      <View style={styles.card}>
{item.details.image&&<Image source={{uri:item.details.image}} style={styles.profile}/>}
<View style={styles.cardDetails}>
  <Text style={styles.detailsTitles}>Name:<Text style={styles.detailsText}>{item.details.name}</Text></Text>
  <Text style={styles.detailsTitles}>Email:<Text style={styles.detailsText}>{item.details.email}</Text></Text>
  <Text style={styles.detailsTitles}>Gender:<Text style={styles.detailsText}>{item.details.gender}</Text></Text>
  <Text style={styles.detailsTitles}>MobileNo:<Text style={styles.detailsText}>{item.details.mobileNo}</Text></Text>
</View>
      </View>
    )
  }
  return (
   <View style={styles.mainContainer}>
    <Modal
   visible={modalVisible}>
     <ScrollView>
     <View style={{flex:1,backgroundColor:'white',gap:30,marginVertical:30}}>
      <View style={styles.photoContainer}>
     <Image source={person} style={{width:130,height:130}} resizeMode='contain' />
      </View>
      <View style={styles.inputs}>
      <CustomInput placeholder={"Enter Your Name"} onChange={(e:string) => dispatch(handleonChangeText(["name",e]))} value={name}/>
      <CustomInput placeholder={"Enter Your Email"} onChange={(e:string) => dispatch(handleonChangeText(["email",e]))} value={email}/>
      <CustomInput placeholder={"Enter Your mobileNo"} onChange={(e:string) => dispatch(handleonChangeText(["mobileNo",e]))} value={mobileNo} type={"number-pad"}/>
      <CustomInput placeholder={"Enter Your Gender"}  icon={true} drop={1}/>
      <CustomInput placeholder={"Enter Your RollNo"} onChange={(e:string) => dispatch(handleonChangeText(["rollno",e]))} value={rollno}/>
      <CustomInput placeholder={"Enter Your Class"} onChange={(e:string) => dispatch(handleonChangeText(["Studentclass",e]))} value={Studentclass}/>
      <CustomInput placeholder={"Upload Image"}  icon={true} drop={2} uploadCamera={launchCamara} uploadGallery={launchGallaryLibrary}/>
      </View>
      <TouchableOpacity onPress={addStudentDetails} style={{backgroundColor:'#e48303',height:60,alignItems:'center',justifyContent:'center',alignSelf:'center',paddingHorizontal:50,borderRadius:30}}>
      <Text style={{color:'white',fontSize:20}}>Submit</Text>
    </TouchableOpacity>
    </View>
     </ScrollView>
   </Modal>
   <Text style={styles.header}>Student Details</Text>
  {studetails.length===0?<Text style={{textAlign:"center",textAlignVertical:"center",flex:1,fontSize:25,color:'black',fontWeight:"800"}}>No Data Found !!!</Text>:<FlatList data={studetails} renderItem={handleRender} keyExtractor={(item:{_id:string})=>item._id} style={styles.flatList} contentContainerStyle={{paddingBottom:100}}/>}
   <TouchableOpacity onPress={()=>setModalVisible(true)} style={styles.plus}>
      <Feather name='plus-circle' size={60} color={"white"}/>
   </TouchableOpacity>
   </View>
  )
}
export default Home