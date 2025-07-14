// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  */

// import { NewAppScreen } from '@react-native/new-app-screen';
// import { FlatList } from 'react-native';
// import { useEffect, useState } from 'react';
// import { PermissionsAndroid, StatusBar, StyleSheet, Text, useColorScheme, View } from 'react-native';
// // @ts-ignore
// import SmsAndroid from 'react-native-get-sms-android';


// function App() {
//   const isDarkMode = useColorScheme() === 'dark';




//   const [smsList, setSmsList] = useState([])

//   async function requestSmsPermission() {
//     try {
//       const granted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.READ_SMS,
//         {
//           title: "SMS Permission",
//           message: "This app needs access to your SMS Message",
//           buttonNeutral: "Ask me Later",
//           buttonNegative: "Cancel",
//           buttonPositive: "Ok"
//         }
//       )
//       return granted === PermissionsAndroid.RESULTS.GRANTED
//     } catch (error) {
//       console.warn(error)
//       return false
//     }
//   }


//   useEffect(() => {
//     async function fetchSms() {
//       const hasPermission = await requestSmsPermission()
//       if (hasPermission) {
//         SmsAndroid.list(
//           JSON.stringify({
//             box: "inbox",
//             maxCount: 10
//           }),
//           (fail: any) => {
//             console.log('Failed with this error: ' + fail);
//           },
//           (count: any,smsList: any)=>{
//             const messages = JSON.parse(smsList)
//             setSmsList(messages)
//           }
//         )
//       }
//     }

//     fetchSms()
//   }, [])


//   const renderItem = ({item}:any)=>{
//     return(
//       <View style={{margin:10, padding:10 , backgroundColor:'#f9f9f9', borderRadius:5}}>
//         <Text style={{fontWeight:'bold',color:'black'}}>{item.address}</Text>
//         <Text style={{color:'black'}}>{item.body}</Text>
//         <Text style={{color:'black', fontSize:10}}>{new Date(item.date).toLocaleString()}</Text>
//       </View>
//     )
//   }



//   return (
//     <View style={{flex:1,padding:20}}>
//       <FlatList 
//       data={smsList}
//       keyExtractor = {(item:any,index:any)=>index.toString()}
//       renderItem={renderItem}
//       ListEmptyComponent = {<Text>NO SMS FOUND</Text>}
// />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     color: "#ffffff",
//   },
// });

// export default App;


//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------


// import { FlatList, PermissionsAndroid, StatusBar, StyleSheet, Text, useColorScheme, View } from 'react-native';
// import { useEffect, useState } from 'react';
// // @ts-ignore
// import SmsAndroid from 'react-native-get-sms-android';

// function App() {
//   const isDarkMode = useColorScheme() === 'dark';

//   const [smsList, setSmsList] = useState([]);

//   async function requestSmsPermission() {
//     try {
//       const granted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.READ_SMS,
//         {
//           title: "SMS Permission",
//           message: "This app needs access to your SMS messages to detect transactions.",
//           buttonNeutral: "Ask me Later",
//           buttonNegative: "Cancel",
//           buttonPositive: "Ok"
//         }
//       );
//       return granted === PermissionsAndroid.RESULTS.GRANTED;
//     } catch (error) {
//       console.warn(error);
//       return false;
//     }
//   }

//   useEffect(() => {
//     async function fetchSms() {
//       const hasPermission = await requestSmsPermission();
//       if (hasPermission) {
//         SmsAndroid.list(
//           JSON.stringify({
//             box: "inbox",
//             maxCount: 100, // increase count to get more messages
//           }),
//           (fail: any) => {
//             console.log('Failed with this error: ' + fail);
//           },
//           (count: any, smsList: any) => {
//             const messages = JSON.parse(smsList);

//             // 🔍 Filter messages for "debited" or "debit"
//             const filteredMessages = messages.filter((msg: any) =>
//               /debited|debit/i.test(msg.body)
//             );

//             setSmsList(filteredMessages);
//           }
//         );
//       }
//     }

//     fetchSms();
//   }, []);

//   const renderItem = ({ item }: any) => {
//     return (
//       <View style={styles.card}>
//         <Text style={styles.sender}>{item.address}</Text>
//         <Text style={styles.body}>{item.body}</Text>
//         <Text style={styles.date}>{new Date(item.date).toLocaleString()}</Text>
//       </View>
//     );
//   };

//   return (
//     <View style={{ flex: 1, padding: 20 }}>
//       <FlatList
//         data={smsList}
//         keyExtractor={(item: any, index: any) => index.toString()}
//         renderItem={renderItem}
//         ListEmptyComponent={<Text>No debit-related SMS found</Text>}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   card: {
//     margin: 10,
//     padding: 10,
//     backgroundColor: '#f9f9f9',
//     borderRadius: 5,
//   },
//   sender: {
//     fontWeight: 'bold',
//     color: 'black',
//   },
//   body: {
//     color: 'black',
//   },
//   date: {
//     color: 'black',
//     fontSize: 10,
//   },
// });

// export default App;




//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------


// import { useEffect, useState } from 'react';
// import {
//   PermissionsAndroid,
//   Text,
//   useColorScheme,
//   View,
//   StyleSheet,
// } from 'react-native';
// // @ts-ignore
// import SmsAndroid from 'react-native-get-sms-android';

// function App() {
//   const isDarkMode = useColorScheme() === 'dark';
//   const [latestDebitMsg, setLatestDebitMsg] = useState(null);

//   async function requestSmsPermission() {
//     try {
//       const granted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.READ_SMS,
//         {
//           title: "SMS Permission",
//           message: "This app needs access to your SMS Message",
//           buttonNeutral: "Ask Me Later",
//           buttonNegative: "Cancel",
//           buttonPositive: "OK",
//         }
//       );
//       return granted === PermissionsAndroid.RESULTS.GRANTED;
//     } catch (error) {
//       console.warn(error);
//       return false;
//     }
//   }

