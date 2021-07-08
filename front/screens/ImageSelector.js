import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, Image, View, Platform, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function ImageSelector() {
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [4, 4],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <View style={ styles.mainContainer }>
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      {image && <Text>There is plastic on the image</Text>}
      {!image &&
        <TouchableOpacity style={styles.formContainer} onPress={pickImage}>
          <Text>Click here to select an image</Text>
        </TouchableOpacity>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
      flex:1,
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
      backgroundColor: "white"
  },

  formContainer: {
      alignItems: 'center',
      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft: 50,
      paddingRight: 50,
      backgroundColor: "lightgrey",
      borderRadius: 50
  }

});
