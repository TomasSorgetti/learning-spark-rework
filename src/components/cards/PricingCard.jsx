export default function PricingCard({
  title,
  price,
  salePrice,
  list,
  cta,
  active,
}) {
  return (
    <div className={`w-full ${active ? "bg-blue-800" : "bg-white"}`}>
      <h3>{title}</h3>
      <div>
        <p>{price}</p>
        <p>{salePrice}</p>
      </div>
      <ul>
        {list.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <a href="#">{cta}</a>
    </div>
  );
}