//   useEffect(() => {
//     async function fetchLatestDebitSms() {
//       const hasPermission = await requestSmsPermission();
//       if (!hasPermission) return;

//       SmsAndroid.list(
//         JSON.stringify({
//           box: "inbox",
//           maxCount: 100, // increase if needed
//         }),
//         (fail: any) => {
//           console.log('Failed with this error: ' + fail);
//         },
//         (count: any, smsList: any) => {
//           const messages = JSON.parse(smsList);

//           // Filter messages with 'debited' or 'debit' (case insensitive)
//           const filtered = messages.filter((msg: any) =>
//             /debited|debit/i.test(msg.body)
//           );

//           // Sort by date descending
//           filtered.sort((a: any, b: any) => b.date - a.date);

//           // Set the latest one
//           if (filtered.length > 0) {
//             setLatestDebitMsg(filtered[0]);
//           }
//         }
//       );
//     }

//     fetchLatestDebitSms();
//   }, []);

//   return (
//     <View style={styles.container}>
//       {latestDebitMsg ? (
//         <View style={styles.card}>
//           <Text style={styles.header}>From: {latestDebitMsg.address}</Text>
//           <Text style={styles.body}>{latestDebitMsg.body}</Text>
//           <Text style={styles.date}>
//             {new Date(latestDebitMsg.date).toLocaleString()}
//           </Text>
//         </View>
//       ) : (
//         <Text style={styles.noSms}>No debit SMS found</Text>
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20, justifyContent: 'center' },
//   card: { backgroundColor: '#f5f5f5', padding: 15, borderRadius: 10 },
//   header: { fontWeight: 'bold', fontSize: 16, marginBottom: 5 },
//   body: { fontSize: 14, color: 'black' },
//   date: { fontSize: 12, color: 'gray', marginTop: 8 },
//   noSms: { textAlign: 'center', fontSize: 16, color: 'gray' },
// });

// export default App;







//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------


// import React, { useEffect, useState } from 'react';
// import {
//   PermissionsAndroid,
//   Text,
//   View,
//   SafeAreaView,
//   StyleSheet,
//   Button,
// } from 'react-native';
// // @ts-ignore
// import SmsAndroid from 'react-native-get-sms-android';

// export default function App() {
//   const [latestDebitMsg, setLatestDebitMsg] = useState('No message yet');

//   const requestSMSPermission = async () => {
//     try {
//       const granted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.READ_SMS,
//         {
//           title: 'SMS Permission',
//           message: 'App needs access to your SMS to filter messages.',
//           buttonPositive: 'OK',
//         },
//       );
//       return granted === PermissionsAndroid.RESULTS.GRANTED;
//     } catch (err) {
//       console.warn(err);
//       return false;
//     }
//   };

//   const fetchLatestDebitMessage = async () => {
//     const hasPermission = await requestSMSPermission();
//     if (!hasPermission) return;

//     const filter = {
//       box: 'inbox',
//       maxCount: 10,
//     };

//     SmsAndroid.list(
//       JSON.stringify(filter),
//       (fail:any) => console.log('Failed with error: ' + fail),
//       (count:any, smsList:any) => {
//         const messages = JSON.parse(smsList);
//         const debitMessages = messages.filter((msg:any) =>
//           msg.body.toLowerCase().includes('debited') ||
//           msg.body.toLowerCase().includes('debit') 
//           // || msg.body.toLowerCase().includes('credited')
//         );

//         if (debitMessages.length > 0) {
//           // Sort by date and get the latest one
//           debitMessages.sort((a:any, b:any) => b.date - a.date);
//           setLatestDebitMsg(debitMessages[0].body);
//         }
//       },
//     );
//   };

//   useEffect(() => {
//     fetchLatestDebitMessage(); // Initial fetch

//     const interval = setInterval(() => {
//       fetchLatestDebitMessage(); // Poll every 5 seconds
//     }, 5000);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <SafeAreaView style={styles.container}>
//       <Text style={styles.title}>Latest Debit Message:</Text>
//       <Text style={styles.message}>{latestDebitMsg}</Text>

//       <Button title="Refresh Now" onPress={fetchLatestDebitMessage} />
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#000',
//   },
//   title: {
//     fontSize: 20,
//     color: '#00ffcc',
//     marginBottom: 10,
//   },
//   message: {
//     fontSize: 16,
//     color: '#fff',
//     marginBottom: 30,
//   },
// });








// import React, { useEffect, useState } from 'react';
// import {
//   PermissionsAndroid,
//   Text,
//   View,
//   SafeAreaView,
//   StyleSheet,
//   Button,
//   Alert,
// } from 'react-native';
// // @ts-ignore
// import SmsAndroid from 'react-native-get-sms-android';

// export default function App() {
  
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#000',
//   },
//   title: {
//     fontSize: 20,
//     color: '#00ffcc',
//     marginBottom: 10,
//   },
//   message: {
//     fontSize: 16,
//     color: '#fff',
//     marginBottom: 30,
//   },
// });



// // App.tsx
// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import LoginScreen from './pages/login';
// import MessageScreen from './pages/MessageScreen';

// const Stack = createNativeStackNavigator();

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator >
//         <Stack.Screen name="Login" component={LoginScreen} />
//         <Stack.Screen name="Messages" component={MessageScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }







// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './pages/login';
import MessageScreen from './pages/MessageScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false, // ✅ Hide the header bar on all screens
        }}
        
        initialRouteName="Login" // ✅ Start from login page
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Messages" component={MessageScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
