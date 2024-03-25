import { useQuery } from 'react-query';
import PaintBox from '../components/PaintBox';
const API_LOC = import.meta.env.VITE_API_LOCATION;
const PORT = import.meta.env.VITE_API_PORT;

function ShowPaint() {

  // Get Paint Stock on the main page
  const { data, isLoading, error } = useQuery('paints', async () => {
    const response = await fetch(`${API_LOC}:${PORT}/api/paints`);
    if (!response.ok) {
      console.log('Network response was not ok');
    }
    return response.json();
  });

  // state management from query
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <div className="stock">

        {/* Available Stock > 6 units */}
        <section className="kanban-section">
          <h3 className="headers">Available</h3>
          <div className="stock-box">

            {data.map((item) => (
              item.stock > 6 && (
                <PaintBox
                  key={item.id}
                  item={item} />
              )
            ))}
          </div>
        </section>

        {/* Low Stock <= 5 units */}
        <section className="kanban-section">
          <h3 className="headers">Low Stock</h3>
          <div className="stock-box">

            {data.map((item) => (
              item.stock <= 5 && item.stock > 0 && (
                <PaintBox
                  key={item.id}
                  item={item} />
              )
            ))}
          </div>
        </section>

        {/* Out of Stock = 0 units */}
        <section className="kanban-section">
          <h3 className="headers">Out of Stock</h3>
          <div className="stock-box">

            {data.map((item) => (
              item.stock === 0 && (
                <PaintBox
                  key={item.id}
                  item={item} />
              )
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

export default ShowPaint;