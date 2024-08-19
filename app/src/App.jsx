import React from 'react'
import extractExamDates from './helpers/extractExamDates'
const App = () => {
  const getDates = async (loc) =>  await extractExamDates(loc).then((data) => console.log(data));
  getDates('../../test/date.pdf');
  return (
    <div>App</div>
  )
}

export default App