
// // import React, { useEffect, useState } from 'react';
// // import {
// //   PermissionsAndroid,
// //   Text,
// //   View,
// //   SafeAreaView,
// //   StyleSheet,
// //   Button,
// //   Alert,
// // } from 'react-native';
// // // @ts-ignore
// // import SmsAndroid from 'react-native-get-sms-android';
// // // screens/MessageScreen.tsx
// // export default function MessageScreen() {
// //   // keep your existing code exactly here
// //   const [latestDebitMsg, setLatestDebitMsg] = useState('No message yet');
// //   const [lastMessageId, setLastMessageId] = useState(null);
// //   const [latestMessageDate, setLatestMessageDate] = useState(new Date());

// //   const requestSMSPermission = async () => {
// //     try {
// //       const granted = await PermissionsAndroid.request(
// //         PermissionsAndroid.PERMISSIONS.READ_SMS,
// //         {
// //           title: 'SMS Permission',
// //           message: 'App needs access to your SMS to filter messages.',
// //           buttonPositive: 'OK',
// //         },
// //       );
// //       return granted === PermissionsAndroid.RESULTS.GRANTED;
// //     } catch (err) {
// //       console.warn(err);
// //       return false;
// //     }
// //   };

// //   const extractAmount = (text: any) => {
// //     const match = text.match(/(?:Rs\.?|INR)\s?([\d,]+\.?\d{0,2})/i);
// //     return match ? parseFloat(match[1].replace(/,/g, '')) : null;
// //   };

// //   const postExpense = async (bodyData: any) => {
// //     try {
// //       await fetch('http://192.168.0.169:3000/expense/add', {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //         },
// //         body: JSON.stringify(bodyData),
// //       });

// //       Alert.alert('Expense Added ✅', `Rs ${bodyData.amount} added to DB`);
// //     } catch (error) {
// //       console.error('Error adding expense: ', error);
// //     }
// //   };

// //   const fetchLatestDebitMessage = async () => {
// //     const hasPermission = await requestSMSPermission();
// //     if (!hasPermission) return;

// //     const filter = {
// //       box: 'inbox',
// //       maxCount: 10,
// //     };

// //     SmsAndroid.list(
// //       JSON.stringify(filter),
// //       (fail: any) => console.log('Failed with error: ' + fail),
// //       async (count: any, smsList: any) => {
// //         const messages = JSON.parse(smsList);
// //         const debitMessages = messages.filter((msg: any) =>
// //           msg.body.toLowerCase().includes('debited') ||
// //           msg.body.toLowerCase().includes('debit')
// //         );

// //         if (debitMessages.length > 0) {
// //           debitMessages.sort((a: any, b: any) => b.date - a.date);
// //           const latest = debitMessages[0];

// //           if (latest._id !== lastMessageId) {
// //             const amount = extractAmount(latest.body);
// //             if (amount) {
// //               const bodyData = {
// //                 amount,
// //                 category: 'Auto SMS',
// //                 description: latest.body.slice(0, 100),
// //                 date: new Date(latest.date),
// //               };
// //               await postExpense(bodyData);
// //             }

// //             setLatestDebitMsg(latest.body);
// //             setLastMessageId(latest._id);
// //             setLatestMessageDate(new Date(latest.date));
// //           }
// //         }
// //       }
// //     );
// //   };

// //   // 🔘 Manual Add Button Handler
// //   const handleManualAdd = async () => {
// //     const amount = extractAmount(latestDebitMsg);
// //     if (!amount) {
// //       Alert.alert('❌ Invalid Message', 'Could not extract amount from latest message');
// //       return;
// //     }

// //     const bodyData = {
// //       amount,
// //       category: 'Manual SMS Add',
// //       description: latestDebitMsg.slice(0, 100),
// //       date: latestMessageDate,
// //     };

// //     await postExpense(bodyData);
// //   };

// //   useEffect(() => {
// //     fetchLatestDebitMessage(); // Initial fetch

// //     const interval = setInterval(() => {
// //       fetchLatestDebitMessage(); // Poll every 5 seconds
// //     }, 5000);

// //     return () => clearInterval(interval);
// //   }, []);

// //   return (
// //     <SafeAreaView style={styles.container}>
// //       <Text style={styles.title}>Latest Debit Message:</Text>
// //       <Text style={styles.message}>{latestDebitMsg}</Text>

// //       <Button title="Refresh Now" onPress={fetchLatestDebitMessage} />
// //       <View style={{ height: 10 }} />
// //       <Button title="Manually Add Expense 💰" onPress={handleManualAdd} />
// //     </SafeAreaView>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     padding: 20,
// //     backgroundColor: '#000',
// //   },
// //   title: {
// //     fontSize: 20,
// //     color: '#00ffcc',
// //     marginBottom: 10,
// //   },
// //   message: {
// //     fontSize: 16,
// //     color: '#fff',
// //     marginBottom: 30,
// //   },
// // });











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
// import AsyncStorage from '@react-native-async-storage/async-storage';
// // @ts-ignore
// import SmsAndroid from 'react-native-get-sms-android';

