export default function Categories({ isSale, data }) {
  // top three/four categories
  return (
    <div>
      <div className="flex justify-around">
        {data.map((category) => {
          return (
            <div className="">
              <img src={`/categories/${category.slug}.png`} className="" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
