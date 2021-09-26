import {FC} from 'react';
import Title from "../components/Title";
import Chat from "../components/Chat";
import {toast} from "react-toastify";
import { useLocation } from 'react-router';

const Overlay: FC = () => {
    const search = useLocation().search;
    const debug = new URLSearchParams(search).get("debug") === 'true';

    return (
        <>
            {debug && (
                <button onClick={() => {toast("test message asdfas dfas dfa sdf qweru iasdfhkj asdhf iquwerh aksjdf nqwiuerh asdkjfn wiuerh askjdhh weuirhasdkjfbas dfiu weqhrjkashdf 87qweuir hgasdfkj asd0uyi", { containerId: "chat", style: { '--chat-user': "\"Some user\"" } as any })}}>Chat</button>
            )}

            <Title />
            <Chat />
        </>
    )
};

export default Overlay;