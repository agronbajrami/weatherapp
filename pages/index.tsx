import type { NextPage } from "next";
import Header from "../components/Header";
import Homeee from "../components/Homeee";
import Searchh from "../components/Searchh";
import styles from "../styles/Home.module.css";
import bgImage from "../public/assets/weatherimage.jpg";

const Home: NextPage = () => {
  return (
    <div
      className={styles.container}
      style={{
        backgroundImage: `url(${bgImage.src})`,
        width: "100%",
        height: "100vh",
      }}
    >
      <Header />
      <Searchh />
      <Homeee />
    </div>
  );
};

export default Home;
