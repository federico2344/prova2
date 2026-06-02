import PageHeader from '../components/PageHeader.jsx'
import MenuTabs from '../components/MenuTabs.jsx'

export default function MenuPage() {
  return (
    <>
      <PageHeader
        eyebrow="Cucina & Forno a Legna"
        title="Il Menù"
        subtitle="Pizza al forno a legna con farina di tipo 1, hamburger fatti in casa, fritti, carni alla griglia e dolci della casa."
      />
      <section className="bg-cream py-16 md:py-20">
        <div className="container-x">
          <MenuTabs />
          <p className="mx-auto mt-12 max-w-2xl text-center text-sm italic text-charcoal/55">
            Per allergie e intolleranze chiedi al personale: sapremo consigliarti.
          </p>
        </div>
      </section>
    </>
  )
}
