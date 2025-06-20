function Button(props) {
  return (
    <button className={props.class} onClick={props.clickFn}>
      {props.children}
    </button>
  );
}

export default Button;
