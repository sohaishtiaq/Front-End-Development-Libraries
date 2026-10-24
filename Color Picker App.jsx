export const ColorPicker = () => {
  const [color, setColor] = React.useState("#ffffff");

  return (
    <div
      id="color-picker-container"
      style={{ backgroundColor: color }}
    >
      <input
        id="color-input"
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
      />
    </div>
  );
};
