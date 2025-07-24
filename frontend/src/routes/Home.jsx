import { useEffect, useState } from 'react'
import ItemCard from '../components/items/ItemCard'
import Table from '../components/items/Table'
import AddItemForm from '../components/forms/AddItemForm'
import EditItemForm from '../components/forms/EditItemForm'
import "../styles/home.css"

const API_URL = "http://localhost:8000"  // Zmień jeśli trzeba

export default function Home() {
  const [items, setItems] = useState([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingItem, setEditingItem] = useState(null)

  const token = localStorage.getItem('token')

  // Pobieranie danych z backendu
  useEffect(() => {
    fetch(`${API_URL}/resources/`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(setItems)
      .catch(console.error)
  }, [])

  const handleAdd = (newItem) => {
    fetch(`${API_URL}/resources/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(newItem)
    })
      .then(res => res.json())
      .then(added => {
        setItems([...items, added])
        setShowAddForm(false)
      })
      .catch(console.error)
  }

  const handleEdit = (updatedItem) => {
    fetch(`${API_URL}/resources/${updatedItem.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(updatedItem)
    })
      .then(res => res.json())
      .then(edited => {
        setItems(items.map(item => item.id === edited.id ? edited : item))
        setEditingItem(null)
      })
      .catch(console.error)
  }

  const handleDelete = (id) => {
    fetch(`${API_URL}/resources/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(() => {
        setItems(items.filter(item => item.id !== id))
      })
      .catch(console.error)
  }

  return (
    <div className="home-container">
      <header className="page-header">
        <h1>Inventory</h1>
      </header>

      <button 
        className="primary-button"
        onClick={() => setShowAddForm(true)}
      >
        + Add Item
      </button>

      {/* Widok kart - wyłączony, zostawiam do użycia w przyszłości */}
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

      {/* Tabela z itemami */}
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
