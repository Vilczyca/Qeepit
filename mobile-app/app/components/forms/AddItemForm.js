// import { useState } from 'react';
// import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
// import { Picker } from '@react-native-picker/picker';
// import { CategoryDropdown } from '../UI/CategoryDropdown';
//
//
// const AddItemForm = ({ onAdd, onCancel }) => {
//     const [formData, setFormData] = useState({
//         name: '',
//         description: '',
//         category: 'Electronics',
//         quantity: '0', // TextInput zwraca stringi
//     });
//
//     const handleChange = (name, value) => {
//         setFormData(prev => ({
//             ...prev,
//             [name]: value,
//         }));
//     };
//
//     const handleSubmit = () => {
//         if (!formData.name.trim()) {
//             Alert.alert('Validation Error', 'Name is required');
//             return;
//         }
//
//         if (isNaN(formData.quantity) || Number(formData.quantity) < 0) {
//             Alert.alert('Validation Error', 'Quantity must be a non-negative number');
//             return;
//         }
//
//         onAdd({
//             ...formData,
//             quantity: Number(formData.quantity),
//             dateAdded: new Date().toISOString(),
//             lastUpdated: new Date().toISOString(),
//         });
//     };
//
//     return (
//         <View style={styles.container}>
//             <Text style={styles.heading}>Add New Item</Text>
//
//             <Text>Name *</Text>
//             <TextInput
//                 style={styles.input}
//                 value={formData.name}
//                 onChangeText={(text) => handleChange('name', text)}
//                 placeholder="Item name"
//             />
//
//             <Text>Description</Text>
//             <TextInput
//                 style={[styles.input, { height: 80 }]}
//                 value={formData.description}
//                 onChangeText={(text) => handleChange('description', text)}
//                 placeholder="Description"
//                 multiline
//             />
//
//             <Text>Category</Text>
//             <CategoryDropdown
//                 selected={formData.category}
//                 onSelect={(value) => setFormData({ ...formData, category: value })}
//             />
//
//             <Text>Quantity *</Text>
//             <TextInput
//                 style={styles.input}
//                 value={formData.quantity}
//                 onChangeText={(text) => handleChange('quantity', text)}
//                 placeholder="0"
//                 keyboardType="numeric"
//             />
//
//             <View style={styles.buttonRow}>
//                 <Button title="Cancel" color="grey" onPress={onCancel} />
//                 <Button title="Add Item" onPress={handleSubmit} />
//             </View>
//         </View>
//     );
// };
//
// export default AddItemForm;
//
// const styles = StyleSheet.create({
//     container: {
//         padding: 20,
//         backgroundColor: '#fff',
//         borderRadius: 12,
//     },
//     heading: {
//         fontSize: 20,
//         marginBottom: 10,
//         fontWeight: 'bold',
//     },
//     input: {
//         borderWidth: 1,
//         borderColor: '#999',
//         borderRadius: 6,
//         padding: 8,
//         marginBottom: 10,
//     },
//     buttonRow: {
//         marginTop: 10,
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//     },
// });
