$.Enumerable.FromProps = function(obj){
    var props = obj;
      var array = [];
      for(i in props){
          array.push(props[i]);
      }
    return $.Enumerable.From(array);
}

function two(x) {return ((x>9)?"":"0")+x}
function three(x) {return ((x>99)?"":"0")+((x>9)?"":"0")+x}

function humanReadable (milliSeconds){
    var sec = Math.floor(milliSeconds/1000)
    milliSeconds = milliSeconds % 1000
    var time = three(milliSeconds)

    var min = Math.floor(sec/60)
    sec = sec % 60
    time = two(sec) + ":" + time

    var hr = Math.floor(min/60)
    min = min % 60
    time = two(min) + ":" + time

    var day = Math.floor(hr/60)
    hr = hr % 60
    time = two(hr) + ":" + time
    time = day + ":" + time

    return time;
}

var popup = {context:{page: 1}};

popup.load = function(){	
	var html = '<div class="heading">';
	html += '<label>BF3S</label>';
	html += '<a href="#" class="previous">';
	html += '<img src="imgs/left.png"/>';
	html += '</a>';
	html += '<a href="#" class="next">';
	html += '<img src="imgs/right.png"/>';
	html += '</a>';
	html += '</div>';
	html += '<div class="search">';
	html += '<label for="users">Username: </label>';
	html += '<input id="users"/>';
	html += '<img id="loading" src="imgs/loading.gif" class="loading"/>';
	html += '</div>';
	html += '<div class="accordion page active">';
	html += '</div>';	
	html += '<div class="accordion page">';	
	html += '</div>';
	html += '</div>';
	
	$('body').append(html);	
	$('div.search input').focus();
};

popup.plugins = function(){
	$('#users').autocomplete({
		source: popup.requestPlayer
	});
	
	popup.navigation();
};

popup.accordion = function(){
	$('.accordion .box').hide();
	$('.accordion .box:first').show().addClass('open');
	
	$(window).resize(function() {
		if($(document).height() > $(window).height()){
			var newheight = $(window).height() + 2;
			window.innerHeight = newheight;
		}	
	});
	
	$('.accordion .title').click(function() {
		$(this)
			.parent()
			.find('.box.open')
			.addClass('sliding')
			.slideUp(530)
			.addClass('closed')
			.removeClass('open')					
			.removeClass('sliding');
			
		var content = $(this).next();
		
		if(content.is(':visible')) {
			content
				.addClass('sliding')
				.slideUp(530)
				.addClass('closed')
				.removeClass('open')			
				.removeClass('sliding');
		} else  {
			$(this)
				.parent()
				.find('.box.open')
				.addClass('sliding')
				.slideUp(530)
				.addClass('closed')
				.removeClass('open')					
				.removeClass('sliding');

			content
				.addClass('sliding')
				.slideDown(500)
				.removeClass('closed')
				.addClass('open')
				.removeClass('sliding');
		}		
	});	
};

popup.clear = function(){
	$('.accordion').empty();;
};

popup.basic = function(data){	
	var html = '<div class="title">';
	html += '<label>Basic Information</label>';
	html += '</div>';	
	html += '<div class="box">';
	html += '<div class="row">';
	html += '<label>Name</label>';
	html += '<label class="middle">'+data.name+'</label>';
	html += '<img src="'+ popup.platImgUrl(data.plat) +'"></img>';
	html += '</div>';
	html += '<div class="row">';
	html += '<label>Country</label>';
	html += '<label class="middle">'+data.country_name+'</label>';
	html += '<img src="'+popup.imageUrl(data.country_img)+'"></img>';
	html += '</div>';
	html += '<div class="row">';
	html += '<label>Rank</label>';
	html += '<label class="middle">' + data.stats.rank.name + ' (' + data.stats.rank.nr + ')</label>';
	html += '<img src="'+popup.gameImageUrl(data.stats.rank.img_tiny)+'"></img>';
	html += '</div>';
	html += '<div class="row">';
	html += '<label>Score</label>';
	html += '<label class="middle">'+data.stats.scores.score+'</label>';
	html += '</div>';
	html += '</div>';	
	$($('.accordion')[0]).append(html);	
	$('.heading').css('background-image','url('+popup.gameImageUrl(data.stats.rank.img_small)+')');
	$('.heading').css('background-repeat','no-repeat');
	$('.heading').css('background-position','right');
};

