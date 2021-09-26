import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';
import './FollowerAlert.scss';

const FollowerAlert = () => {
    return (
        <ToastContainer
            containerId="follower"
            position="top-left"
            autoClose={10000}
            hideProgressBar={true}
            newestOnTop={false}
            rtl={false}
            limit={1}
            closeButton={false}
            className="follower-alert"
            bodyClassName="follower-alert__body"
            toastClassName="follower-alert__toast"
            enableMultiContainer
        />
    )
}

export default FollowerAlert;