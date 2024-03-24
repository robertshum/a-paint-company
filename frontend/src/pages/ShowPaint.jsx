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
      <div className="stock-box">
        <h3>Available</h3>
        {data.map((item) => (
          item.stock > 6 && (
            <PaintBox
              key={item.id}
              item={item} />
          )
        ))}

        <h3>Low Stock</h3>
        {data.map((item) => (
          item.stock <= 5 && item.stock > 0 && (
            <PaintBox
              key={item.id}
              item={item} />
          )
        ))}

        <h3>Out of Stock</h3>
        {data.map((item) => (
          item.stock === 0 && (
            <PaintBox
              key={item.id}
              item={item} />
          )
        ))}

      </div>
    </>
  );
}

export default ShowPaint;