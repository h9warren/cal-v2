

/*|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
||||||||||||||||||||||||||                            |||||||||||||||||||||||||
||||||||||||||||||||||||||     Creates Date Object    |||||||||||||||||||||||||
||||||||||||||||||||||||||                            |||||||||||||||||||||||||
|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||*/

		function Createmonth(datestring) {
			this.date = (datestring == null) ? new Date() : new Date(datestring);
			this.months = [
				{ month: "January", days: 31, monthnumber: 0 },
				{ month: "February", days: ((this.date.getFullYear() % 4 == 0) && (this.date.getFullYear() % 100 != 0)) || (this.date.getFullYear() % 400 == 0) ? 29 : 28, monthnumber: 1 },
				{ month: "March", days: 31, monthnumber: 2 },
				{ month: "April", days: 30, monthnumber: 3 },
				{ month: "May", days: 31, monthnumber: 4 },
				{ month: "June", days: 30, monthnumber: 5 },
				{ month: "July", days: 31, monthnumber: 6 },
				{ month: "August", days: 31, monthnumber: 7 },
				{ month: "September", days: 30, monthnumber: 8 },
				{ month: "October", days: 31, monthnumber: 9 },
				{ month: "November", days: 30, monthnumber: 10 },
				{ month: "December", days: 31, monthnumber: 11 }
			];
			this.numberOfDays = this.months[this.month()].days;
			this.startDay = this.getDayOfFirst();
			this.endDay = this.getDayOfLast();
			this.predaynumber = this.startDay;
			this.postdaynumber = 6 - this.endDay;
			this.nextMonthString = this.getNextMonthString();
			this.prevMonthString = this.getPrevMonthString();
		}

		Createmonth.prototype.year = function() {
			var year = this.date.getFullYear();
			return year;
		};

		Createmonth.prototype.month = function() {
			var month = this.date.getMonth();
			return month;
		};

		Createmonth.prototype.getDayOfFirst = function() {
			var newdate = new Date('' + (this.month() + 1) + '/01/' + this.year() + '');
			return newdate.getDay();
		};
				// gets date object assuming last of selected month
		Createmonth.prototype.getDayOfLast = function () {
			var newdate = new Date('' + (this.month() + 1) + '/' +  this.numberOfDays + '/' + this.year() + '');
			return newdate.getDay();
		}

		Createmonth.prototype.getNextMonthString = function () {

			var month = this.month();
			var year = this.year();
			var nextMonthString;

			if (month === 11) {
				month = 0;
				year += 1;
			} if (year > 275760) {
				year -= 1;
			} else {
				month += 1;
			}
			nextMonthString = '' + (month + 1) + '/01/' + year + '';
			return nextMonthString;

		}
		Createmonth.prototype.getPrevMonthString = function () {
			var month = this.month();
			var year = this.year();
			var prevMonthString;

			if (month === 0) {
				month = 11;
				year -= 1;
			} if ( year <= 0 ) {
				year += 1;
			} else {
				month -= 1;
			}

			prevMonthString = '' + (month + 1) + '/01/' + year + '';
			return prevMonthString;
		}

