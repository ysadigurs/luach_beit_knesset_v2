function updateClock() {
    const clockElement = document.getElementById('digital-clock');
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    clockElement.textContent = `${hours}:${minutes}:${seconds}`;
}


function addMinutesToTime(timeStr, minutesToAdd) {
    // Parse the input time string
    let [hours, minutes] = timeStr.split(':').map(Number);
  
    // Create a Date object representing the time
    let date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
  
    // Add the specified minutes
    date.setMinutes(date.getMinutes() + minutesToAdd);
  
    // Format the new time back into a string
    let newHours = date.getHours().toString().padStart(2, '0');
    let newMinutes = date.getMinutes().toString().padStart(2, '0');
    return `${newHours}:${newMinutes}`;
}

function parseDateDDMMYYYY(dateStr) {
    const [day, month, year] = dateStr.split('-').map(Number);
    return new Date(year, month - 1, day); // month is 0-indexed in JavaScript Date
}

function formatDateToDDMMYYYY(date) {
    const day = String(date.getDate()).padStart(2, '0'); // Get day and pad with leading zero if needed
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Get month (0-indexed) and pad with leading zero
    const year = date.getFullYear(); // Get year

    return `${day}-${month}-${year}`; // Format as dd-mm-yyyy
}

function getCurrentDay() {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const currentDate = new Date();
    const currentDayIndex = currentDate.getDay();
    const currentDayName = daysOfWeek[currentDayIndex];
    return currentDayName;
}

function getCurrentDayHebrew() {
    const daysOfWeek = ["יום ראשון", "יום שני", "יום שלישי", "יום רביעי", "יום חמישי", "יום שישי", "שבת"];
    const currentDate = new Date();
    const currentDayIndex = currentDate.getDay();
    const currentDayName = daysOfWeek[currentDayIndex];
    return currentDayName;
}

function convertDateFormat(dateStr) {
    // Split the date string by "-"
    const [day, month, year] = dateStr.split('-');
    
    // Rearrange to YYYY-MM-DD format
    const formattedDate = `${year}-${month}-${day}`;
    
    return formattedDate;
  }
  

function addDays(date, days) {
    const result = new Date(convertDateFormat(date));
    result.setDate(result.getDate() + days);
    return result;
}

function getNextSaturday() {
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 (Sunday) to 6 (Saturday)
    const daysUntilSaturday = (6 - dayOfWeek + 7) % 7; // Days until next Saturday
    const nextSaturday = new Date(today);
    nextSaturday.setDate(today.getDate() + daysUntilSaturday);
 
    return nextSaturday;
}


function formatDateToYYYYMMDD(date) {
    const day = String(date.getDate()).padStart(2, '0'); // Get day and pad with leading zero if needed
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Get month (0-indexed) and pad with leading zero
    const year = date.getFullYear(); // Get year

    return `${year}-${month}-${day}`; // Format as yyyy-mm-dd
}


function displayOmer () {

    const today = new Date();
    const recordDate = formatDateToYYYYMMDD(today);
    const url = 'https://www.hebcal.com/hebcal?cfg=json&o=on&start='+`${recordDate}`+'&end='+`${recordDate}`+'&geonameid=293590';

    console.log('display omer url: ' + url);

    fetch(url)
    .then(response => response.json())
    .then(data => {

        const omerItem = data.items.find(item => item.category === "omer");

        document.getElementById('odaha_2').textContent = `${omerItem.omer.count.he}`;
        
        console.log('data = ' + JSON.stringify(data));
        console.log('today omer = ' + omerItem.omer.count.he);   
    })
    .catch(error => {
        console.error('Error fetching the Omer:', error);
    });
    
    console.log('displayOmer() ends');        
} 

/* 
 * Daily Zmanim
 * Shaalabim geonameid=293590
 * Nof Hayalom geonameid=8199379
 */
