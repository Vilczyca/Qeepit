import { useEffect, useState } from 'react'
import { useLogin } from '@shared/contexts/LoginContext'
import { fetchItems, addItem, updateItem, deleteItem } from '@shared/api/resources'
import ItemCard from '../components/items/ItemCard'
import Table from '../components/items/Table'
import AddItemForm from '../components/forms/AddItemForm'
import EditItemForm from '../components/forms/EditItemForm'
import "../styles/home.css"

export default function Home() {
    const [items, setItems] = useState([])
    const [showAddForm, setShowAddForm] = useState(false)
    const [editingItem, setEditingItem] = useState(null)
    const { logout } = useLogin()

    useEffect(() => {
        const loadItems = async () => {
            try {
                const data = await fetchItems()
                setItems(data)
            } catch (error) {
                console.error('Error loading items:', error)
                if (error.response?.status === 401) {
                    logout()
                }
            }
        }

        loadItems()
    }, [])

    const handleAdd = async (newItem) => {
        try {
            const added = await addItem(newItem)
            setItems([...items, added])
            setShowAddForm(false)
        } catch (error) {
            console.error('Error adding item:', error)
        }
    }

    const handleEdit = async (updatedItem) => {
        try {
            const edited = await updateItem(updatedItem)
            setItems(items.map(item => item.id === edited.id ? edited : item))
            setEditingItem(null)
        } catch (error) {
            console.error('Error updating item:', error)
        }
    }

    const handleDelete = async (id) => {
        try {
            await deleteItem(id)
            setItems(items.filter(item => item.id !== id))
        } catch (error) {
            console.error('Error deleting item:', error)
        }
    }

    return (
        <div className="home-container">
            <header className="page-header">
                <h1>Inventory</h1>
                <button
                    className="logout-button"
                    onClick={logout}
                >
                    Logout
                </button>
            </header>

            <button
                className="primary-button"
                onClick={() => setShowAddForm(true)}
            >
                + Add Item
            </button>

            <div className="items-grid" style={{ display: 'none' }}>
                {items.map(item => (
                    <ItemCard
                        key={item.id}
                        item={item}
                        onEdit={() => setEditingItem(item)}
                        onDelete={() => handleDelete(item.id)}
                    />
                ))}
            </div>

            <div className="table-view">
                <Table
                    items={items}
                    onEdit={setEditingItem}
                    onDelete={handleDelete}
                />
            </div>

            {showAddForm && (
                <AddItemForm
                    onAdd={handleAdd}
                    onCancel={() => setShowAddForm(false)}
                />
            )}

            {editingItem && (
                <EditItemForm
                    item={editingItem}
                    onSave={handleEdit}
                    onCancel={() => setEditingItem(null)}
                />
            )}
        </div>
    )
}