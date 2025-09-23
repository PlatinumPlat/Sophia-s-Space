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
	button.disabled = true;
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

const savedCount = Number(localStorage.getItem("commentcount")) || 0;
document.getElementById("commentcount").textContent = savedCount;