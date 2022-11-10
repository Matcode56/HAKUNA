/* eslint-disable no-restricted-globals */
import { useContext, useEffect } from 'react'
import { UsersContext } from './hooks/users/context'
import { MultiBubble, MultiplePages, Group } from 'iconoir-react'

export const App = () => {
  const { usersDispatch } = useContext(UsersContext)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      usersDispatch({ type: 'LOGIN', input: 'login' })
    } else {
      /* 
        TODO => change to react router dom
      */
      window.location.href = '/'
    }
  }, [])

  return (
    <div id='dashboard' className='flex justify-center pt-10'>
      <h1>Dashboard</h1>
      <main>
        <section className='top'>
          <div className='top__summary'>
            <h2>Project summary</h2>
            <div className='content'>
              <div className='projects'>
                <p>Projects</p>
                <span>42</span>
              </div>
              <div className='tasks'>
                <p>Tasks</p>
                <span>42</span>
              </div>
              <div className='completed'>
                <p>Projects Completed</p>
                <span>23</span>
              </div>
            </div>
          </div>
          <div className='top__deadline'>
            <h2>Nearset deadline</h2>
            <div className='content'>
              <div className='content__top'>
                <div className='name'>
                  <h3>
                    <MultiplePages color={'white'} height={24} width={24} />
                    Project Name
                  </h3>
                  <div className='desc'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ultrices, quam vel imperdiet pulvinar,
                    ligula ex dictum nisi, vel iaculis dui turpis ut purus. Proin congue nec lacus vel accumsan. Nullam
                    tristique arcu et ullamcorper dignissim.
                  </div>
                </div>
                <div className='team'>
                  <h3>
                    <Group color={'white'} height={24} width={24} />
                    Our team
                  </h3>
                  <div className='img'>
                    <p></p>
                    <p></p>
                    <p></p>
                    <p></p>
                  </div>
                </div>
              </div>
              {/* <div className='content__bottom'>
                <div className='percent'>
                  <p>50% complete</p>
                  <input type='range' min={0} max={100} value={50} name='range' id='range' disabled />
                </div>
                <div className='comments'>
                  <p>
                    <MultiBubble color={'white'} height={24} width={24} />6 comments
                  </p>
                </div>
              </div> */}
            </div>
          </div>
        </section>
        <section className='bottom'>
          <h2>Projects</h2>
          <div className='bottom__project'>
            <h3>
              <MultiplePages color={'#424242'} height={24} width={24} />
              Project Name
            </h3>
            <div className='content'>
              <div className='content__desc'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ultrices, quam vel imperdiet pulvinar,
                ligula ex dictum nisi, vel iaculis dui turpis ut purus. Proin congue nec lacus vel accumsan. Nullam
                tristique arcu et ullamcorper dignissim.
              </div>
              <div className='content__team'>
                <p></p>
                <p></p>
                <p></p>
                <span>...+4</span>
              </div>
              {/* <div className='content__percent'>
                <p>50% complete</p>
                <input type='range' min={0} max={100} value={50} name='range' id='range' disabled />
              </div> */}
              <button>See Tasks</button>
            </div>
          </div>
          <div className='bottom__project'>
            <h3>
              <MultiplePages color={'#424242'} height={24} width={24} />
              Project Name
            </h3>
            <div className='content'>
              <div className='content__desc'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ultrices, quam vel imperdiet pulvinar,
                ligula ex dictum nisi, vel iaculis dui turpis ut purus. Proin congue nec lacus vel accumsan. Nullam
                tristique arcu et ullamcorper dignissim.
              </div>
              <div className='content__team'>
                <p></p>
                <p></p>
                <p></p>
                <span>...+4</span>
              </div>
              {/* <div className='content__percent'>
                <p>50% complete</p>
                <input type='range' min={0} max={100} value={50} name='range' id='range' disabled />
              </div> */}
              <button>See Tasks</button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
