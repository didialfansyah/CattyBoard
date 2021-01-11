import React, {useState, useEffect} from 'react';
import {StyleSheet, View, FlatList, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Text, Button, Icon} from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';

const boardList = ({navigation}) => {
  const [data, setData] = useState();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: 80 }}>
          <Icon name="add" type="ionicon" color="#fff" onPress={() => navigation.navigate('Add')}/>
          {/* <View>
            <Icon name="shopping-cart" type="feather" color="#fff" />
            <Badge
              status="success"
              containerStyle={{ position: 'absolute', top: -4, right: -4 }}
              value={count}
            />
          </View> */}
        </View>
      ),
      // headerLeft: () => (
      //   <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: 220 }}>
      //     <View style={{ padding: 20 }}>
      //       <Icon
      //         name="menu"
      //         type="ionicon"
      //         color="#fff"
      //         onPress={() => navigation.openDrawer()}
      //       />
      //     </View>
      //     {/* <Input style={{ color: '#fff', padding: 0 }} containerStyle={{ width: '100%' }} /> */}
      //   </View>
      // ),
      title: 'Board List',
      headerTitle: 'Board List',
      headerStyle: { backgroundColor: '#273c75' },
      headerTitleStyle: {color : '#fff'}
    });
  }, [navigation]);

  useEffect(() => {
    firestore()
      .collection('board')
      .onSnapshot((snapshot) => {
        const listProducts = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setData(listProducts);
        // console.log(snapshot.size);
      });
  }, []);

  let deleteData = firestore().collection('board');

  const deleteProduct = (key) => {
    deleteData
      .doc(key)
      .delete()
      .then(() => {
        alert('Board successfully deleted');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text h3 style={{marginBottom: 20, marginTop: 20}}>This Your Board</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => {
          return (
            <TouchableOpacity style={styles.wrapper} onPress={() => navigation.navigate('Detail', {board: item})}>
              <View style={styles.product}>
                <View style={{width: '80%'}}>
                  <Text h4>{item.title}</Text>
                  <Text style={{fontSize: 10, color: '#7f8c8d', fontStyle: 'italic'}}>{item.author}</Text>
                  <Text style={{textAlign: 'justify'}}>{item.desc}</Text>
                </View>
                <View>
                  <View><Icon name="trash-bin" type="ionicon" color="#eb4d4b" onPress={() => deleteProduct(item.id)}/></View>
                  <View><Icon name="create" type="ionicon" color="#30336b" onPress={() => navigation.navigate('Edit', {board: item})}/></View>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    justifyContent: 'space-between',
  },
  product: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  action: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  wrapper: {
    borderTopWidth: 1,
    borderColor: '#2e2e2e',
    padding: 20,
  },
});

export default boardList;