const MenuCard = ({ item }) => {
  return (
    <div className={`relative bg-white shadow-lg hover:shadow-xl rounded-lg p-4 mb-4 flex flex-col items-center sm:flex-row sm:items-start sm:gap-4 transition-transform transform hover:scale-105 ${item.available ? '' : 'opacity-40'}`}>
      {!item.available && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg z-10">
          <span className="text-white font-bold">Unavailable</span>
        </div>
      )}
      <img
        src={item.image}
        alt={item.name}
        className={`w-full sm:w-24 h-32 object-cover rounded-md mb-3 sm:mb-0 ${!item.available ? 'opacity-50' : ''}`}
      />
      <div className="flex flex-col items-center sm:items-start">
        <h3 className={`text-lg font-bold mb-1 text-center sm:text-left ${!item.available ? 'text-gray-500' : 'text-gray-800'}`}>
          {item.name}
        </h3>
        <p className={`text-gray-600 text-sm text-center sm:text-left mb-2 ${!item.available ? 'text-gray-500' : ''}`}>
          {item.description}
        </p>
        <p className={`font-semibold mb-1 ${!item.available ? 'text-gray-500' : 'text-gray-800'}`}>
          {item.price} €
        </p>
        <span className={`text-xs ${!item.available ? 'text-gray-500' : 'text-gray-600'}`}>{item.category}</span>
      </div>
    </div>
  );
};
export default MenuCard;