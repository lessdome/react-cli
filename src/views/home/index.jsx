import {useDispatch, useSelector} from '@/store'
import {add, asyncAdd, asyncNums, asyncReduce, nums, reduce} from '@/store/counter'
import './index.less'

const Home = () => {
  const dispath = useDispatch()
  const {counter} = useSelector(state => state.counter)

  return (
    <div>
      <h1 className="home-title">home</h1>
      <h2>counter: {counter}</h2>
      <div>
        <button onClick={() => dispath(add())}>+</button>
        &nbsp;
        <button onClick={() => dispath(reduce())}>-</button>
      </div>
      <div>
        <label>同步: </label>
        <input type="number" value={counter} onChange={event => dispath(nums(Number(event.target.value)))} />
      </div>
      <div>
        <button onClick={() => dispath(asyncAdd())}>async +</button>
        &nbsp;
        <button onClick={() => dispath(asyncReduce())}>async -</button>
      </div>
      <div>
        <label>异步: </label>
        <input type="number" value={counter} onChange={event => dispath(asyncNums(Number(event.target.value)))} />
      </div>
    </div>
  )
}

export default Home
