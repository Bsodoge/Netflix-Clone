import styles from "./WatchNow.module.css"
import Link from "next/link"
export default function WatchNow(){
    return(
        <div className={styles.watchnow_container}>
          <Link href="/browse"><button>Watch now</button></Link>
        </div>
    )
}