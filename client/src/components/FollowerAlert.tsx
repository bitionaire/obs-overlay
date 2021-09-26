import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';
import './FollowerAlert.scss';
import {useTranslation} from "react-i18next";

const FollowerAlert = () => {
    const { t } = useTranslation();

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
            toastStyle={{
                '--follower-alert__toast--before': `"${t('follower.before')}"`,
                '--follower-alert__toast--after': `"${t('follower.after')}"`
            } as any }
            enableMultiContainer
        />
    )
}

export default FollowerAlert;