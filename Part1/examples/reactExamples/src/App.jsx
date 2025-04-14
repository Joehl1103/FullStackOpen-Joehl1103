import {useState} from 'react'

function Panel({title,children,isActive, onShow}){
 
  return(
    <section className="panel">
      <h3>{title}</h3>
      {isActive ? (
        <p>{children}</p>
      ) : (
        <button onClick={onShow}>
          Show
        </button>
      )}
    </section>
  )
}

export default function Accordion(){
  const [activeIndex,setActiveIndex] = useState(0)

  return (
    <>
      <h2>Almaty, Kazakhstan</h2>
      <Panel 
        title="About" 
        isActive={activeIndex === 0}
        onShow={() => setActiveIndex(0)}>
        With a population of about 2M, Almaty is K's largest city.
      </Panel>
      <Panel 
        title="Etymology" 
        isActive={activeIndex === 1}
        onShow={() => setActiveIndex(1)}>
        The name come from <span lang="kk-KZ">alma</span>,
        the Kazakh word for Apple and is often translated, as etc.
      </Panel>
    </>
  )
}