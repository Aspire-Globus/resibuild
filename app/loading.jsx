import styles from "./loading.module.css";

export default function Loading() {
  return (
    <div className={styles.routePageLoader}>
      <img
        src="https://rajwinderk6.sg-host.com/wp-content/uploads/2026/10/logo.png"
        alt="Resibuild"
        className={styles.routePageLoaderLogo}
      />
    </div>
  );
}