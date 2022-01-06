import { BaseScreenProps } from "./props"
import './BaseScreen.css'

export default function BaseScreen(props: BaseScreenProps) {

  return (
    <div className="d-flex flex-column min-vh-100 justify-content-center align-items-center">
      <div className="content-container">
        {props.children}
      </div>
    </div>
  )
}
