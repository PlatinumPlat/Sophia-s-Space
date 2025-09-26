$(function () {
	"use strict";

	var sect = $(window.location.hash),
		portfolio = $('.portfolio-items');

	if (sect.length == 1) {
		$('.section.active').removeClass('active');
		sect.addClass('active');
		if (sect.hasClass('border-d')) {
			$('body').addClass('border-dark');
		}
	}

	/*=========================================================================
		Magnific Popup (Project Popup initialization)
	=========================================================================*/
	$('.view-project').magnificPopup({
		type: 'inline',
		fixedContentPos: false,
		fixedBgPos: true,
		overflowY: 'auto',
		closeBtnInside: true,
		preloader: false,
		midClick: true,
		removalDelay: 300,
		mainClass: 'my-mfp-zoom-in'
	});

	$(window).on('load', function () {
		$('body').addClass('loaded');

		/*=========================================================================
			Portfolio Grid
		=========================================================================*/
		portfolio.shuffle();
		$('.portfolio-filters > li > a').on('click', function (e) {
			e.preventDefault();
			var groupName = $(this).attr('data-group');
			$('.portfolio-filters > li > a').removeClass('active');
			$(this).addClass('active');
			portfolio.shuffle('shuffle', groupName);
		});

	});

	/*=========================================================================
		Navigation Functions
	=========================================================================*/
	$('.section-toggle').on('click', function () {
		var $this = $(this),
			sect = $('#' + $this.data('section')),
			current_sect = $('.section.active');
		if (sect.length == 1) {
			if (sect.hasClass('active') == false && $('body').hasClass('section-switching') == false) {
				$('body').addClass('section-switching');
				if (sect.index() < current_sect.index()) {
					$('body').addClass('up');
				} else {
					$('body').addClass('down');
				}
				setTimeout(function () {
					$('body').removeClass('section-switching up down');
				}, 2500);
				setTimeout(function () {
					current_sect.removeClass('active');
					sect.addClass('active');
				}, 1250);
				if (sect.hasClass('border-d')) {
					$('body').addClass('border-dark');
				} else {
					$('body').removeClass('border-dark');
				}
			}
		}
	});


	/*=========================================================================
		Testimonials Slider
	=========================================================================*/
	$('.testimonials-slider').owlCarousel({
		items: 2,
		responsive: {
			992: {
				items: 2
			},
			0: {
				items: 1
			}
		}
	});





	/*=========================================================================
		Contact Form
	=========================================================================*/

	// function isJSON(val) {
	// 	var str = val.replace(/\\./g, '@').replace(/"[^"\\\n\r]*"/g, '');
	// 	return (/^[,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]*$/).test(str);
	// }
	// $('#contact-form').validator().on('submit', function (e) {

	// 	if (!e.isDefaultPrevented()) {
	// 		// If there is no any error in validation then send the message

	// 		e.preventDefault();
	// 		var $this = $(this),

	// 			//You can edit alerts here
	// 			alerts = {

	// 				success:
	// 					"<div class='form-group' >\
	// 					<div class='alert alert-success' role='alert'> \
	// 						<strong>Message Sent!</strong> We'll be in touch as soon as possible\
	// 					</div>\
	// 				</div>",


	// 				error:
	// 					"<div class='form-group' >\
	// 					<div class='alert alert-danger' role='alert'> \
	// 						<strong>Oops!</strong> Sorry, an error occurred. Try again.\
	// 					</div>\
	// 				</div>"

	// 			};

	// 		$.ajax({

	// 			url: '/mail.php',
	// 			type: 'post',
	// 			data: $this.serialize(),
	// 			success: function (data) {

	// 				if (isJSON(data)) {

	// 					data = $.parseJSON(data);

	// 					if (data['error'] == false) {

	// 						$('#contact-form-result').html(alerts.success);

	// 						$('#contact-form').trigger('reset');

	// 					} else {

	// 						$('#contact-form-result').html(
	// 							"<div class='form-group' >\
	// 							<div class='alert alert-danger alert-dismissible' role='alert'> \
	// 								<button type='button' class='close' data-dismiss='alert' aria-label='Close' > \
	// 									<i class='ion-ios-close-empty' ></i> \
	// 								</button> \
	// 								"+ data['error'] + "\
	// 							</div>\
	// 						</div>"
	// 						);

	// 					}


	// 				} else {
	// 					$('#contact-form-result').html(alerts.error);
	// 					console.log("here1");
	// 				}

	// 			},
	// 			error: function () {
	// 				$('#contact-form-result').html(alerts.error);
	// 				console.log("here2");

	// 			}
	// 		});
	// 	}
	// });

});
const button = document.getElementById('send-email');
const spinner = document.getElementById('spinner');
$(function () {
	$('#contact-form').on('submit', async function (e) {
		e.preventDefault();
		spinner.classList.remove('hidden');
		button.disabled = true;
		const form = $(this).closest('form')[0];
		const data = {
			name: form.name.value,
			email: form.email.value,
			message: form.message.value,
			_subject: form._subject.value,
			_captcha: false,
			_honey: form._honey.value,
			_template: 'box'
		};

		try {
			const response = await fetch("https://formsubmit.co/ajax/8917403afb147ca1a68e36167f1214df", {
				method: "POST",
				headers: {
					'Content-Type': 'application/json',
					'Accept': 'application/json'
				},
				body: JSON.stringify(data)
			});

			const result = await response.json();
			if (result.success || response.ok) {
				form.reset();
				$('#contact-form-result').html(
					"<div class='alert alert-success'>Success! Hang tight, I'll reply to your email soon!</div>"
				);

				setTimeout(() => {
					$('#contact-form-result').fadeOut('slow', function () {
						$(this).html('').show();
					});
				}, 5000);
			} else {
				throw new Error("Form submission failed");
			}
		} catch (err) {
			$('#contact-form-result').html(
				"<div class='alert alert-danger'>An error occured. Please try again later!</div>"
			);

			setTimeout(() => {
				$('#contact-form-result').fadeOut('slow', function () {
					$(this).html('').show();
				});
			}, 5000);
		}

		spinner.classList.add('hidden');
		button.disabled = false;
	});
});

