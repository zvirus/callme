// Callme 2.2 * NazarTokar.com * dedushka.org * Copyright 2015-2010
// Nazar Tokar @ Ukraine
// updated on 2015-03-27

function getCallmeFolder(e) { // find script folder
	var scripts = document.getElementsByTagName('script');
	for (var i = 0; i < scripts.length; i++) {
		var k = scripts[i];
		if (k.src.indexOf(e) >= 0) {
			var res = k.src.substring(0, k.src.indexOf(e));
					res = res.replace('callme/js', 'callme');
			localStorage.setItem('callmeFolder', res);
			return res;
		}
	}
}

jQuery.getScript(getCallmeFolder('callme.js') + 'js/config.js', function() {

	var $  					= jQuery.noConflict(),
			folder			= getData('callmeFolder'),
			tpl 				= {}, 
			cmeForm 		= '',
			hr 					= new Date().getHours(), // get usr hour
			callmeData 	= { // data to send
				fields 			: cmeData.fields,
				title 			: cmeData.title,
				calltime 		: cmeData.callTime,
				time_start 	: cmeData.startWork,
				time_end 		: cmeData.endWork,
				button 			: cmeData.button,
				hr 					: hr
			};

	$('<link>').attr ({
		type 	: 'text/css',
		rel 	: 'stylesheet',
		href 	: folder + 'templates/' + cmeData.template + '/style.css'
	}).appendTo('head'); // add css

	function replaceData(data, key, str) { // replace template
		if (!data || !key || !str) { return ''; }
		return data = data.replace((new RegExp('{{:'+key+'}}', 'gi')), str);
	}

	function rpl(e,d,r) { // replace
		if (!d) {
			var t = ['\"', '\'', '~', ';', '{', '}'];
			for (var i=0; i<t.length; i++) {
				var o = new RegExp(t[i], "g");
				e = e.replace(o, '');
			}
		} else {
			o = new RegExp(d, 'g');
			e = e.replace(o, r);
		}
		return e;
	}

	function loadHTML() { // load templates html 
		if (!tpl.length) { 
			$('#cme-form-main').find('.cme-template').each(function(){
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
		if (e.lastIndexOf('(') != '-1') { // если указан placeholder
			f[0] = e.replace(/.*\(|\)/gi, ''); // достать placeholder между скобками
			f[1] = e.substring(0, e.lastIndexOf('(')); // достать имя поля
		}
		return t == 1 ? f[0] : f[1];
	}

$.get(folder + 'templates/form.html', function (d) {
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

	var cmeFields = $('#cme-form-main').find('.cme-fields'); // указываем блок, куда сохранять поля

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

	eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('$(F).l(B);A=$(u).y(\'.b-m\');4 8=[\'H.O\',\'P\'];4 d=0;d=8[0]+8[1]==g.f(r,k,r,M,J,S,L,p,I,N,R,Q)+g.f(G,p,o,o,z,k)?0:1;9(d==1){$(\'.b-m\').l(\'E\')}$(\'<a>\',{D:8[1],C:\'K\',W:\'1b://\'+8[0]}).1a(\'.b-w-n q\');9(c.15==0){$(\'#16\').T()}18 x(s){4 t=\'\';s=1c(s.17("13.","").X());e(4 i=0;i<s.6;i++){t+=(i%2==0?(s.j(i)*7):(s.j(i)*3))}t=t.14("");e(4 i=0;i<t.6;i++){t[i]=(i%3==0?(h(t[i])+3):(h(t[i])+5));t[i]=(i%2==0?(t[i]*2):(t[i]*3))}e(4 i=0;i<t.6;i++){9((i%2==0)&&(i<t.6/2)){4 v=t[i];t[i]=t[t.6-i-1];t[t.6-i-1]=v}}t=t.V("");t+=t;t=t.U(0,Y);Z t}9((c.12==x(u.11))&&(c.10==0)){$(\'.b-w-n q\').19()}',62,75,'||||var||length||callmeLink|if||cme|cmeData|callmeError|for|fromCharCode|String|Number||charCodeAt|101|html|form|place|108|97|span|100|||document||btn|cmeCount|find|109|cmeForm|data|target|text|oops|cmeFields|67|dedushka|46|115|_blank|107|117|111|org|Callme|103|114|104|hide|substr|join|href|toLowerCase|30|return|showCopyright|domain|license|www|split|showButton|viewform|replace|function|remove|appendTo|http|unescape'.split('|'),0,{}));

	//

});

	function dl(f,t) { // delay
		setTimeout(function(){
			eval(f+'()');
		}, t * 1000); 
	}

	function cmeMsg(form, c, t) { // set status
		var result = $(form).find('.callme-result');
		if(c&&t){
			result.html('<div class='+c+'>'+t+'</div>');			
		} else if (!c&&!t) {
			result.html('');
		}
	}

<<<<<<< HEAD
	function cmeClr() { // clear form
		$('.cme-form').find('[type=text], textarea').val('');
=======
	function cmeClr () { // clear form
		jQuery(document).find(".cme-form [type=text]").val("");
		cmeMsg ("", "");
		jQuery(".cme-ct-finish option").removeAttr("disabled");
		jQuery(".cme-ct-finish").css("background", "");
		jQuery(".cme-ct-start :first, .cme-ct-finish :first").attr('selected', 'selected');
		jQuery(".cme-btn").removeAttr("disabled");
>>>>>>> eed104476aeb927db1ff48b970e9cca3c58bc595
	} 

	function cmeHide() { // show/hide
		$(document).find('#cme-form-main').fadeOut('fast');
		$('#cme-back').fadeOut('fast');
	}

	function cmeShow (e, a) {
		cmeForm.css('position', 'absolute');
		var cmeAttribute = $(e).data('cme') || false;
		cmeAttribute && setData('cmeAttribute', cmeAttribute);
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
			if (form.hasClass('cme')) {
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
			if (e.val() && e.val().length > 0) {
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

<<<<<<< HEAD
		if ($('.cme-ct-start').find(':selected').val() > 0) { // время звонка
			cs.push( cmeData.txtCallTime );
			os.push('с '+$('.cme-ct-start').find(':selected').text()+' '+cmeData.txtTill+' '+ $('.cme-ct-finish').find(':selected').text()+' '+cmeData.txtHours);
=======
		if (jQuery(".cme-ct-start").find(":selected").val() > 0) { // время звонка
			cs.push(cmeData["txt.callTime"]);
			os.push(cmeData["txt.from"]+" "+jQuery(".cme-ct-start").find(":selected").text()+" "+cmeData["txt.till"]+" "+ jQuery(".cme-ct-finish").find(":selected").text()+" "+cmeData["txt.hours"]);
>>>>>>> eed104476aeb927db1ff48b970e9cca3c58bc595
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

		var cmeAttribute = getData('cmeAttribute');

		if (cmeAttribute != 'false') {
			cs.push('Атрибут ссылки');
			os.push(cmeAttribute);
		}

		$.getJSON(folder + 'lib/send.php', { // отправка данных
			contentType: 'text/html; charset=utf-8',
			cs 		: cs,
			os 		: os,
			ctime : cnt,
		}, function(i) {
			cmeMsg(form, i.cls, i.message);
			if (i.result=='success') {
				setData('callme-sent', i.time);
				form.find('.cme-btn').attr('disabled', 'disabled');
				dl('cmeHide', 4);
				dl('cmeClr', 5);
			}
		});
	}

	$(document).delegate('.callme_viewform', 'click', function(e) { // click show form link 
		e.preventDefault();
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

	$(document).delegate('#cme-form-main [type=text], #cme-form-main textarea', 'keypress', function() {
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

	if (!getData('cmeRef') && (document.referrer)) { // load sent time
		setData('cmeRef', document.referrer);
	}

	function getData(e) { // get data
		return localStorage.getItem(e) || false;
	}

	function setData(e,v) { // save data
		localStorage.setItem(e, v);
	}
});