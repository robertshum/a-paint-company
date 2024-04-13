import { useQuery } from 'react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PaintBox from '../components/PaintBox';
import config from '../common/config';

function EditPaint() {

  const navigate = useNavigate();
  const [updatedStock, setUpdatedStock] = useState([]);

  // Handle button disable
  const [disableButton, setDisableButton] = useState(false);


  // Get Paint Stock on the main page
  const { data, isLoading, error } = useQuery('paints', async () => {
    const response = await fetch(`${config.getPaintApiEndpoint()}/api/paints`);
    if (!response.ok) {
      console.log('Network response was not ok');
    }

    const responseData = await response.json();
    setUpdatedStock(responseData);
    return responseData;
  });

  // go through the existing state, and map through each item
  // if the id matches, return that item and update the stock
  // otherwise, just return the original item
  function handleGeneralStockChange(id, newStock) {
    setUpdatedStock(prevStock => {
      return prevStock.map(item => {
        if (item.id === id) {
          return { ...item, stock: newStock };
        }
        return item;
      });
    });
  }

  // When user saves the paint stock
  async function handleOnSubmit() {
    if (updatedStock) {
      const response = await fetch(`${config.getPaintApiEndpoint()}/api/paints/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ paint: updatedStock }),
      });

      if (!response.ok) {
        console.log('Failed to update stock');
      }

      // Return back home
      return navigate('/');
    }

    //submitting no changes
    console.log('There are no changes to submit');
  }

  // state management from query
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      {/* Show paint boxes to modify stock */}
      <section className="kanban-section">
        <h3 className="headers">Edit Paint Stock</h3>
        <div className="stock-box">

          {data.map((item) => (
            <PaintBox
              key={item.id}
              item={item}
              edit={"full"}
              onStockChange={handleGeneralStockChange}
              setDisableButton={setDisableButton}
            />
          ))}
        </div>
      </section>

      <button
        onClick={handleOnSubmit}
        disabled={disableButton}>Update Stock</button>
    </>
  );
}

export default EditPaint;