const box = document.getElementById('commentboxesa');
const commentN = document.getElementById('commentcount');
function loadComments() {
	box.innerHTML = "";
	const commentboxes = JSON.parse(localStorage.getItem("commentboxes")) || [];
	commentboxes.forEach((comment, index) => {
		const commentbox = document.createElement("div");
		commentbox.innerHTML = `
			<div class="newComment">
			<img class="commentimg" src="${comment.img}">
			<div>
				<h5>${comment.name}</h5>
				<p><pre>${comment.message}</pre></p>
				<span class="date">${comment.date}</span>
				<button class="delbutton" onclick="deleteComment(${index})">Delete</button>
			</div>
			</div>
			`;
		box.appendChild(commentbox);
	});
}
document.getElementById("publishcomment").addEventListener("click", (e) => {
	e.preventDefault();
	let name = document.getElementById("username").value;
	let message = document.getElementById("usermessage").value;
	if (!message) {
		return;
	}
	let date = new Date().toLocaleString();
	let img;
	if (name.toLowerCase() === "anonymous") {
		img = "img/AnonymousUser.png";
	} else {
		img = "img/User.png";
	}

	const commentboxes = JSON.parse(localStorage.getItem("commentboxes")) || [];
	commentboxes.push({ name, message, date, img })
	localStorage.setItem("commentboxes", JSON.stringify(commentboxes));

	document.getElementById("username").value = "Anonymous";
	document.getElementById("usermessage").value = "";
	loadComments();
	add(1);
})

function deleteComment(index) {
	const commentboxes = JSON.parse(localStorage.getItem("commentboxes")) || [];
	commentboxes.splice(index, 1);
	localStorage.setItem("commentboxes", JSON.stringify(commentboxes));
	loadComments();
	add(-1);
}

function add(n) {
	commentN.textContent = Number(commentN.textContent) + n;
	localStorage.setItem("commentcount", commentN.textContent);
}

loadComments();

let savedCount = Number(localStorage.getItem("commentcount")) || 0;
document.getElementById("commentcount").textContent = savedCount;

