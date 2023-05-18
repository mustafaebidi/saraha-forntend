import ChangePassword from "./changePassword"
import ChangePhoto from "./ChangePhoto"
import Profile from "./Profile"





const SettingsCollection=({choice}:{choice: number})=>{

    const display = {
        0: <Profile />,
        1: <ChangePassword />,
        2: <ChangePhoto />,

    }

    return(
        <div>{display[choice as  keyof typeof display]}</div>
    )
}

export default SettingsCollection