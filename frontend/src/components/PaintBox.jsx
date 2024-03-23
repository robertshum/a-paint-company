import './components.css'

function PaintBox(props) {

  const item = props.item;

  return (
    <>
      <div className="paint-stock" key={item.id}>
        <p>{item.name}</p>
        <div className="paint-box"
          style={{ backgroundColor: item.hex }} />
        <p>Stock: {item.stock}</p>
      </div>
    </>
  );
}

export default PaintBox;