const box2 = document.getElementById('commentboxesa2');
const commentN2 = document.getElementById('commentcount2');
function loadComments2() {
	box2.innerHTML = "";
	const commentboxes2 = JSON.parse(localStorage.getItem("commentboxes2")) || [];
	commentboxes2.forEach((comment, index) => {
		const commentbox2 = document.createElement("div");
		commentbox2.innerHTML = `
			<div class="newComment2">
			<img class="commentimg" src="${comment.img}">
			<div>
				<h5>${comment.name}</h5>
				<p><pre>${comment.message}</pre></p>
				<span class="date">${comment.date}</span>
				<button class="delbutton2" onclick="deleteComment2(${index})">Delete</button>
			</div>
			</div>
			`;
		box2.appendChild(commentbox2);
	});
}
document.getElementById("publishcomment2").addEventListener("click", (e) => {
	e.preventDefault();
	let name = document.getElementById("username2").value;
	let message = document.getElementById("usermessage2").value;
	if (!message) {
		return;
	}
	let date = new Date().toLocaleString();
	let img;
	if (name.toLowerCase() === "anonymous") {
		img = "img/AnonymousUser.png";
	} else {
		img = "img/User.png";
	}

	const commentboxes2 = JSON.parse(localStorage.getItem("commentboxes2")) || [];
	commentboxes2.push({ name, message, date, img })
	localStorage.setItem("commentboxes2", JSON.stringify(commentboxes2));

	document.getElementById("username2").value = "Anonymous";
	document.getElementById("usermessage2").value = "";
	loadComments2();
	add2(1);
})

function deleteComment2(index) {
	const commentboxes2 = JSON.parse(localStorage.getItem("commentboxes2")) || [];
	commentboxes2.splice(index, 1);
	localStorage.setItem("commentboxes2", JSON.stringify(commentboxes2));
	loadComments2();
	add2(-1);
}

function add2(n) {
	commentN2.textContent = Number(commentN2.textContent) + n;
	localStorage.setItem("commentcount2", commentN2.textContent);
}

loadComments2();

let savedCount2 = Number(localStorage.getItem("commentcount2")) || 0;
document.getElementById("commentcount2").textContent = savedCount2;

const box3 = document.getElementById('commentboxesa3');
const commentN3 = document.getElementById('commentcount3');
function loadComments3() {
	box3.innerHTML = "";
	const commentboxes3 = JSON.parse(localStorage.getItem("commentboxes3")) || [];
	commentboxes3.forEach((comment, index) => {
		const commentbox3 = document.createElement("div");
		commentbox3.innerHTML = `
			<div class="newComment3">
			<img class="commentimg" src="${comment.img}">
			<div>
				<h5>${comment.name}</h5>
				<p><pre>${comment.message}</pre></p>
				<span class="date">${comment.date}</span>
				<button class="delbutton3" onclick="deleteComment3(${index})">Delete</button>
			</div>
			</div>
			`;
		box3.appendChild(commentbox3);
	});
}
document.getElementById("publishcomment3").addEventListener("click", (e) => {
	e.preventDefault();
	let name = document.getElementById("username3").value;
	let message = document.getElementById("usermessage3").value;
	if (!message) {
		return;
	}
	let date = new Date().toLocaleString();
	let img;
	if (name.toLowerCase() === "anonymous") {
		img = "img/AnonymousUser.png";
	} else {
		img = "img/User.png";
	}

	const commentboxes3 = JSON.parse(localStorage.getItem("commentboxes3")) || [];
	commentboxes3.push({ name, message, date, img })
	localStorage.setItem("commentboxes3", JSON.stringify(commentboxes3));

	document.getElementById("username3").value = "Anonymous";
	document.getElementById("usermessage3").value = "";
	loadComments3();
	add3(1);
})

function deleteComment3(index) {
	const commentboxes3 = JSON.parse(localStorage.getItem("commentboxes3")) || [];
	commentboxes3.splice(index, 1);
	localStorage.setItem("commentboxes3", JSON.stringify(commentboxes3));
	loadComments3();
	add3(-1);
}

function add3(n) {
	commentN3.textContent = Number(commentN3.textContent) + n;
	localStorage.setItem("commentcount3", commentN3.textContent);
}

loadComments3();

let savedCount3 = Number(localStorage.getItem("commentcount3")) || 0;
document.getElementById("commentcount3").textContent = savedCount3;