popup.general = function(data){
	var html = '<div class="title">';
	html += '<label>General stats</label>';
	html += '</div>';	
	html += '<div class="box">';
	html += '<div class="row twos">';
	html += '<label>Rounds played</label>';
	html += '<label class="right">'+data.stats.global.rounds+'</label>';
	html += '<hr/>';
	html += '</div>';
	html += '<div class="row twos">';
	html += '<label>Finished rounds</label>';
	html += '<label class="right">'+data.stats.global.elo_games+'</label>';
	html += '<hr/>';
	html += '</div>';
	html += '<div class="row twos">';
	html += '<label>Skill</label>';
	html += '<label class="right">'+Math.round(data.stats.global.elo)+'</label>';
	html += '<hr/>';
	html += '</div>';
	html += '<div class="row twos">';
	html += '<label>Wins</label>';
	html += '<label class="right">'+data.stats.global.wins+'</label>';
	html += '<hr/>';
	html += '</div>';
	html += '<div class="row twos">';
	html += '<label>Losses</label>';
	html += '<label class="right">'+data.stats.global.losses+'</label>';
	html += '<hr/>';
	html += '</div>';
	html += '<div class="row twos">';
	html += '<label>Win/Loss ratio</label>';
	html += '<label class="right ratio">'+ Math.round((data.stats.global.wins/data.stats.global.losses)*100)/100+'</label>';
	html += '</div>';
	html += '</div>';
	$($('.accordion')[0]).append(html);
};

popup.combat = function(data){
    var html = '<div class="title">';
	html += '<label>Combat stats</label>';
	html += '</div>';	
	html += '<div class="box">';
	html += '<div class="content">';
	html += '<div class="row twos">';
	html += '<label>Kills</label>';
	html += '<label class="right">'+data.stats.global.kills+'</label>';
	html += '<hr/>';
	html += '</div>';
	html += '<div class="row twos">';
	html += '<label>Deaths</label>';
	html += '<label class="right">'+data.stats.global.deaths+'</label>';
	html += '<hr/>';
	html += '</div>';
	html += '<div class="row twos">';
	html += '<label>Kill/Death ratio</label>';
	html += '<label class="ratio right">'+Math.round((data.stats.global.kills/data.stats.global.deaths)*1000)/1000+'</label>';
	html += '<hr/>';
	html += '</div>';
	html += '<div class="row twos">';
	html += '<label>Headshots</label>';
	html += '<label class="right">'+data.stats.global.headshots+'</label>';
	html += '<hr/>';
	html += '</div>';
	html += '<div class="row twos">';
	html += '<label>Longest headshot</label>';
	html += '<label class="right">'+data.stats.global.longesths+'m</label>';
	html += '<hr/>';
	html += '</div>';
	html += '<div class="row twos">';
	html += '<label>Longest handheld headshot</label>';
	html += '<label class="right">'+data.stats.global.longesthandhs+'m</label>';
	html += '<hr/>';
	html += '</div>';	
	html += '<div class="row twos">';
	html += '<label>Best kill streak</label>';
	html += '<label class="right">'+data.stats.global.killstreakbonus+'</label>';
	html += '<hr/>';
	html += '</div>';	
	html += '<div class="row twos">';
	html += '<label>Vehicles destroyed</label>';
	html += '<label class="right">'+data.stats.global.vehicledestroyed+'</label>';
	html += '<hr/>';
	html += '</div>';	
	html += '<div class="row twos">';
	html += '<label>Vehicle kills</label>';
	html += '<label class="right">'+data.stats.global.vehiclekills+'</label>';
	html += '<hr/>';
	html += '</div>';
	html += '<div class="row twos">';
	html += '<label>Shots taken</label>';
	html += '<label class="right">'+data.stats.global.shots+'</label>';
	html += '<hr/>';
	html += '</div>';
	html += '<div class="row twos">';
	html += '<label>Hits</label>';
	html += '<label class="right">'+data.stats.global.hits+'</label>';
	html += '<hr/>';
	html += '</div>';
	html += '<div class="row twos">';
	html += '<label>Accuracy</label>';
	html += '<label class="right">'+Math.round(((data.stats.global.hits/data.stats.global.shots)*100)*100)/100+'%</label>';
	html += '<hr/>';
	html += '</div>';
	html += '<div class="row twos">';
	html += '<label>Avenger kills</label>';
	html += '<label class="right">'+data.stats.global.avengerkills+'</label>';
	html += '</div>';
	html += '</div>';
	$($('.accordion')[0]).append(html);
};

popup.ranks = function(data){
	var html = '<div class="title">';
	html += '<label>Rank progress</label>';
	html += '</div>';

	html += '<div class="box">';
	html += '<div class="row">';
	html += '<label class="rank-title">Current:</label>';
	html += '<img class="rank" src="'+popup.gameImageUrl(data.stats.rank.img_medium)+'"/>';
	html += '<div class="rank">';
	html += '<label>'+data.stats.rank.name + ' (' + data.stats.rank.nr + ')</label>';
	html += '<label>Score: '+data.stats.scores.score+'</label>';
	html += '</div>';
	html += '<hr/>';
	html += '<label class="rank-title">Next:</label>';
	html += '<img class="rank" src="'+popup.gameImageUrl(data.stats.nextranks[0].img_medium)+'"/>';
	html += '<div class="rank">';
	html += '<label>'+ data.stats.nextranks[0].name + ' (' + data.stats.nextranks[0].nr + ')</label>';
	html += '<label>Score: '+data.stats.nextranks[0].score + '</label>';
	html += '<label class="green">Left: '+data.stats.nextranks[0].left + '</label>';
	html += '</div>';
	html += '</div>';
	html += '</div>';

$($('.accordion')[1]).append(html);
};

