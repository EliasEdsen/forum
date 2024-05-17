function Input({handleSearch}) {
  console.log('Input');

  return (
    <>
      <input onChange={handleSearch}/>
    </>
  );
}

export default Input;
