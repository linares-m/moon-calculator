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
  var ln =  daysSince1970Date(date)/lunation;
  console.log(ln);
  var la = (ln % Math.floor(ln)).toPrecision(10);
   console.log(la);
//  console.log('illum func: la', la);
  var mi = (la * 200);
  console.log(mi);
  if (mi < 100){
    return mi;
    console.log('lunar age under 50%')
  }
  if (mi > 100){
    let miModulus = mi%100;
    let miWane = 100 - miModulus; 
    return miWane;
    console.log('lunar age over 50%')
  }
}
//Function for positioning moon SVG to depict illumination
function posMoon(){
  var ln = daysSince1970Date(7)/lunation,
      lnm = (ln % Math.floor(ln).toPrecision(10));
//our variable for moon illumination accounts for the x-position of the svg moon,
//hence the arbitrary 50; we also take the lunar age decimal, double it to represent lunar illumination
//and make it percentage by multiplying by 100:
//      mi = (lnm * 2 * 100) + 50;
//A conditional to depict waxing vs waning phases; will adjust if needed:
  if (0.25 < lnm || lnm <= 0.50 ){
    let mi = (lnm * 2 * 100) + 50;
    return mi;
    console.log('lunar phs = waxing gibbous');
  } if (0.50 < lnm || lnm <= 0.75){
    return Math.abs(1-mi);
    console.log('lunar phase = waning gibbous');
  }else{
    throw 'error';
  }
}

//Since our functions are using Jan 7 1970 as a reference point, all of
//the functions take 7 as argument for the date parameter
window.addEventListener("DOMContentLoaded", () =>{
  setTimeout(moonShift, 800);
  function moonShift(){
    let xpos = posMoon();
    console.log(xpos);
    document.getElementById('moonIllum').setAttribute('cx', xpos);
    document.getElementById('moonAge').innerHTML = "Today's Moon: " + calcMoonIllumination(7).toPrecision(4) +"% Illuminated";
  }
  document.getElementById('lunationButton').addEventListener('click',()=>{
    document.getElementById('lunation').innerHTML = calcLunationNumber(7)
  })
  document.getElementById('lunarAgeButton').addEventListener('click', ()=>{
    document.getElementById('lunarAge').innerHTML = 'About ' + Math.floor(calcCurrentLunarAge(7)) + ' Days';
  })
})
