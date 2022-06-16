import {useState} from "react";
import {SafeAreaView, StyleSheet, TextInput, Text, Button, TouchableOpacity} from "react-native";

const sendText = async (phoneNumber) => {
  console.log("PhoneNumber: ", phoneNumber)
  await fetch('https://dev.stedi.me/twofactorlogin/'+phoneNumber,{
    method: 'POST',
    headers:{
      'content-type':'application/text'
    }
  })
}

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [oneTimePassword, setOneTimePassword] = useState(null);

  return (
    <SafeAreaView styles={styles.margin}>
      <Text>Phone Number</Text>
      <TextInput
        style={styles.input}
        onChangeText={setPhoneNumber}
        value={phoneNumber}
        placeholder="123-456-7890"
      />

      {/* <Button
        title="Send OTP"
        onPress={() => {sendText(phoneNumber)}}
      /> */}

      <TouchableOpacity
        style={styles.button}
        onPress={()=>{sendText(phoneNumber)}}
      >
      <Text>Send OTP</Text>
      </TouchableOpacity>


      <Text>OTP</Text>
      <TextInput
        style={styles.input}
        onChangeText={setOneTimePassword}
        value={oneTimePassword}
        placeholder="1234"
        keyboardType="numeric"
        secureTextEntry={true}
      />

    {/* <Button
      title="Login"
      onPress={() => {console.log('Login button clicked')}}
    /> */}

    <TouchableOpacity
      style={styles.button}
      onPress={()=>{console.log('Login button clicked')}}
    >
      <Text>Login</Text>
    </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  margin:{
    marginTop:500
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10
  }
});


export default Login;