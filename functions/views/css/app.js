let chart=document.getElementById('graph1').getContext('2d');

let myChart =new Chart(chart, {
    type:'line',
    data:{
        labels:[1,2,3,4,5,6,7],
        datasets:[{
            data:[141,235,412,535,698,729,834],
            fill:false,
            borderColor:"#e32d2d",
            label:"line"
        }],
    },
    options:{
        title:{
            display:true,
            text:"TITLE"
        },
        layout:{

        },
        responsive:false,
        maintainAspectRatio:true,
        defaultFontFamily: Chart.defaults.global.defaultFontFamily = "'Varela Round', sans-serif",
        defaultFontColor:'#08122a',
        legend:{
            display:false
        }
    }

})