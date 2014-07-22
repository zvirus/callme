<!DOCTYPE html>
<html><head>
	<script src="stuff/highlight.js"></script>
	<script type="text/javascript" src="/callme/js/jquery211.js"></script>
	<script src="stuff/etc.js"></script>
	<link href="http://fonts.googleapis.com/css?family=Open+Sans:400,700&subset=latin,cyrillic" rel="stylesheet" type="text/css">
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<link rel="stylesheet" href="stuff/bs.css">
	<link rel="stylesheet" href="stuff/style.css">
	<link rel="stylesheet" href="stuff/atelier-forest.light.css">
	<link href="stuff/img/favicon.ico" rel="shortcut icon" type="image/x-icon">
	<title>Callme 2.0 — скрипт обратного звонка</title>
</head>
<body>

<div class="navbar-inverse">
	<div class="container">
		<nav class="collapse navbar-collapse bs-navbar-collapse" role="navigation">
			<ul class="nav navbar-nav">
				<li><a href="#templates">Шаблоны</a></li>
				<li><a href="#settings">Настройка скрипта</a></li>
				<li><a href="#license">Убрать копирайт</a></li>
			</ul>
			<ul class="nav navbar-nav navbar-right">
				<li><a target="_blank" href="http://qbx.me">Форум</a></li>
				<li><a target="_blank" href="http://dedushka.org">Блог</a></li>
			</ul>
		</nav>
	</div>
</div>

<header class="jumbotron subhead">
	<div class="container text-center">
		<h1>Callme <small>2.0</small></h1>
		<p class="lead">Самый популярный скрипт обратного звонка рунета</p>
	</div>
</header>

<div class="colored"></div>

<div class="container">
	<div class="row">
		<div class="col-lg-3">
			<h3>Простой</h3>
			<p class="grey">Скрипт предельно прост в установке и работе. <a href="http://dedushka.org/kod/5213.html">Установка</a> займет менее 10 минут. </p>
		</div>
		<div class="col-lg-3">
			<h3>Универсальный</h3>
			<p class="grey">Работает на любой платформе: Joomla, Prestashop, Bitrix, Wordpress, Opencart, Webasyst, ModX и любых других, где есть доступ к FTP.</p>
		</div>
		<div class="col-lg-3">
			<h3>Удобный</h3>
			<p class="grey">Уведомления приходят на e-mail и в <a href="http://dedushka.org/kod/3903.html">СМС</a>. В комплекте шаблоны настроек для 5 самых популярных смс-провайдеров и <a href="http://qbx.me/viewtopic.php?f=16&t=108">SMTP</a>-настройка.</p>
		</div>
		<div class="col-lg-3">
			<h3>Популярный</h3>
			<p class="grey">Запущен в 2011-м и работает на нескольких тысячах сайтах.</p>
		</div>
	</div>
</div>

<hr>

