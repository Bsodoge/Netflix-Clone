import styles from './page.module.css'
import Header from './components/Header'
import Card from './components/Card'
import Section from './components/Section'
import QuestionAnswer from './components/QuestionAnswer'
import SignUp from './components/SignUp'

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.bg_image}>
        <Header></Header>
        <div className={styles.hero}>
          <h1>Unlimited films, TV programmes and more</h1>
          <p>Watch anytime. Cancel at anytime.</p>
          <SignUp></SignUp>
        </div>
      </div>
      <Card></Card>
      <Section headingText='Enjoy on your TV' paragraphText='Blah blah blah.'></Section>
      <Section headingText='Enjoy on your TV' paragraphText='Blah blah blah.'></Section>
      <Section headingText='Enjoy on your TV' paragraphText='Blah blah blah.'></Section>
      <Section headingText='Enjoy on your TV' paragraphText='Blah blah blah.'></Section>
      <div className={styles.faq_container}>
        <h1>Frequently Asked Questions</h1>
        <ul>
          <QuestionAnswer question='bruh' answer='moment'></QuestionAnswer>
          <QuestionAnswer question='bruh' answer='moment'></QuestionAnswer>
          <QuestionAnswer question='bruh' answer='moment'></QuestionAnswer>
          <QuestionAnswer question='bruh' answer='moment'></QuestionAnswer>
          <QuestionAnswer question='bruh' answer='moment'></QuestionAnswer>
          <QuestionAnswer question='bruh' answer='moment'></QuestionAnswer>
        </ul>
      </div>
      <SignUp></SignUp>
    </main>
  )
}
