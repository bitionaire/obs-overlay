import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';
import './Chat.scss';

const Chat = () => {
    return (
        <ToastContainer
            containerId="chat"
            position="bottom-right"
            autoClose={10000}
            hideProgressBar={true}
            newestOnTop={false}
            rtl={false}
            limit={4}
            closeButton={false}
            className="chat"
            bodyClassName="chat__body"
            toastClassName="chat__toast"
        />
    )
}

export default Chat;