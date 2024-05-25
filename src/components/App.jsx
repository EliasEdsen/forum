import { useSelector, useDispatch } from 'react-redux'
// import { decrement, increment, incrementByAmount} from '../redux/reducers/userSlice'

import Points from './Points'

function App() {
  // const coins = useSelector((state) => state.user.coins)
  // const dispatch = useDispatch()

  return (
    <>
      {/* <div>
        <button
          aria-label="Увеличить значение"
          onClick={() => dispatch(increment())}
        >
          Увеличить монет
        </button>
        <span>{coins}</span>
        <button
          aria-label="Уменьшить значение"
          onClick={() => dispatch(decrement())}
        >
          Уменьшить монет
        </button>
        <button
          aria-label="Добавить своё"
          onClick={() => dispatch(incrementByAmount(Number(prompt())))}
        >
          Добавить своё монет
        </button>
      </div> */}

      <Points />
    </>
  );
}

export default App;
