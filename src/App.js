import { useEffect, useState } from 'react'
import { useFetch } from './useFetch'
import Loading from './Loading'
import Follower from './Follower'

function App() {
  const [page, setPage] = useState(0)
  const [followers, setFollowers] = useState([])
  const { loading, data } = useFetch()

  useEffect(() => {
    if (loading) return
    setFollowers(data[page])
  }, [loading, page])

  const handlePageChange = (idx) => {
    setPage(idx)
  }

  const handlePrev = () => {
    setPage((prevState) => {
      if (page < 1) {
        return data.length - 1
      }
      return prevState - 1
    })
  }

  const handleNext = () => {
    setPage((prevState) => {
      if (page >= data.length - 1) {
        return 0
      }
      return prevState + 1
    })
  }

  if (loading) {
    return <Loading />
  }

  return (
    <main>
      <section className='section-title'>
        <h1>list of followers</h1>
      </section>
      <section className='section-followers'>
        {followers.map((item, idx) => {
          return <Follower key={idx} {...item} />
        })}
      </section>
      <section className='paginator'>
        <button className='prev-btn' onClick={handlePrev}>
          Prev
        </button>
        {data.map((_, idx) => {
          return (
            <button
              key={idx}
              className={`page-btn ${page === idx && 'active'}`}
              onClick={() => handlePageChange(idx)}
            >
              {idx + 1}
            </button>
          )
        })}
        <button className='next-btn' onClick={handleNext}>
          Next
        </button>
      </section>
    </main>
  )
}

export default App
