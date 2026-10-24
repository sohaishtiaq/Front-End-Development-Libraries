export const MoodBoardItem = ({ color, image, description }) => {
  return (
    <div
      className="mood-board-item"
      style={{ backgroundColor: color }}
    >
      <img
        className="mood-board-image"
        src={image}
        alt={description}
      />
      <h3 className="mood-board-text">{description}</h3>
    </div>
  );
};

export const MoodBoard = () => {
  return (
    <div>
      <h1 className="mood-board-heading">
        Destination Mood Board
      </h1>

      <div className="mood-board">
        <MoodBoardItem
          color="#87CEEB"
          image="https://cdn.freecodecamp.org/curriculum/labs/pathway.jpg"
          description="Peaceful Nature Walk"
        />

        <MoodBoardItem
          color="#F4A460"
          image="https://cdn.freecodecamp.org/curriculum/labs/shore.jpg"
          description="Sunny Beach Escape"
        />

        <MoodBoardItem
          color="#90EE90"
          image="https://cdn.freecodecamp.org/curriculum/labs/grass.jpg"
          description="Green Countryside"
        />
      </div>
    </div>
  );
};