popup.unlocks = function(data){
    var upcomingUnlocks = [];
    var weapons = $.Enumerable
            .FromProps( data.stats.weapons)
            .ToArray();

    for(var weaponIndex in weapons){
        var weapon = weapons[weaponIndex];
        var unlocks = weapon.unlocks;
        for(var index in unlocks){
        	var unlock = unlocks[index];
        	if(unlock.curr != unlock.needed){
        		var type = unlock.nname.toLowerCase();
                if(weapon[type] == undefined)continue;

                var current = weapon[type];
                var timeUsed = weapon.time;
                var avgKillRate = timeUsed/current;

                var needed = unlock.needed - unlock.curr;
                var timeNeeded = avgKillRate * needed;

                var percentage = Math.round(current / needed  * 100);

                var upcomingUnlock = {
                    'timeNeeded': timeNeeded,
                    'percentage' : percentage,
                    'unlock': unlock,
                    'weapon': weapon
                };
                upcomingUnlocks.push(upcomingUnlock);
        	}
        }
    }

    var source = $.Enumerable.From(upcomingUnlocks)
                .Where("$.timeNeeded > 0 && $.percentage > 0")
                .OrderBy("$.timeNeeded")
                .Take(6)
                .ToArray();

    var html = '<div class="title">';
    html += '<label>Upcoming unlocks</label>';
    html += '</div>';
    html += '<div class="box">';

    for(var index in source){
          var unlock = source[index];
          html += '<div class="row unlocks">';
          html += '<label class="long"><strong>'+unlock.unlock.name+' </strong> for '+unlock.weapon.name+'</label>';
          html += '<img src="'+popup.gameImageUrl(unlock.unlock.img)+'" class="smallImg"/>';
          html += '<label>'+unlock.percentage+'% Complete</label>';
          html += '<label>approx '+ humanReadable(unlock.timeNeeded)+' left</label>';
          if(index != source.length-1)
          html += '<hr/>';
          html += '</div>';
    }

    html += '</div>';

    $($('.accordion')[1]).append(html);
};

popup.ratios = function(){
	var ratios = $('label.ratio');	
	for (var i = 0; i < ratios.length; i++){
		if($(ratios[i]).text() > 1){
			$(ratios[i]).addClass('green');
			$(ratios[i]).removeClass('ratio');
		}else{
			$(ratios[i]).addClass('red');
			$(ratios[i]).removeClass('ratio');
		}
	}
};

popup.updateNavigation = function(){
	if(popup.context.page == 1){
		$('.previous').hide();
		$('.next').show();
	}
	
	if(popup.context.page == $('.page').length){
		$('.previous').show();
		$('.next').hide();
	}
	
	if(popup.context.page != 1 && popup.context.page != $('.page').length){
		$('.previous').show();
		$('.next').show();
	}
	
	$('.page.active').show();
};

popup.navigation = function(){
	$('.next').click(function(){	
		if(popup.context.page < $('.page').length){
			$('.page.active')
			.hide('slide', {direction: 'left'}, 500, function(){
				$(this).next()
					.find('.box').hide();
				$(this).next()
					.show('slide', {direction: 'right'}, 530, function(){
						popup.context.page += 1;
						popup.updateNavigation();
						$(this).find('.box:first').slideDown(530).addClass('open');
					}).addClass('active');
			}).removeClass('active');
		}				
	});
	
	$('.previous').click(function(){
		if(popup.context.page > 1){
			$('.page.active')
			.hide('slide', {direction: 'right'}, 500, function(){
				$(this).prev()
					.find('.box').hide();
				$(this).prev()
					.show('slide', {direction: 'left'}, 530, function(){
						popup.context.page -= 1;
						popup.updateNavigation();
						$(this).find('.box:first').slideDown(530).addClass('open');
					}).addClass('active');
			}).removeClass('active');		
		}			
	});
};

popup.platImgUrl = function(plat){
	if(plat = 'ps3'){
		return 'imgs/ps3.png'
	}
};

popup.imageUrl = function(relativepath){
	return 'http://files.bf3stats.com/img/' + relativepath;
};

popup.gameImageUrl = function(relativepath){
	return 'http://files.bf3stats.com/img/bf3/' + relativepath;
};

popup.requestPlayer = function(request, response){
	$(document).ajaxStart(function(){
		$('#loading').show();
	});
	
	$(document).ajaxStop(function(){
		$('#loading').hide();
	});
	
	$.ajax({
		crossDomain:true,
		type:'POST',
		url:'http://api.bf3stats.com/ps3/player/',
		data: {player: request.term},
		success: function(data){
			if(data.status == 'data'){
				popup.clear();
				popup.basic(data);
				popup.general(data);
				popup.combat(data);
				popup.ranks(data);
				popup.unlocks(data);
				popup.accordion();
				popup.ratios();
				popup.updateNavigation();
                $('.box').scroller();
			}
		}
	});
};

$(function() {
	popup.load();	
	popup.plugins();
});
