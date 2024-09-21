let tds=document.getElementsByTagName("td");
let selectedTd=null;
let currMenu="army";
let weatherArr=null;
let numberCity=0;
let temp=16;
let snow=0;
let rain=0;
let army={
    inf:0,
    art:0,
    cav:0
}
let workers={
    miners:0,
    carpenters:0,
    officials:0
}
let resources={
    wood:0,
    stone:0,
    glass:0,
    metal:0,
    gold:0,
    pop:0
}
let mapinfo=[[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0]]
let firstcitybool=0;
let cityCounter=0;

function buyMineInf(){
    if(currMenu==="build"){
        if((resources.wood<1)||(resources.metal<1)||(resources.gold<1)||(resources.pop<1)){
            alert("Not enough resources to hire an infantryman!(1 Wood, 1 Metal, 1 Gold,1 Pop)")
        }
        else{
            document.getElementById("wood_counter").innerHTML=parseInt(resources.wood-1);
            document.getElementById("metal_counter").innerHTML=parseInt(resources.metal-1);
            document.getElementById("gold_counter").innerHTML=parseInt(resources.gold-1);
            document.getElementById("pop_counter").innerHTML=parseInt(resources.pop-1);
            resources.wood=resources.wood-1;
            resources.metal=resources.metal-1;
            resources.gold=resources.gold-1;
            resources.pop=resources.pop-1;
            army.inf=army.inf+1;
            menuUpdateArmy();
            
        }
        
    }
    else if(currMenu==="army"){
        if((resources.wood<1)||(resources.metal<1)||(resources.gold<1)||(resources.pop<1)){
            alert("Not enough resources to hire a miner!(1 Wood, 1 Metal, 1 Gold,1 Pop)")
        }
        else{
        document.getElementById("wood_counter").innerHTML=parseInt(resources.wood-1);
        document.getElementById("metal_counter").innerHTML=parseInt(resources.metal-1);
        document.getElementById("gold_counter").innerHTML=parseInt(resources.gold-1);
        document.getElementById("pop_counter").innerHTML=parseInt(resources.pop-1);
        resources.wood=resources.wood-1;
        resources.metal=resources.metal-1;
        resources.gold=resources.gold-1;
        resources.pop=resources.pop-1;
        workers.miners=workers.miners+1;
        menuUpdateBuild();
        }
    }
}
function buyWoodCav(){
    if(currMenu==="build"){
        if((resources.metal<1)||(resources.gold<2)||(resources.pop<1)){
            alert("Not enough resources to hire an cavalry!( 1 Metal, 2 Gold,1 Pop)")
        }
        else{
            document.getElementById("metal_counter").innerHTML=parseInt(resources.metal-1);
            document.getElementById("gold_counter").innerHTML=parseInt(resources.gold-1);
            document.getElementById("pop_counter").innerHTML=parseInt(resources.pop-1); 
            resources.metal=resources.metal-1;
            resources.gold=resources.gold-2;
            resources.pop=resources.pop-1;
            army.cav=army.cav+1;
            menuUpdateArmy();
        }
        
    }
    else if(currMenu==="army"){
        if((resources.metal<2)||(resources.gold<1)||(resources.pop<1)){
            alert("Not enough resources to hire a carpenters!(2 Metal, 1 Gold,1 Pop)")
        }
        else{
        document.getElementById("metal_counter").innerHTML=parseInt(resources.metal-1);
        document.getElementById("gold_counter").innerHTML=parseInt(resources.gold-1);
        document.getElementById("pop_counter").innerHTML=parseInt(resources.pop-1);
        resources.metal=resources.metal-2;
        resources.gold=resources.gold-1;
        resources.pop=resources.pop-1;
        workers.carpenters=workers.carpenters+1;
        menuUpdateBuild();
        }
    }
}
function buyCivArt(){
    if(currMenu==="build"){
        if((resources.glass<1)||(resources.metal<1)||(resources.gold<1)||(resources.pop<1)){
            alert("Not enough resources to hire an artillery!(1 Glass, 1 Metal, 1 Gold, 1 Pop)")
        }
        else{
            document.getElementById("glass_counter").innerHTML=parseInt(resources.glass-1);
            document.getElementById("metal_counter").innerHTML=parseInt(resources.metal-1);
            document.getElementById("gold_counter").innerHTML=parseInt(resources.gold-1);
            document.getElementById("pop_counter").innerHTML=parseInt(resources.pop-1);
            resources.glass=resources.glass-1;
            resources.metal=resources.metal-1;
            resources.gold=resources.gold-1;
            resources.pop=resources.pop-1;
            army.art=army.art+1;
            menuUpdateArmy();
        }
        
    }
    else if(currMenu==="army"){
        if((resources.glass<1)||(resources.gold<2)||(resources.pop<1)){
            alert("Not enough resources to hire a politician!(1 Glass, 2 Gold, 1 Pop)")
        }
        else{
            document.getElementById("glass_counter").innerHTML=parseInt(resources.glass-1);
            document.getElementById("gold_counter").innerHTML=parseInt(resources.gold-2);
            document.getElementById("pop_counter").innerHTML=parseInt(resources.pop-1);
            resources.glass=resources.glass-1;
            resources.gold=resources.gold-2;
            resources.pop=resources.pop-1;
            workers.officials=workers.officials+1;
            menuUpdateBuild();
        }
    }
}

