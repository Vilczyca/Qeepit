// import React, { useEffect, useState } from 'react';
// import {
//     View,
//     Text,
//     FlatList,
//     Button,
//     StyleSheet,
//     ActivityIndicator,
//     Modal,
//     Alert,
// } from 'react-native';
// import { fetchItems, addItem, updateItem, deleteItem } from '@shared/api/resources';
// import AddItemForm from '../components/forms/AddItemForm';
// // import EditItemForm from '../components/forms/EditItemForm';
//
// export default function HomeScreen() {
//     const [items, setItems] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [showAddModal, setShowAddModal] = useState(false);
//     const [editingItem, setEditingItem] = useState(null);
//
//     const loadItems = async () => {
//         setLoading(true);
//         try {
//             const data = await fetchItems();
//             setItems(data);
//         } catch (e) {
//             console.error('Error fetching items:', e);
//             Alert.alert('Error', 'Failed to fetch items.');
//         } finally {
//             setLoading(false);
//         }
//     };
//
//     useEffect(() => {
//         loadItems();
//     }, []);
//
//     const handleAdd = async (item) => {
//         try {
//             const newItem = await addItem(item);
//             setItems([...items, newItem]);
//             setShowAddModal(false);
//         } catch (e) {
//             console.error('Add failed:', e);
//             Alert.alert('Error', 'Failed to add item.');
//         }
//     };
//
//     const handleUpdate = async (updatedItem) => {
//         try {
//             const saved = await updateItem(updatedItem);
//             setItems(items.map(item => item.id === saved.id ? saved : item));
//             setEditingItem(null);
//         } catch (e) {
//             console.error('Update failed:', e);
//             Alert.alert('Error', 'Failed to update item.');
//         }
//     };
//
//     const handleDelete = async (id) => {
//         try {
//             await deleteItem(id);
//             setItems(items.filter(item => item.id !== id));
//         } catch (e) {
//             console.error('Delete failed:', e);
//             Alert.alert('Error', 'Failed to delete item.');
//         }
//     };
//
//     return (
//         <View style={styles.container}>
//             <Text style={styles.header}>Inventory</Text>
//             <Button title="+ Add Item" onPress={() => setShowAddModal(true)} />
//
//             {loading ? (
//                 <ActivityIndicator size="large" />
//             ) : (
//                 <FlatList
//                     data={items}
//                     keyExtractor={(item) => item.id.toString()}
//                     renderItem={({ item }) => (
//                         <View style={styles.itemRow}>
//                             <Text>{item.name}</Text>
//                             <View style={styles.buttonGroup}>
//                                 <Button title="Edit" onPress={() => setEditingItem(item)} />
//                                 <Button title="Delete" onPress={() => handleDelete(item.id)} />
//                             </View>
//                         </View>
//                     )}
//                 />
//             )}
//
//             {/* Modal for adding */}
//             <Modal visible={showAddModal} animationType="slide">
//                 <View style={styles.modalContainer}>
//                     <AddItemForm
//                         onAdd={handleAdd}
//                         onCancel={() => setShowAddModal(false)}
//                     />
//                 </View>
//             </Modal>
//
//             {/*/!* Modal for editing *!/*/}
//             {/*<Modal visible={!!editingItem} animationType="slide">*/}
//             {/*    <View style={styles.modalContainer}>*/}
//             {/*        <EditItemForm*/}
//             {/*            item={editingItem}*/}
//             {/*            onSave={handleUpdate}*/}
//             {/*            onCancel={() => setEditingItem(null)}*/}
//             {/*        />*/}
//             {/*    </View>*/}
//             {/*</Modal>*/}
//         </View>
//     );
// }
//
// const styles = StyleSheet.create({
//     container: { flex: 1, padding: 16 },
//     header: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
//     itemRow: {
//         padding: 12,
//         borderBottomWidth: 1,
//         borderColor: '#ddd',
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center'
//     },
//     buttonGroup: { flexDirection: 'row', gap: 8 },
//     modalContainer: {
//         flex: 1,
//         padding: 16,
//         backgroundColor: 'white',
//         justifyContent: 'center'
//     },
// });