// export default function MessageScreen() {
//   const [latestDebitMsg, setLatestDebitMsg] = useState('No message yet');
//   const [lastMessageDate, setLastMessageDate] = useState<number | null>(null);
//   const [latestMessageDate, setLatestMessageDate] = useState(new Date());

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

//   const extractAmount = (text: any) => {
//     const match = text.match(/(?:Rs\.?|INR)\s?([\d,]+\.?\d{0,2})/i);
//     return match ? parseFloat(match[1].replace(/,/g, '')) : null;
//   };

//   const postExpense = async (bodyData: any) => {
//     try {
//       const token = await AsyncStorage.getItem('token');
//       if (!token) {
//         Alert.alert('Error', 'User not logged in');
//         return;
//       }

//       const res = await fetch('http://192.168.0.169:3000/expense/appadd', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`, // ✅ Send token
//         },
//         body: JSON.stringify(bodyData),
//       });

//       const json = await res.json();
//       if (res.ok) {
//         Alert.alert('Expense Added ✅', `Rs ${bodyData.amount} added to DB`);
//       } else {
//         console.log(json);
//         Alert.alert('Failed ❌', json?.message || 'Could not add expense');
//       }
//     } catch (error) {
//       console.error('Error adding expense: ', error);
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
//       (fail: any) => console.log('Failed with error: ' + fail),
//       async (count: any, smsList: any) => {
//         const messages = JSON.parse(smsList);
//         const debitMessages = messages.filter((msg: any) =>
//           msg.body.toLowerCase().includes('debited') ||
//           msg.body.toLowerCase().includes('debit')
//         );

//         if (debitMessages.length > 0) {
//           debitMessages.sort((a: any, b: any) => b.date - a.date);
//           const latest = debitMessages[0];

//           if (latest.date !== lastMessageDate) {
//             const amount = extractAmount(latest.body);
//             if (amount) {
//               const bodyData = {
//                 amount,
//                 category: 'Auto SMS',
//                 description: latest.body.slice(0, 100),
//                 date: new Date(latest.date),
//               };
//               await postExpense(bodyData);
//             }

//             setLatestDebitMsg(latest.body);
//             setLastMessageDate(latest.date);
//             setLatestMessageDate(new Date(latest.date));
//           }
//         }
//       }
//     );
//   };

//   const handleManualAdd = async () => {
//     const amount = extractAmount(latestDebitMsg);
//     if (!amount) {
//       Alert.alert('❌ Invalid Message', 'Could not extract amount from latest message');
//       return;
//     }

//     const bodyData = {
//       amount,
//       category: 'Manual SMS Add',
//       description: latestDebitMsg.slice(0, 100),
//       date: latestMessageDate,
//     };

//     await postExpense(bodyData);
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
//       <View style={{ height: 10 }} />
//       <Button title="Manually Add Expense 💰" onPress={handleManualAdd} />
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























// import React, { useEffect, useRef, useState } from 'react';
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
// import AsyncStorage from '@react-native-async-storage/async-storage';

// export default function MessageScreen() {
//   const [latestDebitMsg, setLatestDebitMsg] = useState('No message yet');
//   const [latestMessageDate, setLatestMessageDate] = useState(new Date());
//   const lastMessageId = useRef(null); // track last processed _id

//   const requestSMSPermission = async () => {
//     try {
//       const granted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.READ_SMS,
//         {
//           title: 'SMS Permission',
//           message: 'App needs access to your SMS to filter messages.',
//           buttonPositive: 'OK',
//         }
//       );
//       return granted === PermissionsAndroid.RESULTS.GRANTED;
//     } catch (err) {
//       console.warn(err);
//       return false;
//     }
//   };

//   const extractAmount = (text: string) => {
//     const match = text.match(/(?:Rs\.?|INR)\s?([\d,]+\.?\d{0,2})/i);
//     return match ? parseFloat(match[1].replace(/,/g, '')) : null;
//   };

//   const postExpense = async (bodyData: any) => {
//     try {
//       const token = await AsyncStorage.getItem('token');
//       console.log('🟢 Posting expense:', bodyData);

//       const res = await fetch('http://192.168.0.169:3000/expense/appadd', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(bodyData),
//       });

//       const json = await res.json();
//       console.log('📨 Server response:', res.status, json);

