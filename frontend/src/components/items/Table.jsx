import "../../styles/card.css";

const Table = ({ items, onEdit, onDelete }) => {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Status</th>
            <th>Date Added</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.length === 0 ? (
          <tr>
            <td colSpan="6" style={{ textAlign: "center", padding: "1rem" }}>
              No resources available.
            </td>
          </tr>
        ) : (
          items.map(item => (
            <tr key={item.id}>
              <td>
                <strong>{item.name}</strong>
                <p className="table-description">{item.description}</p>
              </td>
              <td>{item.category}</td>
              <td>{item.quantity}</td>
              <td>
                <span className={`status-label ${
                  item.quantity === 0
                    ? "out-of-stock"
                    : item.quantity < 5
                    ? "low-stock"
                    : "available"
                }`}>
                  {item.quantity === 0
                    ? "Out of stock"
                    : item.quantity < 5
                    ? "Low stock"
                    : "Available"}
                </span>
              </td>
              <td>{new Date(item.dateAdded).toLocaleDateString()}</td>
              <td className="actions">
                <button onClick={() => onEdit(item)}>Edit</button>
                <button className="danger" onClick={() => onDelete(item.id)}>Delete</button>
              </td>
            </tr>
          ))
        )}
        </tbody>
      </table>
    </div>
  )
}

export default Table