export default function Categories() {
  // top three/four categories
  const arr = [1, 2, 3];
  return (
    <div>
      <div className="flex justify-around">
        {arr.map((a) => {
          return <div className="h-48 w-48 bg-red-400"></div>;
        })}
      </div>
    </div>
  );
}
