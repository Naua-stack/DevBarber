import React, {useState, useContext} from 'react';
import {
    Container,
    InputArea,
    
    CustomButton,
    CustomButtonText,
    SignMessageButton,
    SignMessageButtonText,
    SignMessageButtonTextBold
} from './styles';
import Api from '../../Api';
import {UserContext} from '../../contexts/UserContext'
import SignInput from '../../components/SignInput';
import EmailIcon from '../../assets/email.svg'
import LockIcon from '../../assets/lock.svg'
import { Alert, Text } from 'react-native';
import BarberLogo from '../../assets/barber.svg'
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
export default () => {
    const {dispatch: userDispatch} = useContext(UserContext);
    const navigation = useNavigation();
    const [emailField, setEmailField] = useState('');
    const [passwordField, setPasswordField] = useState('');
    const handleSignClick = async () => {
        if(emailField !== '' && passwordField !== ''){
           let json = await Api.signIn(emailField, passwordField);
           if(json.token){
              await AsyncStorage.setItem('token', json.token);
              userDispatch({
                  type: 'setAvatar', 
                  payload:{
                      avatar: json.data.avatar
                  }
              });
              navigation.reset({
                  routes:[{name: "MainTab"}]
              });

           }else{
               alert('E-mail e/ou senha errados');
           }
        }else{
            alert('Preencha todos os campos');
        }
    }
    const handleMessageButtonClick = () =>{
        navigation.reset({
            routes: [{name: 'SignUp'}]
        })
    }
    return (
        <Container>
            <BarberLogo width="100%" height="160" />
            <InputArea>
             
                <SignInput 
                 IconSvg={EmailIcon}
                 placeholder="Digite seu email"
                 value={emailField}
                 onChangeText={text => setEmailField(text)}
                />
                <SignInput  
                IconSvg={LockIcon}
                placeholder="Digite sua senha"
                value={passwordField}
                onChangeText={text => setPasswordField(text)}
                password={true}
                />
               <CustomButton onPress={handleSignClick}>
                 <CustomButtonText>Login</CustomButtonText>
               </CustomButton>
            </InputArea>
            <SignMessageButton onPress={handleMessageButtonClick}>
                <SignMessageButtonText>Ainda não possui uma conta?</SignMessageButtonText>
                <SignMessageButtonTextBold>Cadastre-se</SignMessageButtonTextBold>
            </SignMessageButton>
        </Container>
    );
}