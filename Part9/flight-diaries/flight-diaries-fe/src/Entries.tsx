import * as diaryTypes from "../../flight-diaries-be/src/data/types"
function Entries({ entries }: { entries: diaryTypes.DiaryEntry[] }) {
  const pStyle = {
    margin: 2,
    padding: 2,
  }

  return (
    <div>
      <h2>Diary Entries</h2>
      {entries.map((entry: diaryTypes.DiaryEntry) => {
        return (<div key={entry.id}>
          <h3>{entry.date}</h3>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <p style={pStyle}>Weather: {entry.weather}</p>
            <p style={pStyle}>Visibiliy: {entry.visibility}</p>
            {entry.comment ? <p style={pStyle}><i>{entry.comment}</i></p> : null}
          </div>
        </div>
        )
      })}
    </div>
  )
};

export default Entries;
