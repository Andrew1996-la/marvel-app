import "./charItem.scss";

const CharItem = ({ img, name, charId, setCharId, focusOnItem, count, setRef }) => {
  const imgIsNotAvaliable =
    "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg";

  let classImg = { objectFit: "cover" };
  if (img === imgIsNotAvaliable) {
    classImg = { objectFit: "fill" };
  }

  const handleClick = () => {
      setCharId(charId)
      focusOnItem(count)
  }

  return (
    <li ref={setRef} onClick={handleClick} className="char__item">
      <img src={img} alt="abyss" style={classImg} />
      <div className="char__name">{name}</div>
    </li>
  );
};

export default CharItem;