function displayZmanim() {
    fetch('https://www.hebcal.com/zmanim?cfg=json&geonameid=293590')
    .then(response => response.json())
    .then(data => {
        document.getElementById('chatzotNight').textContent = `${data.times.chatzotNight.substr(11, 5)}`;
        document.getElementById('alotHaShachar').textContent = `${data.times.alotHaShachar.substr(11, 5)}`;
        document.getElementById('misheyakir').textContent = `${data.times.misheyakir.substr(11, 5)}`;
        document.getElementById('sunrise').textContent = `${data.times.sunrise.substr(11, 5)}`;
        document.getElementById('sofZmanShmaMGA').textContent = `${data.times.sofZmanShmaMGA.substr(11, 5)}`;
        document.getElementById('sofZmanShma').textContent = `${data.times.sofZmanShma.substr(11, 5)}`;
        document.getElementById('sofZmanTfilla').textContent = `${data.times.sofZmanTfilla.substr(11, 5)}`;
        document.getElementById('chatzot').textContent = `${data.times.chatzot.substr(11, 5)}`;
        document.getElementById('minchaGedola').textContent = `${data.times.minchaGedola.substr(11, 5)}`;
        //document.getElementById('minchaKetana').textContent = `${data.times.minchaKetana.substr(11, 5)}`;
        //document.getElementById('plagHaMincha').textContent = `${data.times.plagHaMincha.substr(11, 5)}`;
        document.getElementById('sunset').textContent = `${data.times.sunset.substr(11, 5)}`;
        document.getElementById('sunset2').textContent = `${data.times.sunset.substr(11, 5)}`;        
                
    })
    .catch(error => {
        console.error('Error fetching the Zmanim:', error);
    });
    
    console.log('displayZmanim() ends');        
 
}

let parasha_date = null;
/* Deprecated
// Get Parasha date from Hebcal
// Retrieve Parasha record from Leibovitz
function displayLeibovitzZmanim() { 
    fetch('https://www.hebcal.com/shabbat?cfg=json&i=on&geonameid=8199379&ue=off&b=28&c=on&M=on&F=on&lg=he&tgt=_top')
    .then(response => response.json())
    .then(data => {
        // Hebcal parasha loazi date and daily daf yomi       
        //parasha_date = formatDateToDDMMYYYY(new Date(data.items.find( record => record.category === "parashat").date));
        parasha_date = formatDateToDDMMYYYY(getNextSaturday());

        const today = getTodayDate();
        document.getElementById('daf_yomi').textContent = `${data.items.find( record => (record.category === "dafyomi" && record.date === today)).hebrew}`;
          
        // weekly leibovitz times
        fetch("https://ysadigurs.github.io/luach_beit_knesset/weekly.json")
        .then(response => response.json())
        .then(data => {
            // Get week record
            const item =  data.find( record => (record["date"] === parasha_date));
            
            // Shabat times
            document.getElementById('parasha').textContent = `${item["parasha"]}`;            
            document.getElementById('shabbat-hour').textContent = `${item["adlaka"].substr(0, 5)}`;
            // mincha erev shabat is 13 minutes after adlaka
            document.getElementById('mincha_erev').textContent = addMinutesToTime(`${item["adlaka"].substr(0, 5)}`, 13);
            document.getElementById('mincha_ktana_shabat').textContent = `${item["minchashabat"].substr(0, 5)}`; 
            document.getElementById('motzash').textContent = `${item["motzash"].substr(0, 5)}`;
            
            // Zmanim (weekly)
            //document.getElementById('chatzotNight').textContent = `${item["hazot"].substr(0, 5)}`;  
            //document.getElementById('alotHaShachar').textContent = `${item["alot"].substr(0, 5)}`;
            //document.getElementById('misheyakir').textContent = `${item["tzitzit"].substr(0, 5)}`;
            //document.getElementById('sunrise').textContent = `${item["netz"].substr(0, 5)}`;
            //document.getElementById('sofZmanShmaMGA').textContent = `${item["kshmamagen"].substr(0, 5)}`;
            //document.getElementById('sofZmanShma').textContent = `${item["kshmaagra"].substr(0, 5)}`;
            //document.getElementById('sofZmanTfilla').textContent = `${item["tfilaagra"].substr(0, 5)}`;
            //document.getElementById('chatzot').textContent = `${item["hazot"].substr(0, 5)}`;                      
            //document.getElementById('minchaGedola').textContent = `${item["minchagdola"].substr(0, 5)}`;
            //document.getElementById('plagHaMincha').textContent = `${item["minchahol"]}`; -- missing plag mincha
            //document.getElementById('sunset').textContent = `${item["shkia"].substr(0, 5)}`;
            document.getElementById('tzeit').textContent = `${item["tzeet"].substr(0, 5)}`;
            
            // Tfila Hol
            // Change to next week on Fridays.
            const currentDay = getCurrentDay();
            if (currentDay === "Friday" || currentDay === "Saturday") {
                const nextShabat = formatDateToDDMMYYYY(addDays(parasha_date, 7));
                const nextItem =  data.find( record => (record["date"] === nextShabat));
                document.getElementById('mincha_ktana_chol').textContent = `${nextItem["minchahol"].substr(0, 5)}`; 
                document.getElementById('arvit_chol').textContent = `${nextItem["arvithol"].substr(0, 5)}`; 

            }
            else {
                document.getElementById('mincha_ktana_chol').textContent = `${item["minchahol"].substr(0, 5)}`; 
                document.getElementById('arvit_chol').textContent = `${item["arvithol"].substr(0, 5)}`; 
            }

        })
        .catch(error => {
            console.error('Error fetching the leibovitz file', error);
        });
    })
    .catch(error => {
        console.error('Error fetching the Leiboviz hour:', error);
    });
 
    console.log('displayLeibovitzZmanim() ends');        
 
}
*/

