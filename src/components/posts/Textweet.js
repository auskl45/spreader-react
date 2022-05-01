// ComposeForm.jsx
//import Avatar from './Avatar'
import '../../styles/textweet.scss'

function Textweet() {
  return (
    <form className="compose-form">
      <div className="compose-form-container">

        <textarea
          className="compose-form-textarea"
          placeholder="Quoi de neuf ?"
        />
      </div>
      <button className="compose-form-submit">Spread</button>
    </form>
  )
}

export default Textweet