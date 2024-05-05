import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, Modal, StyleSheet, Text, TextInput, View } from 'react-native';
import axios from 'axios';

export default function App() {

  const [lista, setLista] = useState([])
  const [id, setId] = useState("")
  const [nome, setNome] = useState("")
  const [preco, setPreco] = useState("")
  const [produtoEncontrado, setProdutoEncontrado] = useState("");
  const [modalVisivel, setModalVisivel] = useState(false)

  async function buscar(){
    try {
      const resposta = await axios.get("http://192.168.15.10:3000/produtos?id=" + id)
      setLista(resposta.data)

      setId(resposta.data[0].id)
      setNome(resposta.data[0].nome)
      setPreco(resposta.data[0].preco)

    } catch (error) {
      console.log("Error" + error)
    }
  }

  return (
    <View style={styles.container}>
      <Text>Lanchonete:</Text>

      <TextInput 
        style={styles.inputBox}
        placeholder='id'
        value={id}
        onChangeText={(text) => {setId(text)}}
      />
      <Button 
        title='Buscar'
        onPress={ () => {
          buscar()
          setModalVisivel(!modalVisivel)
        }}
      />

      <Modal
        animationType='fade'
        visible={modalVisivel}
        transparent={true}
      >
      
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>{nome}</Text>
            <Text style={styles.modalText}>Preço: {preco}</Text>
            <Button 
              title='Fechar'
              onPress={() => setModalVisivel(false)}
            />
          </View>
        </View>
      </Modal>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputBox:{
    width: 200,
    height: 50,
    backgroundColor: "#E5CCBF",
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    fontSize: 18,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    elevation: 5, 
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
  },

});