function displayDafYomi(){

    fetch('https://www.hebcal.com/shabbat?cfg=json&i=on&geonameid=8199379&ue=off&b=28&c=on&M=on&F=on&lg=he&tgt=_top')
    .then(response => response.json())
    .then(data => {
        const today = getTodayDate();
        document.getElementById('daf_yomi').textContent = `${data.items.find( record => (record.category === "dafyomi" && record.date === today)).hebrew}`;

   })
    .catch(error => {
        console.error('Error fetching the daf yomi:', error);
    });
 
    console.log('displayDafYomi() ends');        
 

}

// Get Parasha date from today including Chagim
// Retrieve Parasha record from Leibovitz
function displayLeibovitzZmanimWithChagim() { 

    parasha_date = formatDateToDDMMYYYY(getNextSaturday()); // date of next Shabat

    // weekly leibovitz times
    fetch("https://ysadigurs.github.io/luach_beit_knesset/weekly.json")
    .then(response => response.json())
    .then(data => {
        // Get next record in Leibovitz sheet (shabat or chag)
        // Unit tests:
        // Today: getTodayDate() 2024/09/23
        // Saturday: 2024/09/28 
        // Sunday before RH: 2024/09/29
        // Rosh Hashana erev: 2024/10/02
        // Rosh Hashana day-1: 2024/10/03
        // Shabat Tshuva: 2024/10/05
        // Yom Kipur week: 2024/10/06
        // Yom Kipur: 2024/10/12
        // Sucot week: 2024/10/13
        // Sucot: 2024/10/16
        // Shabat cholamoed: 2024/10/17
        // Simcha tora: 2024/10/20
        // Bereshit: 2024/10/25
        // Bereshit: 2024/10/26
        // Noah: 2024/10/27

        const today = new Date(getTodayDate());            
        let item = null;
        //const item =  data.find( record => (today <= Date(convertDateFormat(record["date"]))));

        for (let i = 0; i < data.length; i++) {    
            const recordDate = new Date(convertDateFormat(data[i].date));
            if (recordDate >= today) {
                item = data[i];                
                console.log(`${recordDate} is equal to or greater than the input ${today}.`);
                break;
            }
        }

            
        // Shabat times
        document.getElementById('parasha').textContent = `${item["parasha"]}`;            
        document.getElementById('shabbat-hour').textContent = `${item["adlaka"].substr(0, 5)}`;
        document.getElementById('mincha_erev').textContent = addMinutesToTime(`${item["adlaka"].substr(0, 5)}`, 13);
        document.getElementById('mincha_ktana_shabat').textContent = `${item["minchashabat"].substr(0, 5)}`;        
        document.getElementById('motzash').textContent = `${item["motzash"].substr(0, 5)}`;    
        document.getElementById('tzeit').textContent = `${item["tzeet"].substr(0, 5)}`;
            
        // Tfila Hol
        // Change to next week on Fridays.
        const currentDay = getCurrentDay();
        if (currentDay === "Friday" || currentDay === "Saturday") {
            const nextShabat = formatDateToDDMMYYYY(addDays(parasha_date, 7));
            const nextItem =  data.find( record => (record["date"] === nextShabat));
            document.getElementById('mincha_ktana_chol').textContent = `${nextItem["minchahol"].substr(0, 5)}`; 
            document.getElementById('arvit_chol').textContent = `${nextItem["arvithol"].substr(0, 5)}`; 

        }
        else {
            document.getElementById('mincha_ktana_chol').textContent = `${item["minchahol"].substr(0, 5)}`; 
            document.getElementById('arvit_chol').textContent = `${item["arvithol"].substr(0, 5)}`; 
        }

    })    
    .catch(error => {
        console.error('Error fetching the Leiboviz with Chagim hours:', error);
    });
 
    console.log('displayLeibovitzZmanimWithChagim() ends');        
 
}


