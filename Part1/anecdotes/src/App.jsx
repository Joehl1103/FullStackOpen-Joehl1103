import { useState } from 'react'

const BigVote = (props) => {

  function bigVoteSearch(votes){
    let biggestVoteIndex = null;
    let votesSize = Object.entries(votes).length
    let voteCounter = votes[0]
    for (let i = 1; i<votesSize;i++){
      if(votes[i]>voteCounter){
        biggestVoteIndex = i
        voteCounter = votes[i] 
      } else {
        continue
      }
  
    }
    return biggestVoteIndex
  }
  
  function checkMultipleLargeIndices(){
    
  }

  function sumVotes(votes){
    let votesSize = Object.entries(votes).length
    let sum = 0
    for (let i = 0;i<votesSize;i++){
      sum += votes[i]
    }

    return sum
  }

  
  const bigIndex = bigVoteSearch(props.votes)
  
    if (sumVotes(props.votes) === 0){
      return (
        <>
          <h1>Anecdote with most votes</h1>
          <p>No anecdotes with with any votes yet. Upvote something!</p>
        </>
 
      )
    } else {
      return (
        <>
          <h1>Anecdote with most votes</h1>
          <p>"{props.anecdotes[bigIndex]}" has <b>{props.votes[bigIndex]}</b> votes </p>
        </>
      )
  }
}



const App = () => {

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of ll evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]  

  const [selected,setSelected] = useState(
    Math.floor((Math.random())*((anecdotes.length-1)-0+1))+0
  )


  function random(min,max){
    return Math.floor((Math.random())*(max-min+1))+min
  }
 
  function setNextAnecdote(){
    let randomNumber = random(0,anecdotes.length-1)
    setSelected(randomNumber)
  }

  const [votes,setVote] = useState({0:0,1:0,2:0,3:0,4:0,5:0,6:0,7:0})

  function printVotes(votes){
    console.log("printing votes:",Object.entries(votes).map(([key,value])=>{
      console.log(key + ": " + value)
    }))
  }

  function increaseVote(index,votes){
    const votesCopy = {...votes}
    votesCopy[index] = votesCopy[index] + 1 
    setVote(votesCopy)
  } 

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>"{anecdotes[selected]}" has <b>{votes[selected]}</b> votes </p>
      <button onClick={() => increaseVote(selected,votes)}>upvote!</button>
      <br/>
      <button onClick={() => setNextAnecdote()}>Set next anecdote</button>
      <BigVote
        votes={votes}
        anecdotes={anecdotes}

      />
    </div>
  )
}

export default App
