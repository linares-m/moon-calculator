//getTime outputs milliseconds since 1/1/1970; convert to days;
//find difference in days between input date and 1/1/1970
function daysSince1970Date(date){
  var n = Date.now(),
  d = (1000*60*60*24),
  t = (n/d);
  return t - (date-1);
}
//divide by 29.53 to get lunar cycles since date input
function calcLunationNumber(date){
  const lunation = 29.53;
  var l = daysSince1970Date(date)/lunation;
  return l;
}
// modulus to find lunar age, or the percent of current lunar cycle complete.
function calcCurrentLunarAge(date){
  let la = (calcLunationNumber(date) % Math.floor(calcLunationNumber(date))).toPrecision(4);
  console.log(Math.floor(calcLunationNumber(date)));
  return la;
}

//multiply lunar age percentage by 2 to find illumination
function calcMoonIllumination(date){
  let mi = (calcCurrentLunarAge(date) * 200);
  if (calcCurrentLunarAge(date) <= .5){
    return mi;
  }
  if (calcCurrentLunarAge(date) > .5){
    return Math.abs(1 - mi);
  }
}

function posMoon(){
  var n = Date.now(),
      d = (1000*60*60*24),
      t = (n/d);
      diff = t - (6-1);
  const lunation = 29.53;
  var l = diff/lunation;
  let la = (l % Math.floor(l)).toPrecision(4);
  var mi = (la * 200);
  if (la <= .5){
    return mi;
  }
  if (la > .5){
    return Math.abs(1-mi);
    console.log('lunar age greater than 50%');
  }
}
window.addEventListener("DOMContentLoaded", () =>{
  setTimeout(moonShift, 1000);
  function moonShift(){
    document.getElementById('moonShade').setAttribute('cx', (50+posMoon()));
}
  document.getElementById('day').addEventListener('click', ()=>{
    let date = document.getElementById('dateInput').value;
    if (1 < date <= 365){
      document.getElementById('daysSince').innerHTML = daysSince1970Date(date);
    }
    if (date < 1 || date > 365){
      let error = document.getElementById('daysSince').innerHTML = 'Day must be <= 365 ';
      throw error
    }
  })
  document.getElementById('lunationButton').addEventListener('click',()=>{
    let date = document.getElementById('dateInput').value;
    document.getElementById('lunation').innerHTML = calcLunationNumber(date)
  })
  document.getElementById('lunarAgeButton').addEventListener('click', ()=>{
    let date = document.getElementById('dateInput').value;
    document.getElementById('lunarAge').innerHTML = calcCurrentLunarAge(date) + ' ';
  })
  document.getElementById('illButton').addEventListener('click', ()=>{
    let date = document.getElementById('dateInput').value;
    document.getElementById('ill').innerHTML = calcMoonIllumination(date).toPrecision(4) + ' ';
  })
})