function isDateInCurrentWeek(dateToCheck = new Date()) {
  const today = new Date();
  
  // Get the day of the week (0 = Sunday, 6 = Saturday)
  const dayOfWeek = today.getDay();

  // Calculate the start of the week (Sunday)
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - dayOfWeek);

  // Calculate the end of the week (Saturday)
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);

  // Check if the dateToCheck falls between startOfWeek and endOfWeek
  return dateToCheck >= startOfWeek && dateToCheck <= endOfWeek;
}


function displayConfig() {
  
    fetch("https://ysadigurs.github.io/luach_beit_knesset/config.json")
    .then(response => response.json())
    .then(data => {

        // Read fixed json data
        document.getElementById('shiur_daf_yomi').textContent = `${data["shiurDafYomiTime"]}`;
        document.getElementById('odaha_1').textContent = `${data["odaha1"]}`;
        document.getElementById('chagim_1').textContent = `${data["chagim1"]}`;
        document.getElementById('chagim_2').textContent = `${data["chagim2"]}`;

        
        document.getElementById('odaha_2_name').textContent = `${data["odaha2Name"]}`;
        document.getElementById('odaha_2_time').textContent = `${data["odaha2Time"]}`;
        
        document.getElementById('odaha_3_name').textContent = `${data["odaha3Name"]}`;
        document.getElementById('odaha_3_time').textContent = `${data["odaha3Time"]}`;

        document.getElementById('chagim_2_name').textContent = `${data["chagim2Name"]}`;
        document.getElementById('chagim_2_time').textContent = `${data["chagim2Time"]}`;
        
        document.getElementById('shacharit_shabat_1').textContent = `${data["shacharit_shabat_1"]}`;
        document.getElementById('shacharit_shabat').textContent = `${data["shacharit_shabat"]}`;
        document.getElementById('mincha_gdola_shabat').textContent = `${data["mincha_gdola_shabat"]}`;
        document.getElementById('shacharit_chol_1').textContent = `${data["shacharit_chol_1"]}`;
        document.getElementById('shacharit_chol_2').textContent = `${data["shacharit_chol_2"]}`;
        document.getElementById('shacharit_chol_3').textContent = `${data["shacharit_chol_3"]}`;    
        document.getElementById('mincha_gdola_chol').textContent = `${data["mincha_gdola_chol"]}`;   
    
                
        // Update config only on Friday and Saturday
        const currentDay = getCurrentDay();
        // if (currentDay === "Friday" || currentDay === "Saturday" )

        // Update config from current week
        const configDate = new Date(`${data["configDate"]}`);

        if (isDateInCurrentWeek(configDate)) {
        
            // Read config json data            
            document.getElementById('dvar_tora').textContent = `${data["dvarTora"]}`;
            
            document.getElementById('shiur_tfila_time').textContent = `${data["shiurAfterTfilaTime"]}`;
            document.getElementById('shiur_tfila').textContent = `${data["shiurAfterTfila"]}`;        
            
            document.getElementById('shiur_shabat_time').textContent = `${data["shiurShabatTime"]}`;
            document.getElementById('shiur_shabat_name').textContent = `${data["shiurShabatName"]}`;
            document.getElementById('shiur_shabat_subject').textContent = `${data["shiurShabatSubject"]}`;
            
        }
        else {
            // Clear config data in the begining of the week
            document.getElementById('dvar_tora').textContent = "יעודכן";
            
            document.getElementById('shiur_tfila_time').textContent = "     ";
            document.getElementById('shiur_tfila').textContent = "יעודכן";        
            
            document.getElementById('shiur_shabat_time').textContent = "     ";
            document.getElementById('shiur_shabat_name').textContent = "יעודכן";
            document.getElementById('shiur_shabat_subject').textContent = "";

        }
           
                 
    })
    .catch(error => {
        console.error('Error fetching config.json', error);
    });   

    console.log('displayConfig() ends'); 
    
}

function getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so add 1
    const day = String(today.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

function displayChol() {
    const today = new Date();
    document.getElementById('loazi').textContent = `${formatDateToDDMMYYYY(today)}`;
    document.getElementById('weekday').textContent = `${getCurrentDayHebrew()}`;
    
    const todayStr = getTodayDate();
    fetch(`https://www.hebcal.com/converter?cfg=json&g2h=1&strict=1&date=${todayStr}`)
    .then(response => response.json())
    .then(data => {
        document.getElementById('today').textContent = `${data.hebrew}`;
    })
    .catch(error => {
        console.error('Error fetching today:', error);
    });

    console.log('displayChol() ends'); 
     
}


function displayChagim() {    
    fetch('https://www.hebcal.com/shabbat?cfg=json&i=on&geonameid=8199379&ue=off&b=32&c=on&M=on&lg=he&tgt=_top')
    .then(response => response.json())
    .then(data => {
        const item_rosh = data.items.find( record => record.category === "roshchodesh");
        if (item_rosh != undefined) {
                const item_mervachim = data.items.find( record => record.category === "mevarchim");
                if (item_mervachim != undefined) document.getElementById('chagim_1').textContent = `${item_mervachim.memo}`;
        }
        else {
            const item_chagim = data.items.find( record => record.category === "holiday");
            if (item_chagim != undefined) {
                document.getElementById('chagim_1').textContent = `${item_chagim.hebrew}`;           
            }
        }
        
    })
    .catch(error => {
        console.error('Error fetching the chagim 1', error);
    });

    console.log('displayChagim() ends'); 
}

function checkInternetConnection() {
    fetch('https://ysadigurs.github.io/luach_beit_knesset/config.json')
        .then(function(response) {
            if (response.ok) {
                document.getElementById('connection-status').style.backgroundColor = 'green';
            } else {
                document.getElementById('connection-status').style.backgroundColor = 'red';
            }
        })
        .catch(function() {
            document.getElementById('connection-status').style.backgroundColor = 'red';
        });
    
    console.log('checkInternetConnection() ends');
}

function displayAll () {
    // Debug
    let output = document.getElementById('output');
    let currentTime = new Date().toLocaleTimeString();
    console.log("Function called at: " + currentTime);

    displayDafYomi();
    displayLeibovitzZmanimWithChagim();    
    displayZmanim();
    displayConfig();
    displayChol();
    displayOmer();
    // displayChagim();
    checkInternetConnection();  
}

function initApp () {
    // Reload the page every few seconds/minutes (in milliseconds)
    //setInterval(() => {location.reload();}, 1000*60*10);

    setInterval(updateClock, 1000);
    updateClock();
    //displayWeather(); // - CORS issue
  
    // Reset the page data every few minutes (milliseconds)
    setInterval(displayAll, 1000*60*60*4);   
    displayAll();
}

initApp();
