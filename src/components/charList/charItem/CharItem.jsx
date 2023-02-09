import "./charItem.scss";

const CharItem = ({ img, name }) => {
  const imgIsNotAvaliable =
    "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg";

  let classImg = { objectFit: "cover" };
  if (img === imgIsNotAvaliable) {
    classImg = { objectFit: "fill" };
  }

  return (
    <li className="char__item">
      <img src={img} alt="abyss" style={classImg} />
      <div className="char__name">{name}</div>
    </li>
  );
};

export default CharItem;
