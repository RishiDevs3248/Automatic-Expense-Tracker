// // // "use client"

// // // import { useState, type FormEvent } from "react"
// // // //@ts-ignore
// // // import { useRouter } from "next/navigation"
// // // //@ts-ignore
// // // import Link from "next/link"
// // // //@ts-ignore
// // // import { Loader2 } from "lucide-react"

// // // //@ts-ignore
// // // import { Input } from "@/components/ui/input"
// // // //@ts-ignore
// // // import { Button } from "@/components/ui/button"
// // // //@ts-ignore
// // // import { useToast } from "@/hooks/use-toast"
// // // //@ts-ignore
// // // import { cn } from "@/lib/utils"

// // // export default function LoginForm() {
// // //   const { toast } = useToast()
// // //   const router = useRouter()

// // //   const [email, setEmail] = useState("")
// // //   const [password, setPassword] = useState("")
// // //   const [isSubmitting, setIsSubmitting] = useState(false)

// // //   async function handleSubmit(e: FormEvent<HTMLFormElement>) {
// // //     e.preventDefault()

// // //     if (!email || !password) {
// // //       toast({ variant: "destructive", title: "All fields are required." })
// // //       return
// // //     }

// // //     setIsSubmitting(true)
// // //     try {
// // //       // TODO: Replace with real auth call
// // //       await new Promise((r) => setTimeout(r, 1000))

// // //       toast({ title: "Signed in successfully!" })
// // //       router.push("/dashboard")
// // //     } catch {
// // //       toast({ variant: "destructive", title: "Login failed. Please try again." })
// // //     } finally {
// // //       setIsSubmitting(false)
// // //     }
// // //   }

// // //   return (
// // //     <main className="flex min-h-screen items-center justify-center bg-muted py-12">
// // //       <form
// // //         onSubmit={handleSubmit}
// // //         className={cn("mx-4 w-full max-w-md space-y-6 rounded-lg bg-background p-8 shadow-lg")}
// // //       >
// // //         <div className="text-center">
// // //           <h1 className="text-2xl font-bold tracking-tight">Welcome Back</h1>
// // //           <p className="text-sm text-muted-foreground">Sign in to your account</p>
// // //         </div>

// // //         <div className="space-y-4">
// // //           <div>
// // //             <label htmlFor="email" className="mb-1 block text-sm font-medium">
// // //               Email
// // //             </label>
// // //             <Input
// // //               id="email"
// // //               type="email"
// // //               placeholder="you@example.com"
// // //               value={email}
// // //               onChange={(e:any) => setEmail(e.target.value)}
// // //               required
// // //             />
// // //           </div>

// // //           <div>
// // //             <label htmlFor="password" className="mb-1 block text-sm font-medium">
// // //               Password
// // //             </label>
// // //             <Input
// // //               id="password"
// // //               type="password"
// // //               placeholder="••••••••"
// // //               value={password}
// // //               onChange={(e:any) => setPassword(e.target.value)}
// // //               required
// // //             />
// // //           </div>
// // //         </div>

// // //         <Button type="submit" className="w-full" disabled={isSubmitting}>
// // //           {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden />}
// // //           Sign&nbsp;In
// // //         </Button>

// // //         <div className="flex items-center justify-center gap-2 text-sm">
// // //           <span className="text-muted-foreground">Don&apos;t have an account?</span>
// // //           <Link
// // //             href="http://192.168.0.169:3000/expense/days"
// // //             target="_blank"
// // //             rel="noopener noreferrer"
// // //             className="font-medium text-primary underline-offset-4 hover:underline"
// // //           >
// // //             Register here
// // //           </Link>
// // //         </div>
// // //       </form>
// // //     </main>
// // //   )
// // // }













// // import React, { useState } from 'react';
// // import {
// //   View,
// //   Text,
// //   TextInput,
// //   Button,
// //   StyleSheet,
// //   Alert,
// //   SafeAreaView,
// // } from 'react-native';
// // import AsyncStorage from '@react-native-async-storage/async-storage';

