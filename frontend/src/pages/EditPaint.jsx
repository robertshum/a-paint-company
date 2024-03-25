import { useQuery } from 'react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PaintBox from '../components/PaintBox';
const API_LOC = import.meta.env.VITE_API_LOCATION;
const PORT = import.meta.env.VITE_API_PORT;

function EditPaint() {

  const navigate = useNavigate();
  const [updatedStock, setUpdatedStock] = useState(null);

  // Get Paint Stock on the main page
  const { data, isLoading, error } = useQuery('paints', async () => {
    const response = await fetch(`${API_LOC}:${PORT}/api/paints`);
    if (!response.ok) {
      console.log('Network response was not ok');
    }

    return response.json();
  });

  function handleGeneralStockChange(id, newStock) {

    const updatedStock = data.map(item => item.id === id ? { ...item, stock: newStock } : item);

    setUpdatedStock(updatedStock);
  }

  async function handleOnSubmit() {
    console.log("updatedStock", updatedStock);
    if (updatedStock) {
      const response = await fetch(`${API_LOC}:${PORT}/api/paints/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ paint: updatedStock }),
      });

      if (!response.ok) {
        console.log('Failed to update stock');
      }

      // Return the updated data
      return navigate('/');
    }

    //TODO submitting no changes
    console.log('There are no changes to submit');
  }

  // state management from query
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <section className="kanban-section">
        <h3>Edit Paint Stock</h3>
        <div className="stock-box">

          {data.map((item) => (
            <PaintBox
              key={item.id}
              item={item}
              edit={"full"}
              onStockChange={handleGeneralStockChange} />
          ))}
        </div>
      </section>

      <button onClick={handleOnSubmit}>Update Stock</button>
    </>
  );
}

export default EditPaint;