//       if (res.ok) {
//         Alert.alert('✅ Expense Added', `Rs ${bodyData.amount} added to DB`);
//       } else {
//         Alert.alert('❌ Failed to add', json?.message || 'Something went wrong');
//       }
//     } catch (error: any) {
//       console.error('❌ Error adding expense:', error);
//       Alert.alert('❌ Error', error.message);
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
//       (fail: any) => console.log('Failed with error: ' + fail),
//       async (count: any, smsList: any) => {
//         const messages = JSON.parse(smsList);
//         const debitMessages = messages.filter((msg: any) =>
//           msg.body.toLowerCase().includes('debited') ||
//           msg.body.toLowerCase().includes('debit')
//         );

//         if (debitMessages.length > 0) {
//           debitMessages.sort((a: any, b: any) => b.date - a.date);
//           const latest = debitMessages[0];

//           if (latest._id !== lastMessageId.current) {
//             const amount = extractAmount(latest.body);
//             if (amount) {
//               const bodyData = {
//                 amount,
//                 category: 'Auto SMS',
//                 description: latest.body.slice(0, 100),
//                 date: new Date(latest.date),
//               };

//               await postExpense(bodyData);
//               lastMessageId.current = latest._id;
//               setLatestDebitMsg(latest.body);
//               setLatestMessageDate(new Date(latest.date));
//             }
//           } else {
//             console.log('⚠️ Duplicate message, skipping...');
//           }
//         }
//       }
//     );
//   };

//   const handleManualAdd = async () => {
//     const amount = extractAmount(latestDebitMsg);
//     if (!amount) {
//       Alert.alert('❌ Invalid Message', 'Could not extract amount from latest message');
//       return;
//     }

//     const bodyData = {
//       amount,
//       category: 'Manual SMS Add',
//       description: latestDebitMsg.slice(0, 100),
//       date: latestMessageDate,
//     };

//     await postExpense(bodyData);
//   };

//   useEffect(() => {
//     fetchLatestDebitMessage(); // initial

//     const interval = setInterval(() => {
//       fetchLatestDebitMessage();
//     }, 5000);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <SafeAreaView style={styles.container}>
//       <Text style={styles.title}>Latest Debit Message:</Text>
//       <Text style={styles.message}>{latestDebitMsg}</Text>

//       <Button title="🔁 Refresh Now" onPress={fetchLatestDebitMessage} />
//       <View style={{ height: 10 }} />
//       <Button title="💰 Manually Add Expense" onPress={handleManualAdd} />
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









