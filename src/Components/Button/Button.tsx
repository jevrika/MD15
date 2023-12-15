import styles from './Button.module.css'

type ButtonType = {
  buttonText: string;
  className: string;
  buttonType: "submit" | "reset" | "button";
  disabled?: boolean;
  onClick?: () => void;
  onChange?: () => void;
}

const Button = ({ buttonText , className, buttonType,  onClick }: ButtonType) => {

  return (
    <div className={styles.buttonWrapper}>
      <button type={buttonType} className={styles[className]}onClick={onClick}>{buttonText} </button> 
    </div>
  );
 
}

export default Button;