let current_weather="normal";
let current_temp="normal";
function stringifyWeather(){
    if(snow>10){
        current_weather="snowy";
    }
    else if(rain>10){
        current_weather="rainy";
    }
    else{
        current_weather="normal"
    }
    if(temp<15){
        current_temp="cold";
    }
    else if(temp>25){
        current_temp="hot";
    }
    else{
        current_temp="neither warm nor cold";
    }
}
function Init(){
    generatemp();
    getweather();
    stringifyWeather();
    let prompt_reponse=prompt("What is your name?" , "John Doe")
    document.getElementById("credits").innerHTML=prompt_reponse+"<br>The weather is "+current_weather+" and it is "+current_temp+".";
    putclass();
    setInterval(()=>{
        getweather();
        stringifyWeather();
    },30000)
    setInterval(function (){
        PopCounterUp();
        GoldCounterUp();
        StoneCounterUp();
        WoodCounterUp();
        GlassCounterUp();
        MetalCounterUp();
    }, 1000);
    setInterval(()=>{
        if(snow>10){
            for(let i=0;i<100;i++){
                if(tds[i].classList.contains("water")){
                    tds[i].style.backgroundColor="lightcyan";
                }
                else if(tds[i].classList.contains("forest")){
                    tds[i].style.backgroundColor="lightgray";
                }
                else if(tds[i].classList.contains("mountain")){
                    tds[i].style.backgroundColor="lightslategrey";
                }
                else if(tds[i].classList.contains("city")){
                    tds[i].style.backgroundColor="gray";
                }
                else{
                    tds[i].style.backgroundColor="white";
                }
            }
        }
        
    },1000)
    setInterval(()=>{
        if(snow<10 && rain<10){
            for(let i=0;i<100;i++){
                if(tds[i].classList.contains("water")){
                    tds[i].style.backgroundColor="blue";
                }
                else if(tds[i].classList.contains("forest")){
                    tds[i].style.backgroundColor="darkgreen";
                }
                else if(tds[i].classList.contains("mountain")){
                    tds[i].style.backgroundColor="brown";
                }
                else if(tds[i].classList.contains("city")){
                    tds[i].style.backgroundColor="gray";
                }
                else{
                    tds[i].style.backgroundColor="green";
                }
            }
        }
    },1000) 
    setInterval(()=>{
        if(rain>10){
            for(let i=0;i<100;i++){
                if(tds[i].classList.contains("water")){
                    tds[i].style.backgroundColor="blue";
                }
                else if(tds[i].classList.contains("forest")){
                    tds[i].style.backgroundColor="rgb(0, 51, 53)";
                }
                else if(tds[i].classList.contains("mountain")){
                    tds[i].style.backgroundColor="rgb(102, 51, 51)";
                }
                else if(tds[i].classList.contains("city")){
                    tds[i].style.backgroundColor="gray";
                }
                else{
                    tds[i].style.backgroundColor="rgb(0, 153, 116)";
                }
            }
        }
           
    },1000)
    for(let i=0;i<tds.length;i++){
        tds[i].addEventListener('click', function (e) {
            for(let i=0;i<tds.length;i++){
                tds[i].style.borderColor="black";  
                tds[i].classList.remove("Lselected");  
            }
            if(tds[i].style.borderColor=="red"){
                tds[i].style.borderColor="black";
                tds[i].classList.remove("Lselected");
            }
            else{
                tds[i].style.borderColor="red"; 
                tds[i].classList.add("Lselected");
                selectedTd=tds[i];
            }
        });
        tds[i].addEventListener('dblclick',function (e) {
            if(firstcitybool==0){
                alert("There is no city from which to send the army.");
            }
            else if((army.inf==0)||(army.cav==0)||(army.art==0)){
                alert("You don't have an army to send out.");
            }
            else{
                let first_city_dom=document.getElementsByClassName("first_city");
                let first_city_tile=first_city_dom[0].className;
                let tileindex1=first_city_tile.indexOf('X');
                let fccoords={
                    x:first_city_tile[tileindex1+6],
                    y:first_city_tile[tileindex1+8]
                }
                let selectedTd_dom=document.getElementsByClassName("Lselected");
                let selectedTd_tile=selectedTd_dom[0].className;
                let tileindex2=selectedTd_tile.indexOf('X')
                let stcoords={
                    x:selectedTd_tile[tileindex2+6],
                    y:selectedTd_tile[tileindex2+8]
                }
                console.log(fccoords);
                console.log(stcoords);
                let dist=Math.sqrt(Math.pow((parseInt(fccoords.x)-parseInt(stcoords.x)),2)+Math.pow((parseInt(fccoords.y)-parseInt(stcoords.y)),2))
                console.log(dist);
                console.log(dist/parseFloat(armyspeed));
                setTimeout(()=>{
                    alert("Am ajuns maestre!")
                },dist/armyspeed()*1000)
            }
        });
    } 
}
function GoldCounterUp(){
    let gold = document.getElementById("gold_counter").innerHTML;
    document.getElementById("gold_counter").innerHTML=parseInt(gold)+((1+0.3*maxpop())-0.2*(workers.carpenters+workers.miners+workers.officials)+(0.3*workers.officials));

    resources.gold=parseInt(gold);
}
function WoodCounterUp(){
    let wood = document.getElementById("wood_counter").innerHTML;
    document.getElementById("wood_counter").innerHTML=parseInt(wood)+(1+0.3*workers.carpenters);
    resources.wood=parseInt(wood);
}
function StoneCounterUp(){
    let stone = document.getElementById("stone_counter").innerHTML;
    document.getElementById("stone_counter").innerHTML=parseInt(stone)+(1+0.2*workers.miners);
    resources.stone=parseInt(stone);
}
function GlassCounterUp(){
    let glass = document.getElementById("glass_counter").innerHTML;
    document.getElementById("glass_counter").innerHTML=parseInt(glass)+(1+0.1*workers.miners+0.1*workers.carpenters);
    resources.glass=parseInt(glass);
}
function MetalCounterUp(){
    let metal = document.getElementById("metal_counter").innerHTML;
    document.getElementById("metal_counter").innerHTML=parseInt(metal)+(1+0.2*workers.miners);
    resources.metal=parseInt(metal);
}
function PopCounterUp(){
    let population = parseInt(document.getElementById("pop_counter").innerHTML);
    resources.pop=parseInt(population);
    if(population<maxpop()){
        document.getElementById("pop_counter").innerHTML=parseInt(population)+1;
        
    }   
}
function BuildCity(){
    if(selectedTd.classList=="mountain" || selectedTd.classList=="water" || selectedTd.classList=="forest")
    {
        alert("You cannot build a city here.");
    }
    else{
        
        let cityName=prompt("Enter the city name" , "Brasov")
    if(selectedTd==null){
        alert("No tile selected");
    }
    
    else if(resources.stone<10 && resources.wood<10){
        alert("Not enough resources(10 Wood,10 Stone)");
    }
    else
    {
        selectedTd.innerHTML=cityName;
        selectedTd.style.backgroundColor = "grey"
        selectedTd.style.textAlign = "center";
        selectedTd.id="playerCity"+cityCounter;
        selectedTd.classList.add("city");
        document.getElementById("wood_counter").innerHTML=parseInt(resources.wood-10);
        document.getElementById("stone_counter").innerHTML=parseInt(resources.stone-10);
        resources.wood=resources.wood-10;
        resources.stone=resources.stone-10;
        numberCity=numberCity+1;
        workers.carpenters=workers.carpenters+1;
        workers.miner=workers.miners+1;
        if(firstcitybool==0){
            selectedTd.classList.add("first_city");
            firstcitybool=firstcitybool+1;
        }
    }
    }
    buildEnemyCity();
    enemyAction();
}
function getweather(){
    const get= new XMLHttpRequest();
    get.open("GET","https://api.open-meteo.com/v1/forecast?latitude=45.6486&longitude=25.6061&hourly=temperature_2m,rain,showers,snowfall&current_weather=true&forecast_days=1",true);
    get.onload = ()=>{
        if(get.readyState===4 && get.status===200){
            weatherArr=JSON.parse(get.response)
            {
                let rainAvg=0;
                let snowAvg=0;
                let tempAvg=0;
                for(let i=0;i<24;i++){
                    rainAvg=weatherArr.hourly.rain[i]+rainAvg;
                    snowAvg=weatherArr.hourly.snowfall[i]+snowAvg;
                    tempAvg=weatherArr.hourly.temperature_2m[i]+tempAvg;
                }
                rain=rainAvg/24;
                snow=snowAvg/24;
                temp=tempAvg/24;
            }
        }
        else{
            console.log("Not reached");
        }
    }
    get.onerror=()=>{
        console.log("Error");
    }
    get.send();
}
function menuSwitch(){
    
    if(currMenu==="army"){
        document.getElementById("mine_inf_name").innerHTML="Infantry";
        document.getElementById("wood_cav_name").innerHTML="Cavalry";
        document.getElementById("civ_art_name").innerHTML="Artilery";
        document.getElementById("mine_inf_val").innerHTML=army.inf;
        document.getElementById("wood_cav_val").innerHTML=army.cav;
        document.getElementById("civ_art_val").innerHTML=army.art;
        document.getElementById("mine_inf_build").innerHTML="Create Infantry";
        document.getElementById("wood_cav_build").innerHTML="Create Cavalry";
        document.getElementById("civ_art_build").innerHTML="Create Artilery";
        currMenu="build";
    }
    else if(currMenu==="build"){
        document.getElementById("mine_inf_name").innerHTML="Miners";
        document.getElementById("wood_cav_name").innerHTML="Carpenters";
        document.getElementById("civ_art_name").innerHTML="Politicians";
        document.getElementById("mine_inf_val").innerHTML=workers.miners;
        document.getElementById("wood_cav_val").innerHTML=workers.carpenters;
        document.getElementById("civ_art_val").innerHTML=workers.officials;
        document.getElementById("mine_inf_build").innerHTML="Hire Miners";
        document.getElementById("wood_cav_build").innerHTML="Hire Workers";
        document.getElementById("civ_art_build").innerHTML="Hire Officials";
        currMenu="army";
    }
}
function menuUpdateArmy(){
    document.getElementById("mine_inf_name").innerHTML="Infantry";
    document.getElementById("wood_cav_name").innerHTML="Cavalry";
    document.getElementById("civ_art_name").innerHTML="Artilery";
    document.getElementById("mine_inf_val").innerHTML=army.inf;
    document.getElementById("wood_cav_val").innerHTML=army.cav;
    document.getElementById("civ_art_val").innerHTML=army.art;
    document.getElementById("mine_inf_build").innerHTML="Create Infantry";
    document.getElementById("wood_cav_build").innerHTML="Create Cavalry";
    document.getElementById("civ_art_build").innerHTML="Create Artilery";
}
function menuUpdateBuild(){
    document.getElementById("mine_inf_name").innerHTML="Miners";
    document.getElementById("wood_cav_name").innerHTML="Carpenters";
    document.getElementById("civ_art_name").innerHTML="Politicians";
    document.getElementById("mine_inf_val").innerHTML=workers.miners;
    document.getElementById("wood_cav_val").innerHTML=workers.carpenters;
    document.getElementById("civ_art_val").innerHTML=workers.officials;
    document.getElementById("mine_inf_build").innerHTML="Hire Miners";
    document.getElementById("wood_cav_build").innerHTML="Hire Workers";
    document.getElementById("civ_art_build").innerHTML="Hire Officials";
}
function getAverage(a){
    let avg=0;
    for(let i=0;i<24;i++){
        avg=avg+a[i];
    }
    return parseInt(avg/24);
}
function generatemp(){ 
    for(let i=0;i<100;i++){
        let mountainchance=Math.round(Math.random()*10);
        let waterchance=Math.round(Math.random()*10);
        let forestchange=Math.round(Math.random()*10);
        if(mountainchance>9){
            tds[i].style.backgroundColor="brown";
            tds[i].classList.add("mountain");
        }
        if(waterchance>9){
            tds[i].style.backgroundColor="blue";
            tds[i].classList.add("water");
        }
        if(forestchange>9){
            tds[i].style.backgroundColor="darkgreen";
            tds[i].classList.add("forest");
        }
    }
  }
  function armyspeed(){
    return 1-(0.2*parseInt(rain)+0.2*parseInt(snow)+0.2*parseInt(temp))/10
  }
  function maxpop(){
    return 11*numberCity*(0.5*(workers.miners+workers.carpenters));
  }
//stolen code
  function listToMatrix(list, elementsPerSubArray) {
    var matrix = [], i, k;

    for (i = 0, k = -1; i < list.length; i++) {
        if (i % elementsPerSubArray === 0) {
            k++;
            matrix[k] = [];
        }

        matrix[k].push(list[i]);
    }

    return matrix;
}
function putclass(){
    let mapmatrix=listToMatrix(tds,10);
    for(let i=0;i<10;i++){
        for(let j=0;j<10;j++){
            let classname="Xtile_"+i+"_"+j;
            mapmatrix[i][j].classList.add(classname);
        }
    }
}

function destroyCity() {
    if (selectedTd && selectedTd.classList.contains("city")) {
        selectedTd.innerHTML = ""; // Șterge numele orașului
        selectedTd.style.backgroundColor = ""; // Reset background color
        selectedTd.classList.remove("city"); // Elimină clasa de oraș
        resources.wood += 5; // Exemplar, adaugă resursele pe care vrei să le returnezi
        resources.stone += 5; // Exemplar, adaugă resursele pe care vrei să le returnezi
        alert("Orașul a fost distrus!");
    } else {
        alert("Selectează un oraș pentru a-l distruge.");
    }
}
