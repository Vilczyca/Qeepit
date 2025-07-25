import { useState } from 'react'
// import "../../styles/forms.css";

const AddItemForm = ({ onAdd, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'Electronics',
    quantity: 0,
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onAdd({
      ...formData,
      dateAdded: new Date().toISOString(),
      lastUpdated: new Date().toISOString()
    })
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Add New Item</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="Electronics">Electronics</option>
                <option value="Furniture">Furniture</option>
                <option value="Office Supplies">Office Supplies</option>
              </select>
            </div>

            <div className="form-group">
              <label>Quantity *</label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                min="0"
                required
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="button" onClick={onCancel}>Cancel</button>
            <button type="submit" className="primary">Add Item</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddItemForm