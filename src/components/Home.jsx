import { useAuth } from "../App";

const Home = () => {
  const { items } = useAuth();

  return (
    <div className="text-center mt-10">
      <h1 className="text-2xl">Bosh sahifa</h1>
      <ul className="mt-4">
        {items.map((item, index) => (
          <li key={index} className="border p-2 m-2 rounded shadow">
            <h3 className="font-bold">{item.title}</h3>
            <p>{item.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
