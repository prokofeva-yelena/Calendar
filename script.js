let month = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

class Calendar {
    constructor(date, element, month) {
        this.date = new Date();
        this.month = [];
        this.element = '.out';
    }
   
    render() {
        //название месяца и год
        
        //let h1 = document.createElement('h1');
        document.querySelector('h1').innerHTML = `${month[this.date.getMonth()]} ${this.date.getFullYear()}`;
        //document.querySelector(this.element).append(h1);
        

        //числа месяца и дни недели
        let table = document.createElement('table');
        document.querySelector(this.element).append(table);
        //сколько дней в месяце
        function daysInMonth(iMonth, iYear) {
            return 33 - new Date(iYear, iMonth, 33).getDate();
        }
        let arrDays = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];

        //день недели первого дня месяца
        let firstDay = new Date(this.date.getFullYear() + '-' + (this.date.getMonth() + 1) + '-' + '01').getDay();
        //заполнить начало массива пустыми элементами, если 1 число не пн
        function emptyElementsAtTheBeginning(firstDay) {
            let num = firstDay - 1;
            for (let i = 1; i <= num; i++) {
                arrDays.push('')
            }

            if (firstDay == 0) {
                for (let i = 1; i <= 6; i++) {
                    arrDays.push('')
                }
            }
        }
        emptyElementsAtTheBeginning(firstDay);

        //заполнить массив числами месяца
        for (let i = 1; i <= daysInMonth(this.date.getMonth(), this.date.getFullYear()); i++) {
            arrDays.push(i)
        }
        //день недели последнего дня месяца
        let lastDay = new Date(this.date.getFullYear() + '-' + (this.date.getMonth() + 1) + '-' +
            daysInMonth(this.date.getMonth(), this.date.getFullYear())).getDay();

        //заполнить конец массива пустыми элементами, если последний день месяца не вс
        function emptyElementsAtTheEnd(lastDay) {
            if (lastDay != 0) {
                let num = 6 - lastDay;
                for (let i = 0; i <= num; i++) {
                    arrDays.push('')
                }
            } else {
                return arrDays;
            }
        }

        emptyElementsAtTheEnd(lastDay)

        // создаем многомерный массив с днями месяца
        let arrResult;
        function chunkArr(num, arr) {
            arrResult = [];
            let arrChunk = [];
            let iterCount = arr.length / num;
            for (let i = 0; i < iterCount; i++) {
                arrChunk = arr.splice(0, num);
                arrResult.push(arrChunk)
            }
            return arrResult;
        }
        chunkArr(7, arrDays);

        //отрисовываем многомерный массив с днями месяца в таблицу

        for (let i = 0; i < arrResult.length; i++) {
            let tr = document.createElement('tr');

            for (let q = 0; q < arrResult[i].length; q++) {
                let td = document.createElement('td');
                td.innerHTML = arrResult[i][q];
                tr.append(td);
            }
            table.append(tr);
        }
    }
}

let calendar = new Calendar();

let y = calendar.date.getFullYear();
let m = calendar.date.getMonth();

calendar.date = new Date(y, m);
calendar.month = month;
calendar.render();

document.querySelector('.next').addEventListener('click', nextClick);
document.querySelector('.prev').addEventListener('click', prevClick);

let n = 1;

function nextClick() {
    document.querySelector(calendar.element).innerHTML = '';
    y = calendar.date.getFullYear();
    m = calendar.date.getMonth();
    calendar.date = new Date(y, m + 1);
    calendar.render();
    n++;
}

function prevClick() {
    document.querySelector(calendar.element).innerHTML = '';
    y = calendar.date.getFullYear();
    m = calendar.date.getMonth();
    calendar.date = new Date(y, m - 1);
    calendar.render();
    n--;
}






















