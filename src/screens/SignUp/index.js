

import React, { useState, useContext } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {
    Container,
    InputArea,

    CustomButton,
    CustomButtonText,
    SignMessageButton,
    SignMessageButtonText,
    SignMessageButtonTextBold
} from './styles';
import SignInput from '../../components/SignInput';
import EmailIcon from '../../assets/email.svg'
import NameIcon from '../../assets/person.svg'
import LockIcon from '../../assets/lock.svg'
import { Text } from 'react-native';
import BarberLogo from '../../assets/barber.svg'
import { useNavigation } from '@react-navigation/native';
import Api from '../../Api';
export default () => {
    const { dispatch: userDispatch } = useContext(UserContext);
    const navigation = useNavigation();
    const [nameField, setNameField] = useState('');
    const [emailField, setEmailField] = useState('');
    const [passwordField, setPasswordField] = useState('');
    const handleSignClick = async () => {
        if (nameField !== '' && emailField !== '' && passwordField !== '') {
            let res = await Api.signUp(nameField, emailField, passwordField);
            if (res.token) {
                await AsyncStorage.setItem('token', res.token);
                userDispatch({
                    type: 'setAvatar',
                    payload: {
                        avatar: res.data.avatar
                    }
                });
                navigation.reset({
                    routes: [{ name: "MainTab" }]
                });
            } else {
                alert("Erro:" + res.error);
            }
        } else {
            alert('Preencha todos os campos')
        }

    }
    const handleMessageButtonClick = () => {
        navigation.reset({
            routes: [{ name: 'SignIn' }]
        })
    }
    return (
        <Container>
            <BarberLogo width="100%" height="160" />
            <InputArea>
                <SignInput
                    IconSvg={NameIcon}
                    placeholder="Digite seu nome"
                    value={nameField}
                    onChangeText={text => setNameField(text)}
                />
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
                    <CustomButtonText>CADASTRAR</CustomButtonText>
                </CustomButton>
            </InputArea>
            <SignMessageButton onPress={handleMessageButtonClick}>
                <SignMessageButtonText>Já possui uma conta?</SignMessageButtonText>
                <SignMessageButtonTextBold>Faça login</SignMessageButtonTextBold>
            </SignMessageButton>
        </Container>
    );
}