import React, { useEffect, useRef, useState } from 'react';
import {
  PermissionsAndroid,
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
// @ts-ignore
import SmsAndroid from 'react-native-get-sms-android';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MessageScreen() {
  const [latestDebitMsg, setLatestDebitMsg] = useState('No message yet');
  const [latestMessageDate, setLatestMessageDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [lastAmount, setLastAmount] = useState<number | null>(null);
  const lastMessageId = useRef(null);

  const requestSMSPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_SMS,
        {
          title: 'SMS Permission',
          message: 'App needs access to your SMS to filter messages.',
          buttonPositive: 'OK',
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  const extractAmount = (text: string) => {
    const match = text.match(/(?:Rs\.?|INR)\s?([\d,]+\.?\d{0,2})/i);
    return match ? parseFloat(match[1].replace(/,/g, '')) : null;
  };

  const postExpense = async (bodyData: any) => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('token');
      console.log('🟢 Posting expense:', bodyData);
      
      const res = await fetch('http://192.168.0.169:3000/expense/appadd', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bodyData),
      });

      const json = await res.json();
      console.log('📨 Server response:', res.status, json);

      if (res.ok) {
        Alert.alert('✅ Expense Added', `Rs ${bodyData.amount} added to DB`);
      } else {
        Alert.alert('❌ Failed to add', json?.message || 'Something went wrong');
      }
    } catch (error: any) {
      console.error('❌ Error adding expense:', error);
      Alert.alert('❌ Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchLatestDebitMessage = async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    
    const hasPermission = await requestSMSPermission();
    if (!hasPermission) {
      if (isRefresh) setRefreshing(false);
      return;
    }

    const filter = {
      box: 'inbox',
      maxCount: 10,
    };

    SmsAndroid.list(
      JSON.stringify(filter),
      (fail: any) => {
        console.log('Failed with error: ' + fail);
        if (isRefresh) setRefreshing(false);
      },
      async (count: any, smsList: any) => {
        const messages = JSON.parse(smsList);
        console.log(messages)
        const debitMessages = messages.filter((msg: any) =>
          msg.body.toLowerCase().includes('debited') ||
          msg.body.toLowerCase().includes('debit') 
          // msg.body.toLowerCase().includes('debit') ||
          // msg.body.toLowerCase().includes('credited') 
        );

        if (debitMessages.length > 0) {
          debitMessages.sort((a: any, b: any) => b.date - a.date);
          const latest = debitMessages[0];

          if (latest._id !== lastMessageId.current) {
            const amount = extractAmount(latest.body);
            if (amount) {
              const bodyData = {
                amount,
                category: 'Auto SMS',
                description: latest.body.slice(0, 100),
                date: new Date(latest.date),
              };

              await postExpense(bodyData);
              lastMessageId.current = latest._id;
              setLatestDebitMsg(latest.body);
              setLatestMessageDate(new Date(latest.date));
              setLastAmount(amount);
            }
          } else {
            console.log('⚠️ Duplicate message, skipping...');
          }
        }
        
        if (isRefresh) setRefreshing(false);
      }
    );
  };

  const handleManualAdd = async () => {
    const amount = extractAmount(latestDebitMsg);
    if (!amount) {
      Alert.alert('❌ Invalid Message', 'Could not extract amount from latest message');
      return;
    }

    const bodyData = {
      amount,
      category: 'Manual SMS Add',
      description: latestDebitMsg.slice(0, 100),
      date: latestMessageDate,
    };

    await postExpense(bodyData);
  };

  const onRefresh = () => {
    fetchLatestDebitMessage(true);
  };

  useEffect(() => {
    fetchLatestDebitMessage();
    const interval = setInterval(() => {
      fetchLatestDebitMessage();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>SMS Expense Tracker</Text>
          <Text style={styles.headerSubtitle}>Latest debit transactions</Text>
        </View>

        {/* Status Card */}
        <View style={styles.statusCard}>
          <View style={styles.statusHeader}>
            <Text style={styles.statusTitle}>Auto-Sync Status</Text>
            <View style={[styles.statusIndicator, styles.statusActive]} />
          </View>
          <Text style={styles.statusText}>
            Monitoring SMS every 5 seconds
          </Text>
        </View>

        {/* Message Card */}
        <View style={styles.messageCard}>
          <View style={styles.messageHeader}>
            <Text style={styles.messageTitle}>Latest Debit Message</Text>
            {lastAmount && (
              <View style={styles.amountBadge}>
                <Text style={styles.amountText}>₹{lastAmount.toLocaleString('en-IN')}</Text>
              </View>
            )}
          </View>
          
          <View style={styles.messageContent}>
            <Text style={styles.messageText}>{latestDebitMsg}</Text>
          </View>
          
          <View style={styles.messageFooter}>
            <Text style={styles.dateText}>
              📅 {formatDate(latestMessageDate)}
            </Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.primaryButton]}
            onPress={() => fetchLatestDebitMessage(true)}
            disabled={loading || refreshing}
          >
            {refreshing ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="small" color="#FFFFFF" />
                <Text style={styles.buttonText}>Refreshing...</Text>
              </View>
            ) : (
              <>
                <Text style={styles.buttonIcon}>🔄</Text>
                <Text style={styles.buttonText}>Refresh Now</Text>
              </>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.secondaryButton]}
            onPress={handleManualAdd}
            disabled={loading || latestDebitMsg === 'No message yet'}
          >
            {loading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="small" color="#06B6D4" />
                <Text style={[styles.buttonText, styles.secondaryButtonText]}>Adding...</Text>
              </View>
            ) : (
              <>
                <Text style={styles.buttonIcon}>💰</Text>
                <Text style={[styles.buttonText, styles.secondaryButtonText]}>
                  Add Expense Manually
                </Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 24,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#94A3B8',
  },
  statusCard: {
    backgroundColor: '#1E293B',
    marginHorizontal: 24,
    marginBottom: 16,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#334155',
  },
  statusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  statusTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#E2E8F0',
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  statusActive: {
    backgroundColor: '#10B981',
  },
  statusText: {
    fontSize: 14,
    color: '#94A3B8',
  },
  messageCard: {
    backgroundColor: '#1E293B',
    marginHorizontal: 24,
    marginBottom: 24,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#334155',
    overflow: 'hidden',
  },
  messageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    paddingBottom: 16,
  },
  messageTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#E2E8F0',
  },
  amountBadge: {
    backgroundColor: '#06B6D4',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  amountText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  messageContent: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  messageText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#CBD5E1',
    backgroundColor: '#0F172A',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#334155',
  },
  messageFooter: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  dateText: {
    fontSize: 13,
    color: '#64748B',
  },
  buttonContainer: {
    paddingHorizontal: 24,
    paddingBottom: 24,
    gap: 12,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  primaryButton: {
    backgroundColor: '#06B6D4',
    shadowColor: '#06B6D4',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#06B6D4',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  secondaryButtonText: {
    color: '#06B6D4',
  },
  buttonIcon: {
    fontSize: 16,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});