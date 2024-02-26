import styles from "./Square.module.css";
const Square = ({ value, onClick }) => {
  return (
    <button onClick={onClick} className={styles.square}>
      {value}
    </button>
  );
};

export default Square;