const box4 = document.getElementById('commentboxesa4');
const commentN4 = document.getElementById('commentcount4');
function loadComments4() {
	box4.innerHTML = "";
	const commentboxes4 = JSON.parse(localStorage.getItem("commentboxes4")) || [];
	commentboxes4.forEach((comment, index) => {
		const commentbox4 = document.createElement("div");
		commentbox4.innerHTML = `
			<div class="newComment4">
			<img class="commentimg" src="${comment.img}">
			<div>
				<h5>${comment.name}</h5>
				<p><pre>${comment.message}</pre></p>
				<span class="date">${comment.date}</span>
				<button class="delbutton4" onclick="deleteComment4(${index})">Delete</button>
			</div>
			</div>
			`;
		box4.appendChild(commentbox4);
	});
}
document.getElementById("publishcomment4").addEventListener("click", (e) => {
	e.preventDefault();
	let name = document.getElementById("username4").value;
	let message = document.getElementById("usermessage4").value;
	if (!message) {
		return;
	}
	let date = new Date().toLocaleString();
	let img;
	if (name.toLowerCase() === "anonymous") {
		img = "img/AnonymousUser.png";
	} else {
		img = "img/User.png";
	}

	const commentboxes4 = JSON.parse(localStorage.getItem("commentboxes4")) || [];
	commentboxes4.push({ name, message, date, img })
	localStorage.setItem("commentboxes4", JSON.stringify(commentboxes4));

	document.getElementById("username4").value = "Anonymous";
	document.getElementById("usermessage4").value = "";
	loadComments4();
	add4(1);
})

function deleteComment4(index) {
	const commentboxes4 = JSON.parse(localStorage.getItem("commentboxes4")) || [];
	commentboxes4.splice(index, 1);
	localStorage.setItem("commentboxes4", JSON.stringify(commentboxes4));
	loadComments4();
	add4(-1);
}

function add4(n) {
	commentN4.textContent = Number(commentN4.textContent) + n;
	localStorage.setItem("commentcount4", commentN4.textContent);
}

loadComments4();

let savedCount4 = Number(localStorage.getItem("commentcount4")) || 0;
document.getElementById("commentcount4").textContent = savedCount4;

const box5 = document.getElementById('commentboxesa5');
const commentN5 = document.getElementById('commentcount5');
function loadComments5() {
	box5.innerHTML = "";
	const commentboxes5 = JSON.parse(localStorage.getItem("commentboxes5")) || [];
	commentboxes5.forEach((comment, index) => {
		const commentbox5 = document.createElement("div");
		commentbox5.innerHTML = `
			<div class="newComment5">
			<img class="commentimg" src="${comment.img}">
			<div>
				<h5>${comment.name}</h5>
				<p><pre>${comment.message}</pre></p>
				<span class="date">${comment.date}</span>
				<button class="delbutton5" onclick="deleteComment5(${index})">Delete</button>
			</div>
			</div>
			`;
		box5.appendChild(commentbox5);
	});
}
document.getElementById("publishcomment5").addEventListener("click", (e) => {
	e.preventDefault();
	let name = document.getElementById("username5").value;
	let message = document.getElementById("usermessage5").value;
	if (!message) {
		return;
	}
	let date = new Date().toLocaleString();
	let img;
	if (name.toLowerCase() === "anonymous") {
		img = "img/AnonymousUser.png";
	} else {
		img = "img/User.png";
	}

	const commentboxes5 = JSON.parse(localStorage.getItem("commentboxes5")) || [];
	commentboxes5.push({ name, message, date, img })
	localStorage.setItem("commentboxes5", JSON.stringify(commentboxes5));

	document.getElementById("username5").value = "Anonymous";
	document.getElementById("usermessage5").value = "";
	loadComments5();
	add5(1);
})

function deleteComment5(index) {
	const commentboxes5 = JSON.parse(localStorage.getItem("commentboxes5")) || [];
	commentboxes5.splice(index, 1);
	localStorage.setItem("commentboxes5", JSON.stringify(commentboxes5));
	loadComments5();
	add5(-1);
}

function add5(n) {
	commentN5.textContent = Number(commentN5.textContent) + n;
	localStorage.setItem("commentcount5", commentN5.textContent);
}

loadComments5();

let savedCount5 = Number(localStorage.getItem("commentcount5")) || 0;
document.getElementById("commentcount5").textContent = savedCount5;

