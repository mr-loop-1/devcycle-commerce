export default function Categories() {
  // top three/four categories
  const arr = [1, 2, 3];
  return (
    <div>
      <div className="flex justify-around">
        {arr.map((i) => {
          return (
            <div className="">
              <img src={`/categories/${i}.jpg`} className="" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
