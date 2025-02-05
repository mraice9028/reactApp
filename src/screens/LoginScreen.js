import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { StatusBar } from 'expo-status-bar';

const loginValidationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const signupValidationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

export default function LoginScreen({ navigation }) {
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = (values, { setSubmitting }) => {
    try {
      // In a real app, you would implement actual authentication here
      // For demo purposes, we'll just simulate a successful login
      setTimeout(() => {
        navigation.replace('AIGoals', {
          userInfo: {
            name: values.name || 'User', // Use 'User' as default name for login
            email: values.email,
            isLoggedIn: true
          }
        });
        setSubmitting(false);
      }, 1000);
    } catch (error) {
      Alert.alert('Error', error.message);
      setSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 50 : 0}
    >
      <StatusBar style="dark" />
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.headerContainer}>
          <Image
            source={require('../../assets/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.headerText}>
            {isLogin ? 'Welcome Back!' : 'Create Account'}
          </Text>
        </View>

        <Formik
          initialValues={isLogin ? { email: '', password: '' } : { name: '', email: '', password: '' }}
          validationSchema={isLogin ? loginValidationSchema : signupValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleChange, handleSubmit, values, errors, touched, isSubmitting }) => (
            <View style={styles.formContainer}>
              {!isLogin && (
                <View style={styles.inputContainer}>
                  <TextInput
                    style={[
                      styles.input,
                      touched.name && errors.name && styles.inputError
                    ]}
                    placeholder="Full Name"
                    value={values.name}
                    onChangeText={handleChange('name')}
                    autoCapitalize="words"
                    editable={!isSubmitting}
                  />
                  {touched.name && errors.name && (
                    <Text style={styles.errorText}>{errors.name}</Text>
                  )}
                </View>
              )}

              <View style={styles.inputContainer}>
                <TextInput
                  style={[
                    styles.input,
                    touched.email && errors.email && styles.inputError
                  ]}
                  placeholder="Email"
                  value={values.email}
                  onChangeText={handleChange('email')}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  editable={!isSubmitting}
                />
                {touched.email && errors.email && (
                  <Text style={styles.errorText}>{errors.email}</Text>
                )}
              </View>

              <View style={styles.inputContainer}>
                <TextInput
                  style={[
                    styles.input,
                    touched.password && errors.password && styles.inputError
                  ]}
                  placeholder="Password"
                  value={values.password}
                  onChangeText={handleChange('password')}
                  secureTextEntry
                  editable={!isSubmitting}
                />
                {touched.password && errors.password && (
                  <Text style={styles.errorText}>{errors.password}</Text>
                )}
              </View>

              <TouchableOpacity
                style={[styles.button, isSubmitting && styles.buttonDisabled]}
                onPress={handleSubmit}
                disabled={isSubmitting}
              >
                <Text style={styles.buttonText}>
                  {isSubmitting 
                    ? 'Please wait...' 
                    : (isLogin ? 'Login' : 'Sign Up')}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.switchButton}
                onPress={() => !isSubmitting && setIsLogin(!isLogin)}
                disabled={isSubmitting}
              >
                <Text style={styles.switchButtonText}>
                  {isLogin
                    ? "Don't have an account? Sign Up"
                    : 'Already have an account? Login'}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  formContainer: {
    width: '100%',
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  inputError: {
    borderColor: '#ff3333',
  },
  errorText: {
    color: '#ff3333',
    fontSize: 12,
    marginTop: 5,
    marginLeft: 5,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: '#cccccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  switchButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  switchButtonText: {
    color: '#007AFF',
    fontSize: 14,
  },
});
