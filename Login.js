import {useState} from "react";
import {SafeAreaView, StyleSheet, TextInput, Text, Button, TouchableOpacity} from "react-native";

const sendText = async (phoneNumber) => {
  console.log("PhoneNumber: ", phoneNumber);
  await fetch('https://dev.stedi.me/twofactorlogin/'+phoneNumber,{
    method: 'POST',
    headers:{
      'content-type':'application/text'
    }
  });
}

const getToken = async ({phoneNumber, oneTimePassword, setUserLoggedIn, setUserName}) => {
  const tokenResponse = await fetch('https://dev.stedi.me/twofactorlogin',
  {
    method: 'POST',
    body: JSON.stringify({phoneNumber, oneTimePassword}),
    headers: {
      'content-type':'application/json'
    }
  });
  const responseCode = tokenResponse.status;
  console.log("Response Status Code", responseCode);
  const tokenResponseString = await tokenResponse.text();
  console.log(tokenResponseString);
  if(responseCode==200){
    setUserLoggedIn(true);
    try {
      const res = await fetch("https://dev.stedi.me/validate/"+tokenResponseString);
      const data = await res.text();
      console.log(data);
      setUserName(data);
    } catch (error) {
        console.log(error);
    } 
  }
}


const Login = (props) => {
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
      onPress={()=>{getToken({phoneNumber, oneTimePassword, setUserLoggedIn:props.setUserLoggedIn, setUserName:props.setUserName})}}
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