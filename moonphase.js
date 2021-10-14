//'lunation' is a complete moon cycle and is approx. 29.53 days long
  const lunation = 29.53;
//basis of all calculations is using time elapsed since Jan 1 1970 as a reference point;
function daysSince1970Date(date){
//get time elapsed since Jan 1 1970 in milliseconds:
  var n = Date.now(),
//convert ms to days:
  d = (1000*60*60*24),
  t = (n/d);
//subtract date specified (e.g. day 7, or Jan 7 1970) from Jan 1 1970;
//note we subtract 1 from the date to exclude Jan 1:
  return t - (date-1);
}
//calculate the current lunation number based on our 1970 reference point
function calcLunationNumber(date){
  let l = daysSince1970Date(date)/lunation;
  return Math.floor(l);
}
// modulus to find lunar age, or the percent of current lunar cycle complete.
function calcCurrentLunarAge(date){
  let ln =  daysSince1970Date(date)/lunation;
  var la = ((ln % Math.floor(ln))*29.53).toPrecision(4);
  return la;
}
//find lunar age as a percentage and use it to calculate moon's illuminated surface
function calcMoonIllumination(date){
  let ln =  daysSince1970Date(date)/lunation;
  let la = (ln % Math.floor(ln)).toPrecision(4)
  console.log('illum func: la', la);
  let mi = (la * 200);
  if (calcCurrentLunarAge(date) <= .5){
    return mi;
  }
  if (calcCurrentLunarAge(date) > .5){
    return Math.abs(1 - mi);
  }
}
//Function for positioning moon SVG to depict illumination
function posMoon(){
  let ln = daysSince1970Date(7)/lunation,
      lnm = (ln % Math.floor(ln).toPrecision(4)),
//our variable for moon illumination accounts for the x-position of the svg moon,
//hence the arbitrary 200 and 50;
      mi = lnm * 200 + 50;
//A conditional is incorporated to depict waxing vs waning phases; will adjust if needed:
  if (lnm <= .5){
    return mi;
  }
  if (lnm > .5){
    return Math.abs(1-mi);
    console.log('lunar age greater than 50%');
  }
}

//Since our functions are using Jan 7 1970 as a reference point, all of
//the functions take 7 as argument for the date parameter
window.addEventListener("DOMContentLoaded", () =>{
  setTimeout(moonShift, 800);
  function moonShift(){
    document.getElementById('moonShade').setAttribute('cx', posMoon());
    document.getElementById('moonAge').text = "Today's Moon: " + posMoon() +"% Illuminated";
  }
  document.getElementById('lunationButton').addEventListener('click',()=>{
    document.getElementById('lunation').innerHTML = calcLunationNumber(7)
  })
  document.getElementById('lunarAgeButton').addEventListener('click', ()=>{
    document.getElementById('lunarAge').innerHTML = 'About ' + Math.floor(calcCurrentLunarAge(7)) + ' Days';
  })
  document.getElementById('illButton').addEventListener('click', ()=>{
    document.getElementById('ill').innerHTML = calcMoonIllumination(7).toPrecision(4) + '%';
  })
})
