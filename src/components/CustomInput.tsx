import {
  View,
  Text,
  TextInput,
  KeyboardTypeOptions,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import React, {useState} from 'react';
import { GestureResponderEvent } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { handleGender } from '../redux/studentsSlice';
import { RootState } from '../redux/store';
interface IProps {
  placeholder: string;
  onChange?: ((text: string) => void) | undefined;
  value?: string;
  type?: KeyboardTypeOptions | undefined;
  icon?: boolean;
  drop?: number;
  uploadCamera?: ((event: GestureResponderEvent) => void) | undefined 
  uploadGallery?: ((event: GestureResponderEvent) => void) | undefined
}
const data = [
  {
    id: 1,
    gender: 'Male',
  },
  {
    id: 2,
    gender: 'Female',
  },
  {
    id: 3,
    gender: "Other's",
  },
];
const data1 = [
  {
    id: 1,
    upload: 'Camera',
  },
  {
    id: 2,
    upload: 'Gallery',
  },
];
const CustomInput: React.FC<IProps> = ({
  placeholder,
  onChange,
  value,
  type,
  icon,
  drop,
  uploadCamera,
  uploadGallery
}) => {
  const [dropDown, setDrop] = useState(false);
  const [upload, setUpLoad] = useState(false);
  const {gender,Studentclass,mobileNo}=useSelector((state:RootState)=>state.studen.value)
  const [uploadeddone,setUpLoadedDone]=useState(false)
  const dispatch=useDispatch()
  const handledrop = () => {
    if (drop === 1) {
      setDrop(!dropDown);
    } else {
      setUpLoad(!upload);
    }
  };
  return icon ? (
    <View>
      <TouchableOpacity
        style={{
          borderWidth: 1,
          borderRadius:15,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 20,
        }}
        onPress={handledrop}>
        <TextInput
          placeholder={drop===1?gender.length>0?gender:placeholder:placeholder}
          onChangeText={onChange}
          value={value}
          keyboardType={type}
          style={{fontSize:16,color:"black",fontWeight:'400'}}
        />
        {icon && (
          <AntDesign
            name={
              drop === 1
                ? dropDown
                  ? 'caretdown'
                  : 'caretup'
                : upload
                ? 'caretdown'
                : 'caretup'
            }
            size={20}
          />
        )}
      </TouchableOpacity>
      {dropDown && (
        <View style={styles.dropDownContainer}>
          {data.map(ele => {
            return (
              <TouchableOpacity key={ele.id} onPress={()=>{
                setDrop(false)
                dispatch(handleGender(ele.gender))}}>
                <Text style={styles.dropDownText}>{ele.gender}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
         {upload && (
        <View style={styles.dropDownContainer}>
          {data1.map(ele => {
            return (
              <TouchableOpacity key={ele.id} onPress={ele.id===1?uploadCamera:uploadGallery}>
                <Text style={styles.dropDownText}>{ele.upload}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </View>
  ) : (
    <View
      style={{
        
        borderWidth: 1,
        borderRadius:15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    
      }}>
      {icon ? (
        <Text>{uploadeddone?"Successfully Uploaded":placeholder}</Text>
      ) : (
        <TextInput
          placeholder={placeholder}
          onChangeText={onChange}
          value={value}
          keyboardType={type}
          style={{fontSize:16,color:"black",fontWeight:'400'}}
        />
      )}
      {/* {icon&& <AntDesign name='caretup' size={20}/>} */}
    </View>
  );
};

export default CustomInput;
const styles = StyleSheet.create({
  dropDownContainer: {
    backgroundColor: '#e48303',
    height: 80,
    paddingHorizontal: 20,
    justifyContent: 'space-around',
    marginTop: 5,
  },
  dropDownText: {
    fontSize: 18,
    color: 'white',
    fontWeight: '600',
  },
});
