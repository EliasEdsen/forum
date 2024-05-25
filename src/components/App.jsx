import { useSelector, useDispatch } from 'react-redux'
import { decrement as decrementCounter, increment as incrementCounter, incrementByAmount as incrementByAmountCounter} from '../redux/reducers/counterSlice'
import { decrement as decrementUser,    increment as incrementUser,    incrementByAmount as incrementByAmountUser}    from '../redux/reducers/userSlice'

import Posts from './Posts'

function App() {
  const count = useSelector((state) => state.counter.value)
  const coins = useSelector((state) => state.user.coins)
  const dispatch = useDispatch()

  return (
    <>
      <div>
        <button
          aria-label="Увеличить значение"
          onClick={() => dispatch(incrementCounter())}
        >
          Увеличить
        </button>
        <span>{count}</span>
        <button
          aria-label="Уменьшить значение"
          onClick={() => dispatch(decrementCounter())}
        >
          Уменьшить
        </button>
        <button
          aria-label="Добавить своё"
          onClick={() => dispatch(incrementByAmountCounter(Number(prompt())))}
        >
          Добавить своё
        </button>
      </div>

      <div>
        <button
          aria-label="Увеличить значение"
          onClick={() => dispatch(incrementUser())}
        >
          Увеличить монет
        </button>
        <span>{coins}</span>
        <button
          aria-label="Уменьшить значение"
          onClick={() => dispatch(decrementUser())}
        >
          Уменьшить монет
        </button>
        <button
          aria-label="Добавить своё"
          onClick={() => dispatch(incrementByAmountUser(Number(prompt())))}
        >
          Добавить своё монет
        </button>
      </div>

      <Posts />
    </>
  );
}

export default App;
