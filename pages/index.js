import styles from '../styles/Home.module.css'
import TableBar from '../features/table/TableBar'
import Table from '../features/table/Table'

export default function Home() {
  return (
    <div className={styles.container}>
      <TableBar />
      <Table />
    </div>
  )
}
