import { useEffect, useState } from 'react'
import { useFetch } from './useFetch'
import Loading from './Loading'
import Follower from './Follower'
import { useGlobalContext } from './context'
import UserNotFound from './UserNotFound'
import NoFollowers from './NoFollowers'

function App() {
  const { username, setUsername, data, isLoading, userNotFound, noFollowers } =
    useGlobalContext()

  const [page, setPage] = useState(0)
  const [followers, setFollowers] = useState([])
  const [searchingUsername, setSearchingUsername] = useState(username)

  useFetch()

  useEffect(() => {
    if (isLoading) return
    setFollowers(data[page])
  }, [isLoading, page, data])

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

  const handleSubmit = (e) => {
    e.preventDefault()
    setUsername(searchingUsername)
    setPage(0)
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <main>
      <section className='section-title'>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            value={searchingUsername}
            onChange={(e) => setSearchingUsername(e.target.value)}
          />

          <button type='submit'>search</button>
        </form>
        <h1>list of followers on github</h1>
      </section>
      {userNotFound && <UserNotFound />}
      {noFollowers && <NoFollowers />}

      {!userNotFound && !noFollowers && (
        <>
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
        </>
      )}
    </main>
  )
}

export default App