// // export default function LoginScreen() {
// //   const [email, setEmail] = useState('stu3@stu.com');
// //   const [password, setPassword] = useState('stu');
// //   const [loading, setLoading] = useState(false);

// //   const handleLogin = async () => {
// //     if (!email || !password) {
// //       Alert.alert('Validation Error ❌', 'Please enter email and password');
// //       return;
// //     }

// //     try {
// //       setLoading(true);

// //       const response = await fetch('http://192.168.0.169:3000/person/applogin', {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify({ email, password }),
// //       });

// //       const data = await response.json();

// //       if (response.ok) {
// //         await AsyncStorage.setItem('token', data.token);
// //         await AsyncStorage.setItem('user', JSON.stringify(data.user));
// //         Alert.alert('Login Success ✅', `Welcome ${data.user.email}`);
// //         // navigate to another screen if needed
// //       } else {
// //         Alert.alert('Login Failed ❌', data.msg || 'Invalid credentials');
// //       }
// //     } catch (err) {
// //       console.error(err);
// //       Alert.alert('Error', 'Something went wrong');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <SafeAreaView style={styles.container}>
// //       <Text style={styles.title}>Login</Text>

// //       <TextInput
// //         style={styles.input}
// //         placeholder="Email"
// //         value={email}
// //         autoCapitalize="none"
// //         onChangeText={setEmail}
// //       />

// //       <TextInput
// //         style={styles.input}
// //         placeholder="Password"
// //         value={password}
// //         secureTextEntry
// //         onChangeText={setPassword}
// //       />

// //       <View style={styles.buttonContainer}>
// //         <Button
// //           title={loading ? 'Logging in...' : 'Login'}
// //           onPress={handleLogin}
// //           disabled={loading}
// //         />
// //       </View>
// //     </SafeAreaView>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     padding: 20,
// //     backgroundColor: '#000',
// //     justifyContent: 'center',
// //   },
// //   title: {
// //     fontSize: 28,
// //     fontWeight: '600',
// //     marginBottom: 24,
// //     color: '#00ffcc',
// //     textAlign: 'center',
// //   },
// //   input: {
// //     backgroundColor: '#fff',
// //     borderRadius: 8,
// //     paddingHorizontal: 12,
// //     paddingVertical: 10,
// //     fontSize: 16,
// //     marginBottom: 16,
// //   },
// //   buttonContainer: {
// //     marginTop: 10,
// //   },
// // });






// import React, { useState } from 'react';
// import { View, TextInput, Button, Alert } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// export default function LoginScreen({ navigation }:any) {
//   const [email, setEmail] = useState('stu3@stu.com');
//   const [password, setPassword] = useState('stu');

//   const handleLogin = async () => {
//     try {
//       const response = await fetch('http://192.168.0.169:3000/person/applogin', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await response.json();

//       if (data.token) {
//         await AsyncStorage.setItem('token', data.token);
//         navigation.replace('Messages'); // ✅ go to message page
//       } else {
//         Alert.alert('Login Failed ❌', data.msg || 'Invalid credentials');
//       }
//     } catch (error) {
//       Alert.alert('Error', 'Something went wrong');
//     }
//   };

//   return (
//     <View style={{ padding: 20 }}>
//       <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
//       <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
//       <Button title="Login" onPress={handleLogin} />
//     </View>
//   );
// }












// import React, { useState } from 'react';
// import {
//   View,
//   TextInput,
//   Button,
//   Alert,
//   StyleSheet,
//   SafeAreaView,
//   Text,
//   ActivityIndicator,
// } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// export default function LoginScreen({ navigation }: any) {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleLogin = async () => {
//     if (!email || !password) {
//       Alert.alert('Validation Error ❌', 'Please enter both email and password');
//       return;
//     }

//     try {
//       setLoading(true);

//       const response = await fetch('http://192.168.0.169:3000/person/applogin', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, password }),
//       });

//       console.log(response)

//       const data = await response.json();