const box6 = document.getElementById('commentboxesa6');
const commentN6 = document.getElementById('commentcount6');
function loadComments6() {
	box6.innerHTML = "";
	const commentboxes6 = JSON.parse(localStorage.getItem("commentboxes6")) || [];
	commentboxes6.forEach((comment, index) => {
		const commentbox6 = document.createElement("div");
		commentbox6.innerHTML = `
			<div class="newComment6">
			<img class="commentimg" src="${comment.img}">
			<div>
				<h5>${comment.name}</h5>
				<p><pre>${comment.message}</pre></p>
				<span class="date">${comment.date}</span>
				<button class="delbutton6" onclick="deleteComment6(${index})">Delete</button>
			</div>
			</div>
			`;
		box6.appendChild(commentbox6);
	});
}
document.getElementById("publishcomment6").addEventListener("click", (e) => {
	e.preventDefault();
	let name = document.getElementById("username6").value;
	let message = document.getElementById("usermessage6").value;
	if (!message) {
		return;
	}
	let date = new Date().toLocaleString();
	let img;
	if (name.toLowerCase() === "anonymous") {
		img = "img/AnonymousUser.png";
	} else {
		img = "img/User.png";
	}

	const commentboxes6 = JSON.parse(localStorage.getItem("commentboxes6")) || [];
	commentboxes6.push({ name, message, date, img })
	localStorage.setItem("commentboxes6", JSON.stringify(commentboxes6));

	document.getElementById("username6").value = "Anonymous";
	document.getElementById("usermessage6").value = "";
	loadComments6();
	add6(1);
})

function deleteComment6(index) {
	const commentboxes6 = JSON.parse(localStorage.getItem("commentboxes6")) || [];
	commentboxes6.splice(index, 1);
	localStorage.setItem("commentboxes6", JSON.stringify(commentboxes6));
	loadComments6();
	add6(-1);
}

function add6(n) {
	commentN6.textContent = Number(commentN6.textContent) + n;
	localStorage.setItem("commentcount6", commentN6.textContent);
}

loadComments6();

let savedCount6 = Number(localStorage.getItem("commentcount6")) || 0;
document.getElementById("commentcount6").textContent = savedCount6;

const box7 = document.getElementById('commentboxesa7');
const commentN7 = document.getElementById('commentcount7');
function loadComments7() {
	box7.innerHTML = "";
	const commentboxes7 = JSON.parse(localStorage.getItem("commentboxes7")) || [];
	commentboxes7.forEach((comment, index) => {
		const commentbox7 = document.createElement("div");
		commentbox7.innerHTML = `
			<div class="newComment7">
			<img class="commentimg" src="${comment.img}">
			<div>
				<h5>${comment.name}</h5>
				<p><pre>${comment.message}</pre></p>
				<span class="date">${comment.date}</span>
				<button class="delbutton7" onclick="deleteComment7(${index})">Delete</button>
			</div>
			</div>
			`;
		box7.appendChild(commentbox7);
	});
}
document.getElementById("publishcomment7").addEventListener("click", (e) => {
	e.preventDefault();
	let name = document.getElementById("username7").value;
	let message = document.getElementById("usermessage7").value;
	if (!message) {
		return;
	}
	let date = new Date().toLocaleString();
	let img;
	if (name.toLowerCase() === "anonymous") {
		img = "img/AnonymousUser.png";
	} else {
		img = "img/User.png";
	}

	const commentboxes7 = JSON.parse(localStorage.getItem("commentboxes7")) || [];
	commentboxes7.push({ name, message, date, img })
	localStorage.setItem("commentboxes7", JSON.stringify(commentboxes7));

	document.getElementById("username7").value = "Anonymous";
	document.getElementById("usermessage7").value = "";
	loadComments7();
	add7(1);
})

function deleteComment7(index) {
	const commentboxes7 = JSON.parse(localStorage.getItem("commentboxes7")) || [];
	commentboxes7.splice(index, 1);
	localStorage.setItem("commentboxes7", JSON.stringify(commentboxes7));
	loadComments7();
	add7(-1);
}

function add7(n) {
	commentN7.textContent = Number(commentN7.textContent) + n;
	localStorage.setItem("commentcount7", commentN7.textContent);
}

loadComments7();

let savedCount7 = Number(localStorage.getItem("commentcount7")) || 0;
document.getElementById("commentcount7").textContent = savedCount7;