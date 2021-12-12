import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";


const ProfilePage = () => {
    const { loaded, loading } = useTypedSelector(state => state.profile);
    const { getUserInfo } = useActions();
    const { user } = useTypedSelector(state => state.profile);

    if (!loaded && !loading)
        getUserInfo();

    let info;
    if (user) {
        info = (
            <>
                <h2 >{user.name}</h2>
                <h3 className="text-secondary mb-1">{user.email}</h3>
                <br />
                <p>Created: {new Date(user.created_at).toLocaleDateString()}</p>
                <p>Confirmed: {user.email_verified_at ? "yes" : "no"}</p>
            </>
        )
    }

    return (
        <>
            <h1 className="text-center mt-3">Профіль</h1>
            <div className="container">
                <div className="row justify-content-center align-items-center">
                    <div className="col-md-10 col-lg-8 col-xl-5 bg-light shadow-lg p-3 bg-white rounded py-4 text-center">
                        {info ? info : (<h2>Завантаження...</h2>)}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProfilePage;