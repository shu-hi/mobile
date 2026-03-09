import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import SpinnerOverlay from './SpinnerOverlay';
import { NEXT_PUBLIC_API_BASE_URL } from "@env"

type ShowApiResponse = {
  status: string;
  data: null | string;
  err: string | null;
};

export default function HashInput() {
  const [user_input_id, setUserInputId] = useState('');
  const [spinner, setSpinner] = useState(false);
  const [mediaUrl,setMediaUrl]=useState('');

  const handleSubmit = async () => {
    setSpinner(true);
    try {
      const res = await fetch(`${NEXT_PUBLIC_API_BASE_URL}/api/holo/show`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: user_input_id }),
      });
      const data: ShowApiResponse = await res.json();
      if (data.status === 'ok' && data.data) {
        setMediaUrl(data.data);
      }else{
        console.log(data);
      }
    } catch (err) {
      console.error(err);
    }
    setSpinner(false);
  };

  return (
    <View style={styles.container}>
      <SpinnerOverlay visible={spinner} />
      {mediaUrl&&<View style={styles.formBox} >
        <View style={styles.header}>
          <Image
            style={styles.logo}
            source={{ uri: 'https://img.icons8.com/fluent/344/year-of-tiger.png' }}
          />
        </View>
        <View style={styles.form}>
          <Text style={styles.label}>ID</Text>
          <TextInput
            placeholder="id"
            value={user_input_id}
            onChangeText={setUserInputId}
            style={styles.input}
          />
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>log in</Text>
          </TouchableOpacity>
        </View>
      </View>}
      {!mediaUrl&&<Image source={{uri:mediaUrl}}/>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formBox: {
    width: '90%',
    maxWidth: 350,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 80,
    height: 80,
  },
  form: {
    width: '100%',
  },
  label: {
    marginBottom: 5,
    color: '#555',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#564da9',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});