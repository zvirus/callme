// Callme 2.1 * NazarTokar.com * dedushka.org * Copyright 2010-2014
// Nazar Tokar @ Ukraine
// updated on 2014-12-03

function getScriptFolder (e) { // find script folder
	var scripts=document.getElementsByTagName('script');
	for (var i=0; i<scripts.length; i++) {
		if (scripts[i].src.indexOf(e)>=0) {
			var res = scripts[i].src.substring(0, scripts[i].src.indexOf(e));
			return res.replace('callme/js', 'callme');
		}
	}
}

jQuery.getScript(getScriptFolder('callme.js')+'js/config.js', function(){
	callMe();
});

function callMe() {
	var $ 	= jQuery.noConflict(),
			tpl = {}, cmeForm, cmeCSS = jQuery('<link>'); // add css

	cmeCSS.attr ({
		type 	: 'text/css',
		rel 	: 'stylesheet',
		href 	: getScriptFolder('callme.js') + 'templates/' + cmeData.template + '/style.css'
	});

$('head').append(cmeCSS);

var hr = new Date().getHours(); // get usr hour

var callmeData = { // data to send
		fields 			: cmeData.fields,
		title 			: cmeData.title,
		calltime 		: cmeData.callTime,
		time_start 	: cmeData.startWork,
		time_end 		: cmeData.endWork,
		button 			: cmeData.button,
		hr 					: hr
	};

function replaceData(data, key, str) {  // replace template
	if (!data || !key || !str) { return ''; }
	return data = data.replace((new RegExp("{{:"+key+"}}", "gi")), str);
}

function rpl(e,d,r) { // replace
	if (!d) {
		var t = ["\"", "'", "~", ";", "{", "}"];
		for (var i=0; i<t.length; i++) {
			var o = new RegExp(t[i], "g");
			e = e.replace(o, "");
		}
	} else {
		o = new RegExp(d, "g");
		e = e.replace(o, r);
	}
	return e;
}

function loadHTML() { // load templates html 
	if (!tpl.length) { 
		$('.cme-form').find('.cme-template').each(function(){
			var e = $(this);
			tpl[ e.data('cme') ] = e.html();
			e.html('');
		});
	}
}

function isIE() { // check if IE
	var msie = window.navigator.userAgent.indexOf("MSIE ");
	return msie > 0 ? true : false;
}

function getPlaceholder(e,t) { // find placeholder and caption
	var f = [' ', e];
	if (e.lastIndexOf("(") != "-1") { // если указан placeholder
		f[0] = e.replace(/.*\(|\)/gi,""); // достать placeholder между скобками
		f[1] = e.substring(0, e.lastIndexOf("(")); // достать имя поля
	}
	return t == 1 ? f[0] : f[1];
}

//

$.get(getScriptFolder('callme.js') + 'templates/form.html', function (d) {
	var keys = Object.keys(cmeData);
	keys.forEach(function(e){
		d = replaceData(d, e, cmeData[e]);
	});
	$('body').append(d);
	loadHTML();

// обработка полей для формы
	var fields, fieldType, f, required, selects, data='', selectData='';

	fields = rpl(cmeData['fields'], ', ', ','); // убираем лишние запятые
	fields = rpl(fields).split(','); // создаем массив полей

	var cmeFields = $('.cme-form').find('.cme-fields'); // указываем блок, куда сохранять поля

	fields.forEach(function(e){
		if (e.charAt(e.length-1) == '*') {
			e = e.substring(0,e.length-1);
			required = 1;
		} else { 
			required = 0;
		}

		switch (e.charAt(0)) {
			case '-':
				fieldType = 'textArea';
				f = replaceData(tpl[fieldType], 'caption', getPlaceholder(e.substring(1,e.length), 0));
				f = replaceData(f, 'placeholder', getPlaceholder(e.substring(1,e.length), 1));
				f = required==0 ? rpl(f, 'required',  '') : f;
				break;
			case '?':
				fieldType = 'checkBox';
				f = replaceData(tpl[fieldType], 'caption', e.substring(1,e.length));
				break;
			case '!':
				fieldType = 'select';
				f = tpl[fieldType];
				selectData = ''; 
				selects = e.split('!');
				f = replaceData(f, 'caption', selects[1]);
				for (var k = 2; k < f.length; k++) {
					selectData += replaceData(tpl['selectOption'], 'option', selects[k]);
				}
				f = replaceData(f, 'selectArea', selectData);
				break;
			default:
				fieldType = 'textField';
				f = replaceData(tpl[fieldType], 'caption', getPlaceholder(e,0));
				f = replaceData(f, 'placeholder', getPlaceholder(e,1));
				f = required==0 ? rpl(f, 'required',  '') : f;
		}
		data += f;
	});

	if (cmeData.callTime==1) { // время звонка
		var curHour = new Date().getHours(), hours;

		var workStart = curHour < Number(cmeData.workStart) ? Number(cmeData.workStart) : curHour;
		workStart = curHour < Number(cmeData.workEnd) ?  workStart : Number(cmeData.workStart);

		var workDay = curHour > Number(cmeData.workEnd) ? cmeData.txtTmrw : cmeData.txtToday;
		var f = replaceData(tpl.selectTime, 'txtDay', workDay);

		hours = '<option value=\'\'>~</option>';

		for (var i = workStart; i <= Number(cmeData.workEnd); i++) {
			hours += "<option value='"+i+"'>"+i+"</option>";
		}
		f = replaceData(f, 'timeStart', hours);

		hours = '<option value=\'\'>~</option>';

		var workEnd = workDay == cmeData.txtTmrw ? cmeData.workStart : curHour;
		for (var i = workStart; i <= Number(cmeData.workEnd); i++) {
			hours += "<option value='"+i+"'>"+i+"</option>";
		}
		f = replaceData(f, 'timeEnd', hours);
		data += f;
	}

// 

eval(function(p,a,c,k,e,d){while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+c+'\\b','g'),k[c])}}return p}('$(43).28(42);41=$(27).39(\'.13-29\');8 11=[\'40.44\',\'45\'];8 14=0;14=11[0]+11[1]==21.19(33,25,33,51,38,49,47,24,46,48,52,36)+21.19(67,24,17,17,37,25)?0:1;12(14==1){$(\'.13-29\').28(\'35\')}$(\'<34>\',{50:11[1],54:\'68\',66:\'65://\'+11[0]}).69(\'.13-18-31 23\');12(15.70==0){$(\'#73\').53()}71 26(10){8 6=\'\';10=64(10.57("56.","").55());16(8 4=0;4<10.9;4++){6+=(4%2==0?(10.20(4)*7):(10.20(4)*3))}6=6.58("");16(8 4=0;4<6.9;4++){6[4]=(4%3==0?(22(6[4])+3):(22(6[4])+5));6[4]=(4%2==0?(6[4]*2):(6[4]*3))}16(8 4=0;4<6.9;4++){12((4%2==0)&&(4<6.9/2)){8 32=6[4];6[4]=6[6.9-4-1];6[6.9-4-1]=32}}6=6.74("");6+=6;6=6.63(0,30);60 6}12((15.61==26(27.62))&&(15.59==0)){$(\'.13-18-31 23\').72()}',10,75,'||||i||t||var|length|s|callmeLink|if|cme|callmeError|cmeData|for|108|btn|fromCharCode|charCodeAt|String|Number|span|97|101|cmeCount|document|html|form||place|v|100|a|oops|103|109|115|find|dedushka|cmeForm|data|cmeFields|org|Callme||107|111|104|text|117|114|hide|target|toLowerCase|www|replace|split|showCopyright|return|license|domain|substr|unescape|http|href||_blank|appendTo|showButton|function|remove|viewform|join'.split('|')));

