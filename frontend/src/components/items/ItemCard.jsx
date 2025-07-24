import "../../styles/card.css";


const ItemCard = ({ item, onEdit, onDelete }) => {
  const getStatusColor = () => {
    switch(item.status) {
      case 'Available': return 'bg-green-100 text-green-800'
      case 'Low Stock': return 'bg-yellow-100 text-yellow-800'
      case 'Out of Stock': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="item-card">
      <div className="card-header">
        <h3>{item.name}</h3>
        <span className={`status-badge ${getStatusColor()}`}>
          {item.status}
        </span>
      </div>
      
      <p className="description">{item.description}</p>
      
      <div className="card-details">
        <div>
          <span>Category:</span>
          <strong>{item.category}</strong>
        </div>
        <div>
          <span>Quantity:</span>
          <strong>{item.quantity}</strong>
        </div>
      </div>
      
      <div className="card-footer">
        <span>Added: {new Date(item.dateAdded).toLocaleDateString()}</span>
        <div className="card-actions">
          <button onClick={() => onEdit()}>Edit</button>
          <button className="danger" onClick={() => onDelete()}>Delete</button>
        </div>
      </div>
    </div>
  )
}

export default ItemCard