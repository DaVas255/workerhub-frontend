import { Header } from '@/app/components/widgets/Header/Header';
import styles from './MainLayout.module.scss';

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={styles.mainLayout}>
      <Header />
      <main>{children}</main>
    </div>
  )
};