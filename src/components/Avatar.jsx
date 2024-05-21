
const Avatar = ({ title, onClick }) => {
  const colors = ["bg-red-500", "bg-yellow-500", "bg-green-500", "bg-blue-500", "bg-purple-500"];

  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  const randomColor = getRandomColor();

  return (
    <div
      className={`absolute mt-5 bottom-1 right-1 flex justify-center items-center w-5 h-5 rounded-full ${randomColor}`}
      onClick={onClick}
    >
      <span className="text-white text-xs">{title}</span>
    </div>
  );
};

export default Avatar;