//       if (response.ok && data.token) {
//         await AsyncStorage.setItem('token', data.token);
//         Alert.alert('Login Success ✅', `${data.token}`);
//         navigation.replace('Messages'); // navigate to Message screen
//       } else {
//         Alert.alert('Login Failed ❌', data.msg || 'Invalid credentials');
//       }
//     } catch (error) {
//       console.error('Login error:', error);
//       Alert.alert('Error ❌', 'Something went wrong');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <Text style={styles.title}>Login</Text>

//       <TextInput
//         style={styles.input}
//         placeholder="Email"
//         autoCapitalize="none"
//         keyboardType="email-address"
//         value={email}
//         onChangeText={setEmail}
//       />

//       <TextInput
//         style={styles.input}
//         placeholder="Password"
//         secureTextEntry
//         value={password}
//         onChangeText={setPassword}
//       />

//       <View style={styles.buttonContainer}>
//         <Button
//           title={loading ? 'Logging in...' : 'Login'}
//           onPress={handleLogin}
//           disabled={loading}
//         />
//         {loading && <ActivityIndicator style={{ marginTop: 10 }} />}
//       </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#000',
//     justifyContent: 'center',
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: '600',
//     marginBottom: 24,
//     color: '#00ffcc',
//     textAlign: 'center',
//   },
//   input: {
//     backgroundColor: '#fff',
//     borderRadius: 8,
//     paddingHorizontal: 12,
//     paddingVertical: 10,
//     fontSize: 16,
//     marginBottom: 16,
//   },
//   buttonContainer: {
//     marginTop: 10,
//   },
// });







import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  SafeAreaView,
  Text,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Linking,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Validation Error ❌', 'Please enter both email and password');
      return;
    }

    try {
      setLoading(true);

      console.log("------------------------------------------")
      console.log("hit fetch")
      console.log("------------------------------------------")

      const response = await fetch('http://192.168.1.35:3000/person/applogin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });


      console.log(response);
      const data = await response.json();

      if (response.ok && data.token) {
        await AsyncStorage.setItem('token', data.token);
        Alert.alert('Login Success ✅', `Hello`);
        navigation.replace('Messages');
      } else {
        Alert.alert('Login Failed ❌', data.msg || 'Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Error ❌', 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>Sign in to your account</Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Email</Text>
              <TextInput
                style={[
                  styles.input,
                  emailFocused && styles.inputFocused,
                ]}
                placeholder="Enter your email"
                placeholderTextColor="#9CA3AF"
                autoCapitalize="none"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Password</Text>
              <TextInput
                style={[
                  styles.input,
                  passwordFocused && styles.inputFocused,
                ]}
                placeholder="Enter your password"
                placeholderTextColor="#9CA3AF"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
              />
            </View>

            <TouchableOpacity
              style={[styles.loginButton, loading && styles.loginButtonDisabled]}
              onPress={handleLogin}
              disabled={loading}
              activeOpacity={0.8}
            >
              {loading ? (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator size="small" color="#FFFFFF" />
                  <Text style={styles.loginButtonText}>Signing in...</Text>
                </View>
              ) : (
                <Text style={styles.loginButtonText}>Sign In</Text>
              )}
            </TouchableOpacity>
          </View>

          {/* Footer */}

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Don't have an account?{' '}
              <Text style={styles.signupLink} onPress={() => Linking.openURL('http://localhost:3000/person/register')}>
                Sign up
              </Text>
            </Text>
          </View>

        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#94A3B8',
    textAlign: 'center',
  },
  form: {
    marginBottom: 32,
  },
  inputContainer: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#E2E8F0',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#1E293B',
    borderWidth: 1,
    borderColor: '#334155',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    color: '#FFFFFF',
  },
  inputFocused: {
    borderColor: '#06B6D4',
    shadowColor: '#06B6D4',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  loginButton: {
    backgroundColor: '#06B6D4',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
    shadowColor: '#06B6D4',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  loginButtonDisabled: {
    backgroundColor: '#0891B2',
    opacity: 0.7,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  footer: {
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#94A3B8',
  },
  signupLink: {
    color: '#06B6D4',
    fontWeight: '600',
  },
});