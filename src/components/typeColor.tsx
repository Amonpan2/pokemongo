export const typeColor = (type: string) => {
  switch (type) {
    case "fire":
      return "#ff7043";
    case "water":
      return "#42a5f5";
    case "grass":
      return "#66bb6a";
    case "electric":
      return "#ffd600";
    case "bug":
      return "#a2cf6e";
    case "poison":
      return "#ba68c8";
    case "ground":
      return "#bcaaa4";
    case "rock":
      return "#bdb76b";
    case "psychic":
      return "#f06292";
    case "fighting":
      return "#d84315";
    case "ghost":
      return "#7e57c2";
    case "ice":
      return "#4fc3f7";
    case "dragon":
      return "#1976d2";
    case "dark":
      return "#616161";
    case "fairy":
      return "#f8bbd0";
    case "steel":
      return "#90a4ae";
    case "flying":
      return "#81d4fa";
    default:
      return "#1976d2";
  }
};