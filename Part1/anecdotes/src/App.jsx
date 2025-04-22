import { useState } from 'react'

function useVoteCountingFunction(votes){

  const printVotes = (votes)=>{
    console.log("printing votes:",Object.entries(votes).map(([key,value])=>{
      console.log(key + ": " + value)
    }))
 }

  const votesSize = Object.entries(votes).length

  const bigVoteSearch = (votes,votesSize)=>{
    let biggestVoteIndex = null;
    let voteCounter = votes[0]
    for (let i = 1; i<votesSize;i++){
      if(votes[i]>voteCounter){
        biggestVoteIndex = i
        voteCounter = votes[i] 
      } else {
        continue
      }
  
    }
    return [biggestVoteIndex,voteCounter]
  }

  const checkMultipleLargeIndices = (votes,votesSize)=> {
    console.log("checking for multiple indices with the same number of votes")
    let multipleBigs = false
    const [bigVote,voteCount] = bigVoteSearch(votes,votesSize)
     for (let i = 0;i<votesSize;i++){
      if(votes[i] === voteCount && i != bigVote && votes[i] != 0){
        multipleBigs = true
        return multipleBigs
      }
    }
    return multipleBigs
  }

  const sumVotes = (votes,votesSize)=>{
    let sum = 0
    for (let i = 0;i<votesSize;i++){
      sum += votes[i]
    }

    return sum
  }

  return {printVotes,votesSize,bigVoteSearch,checkMultipleLargeIndices,sumVotes}

}

const BigVote = (props) => {
    const {printVotes,bigVoteSearch,checkMultipleLargeIndices,sumVotes,votesSize} = useVoteCountingFunction(props.votes)

    printVotes(props.votes)

    const [bigIndex,voteCount] = bigVoteSearch(props.votes,votesSize)
 
    if (sumVotes(props.votes,votesSize) === 0){
      printVotes(props.votes,votesSize)
      console.log("No votes; sum of votes: " + sumVotes(props.votes,votesSize))
      return (
        <>
          <h1>Anecdote with most votes</h1>
          <p>No anecdotes with with any votes yet. Upvote something!</p>
        </>
 
      )
    } else if(checkMultipleLargeIndices(props.votes,votesSize) === true){
      printVotes(props.votes,votesSize)
      console.log("Multiple anecdotes with the same number of votes: " + checkMultipleLargeIndices(props.votes,votesSize))
      return (
        <>
          <h1>Anecdote with most votes</h1>
          <p>Multiple anecdotes with most votes</p> 
        </>
      )
    } else {
      printVotes(props.votes,votesSize)
      console.log("There is a winner! ")
      console.log("Biggest index: " + bigIndex)
      console.log("Largest vote count: " + voteCount)
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

  function resetVoteCount(votes){
    let votesCopy = {...votes}
    votesCopy = {0:0,1:0,2:0,3:0,4:0,5:0,6:0,7:0}
    setVote(votesCopy)
    console.log("votesCopy reset: ",votesCopy)
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
      <br/>
      <button onClick={() => resetVoteCount(votes)}>Reset votes</button>
      <BigVote
        votes={votes}
        anecdotes={anecdotes}

      />
    </div>
  )
}

export default App
