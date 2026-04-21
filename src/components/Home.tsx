import styles from '../styles/home.module.css';

function Home() {
  return (
    <section>
      <div className={styles.hero}>
        <div className={styles.textbox}>
          <span>Welcome to Makkham Dashboard</span>
        </div>
      </div>
    </section>
  );
}
export default Home;