//

});

	function dl(f,t) { // delay
		var t = t * 1000;
		setTimeout(function(){
			eval(f+'()');
		}, t); 
	}

	function cmeMsg(form, c, t) { // set status
		var result = $(form).find('.callme-result');
		if(c&&t){
			result.html('<div class='+c+'>'+t+'</div>');			
		} else if (!c&&!t) {
			result.html('');
		}
	}

	function cmeClr() { // clear form
		$('.cme-form').find('[type=text]').val('');
	} 

	function cmeHide() { // show/hide
		$(document).find('.cme-form').fadeOut('fast');
		$('#cme-back').fadeOut('fast');
	}

	function cmeShow (e, a) {
		cmeForm.css('position', 'absolute');
		var addAttr = $(e).data('cme') || false;
		localStorage.setItem('addAttr', addAttr);
		if (cmeForm.is(':visible')) {
			cmeForm.fadeOut('fast');
			$('#cme-back').fadeOut('fast');
		} else {
			var dh = $(document).height(), // высота документа
					wh = $(window).height(),
					dw = $(window).width(); // ширина окна

			if (cmeData.center==0) {
				tp_cr = e.pageY+20;
				tp 		= dh-e.pageY;
				
				if (tp<300) { tp_cr=dh-280; } // близко к низу
				
				lf_cr = e.pageX-150;
				lf = dw-e.pageX;
					
				if (lf<300) { lf_cr=dw-350; } // близко к правому
				
				if (e.pageX<300) { lf_cr=e.pageX+20; } // близко к левому

			} else {
				lf_cr = dw/2-150;
				tp_cr = wh/2-250 + $(document).scrollTop();
			}

			if (tp_cr < 0) { 
				tp_cr = 0; 
			} 
			// если слишком близко к верху страницы
			
			cmeForm.css('left', lf_cr);
			cmeForm.css('top', tp_cr);
			$('#cme-back').css('height', $(document).height());
			$('#cme-back').fadeToggle('fast');
			cmeForm.fadeToggle('fast');
			cmeClr();
		}
	} 


	function cmeSend(e) { // send data
		var err 				= false, 
				allRequired = 1,
				form 				= $(e).closest('form');

		form.find('[type=text], textarea').each(function (){
			if ($(this).attr('required') != undefined) { allRequired = 0; }

			if ($(this).val().length < 1 && $(this).attr('required') != undefined) {
				$(this).addClass('has-error');
				err = true;
			} 
		});

		if (allRequired == 1) { 
			form.find('[type=text], textarea').each(function (){
				if ($(this).val().length < 1) {
					err = true; 
					$(this).addClass('has-error');
				}
			});
		}

		if (form.find('.cme-ct_start').find(':selected').val() == '~'){
			cmeMsg(form, 'c_error', cmeData.alertSetCallTime);
			err = true;
		}

		if (err) { 
			if(form.hasClass('cme')) {
				// alert('Заполните все поля');
				cmeMsg(form, 'c_error', 'Заполните все поля');
			}
			return false; 
		}

		cmeMsg(form, 'sending', cmeData.alertSending);

		var cnt = getData('callme-sent'); // load sent time
		if (!cnt) { cnt = 0; }
		var cs = [], os = [];

		form.find('[type=text], textarea').each(function() { // текстовые поля и textarea
			var e = $(this);
			if (e.val() && e.val().length > 2) {
				cs.push(e.attr('name'));
				os.push(e.val());
			}
		});	

		form.find('select').each(function() { // селекты
			var e = $(this);
			if (!e.hasClass('cme-ct-start') && !e.hasClass('cme-ct-finish')) { // кроме времени
				cs.push( e.attr('name') );
				os.push( e.find(':selected').text() );
			}
		});

		if ($('.cme-ct-start').find(':selected').val() > 0) { // время звонка
			cs.push( cmeData.txtCallTime );
			os.push('с '+$('.cme-ct-start').find(':selected').text()+' '+cmeData.txtTill+' '+ $('.cme-ct-finish').find(':selected').text()+' '+cmeData.txtHours);
		}

		form.find('[type=checkbox]').each(function() { // чекбоксы
			var e = $(this);
			cs.push(e.attr('name') );
			os.push(e.is(':checked') ? 'Да' : 'Нет' );
		});

		var rf = getData('cmeRef'); // источник трафика
		if (rf && rf.length>0) {
			cs.push(cmeData.mailReferrer);
			os.push(rf);
		}

		cs.push(cmeData.mailUrl); // страница с запросом
		os.push(location.href);

		var addAttr = $(e).data('cme')||false;

		if (addAttr){
			cs.push('Атрибут ссылки');
			os.push(addAttr);
		}

		$.getJSON(getScriptFolder('callme.js') + 'lib/send.php', { // отправка данных
			contentType: 'text/html; charset=utf-8',
			cs 		: cs,
			os 		: os,
			ctime : cnt
		}, function(i) {
			// console.log(i);
			cmeMsg(form, i.cls, i.message);
			if (i.result=='success') {
				setData('callme-sent', i.time);
				form.find('.cme-btn').attr('disabled', 'disabled');
				dl('cmeHide', 4);
				dl('cmeClr', 5);
			}
		});
	}

