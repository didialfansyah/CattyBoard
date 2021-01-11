import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import AntIcon from 'react-native-vector-icons/AntDesign';
import {Input, Button, Text} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import firestore from '@react-native-firebase/firestore';

const boardDetail = props => {
    let deleteData = firestore().collection('board');

    const deleteProduct = (key) => {
      deleteData
        .doc(key)
        .delete()
        .then(() => {
          alert('Product successfully deleted');
        })
        .catch((err) => {
          console.log(err);
        });
    };

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.content}>
            <Text h2 style={{color: '#fff'}}>{props.route.params.board.title}</Text>
            <Text style={{color: '#fff', fontSize: 12}}>{props.route.params.board.author}</Text>
            <Text style={{color: '#fff', fontSize: 16}}>{props.route.params.board.desc}</Text>
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
              buttonStyle={{marginTop: 10}}
              onPress={() => props.navigation.navigate('Edit', {board: props.route.params.board})}
            />
            <Button
              icon={
                <Icon
                  name="trash"
                  size={15}
                  color="white"
                />
              }
              iconRight
              title="Delete Board   "
              buttonStyle={{backgroundColor: '#eb4d4b', marginTop: 10}}
              onPress={() => deleteProduct(item.id)}
            />
        </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    padding: 10,
    paddingTop: 20
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#fd5c63',
    width: '50%',
    padding: 10,
  },
  content: {
      width: '100%',
      backgroundColor: '#2f3542',
      padding: 20,
  }
});

export default boardDetail;