<div class="container">
	<h2>Пример</h2> 
	<p>Давайте посмотрим, как работает Callme. Нажмите на любую из ссылок ниже. <a href="#" class="callme_viewform">Кликайте на любую ссылку</a>, чтобы показать форму заказа. <a href="#" class="callme_viewform">Вообще на любую</a>. <a href="#" class="callme_viewform">Кликайте</a> на любую из них повторно, чтобы форма скрылась.</p>

	<p>Все очень просто: любому объекту, который должен по клику показывать или скрывать форму, добавляйте аргумент: <code>class="callme_viewform"</code></p>

	<div class="row">
		<div class="item col-xs-6">
			<h2 class="page-header" id="templates">Шаблоны</h2>
			<p>В комплекте 6 различных скинов, которые меняются при помощи CSS. Чтобы выбрать другой шаблон, меняйте переменную <code>cme_template</code>.</p>
			<ul>
				<li><a href="stuff/img/apple.png" class="template_preview">apple</a> (в стиле Apple)
				<li><a href="stuff/img/default.png" class="template_preview">default</a> (по умолчанию, самый крутой)
				<li><a href="stuff/img/blackred.png" class="template_preview">blackred</a> (красно-чёрный)
				<li><a href="stuff/img/vk.png" class="template_preview">vk</a> (ВКонтакте)
				<li><a href="stuff/img/fb.png" class="template_preview">fb</a> (Facebook)
				<li><a href="stuff/img/pink.png" class="template_preview">pink</a> (розовый)
			</ul>
		</div>
		<div class="item col-xs-6">
			<img src="stuff/img/default.png" id="template_preview" alt="">
		</div>
	</div>

	<h2 class="page-header" id="settings">Настройка</h2>

	<ul class="nav nav-tabs tab-settings">
		<li class="active"><a href="#home">Настройка</a></li>
		<li><a href="#fields">Поля формы</a></li>
		<li><a href="#texts">Тексты</a></li>
		<li><a href="#required">Обязательные поля</a></li>
		<li><a href="#placeholder">Placholder</a></li>
		<li><a href="#example">Пример</a></li>
	</ul>

	<div class="tab-content">
		<div class="tab-pane fade in active" id="home">
			<p>Все настройки указываются в файле <code>/callme/js/config.js</code>. Чтобы изменить поля, которые появляются в форме, укажите их названия в переменной <code>cme_fields</code> через запятую. Для того, чтобы поле было не просто текстовым, а <code>textarea</code>, перед его именем добавьте минус.
			<p>Все параметры указываются как свойства объекта <code>cmeData</code> в формате <code>"имя свойства": "значение"</code> и разделенные запятыми. Если это звучит сложно, не расстраивайтесь, ниже есть пример, в котором все понятно. </p>
		</div>

		<div class="tab-pane fade " id="required">
			<p>Вы можете указать, какие из полей требуют заполнения, для этого добавьте после значения поля в переменной <code>fields</code> звездочку. </p>
			<p>Например: <code>Имя*</code></p>
		</div>

		<div class="tab-pane fade" id="placeholder">
			<p>Название поля может отличаться от параметра <code>placeholder</code>. Чтобы указать, какой текст будет использоваться в качестве placeholder, укажите его в скобках после названия поля. Этот параметр будет действовать и для текстовых полей, и для текстовых блоков (textarea).</p>
			<p>Например: <code>Имя(Укажите имя)</code>, <code>-Ваш вопрос (Опишите суть вопроса)</code></p>
		</div>

		<div class="tab-pane fade" id="texts">
			<div class="panel panel-default">
				<table class="table table-striped table-bordered">
					<tbody>
						<tr>
							<th>Параметр</th>
							<th>Назначение</th>
							<th>Варианты</th>
						</tr>
						<tr>
							<td><code>title</code></td>
							<td>Заголовок формы</td>
							<td>Заказать обратный звонок</td>
						</tr>
						<tr>
							<td><code>button</code></td>
							<td>Надпись на кнопке</td>
							<td>Перезвоните мне</td>
						</tr>
						<tr>
							<td><code>txt.callTime</code></td>
							<td>Надпись в форме</td>
							<td>Время звонка</td>
						</tr>
						<tr>
							<td><code>alert.sending</code></td>
							<td>Процесс отправки</td>
							<td>Идет отправка</td>
						</tr>
						<tr>
							<td><code>alert.setCallTime</code></td>
							<td>Если не указано время звонка</td>
							<td>Укажите время звонка</td>
						</tr>
						<tr>
							<td><code>txt.tmrw</code></td>
							<td>Время звонка: завтра</td>
							<td>завтра</td>
						</tr>
						<tr>
							<td><code>txt.today</code></td>
							<td>Время звонка: сегодня</td>
							<td>сегодня</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>

		<div class="tab-pane fade" id="fields">

			<div class="panel panel-default">
				<table class="table table-striped table-bordered">
					<tbody><tr>
						<th>Параметр</th>
						<th>Назначение</th>
						<th>Варианты</th>
					</tr>
					<tr>
						<td><code>showButton</code></td>
						<td>Показывать фиксированную кнопку справа?</td>
						<td><code>1</code> да<br><code>0</code> нет</td>
					</tr>
					<tr>
						<td><code>fields</code></td>
						<td colspan="2">Список полей для всплывающей формы. Указываются через запятую.
							<ul>
								<li><b>текстовое поле</b> — не требует дополнительного кода ( <code>ваше имя</code> )</li>
								<li><b>текстовый блок</b> — ставьте перед названием минус ( <code>-Комментарий</code> )</li>
								<li><b>выпадающий список</b> — ставьте перед названием <code>!</code> и разделяйте варианты для выбора таким же символом ( <code>!Ваш вопрос!Узнать наличие!Сделать заказ</code> )</li>
								<li><b>чекбокс</b> — знак вопроса перед именем ( <code>?Подарочная упаковка</code> )</li>
								<li>если поле должно быть обязательно заполнено, после его название добавьте звездочку ( <code>имя*</code> )</li>
							</ul>
						</td>
					</tr>
					<tr>
						<td><code>callTime</code></td>
						<td>Показывать время звонка?</td>
						<td><code>1</code> да<br><code>0</code> нет</td>
					</tr>
					<tr>
						<td><code>workStart</code>, <code>workEnd</code></td>
						<td>Начало и конец рабочего дня в часах, используется для выбора времени звонка</td>
						<td><code>workStart</code> "8"<br><code>workEnd</code> "19"</td>
					</tr>
					<tr>
						<td><code>center</code></td>
						<td>Где показывать форму на экране</td>
						<td><code>1</code> в центре экрана<br><code>0</code> у места клика</td>
					</tr>
					<tr>
						<td><code>template</code></td>
						<td>Шаблон. С версии 2.0 <code>hello kitty</code> переименован в <code>pink</code>.</td>
						<td><code>default</code>, <code>apple</code>, <code>vk</code>, <code>fb</code>, <code>blackred</code>, <code>pink</code></td>
					</tr>
					<tr>
						<td><code>license</code></td>
						<td>Лицензия, чтобы законно скрыть копирайт. Этот ключ можно купить <a href="http://get.nazartokar.com">здесь</a>)</td>
						<td><code>00000000</code></td>
					</tr>
					<tr>
						<td><code>showCopyright</code></td>
						<td>Показывать ли копирайт; действует только если указана лицензия</td>
						<td><code>1</code> да<br><code>0</code> нет</td>
					</tr>
				</tbody></table>
			</div>
		</div>

		<div class="tab-pane fade" id="example">
			<p>Этот код — значение по умолчанию, которое сохраняется в файле <code>callme/js/config.js</code>. Чтобы все работало, достаточно не трогать его. Если хотите менять значения, пользуйтесь таблицей выше. Если что-то пошло не так, скопируйте этот код и замените им то, что получилось у вас.</p>

			<pre class="panel panel-default">var cmeData = {
	"showButton": "1", 
	"fields": "Имя, Телефон(Укажите номер)*, -Комментарий*, !Ваш вопрос!Узнать наличие!Сделать заказ, ?Подарочная упаковка",
	"title": "Заказать обратный звонок",
	"button": "Перезвоните мне", 
	"callTime": "1", 
	"txt.callTime": "Время звонка",
	"txt.today": "сегодня",
	"txt.tmrw": "завтра",
	"txt.till": "до",
	"txt.hours": "час.",

	"alert.sending": "Идет отправка", 
	"alert.setCallTime": "Укажите время звонка", 

	"mail.referrer": "Источник трафика", 
	"mail.url": "Страница с запросов", 

	"workStart": "8",
	"workEnd": "19",
	"center": "1",
	"template": "pink",

	"license": "0",
	"showCopyright": "0"
}</pre>
		</div>
	</div>

	<hr>

	<p>Напоминаю: настройки должны быть сохранены в файле <code>cellme/js/config.js</code>.</p>

	<h2 class="page-header">Подключение</h2>

	<p>Обратите внимание: если вы обновляете более старую версию Callme, вам нужно будет удалить её код и установить заново. Это несложно, тем не менее, код придётся обновить.
	</p>
	<blockquote>О том, как настраивать sms, написано здесь: <a href="http://dedushka.org/kod/3903.html">настройка СМС в Buyme и Callme</a>.</blockquote>

	<p>Скачивайте архив (ссылка ниже), распаковывайте его в корневую папку <code>callme</code>. Открывайте в Notepad++ или Sublime Text (<b><u>не</u></b> блокноте) файл <code>/callme/lib/send.php</code> и меняйте почту на свою. Если отправка почты не работает или у вас есть лишнее время, вы можете подключить отправку почты через SMTP. Данные указывайте в файле <code>callme/lib/smtp.php</code>.</p>

	<p>Установка скрипта производится так: перед закрывающимся тегом <code>&lt;/head&gt;</code> добавляем такой код:</p>
	<pre>&lt;script src="/callme/js/callme.js" charset="utf-8"&gt;&lt;/script&gt;</pre>

	<h3 class="page-header" id="license">Лицензия</h3>

	<p>Чтобы убрать копирайт, нужно купить лицензию. Это стоит не менее 7$ на ваше усмотрение. Реквизиты указаны на <a href="http://get.nazartokar.com">странице с лицензиями</a>. Оплачиваете и заполняете форму на этом сайте, а я в ответ отправляю вам ключ для скрипта. Все посто.</p>

	<p>Пользоваться скриптом можно совершенно бесплатно, оставляя копирайт. Если хотите новых версий и технической поддержки, поддерживайте и вы меня материально: <a href="http://dedushka.org/pay">здесь все реквизиты</a>. Тех, кто помогает больше всего, я указываю на <a href="http://dedushka.org/thanks">странице благодарностей</a> со ссылками на их проекты. Копирайт прошу не удалять — чем больше пользователей, тем больше будет новых доработок.</p>

	<h3 class="page-header">Помощь</h3>

	<p>Если что-то не получается, вы можете заказать у меня <a href="http://dedushka.org/scripts">установку скрипта</a> на любую CMS. Также разрабатываю другие скрипты на заказ, верстаю. Заинтересован в постоянном удаленном сотрудничестве.</p>
</div>

<footer>
	<div class="container text-center">Следите за новыми версиями <a href="http://dedushka.org/">на сайте</a> и <a href="http://qbx.me/">форуме</a>. Спасибо за поддержку! &middot; <a href="mailto:a@dedushka.org">Назар Токарь</a></div>
</footer>

<script type="text/javascript" src="/callme/js/callme.js" charset="utf-8"></script>
<script type="text/javascript" src="stuff/bs.tabs.js"></script>
</body>
</html>