/*|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
||||||||||||||||||||||||||                            |||||||||||||||||||||||||
||||||||||||||||||||||||||     Creates page markup    |||||||||||||||||||||||||
||||||||||||||||||||||||||                            |||||||||||||||||||||||||
|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||*/		

		Createmonth.prototype.draw = function () {
			// iterator to build out days
			var daynumber = 1;
			var prevNumber = 0;

			var calendarMarkup = '';
			var sortedMarkup = '';
			var preDays = '';
			var calendarDays = '';
			var postDays = '';

			var todaysDate = new Date();
			var isToday;

			// loop and return elements for each day in month
			for (var i = 1; i <= this.numberOfDays; i++) {
				isToday = ( (daynumber == this.date.getDate()) && (todaysDate.getMonth() == this.month()) ) ? true : false;
				calendarDays += this.draw.day(daynumber, isToday);
				daynumber++;
			}

			// loop and return elements for each day before month
			for (var i = 1; i <= this.predaynumber; i++) {
				preDays += this.draw.preDay(prevNumber);
				prevNumber++;
			}

			// loop and return elements for each day after month
			var number = 1;
			for (var i = 1; i <= this.postdaynumber; i++) {
				postDays += this.draw.postDay(number);
				number++;
			}
			
			// concatenate all days onto calendarMarkup element variable
			calendarMarkup = preDays + calendarDays + postDays;
			sortedMarkup = this.draw.arrange(calendarMarkup);

			return sortedMarkup;
			
		};
			
		Createmonth.prototype.draw.day = function (daynumber, isToday) {
			var dayelement = (isToday==true) ?
			'<div class="day today" id="today"><p class="dayNumber">' + daynumber + '</p></div>' :
			'<div class="day"><p class="dayNumber">' + daynumber + '</p></div>';
			return dayelement;
		}
		Createmonth.prototype.draw.preDay = function (prevNumber) {
			var predayelement = '<div class="preDay"><p class="dayNumber">' + prevNumber + '</p></div>';
			return predayelement;
		}
		Createmonth.prototype.draw.postDay = function (number) {
			var postdayelement = '<div class="postDay"><p class="dayNumber">' + number + '</p></div>';
			return postdayelement;
		}
		Createmonth.prototype.draw.arrange = function(calendarMarkup) {
			var seperator = '</div>';
			calendarMarkup = calendarMarkup.split('</div>');
			var newArray = [];
			var currStr;

			for (var i = 0; i < calendarMarkup.length; i++) {
				
				currStr = calendarMarkup[i] + seperator;

				if ((i+1) % 7 == 0) {
					currStr += '</div>';
				} else if ((i+1) % 7 == 1) {
					currStr = '<div class="week">' + currStr;
				}
				newArray.push(currStr);
			}
			newArray = newArray.join('');
			return newArray;
		}

/*|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
||||||||||||||||||||||||||                            |||||||||||||||||||||||||
||||||||||||||||||||||||||       Writes to DOM        |||||||||||||||||||||||||
||||||||||||||||||||||||||                            |||||||||||||||||||||||||
|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||*/	
		

		Createmonth.prototype.writeMonthToDOM = function(element) {
			// document.getElementById('prevMonth').innerHTML = this.draw();
			element.innerHTML = this.draw();
			// document.getElementById('nextMonth').innerHTML = this.draw();
		};

		Createmonth.prototype.displayMonthYear = function() {
			var monthholder = document.getElementsByClassName('mainMonth')[0]; 
			var yearholder = document.getElementsByClassName('mainYear')[0];
			monthholder.innerHTML = this.months[this.month()].month;
			yearholder.innerHTML = this.year();
		};		


/*|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
||||||||||||||||||||||||||                            |||||||||||||||||||||||||
||||||||||||||||||||||||||         Navigation         |||||||||||||||||||||||||
||||||||||||||||||||||||||                            |||||||||||||||||||||||||
|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||*/


		function moveCalendar(event) {
			var calHolder = document.getElementById('calBuild');
			var calElement = document.getElementById('currentMonth');
			var clientWidth = calElement.clientWidth;
			var direction = event.target.parentElement.dataset.nav;	

			var symbol = (direction === 'forward') ? '' : '-';	

			console.log(symbol);
		}

		function moveBack() {
			var calHolder = document.getElementById('calBuild');
			var calElement = document.getElementById('currentMonth');
			var clientWidth = calElement.clientWidth;

			var style = 'left: ' + parseInt(clientWidth +  200) + 'px';
			calHolder.style = style;
		}

		function moveForward() {
			var calHolder = document.getElementById('calBuild');
			var calElement = document.getElementById('currentMonth');
			var clientWidth = calElement.clientWidth;

			var style = 'left: -' + parseInt(clientWidth +  200) + 'px';
			calHolder.style = style;
		}






/*|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
||||||||||||||||||||||||||                            |||||||||||||||||||||||||
||||||||||||||||||||||||||         Initialize         |||||||||||||||||||||||||
||||||||||||||||||||||||||                            |||||||||||||||||||||||||
|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||*/
		
		var newmonth;

		(function initialize() {

			let prevMonthDiv = document.getElementById('prevMonth'); 
			let currentMonthDiv = document.getElementById('currentMonth'); 
			let nextMonthDiv = document.getElementById('nextMonth'); 

			newmonth = new Createmonth();
			let prevMonth = new Createmonth(newmonth.getPrevMonthString());
			let nextMonth = new Createmonth(newmonth.getNextMonthString());

			newmonth.writeMonthToDOM(currentMonthDiv);
			prevMonth.writeMonthToDOM(prevMonthDiv);
			nextMonth.writeMonthToDOM(nextMonthDiv);

			newmonth.displayMonthYear();

		}());


