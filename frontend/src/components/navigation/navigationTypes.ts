export   enum selectedPage  {
  Home = "home",
  Benefits = "benefits",
  OurClasses = "ourclasses",
  ContactUs = "contactus",
}

export type props = {
    setSelectedPage ?: (value: selectedPage) => void,
    pageState ?: selectedPage,
    scroll ? : boolean
 }