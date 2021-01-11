import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import { Input, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import firestore from '@react-native-firebase/firestore';

const boardAdd = ({navigation}) => {
    const [title, setTitle] = useState();
    const [desc, setDesc] = useState();
    const [author, setAuthor] = useState();

    const handleAddProduct = () => {
      firestore()
        .collection('board')
        .add({
          title: title,
          desc: desc,
          author: author,
        })
        .then(function (docRef) {
          console.log('Document written with ID: ', docRef.id);
          alert('Board successfully added');
          navigation.navigate('List');
        })
        .catch(function (error) {
          console.error('Error adding document: ', error);
          alert(error);
        });
  };

    const onChangeTitle = (title) => {
        setTitle(title);
    };
    
    const onChangeDesc = (desc) => {
        setDesc(desc);
    };

    const onChangeAuthor = (author) => {
        setAuthor(author);
    };

    return (
        <View style={{flex: 1, padding: 10, alignItems: 'center'}}>
            <Input
                placeholder="Title"
                onChangeText={(title) => onChangeTitle(title)}
            />
            <Input
                placeholder="Description"
                onChangeText={(desc) => onChangeDesc(desc)}
            />
            <Input
                placeholder="Author"
                onChangeText={(author) => onChangeAuthor(author)}
            />
            <Button
              icon={
                <Icon
                  name="send-o"
                  size={15}
                  color="white"
                />
              }
              iconRight
              title="Add Board   "
              onPress={handleAddProduct}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
      alignItems: 'center',
      backgroundColor: '#fd5c63',
      width: '50%',
      padding: 10,
    },
  });

export default boardAdd;