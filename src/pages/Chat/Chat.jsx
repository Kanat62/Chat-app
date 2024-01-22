import styles from "./style.module.scss";
import Header from "../../components/Header/Header";
import MessagesGroup from "../../components/MessagesGroup/MessagesGroup";
import Input from "../../components/Input/Input";
import ModalImages from "../../components/ModalImages/ModalImages";

const Home = () => {

    return (
        <div className={styles.chatContainer}>
            <Header />
            <MessagesGroup />
            <Input/>
            <ModalImages />
        </div>
    );
};

export default Home;
