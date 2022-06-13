// ComposeForm.jsx
//import Avatar from './Avatar'
import '../../styles/spread.scss'

function Spread() {
  return (
      <div>
        <div className='tweet'>
            <img className='user-icon' src="./user-icon.png" alt='user icon'/>
            <div className='info-user'>
                <p className="username">Antoine</p>
                <p className='spreadname'>@antoineR</p>
            </div>
        </div>
        <div className='spread-text'>
            <p>Spreader build in REACT!</p>
            <img src='./react-background.avif' alt='img react'/>
        </div>

        <div className='icon'>
            <img src='./like-icon.png' alt=''/>
            <img src='./rt-icon.png' alt=''/>
        </div>
      </div>
    
  )
}

export default Spread