import '../styles/PointDate.css';

function PointDate({text}) {
  return (
    <>
      <div className="line-long"></div>
      <div className='point-date'>{text}</div>
      <div className="line-long"></div>
    </>
  );
}

export default PointDate;
