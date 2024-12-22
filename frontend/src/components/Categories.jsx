import { Link } from 'react-router-dom';

export default function Categories({ isSale, data }) {
  // top three/four categories
  return (
    <div className="md:mx-20 lg:mx-28 my-4 md:my-10">
      <div className="flex justify-between">
        {data.map((category) => {
          return (
            <div className="mx-1 md:mx-2">
              <Link to={`#category-${category.id}`}>
                <img src={`/categories/${category.slug}.png`} className="" />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
