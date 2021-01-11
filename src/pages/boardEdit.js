import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Input, Button} from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';

const boardEdit = props => {
    const [title, setTitle] = useState();
    const [desc, setDesc] = useState();
    const [author, setAuthor] = useState();

    const onChangeTitle = (title) => {
        setTitle(title);
    };
    
    const onChangeDesc = (desc) => {
        setDesc(desc);
    };

    const onChangeAuthor = (author) => {
        setAuthor(author);
    };

    let db = firestore().collection('board');
  const handleUpdateProduct = () => {
    db.doc(props.route.params.board.id)
      .update({
        title: title,
        desc: desc,
        author: author,
      }).then(function (docRef) {
        alert('Board successfully updated');
        props.navigation.navigate('List');
      })
      .catch(function (error) {
        alert(error);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <Text>Update Product</Text> */}
      <Input
        placeholder={props.route.params.board.title}
        onChangeText={(title) => onChangeTitle(title)}
      />
      <Input
        placeholder={props.route.params.board.desc}
        onChangeText={(desc) => onChangeDesc(desc)}
      />
      <Input
        placeholder={props.route.params.board.author}
        onChangeText={(author) => onChangeAuthor(author)}
      />

      <Button
              icon={
                <Icon
                  name="edit"
                  size={15}
                  color="white"
                />
              }
              iconRight
              title="Edit Board   "
              onPress={() => handleUpdateProduct()}
            />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    padding: 10
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#fd5c63',
    width: '50%',
    padding: 10,
  },
});

export default boardEdit;