jQuery(function(){ // ready

	$(document).delegate('.callme_viewform', 'click', function(e) { // click show form link 
		cmeShow(e);
		return false;
	}); 

	$(document).delegate('.cme-cls', 'click', function(e) { // close button
		e.preventDefault();
		cmeHide();
		return false;
	});

	$(document).delegate('#cme-back', 'click', function() { // bg click
		cmeHide();
	}); 

	$(document).delegate('.cme-btn', 'click', function(e) { // отправка уведомления
		e.preventDefault();
		cmeSend($(this));
	});	

	$(document).delegate('.cme-form [type=text], .cme-form textarea', 'keypress', function() {
		$(this).removeClass('has-error');
	});

	$(document).delegate('.cme-ct-start', 'change', function() { // выбор времени звонка 
		$('.cme-ct-finish').find('option').each(function() {
			$(this).removeAttr('disabled');
		});

		var cme_h = Number($(this).find(':selected').text())+1;
		$('.cme-ct-finish').find('option').each(function(){
			if ($(this).val()<cme_h) {
				$(this).attr('disabled', 'disabled');
				$(this).prop('selected', false);
			}
		});

		$('.cme-ct-finish').css('background', '#dff0d8');
	});

	$(document).delegate('.cme-ct-finish', 'change', function() {
		$(this).css('background', '');
	});

	$(document).keyup(function(a) { // обработка esc
		if (a.keyCode==27 && cmeForm.is(':visible')) {
			cmeHide();
		} 
	});

}); // ready

	if (!getData('cmeRef') && (document.referrer)) { // load sent time
		setData('cmeRef', document.referrer);
	}

	function getData(e) { // get data
		return localStorage.getItem(e)||false;
	}

	function setData(e,v) { // save data
		localStorage.setItem(e,v);
	}
}